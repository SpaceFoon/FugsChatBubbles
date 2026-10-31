[CmdletBinding()]
param(
  [ValidateRange(1, 60)]
  [int]$PollIntervalMinutes = 5
)

$ErrorActionPreference = 'Stop'
$pluginRepo = 'SpaceFoon/FugsChatBubbles'
$directoryRepo = 'SpaceFoon/RPG-Maker-MV-MZ-plugins'
$taskName = 'FugsChatBubblesLocalReleaseWatcher'
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$watcherPath = Join-Path $PSScriptRoot 'Watch-PluginReleases.ps1'
$currentUser = [Security.Principal.WindowsIdentity]::GetCurrent().Name

if ($env:OS -ne 'Windows_NT') { throw 'The local release watcher installer is for Windows.' }
foreach ($commandName in @('gh', 'git', 'node')) {
  if (!(Get-Command $commandName -ErrorAction SilentlyContinue)) { throw "Install $commandName before installing local release automation." }
}

$isAuthenticated = $false
try {
  & gh auth status --hostname github.com *> $null
  $isAuthenticated = $LASTEXITCODE -eq 0
} catch {
  $isAuthenticated = $false
}
if (!$isAuthenticated) {
  Write-Host 'Sign in once with your GitHub account. The watcher will reuse this local login for future releases.'
  & gh auth login --hostname github.com --git-protocol https --web
  if ($LASTEXITCODE -ne 0) { throw 'GitHub sign-in did not complete.' }
}

$login = (& gh api user --jq '.login') -join ''
if ($LASTEXITCODE -ne 0) { throw 'Could not read the signed-in GitHub account.' }
foreach ($repository in @($pluginRepo, $directoryRepo)) {
  $canPush = (& gh api "repos/$repository" --jq '.permissions.push') -join ''
  if ($LASTEXITCODE -ne 0 -or $canPush.Trim() -ne 'true') {
    throw "GitHub account $login needs write access to $repository before local releases can run."
  }
}

& gh auth setup-git | Out-Null
if ($LASTEXITCODE -ne 0) { throw 'Could not configure Git to use the saved GitHub CLI login.' }

$powerShellExe = (Get-Command powershell.exe -ErrorAction SilentlyContinue).Source
if (!$powerShellExe) { throw 'Could not find Windows PowerShell (powershell.exe).' }
$arguments = '-NoLogo -NoProfile -NonInteractive -WindowStyle Hidden -ExecutionPolicy Bypass -File "{0}" -RepoPath "{1}" -PollIntervalMinutes {2}' -f $watcherPath, $repoRoot, $PollIntervalMinutes
$action = New-ScheduledTaskAction -Execute $powerShellExe -Argument $arguments -WorkingDirectory $repoRoot
$trigger = New-ScheduledTaskTrigger -AtLogOn -User $currentUser
$principal = New-ScheduledTaskPrincipal -UserId $currentUser -LogonType Interactive -RunLevel Limited
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -MultipleInstances IgnoreNew -ExecutionTimeLimit ([TimeSpan]::Zero)

if (Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue) {
  Stop-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue
  $watcherLockPath = Join-Path $repoRoot '.local-release-automation/watcher.lock'
  $stopDeadline = (Get-Date).AddSeconds(15)
  while (Test-Path -LiteralPath $watcherLockPath) {
    try {
      $watcherLock = [IO.File]::Open($watcherLockPath, [IO.FileMode]::Open, [IO.FileAccess]::ReadWrite, [IO.FileShare]::None)
      $watcherLock.Dispose()
      break
    } catch {
      if ((Get-Date) -ge $stopDeadline) { throw 'The previous watcher has not stopped. Retry installation after it exits.' }
      Start-Sleep -Milliseconds 200
    }
  }
}
Register-ScheduledTask -TaskName $taskName -Description 'Polls pushed Fugs Chat Bubbles version tags and publishes releases on this PC.' -Action $action -Trigger $trigger -Principal $principal -Settings $settings -Force | Out-Null
Start-ScheduledTask -TaskName $taskName

Write-Host "Installed and started $taskName for $currentUser."
Write-Host 'The PC and this Windows account must be running for the watcher to process pushed tags.'
Write-Host "Log: $(Join-Path $repoRoot '.local-release-automation/watcher.log')"
