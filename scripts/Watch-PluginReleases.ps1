[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [string]$RepoPath,

  [ValidateRange(1, 60)]
  [int]$PollIntervalMinutes = 5,

  [switch]$Once
)

$ErrorActionPreference = 'Stop'
$pluginRepo = 'SpaceFoon/FugsChatBubbles'
$remoteUrl = "https://github.com/$pluginRepo.git"

if (!(Test-Path -LiteralPath $RepoPath -PathType Container)) { throw "Repository folder not found: $RepoPath" }
$RepoPath = (Resolve-Path -LiteralPath $RepoPath).Path
$releaseOutput = Join-Path $RepoPath 'release-dist'
$automationDirectory = Join-Path $RepoPath '.local-release-automation'
$statePath = Join-Path $automationDirectory 'state.json'
$logPath = Join-Path $automationDirectory 'watcher.log'
$lockPath = Join-Path $automationDirectory 'watcher.lock'
$releaseScript = Join-Path $RepoPath 'scripts/Release-Plugin.ps1'
New-Item -ItemType Directory -Path $automationDirectory -Force | Out-Null

function Write-Log {
  param([string]$Message, [string]$Level = 'INFO')
  if ((Test-Path -LiteralPath $logPath) -and (Get-Item -LiteralPath $logPath).Length -gt 1048576) {
    [IO.File]::WriteAllText($logPath, '', [Text.UTF8Encoding]::new($false))
  }
  $stamp = (Get-Date).ToString('yyyy-MM-dd HH:mm:ss', [Globalization.CultureInfo]::InvariantCulture)
  Add-Content -LiteralPath $logPath -Value "$stamp [$Level] $Message" -Encoding UTF8
}

function Invoke-Gh {
  param([string[]]$Arguments)
  $output = & gh @Arguments
  if ($LASTEXITCODE -ne 0) { throw "GitHub CLI failed: gh $($Arguments -join ' ')" }
  return ($output -join [Environment]::NewLine).Trim()
}

function Get-RemoteTags {
  $output = & git -C $RepoPath ls-remote --tags $remoteUrl
  if ($LASTEXITCODE -ne 0) { throw 'Could not read release tags from GitHub.' }

  $tags = @{}
  foreach ($line in $output) {
    $parts = ([string]$line) -split '\s+', 2
    if ($parts.Count -ne 2) { continue }
    if ($parts[1] -notmatch '^refs/tags/(v\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?)(\^\{\})?$') { continue }
    $tag = $Matches[1]
    if ($Matches[2] -or !$tags.ContainsKey($tag)) { $tags[$tag] = $parts[0] }
  }
  return $tags
}

function Read-State {
  $tags = @{}
  if (!(Test-Path -LiteralPath $statePath -PathType Leaf)) {
    return @{ initialized = $false; tags = $tags }
  }

  $document = [IO.File]::ReadAllText($statePath) | ConvertFrom-Json
  if ($document.tags) {
    foreach ($property in $document.tags.PSObject.Properties) {
      $tags[$property.Name] = [string]$property.Value
    }
  }
  return @{ initialized = [bool]$document.initialized; tags = $tags }
}

function Save-State {
  param($State)
  $temporaryPath = "$statePath.tmp"
  $json = $State | ConvertTo-Json -Depth 4
  [IO.File]::WriteAllText($temporaryPath, $json, [Text.UTF8Encoding]::new($false))
  Move-Item -LiteralPath $temporaryPath -Destination $statePath -Force
}

function Get-LatestPublishedReleaseVersion {
  $releaseJson = Invoke-Gh @('release', 'list', '--repo', $pluginRepo, '--limit', '100', '--json', 'tagName,isDraft')
  $releases = @($releaseJson | ConvertFrom-Json)
  $versions = @(
    foreach ($release in $releases) {
      if ($release.isDraft -or $release.tagName -notmatch '^v(\d+\.\d+\.\d+)(?:-[0-9A-Za-z.-]+)?$') { continue }
      [pscustomobject]@{ Tag = $release.tagName; Core = [version]$Matches[1] }
    }
  )
  $latest = $versions | Sort-Object -Property Core -Descending | Select-Object -First 1
  if (!$latest) { return '' }
  return $latest.Tag.Substring(1)
}

function Test-ReleaseExists {
  param([string]$Tag)
  try {
    & gh release view $Tag --repo $pluginRepo *> $null
    return ($LASTEXITCODE -eq 0)
  } catch {
    return $false
  }
}

function Invoke-TagRelease {
  param([string]$Tag, [string]$Version, [string]$Commit)

  if (Test-ReleaseExists -Tag $Tag) {
    Write-Log "Release $Tag already exists; retrying its catalog sync."
    & $releaseScript -Version $Version -SyncOnly 6>&1 | ForEach-Object { Write-Log ([string]$_) }
    return
  }

  $clonePath = Join-Path ([IO.Path]::GetTempPath()) ("FugsChatBubbles-tag-release-" + [guid]::NewGuid().ToString('N'))
  try {
    & git clone --depth 1 --branch $Tag --single-branch $remoteUrl $clonePath
    if ($LASTEXITCODE -ne 0) { throw "Could not clone the source for $Tag." }
    $sourceCommit = & git -C $clonePath rev-parse HEAD
    if ($LASTEXITCODE -ne 0 -or $sourceCommit.Trim() -ne $Commit) {
      throw "Tag $Tag changed while the release was being prepared."
    }
    Write-Log "Publishing $Tag from commit $Commit."
    & $releaseScript -Version $Version -SourceDirectory $clonePath -OutputDirectory $releaseOutput 6>&1 | ForEach-Object { Write-Log ([string]$_) }
  } finally {
    if (Test-Path -LiteralPath $clonePath) {
      $resolved = [IO.Path]::GetFullPath($clonePath)
      $tempRoot = [IO.Path]::GetFullPath([IO.Path]::GetTempPath())
      if ($resolved.StartsWith($tempRoot, [StringComparison]::OrdinalIgnoreCase) -and
          [IO.Path]::GetFileName($resolved).StartsWith('FugsChatBubbles-tag-release-', [StringComparison]::OrdinalIgnoreCase)) {
        Remove-Item -LiteralPath $resolved -Recurse -Force -ErrorAction SilentlyContinue
      }
    }
  }
}

function Get-SortableTag {
  param([string]$Tag, [string]$Commit)
  if ($Tag -notmatch '^v(\d+\.\d+\.\d+)(-[0-9A-Za-z.-]+)?$') { return $null }
  return [pscustomobject]@{
    Tag = $Tag
    Commit = $Commit
    Core = [version]$Matches[1]
    PreRelease = $Matches[2]
  }
}

function Initialize-WatcherState {
  $latestVersion = Get-LatestPublishedReleaseVersion
  if ($latestVersion) {
    Write-Log "First run: reconciling the latest published release v$latestVersion with the plugin directory."
    & $releaseScript -Version $latestVersion -SyncOnly 6>&1 | ForEach-Object { Write-Log ([string]$_) }
  }

  $remoteTags = Get-RemoteTags
  $state = @{ initialized = $true; tags = @{} }
  foreach ($tag in $remoteTags.Keys) { $state.tags[$tag] = $remoteTags[$tag] }
  Save-State $state
  Write-Log "Initialized with $($remoteTags.Count) existing version tag(s). New pushed version tags will be published locally."
  return $state
}

$lockStream = $null
try {
  $lockStream = [IO.File]::Open($lockPath, [IO.FileMode]::OpenOrCreate, [IO.FileAccess]::ReadWrite, [IO.FileShare]::None)
} catch {
  Write-Log 'Another local release watcher is already running; this instance is exiting.' 'WARN'
  return
}

try {
  if (!(Test-Path -LiteralPath $releaseScript -PathType Leaf)) { throw "Release script not found: $releaseScript" }
  if (!(Get-Command git -ErrorAction SilentlyContinue)) { throw 'Git is required by the local release watcher.' }
  if (!(Get-Command gh -ErrorAction SilentlyContinue)) { throw 'GitHub CLI is required by the local release watcher.' }
  if (!(Get-Command node -ErrorAction SilentlyContinue)) { throw 'Node.js is required to update the plugin directory.' }

  $state = Read-State
  do {
    if (!$state.initialized) {
      try {
        $state = Initialize-WatcherState
      } catch {
        Write-Log "Initial release-directory sync failed: $($_.Exception.Message)" 'ERROR'
        if ($Once) { throw }
      }
    }

    if ($state.initialized) {
      try {
        $remoteTags = Get-RemoteTags
        $pending = @(
          foreach ($tag in $remoteTags.Keys) {
            if ($state.tags.ContainsKey($tag) -and $state.tags[$tag] -eq $remoteTags[$tag]) { continue }
            $sortable = Get-SortableTag -Tag $tag -Commit $remoteTags[$tag]
            if ($sortable) { $sortable }
            else {
              $state.tags[$tag] = $remoteTags[$tag]
              Write-Log "Ignoring unsupported release tag $tag." 'WARN'
            }
          }
        ) | Sort-Object -Property @{ Expression = 'Core' }, @{ Expression = { if ($_.PreRelease) { 0 } else { 1 } } }, @{ Expression = 'PreRelease' }

        foreach ($item in $pending) {
          Invoke-TagRelease -Tag $item.Tag -Version $item.Tag.Substring(1) -Commit $item.Commit
          $state.tags[$item.Tag] = $item.Commit
          Save-State $state
          Write-Log "Finished processing $($item.Tag)."
        }
      } catch {
        Write-Log "Tag polling failed: $($_.Exception.Message)" 'ERROR'
        if ($Once) { throw }
      }
    }

    if ($Once) { break }
    Start-Sleep -Seconds ($PollIntervalMinutes * 60)
    $state = Read-State
  } while ($true)
} finally {
  if ($lockStream) { $lockStream.Dispose() }
}
