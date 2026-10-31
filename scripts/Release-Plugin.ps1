[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [ValidatePattern('^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$')]
  [string]$Version,

  [switch]$SyncOnly,

  [string]$SourceDirectory,

  [string]$OutputDirectory
)

$ErrorActionPreference = 'Stop'
$pluginRepo = 'SpaceFoon/FugsChatBubbles'
$directoryRepo = 'SpaceFoon/RPG-Maker-MV-MZ-plugins'
$pluginSlug = 'fugs-chat-bubbles'
$shortName = 'FugsChatBubbles'
$tag = "v$Version"
$scriptRepoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$repoRoot = if ($SourceDirectory) { (Resolve-Path -LiteralPath $SourceDirectory).Path } else { $scriptRepoRoot }
$zipName = "$shortName-$tag.zip"
$outputDirectory = if ($OutputDirectory) { [IO.Path]::GetFullPath($OutputDirectory) } else { Join-Path $scriptRepoRoot 'release-dist' }
$zipPath = Join-Path $outputDirectory $zipName
$scratchPath = Join-Path ([IO.Path]::GetTempPath()) ("FugsChatBubbles-release-" + [guid]::NewGuid().ToString('N'))
$createdScratch = $false
$script:releaseFailure = $null

function Invoke-Gh {
  param([string[]]$Arguments)
  $output = & gh @Arguments
  if ($LASTEXITCODE -ne 0) {
    throw "GitHub CLI command failed: gh $($Arguments -join ' ')"
  }
  return ($output -join [Environment]::NewLine).Trim()
}

function Invoke-Git {
  param([string]$WorkingDirectory, [string[]]$Arguments)
  $output = & git -C $WorkingDirectory @Arguments
  if ($LASTEXITCODE -ne 0) {
    throw "Git command failed: git -C `"$WorkingDirectory`" $($Arguments -join ' ')"
  }
  return ($output -join [Environment]::NewLine).Trim()
}

function Get-ReleaseNotes {
  $changelog = [IO.File]::ReadAllText((Join-Path $repoRoot 'CHANGELOG.md'))
  $pattern = '(?ms)^##\s+' + [regex]::Escape($Version) + '(?:\s|$).*?(?=^##\s|\z)'
  $match = [regex]::Match($changelog, $pattern)
  if ($match.Success) { return $match.Value.Trim() }
  return "Fugs Chat Bubbles $tag`r`n`r`nSee the included README and CHANGELOG for details."
}

function Assert-GitHubAccess {
  & gh auth status --hostname github.com *> $null
  if ($LASTEXITCODE -ne 0) {
    throw 'Sign in on this PC first: gh auth login --hostname github.com --git-protocol https --web'
  }

  $login = Invoke-Gh @('api', 'user', '--jq', '.login')
  foreach ($repository in @($pluginRepo, $directoryRepo)) {
    $canPush = Invoke-Gh @('api', "repos/$repository", '--jq', '.permissions.push')
    if ($canPush -ne 'true') {
      throw "The signed-in GitHub account ($login) needs write access to $repository."
    }
  }

  # Lets git clone/push use the same locally stored gh login without a repo secret.
  Invoke-Gh @('auth', 'setup-git') | Out-Null
  return $login
}

function Get-ExistingReleaseZipUrl {
  $releaseJson = Invoke-Gh @('release', 'view', $tag, '--repo', $pluginRepo, '--json', 'assets')
  $release = $releaseJson | ConvertFrom-Json
  $asset = @($release.assets | Where-Object { $_.name -eq $zipName } | Select-Object -First 1)
  if ($asset.Count -eq 0) {
    throw "Release $tag exists, but its $zipName asset was not found."
  }
  return "https://github.com/$pluginRepo/releases/download/$tag/$zipName"
}

function Get-RemoteTagCommit {
  $tagRefs = Invoke-Git $repoRoot @(
    'ls-remote', '--tags', "https://github.com/$pluginRepo.git",
    "refs/tags/$tag", "refs/tags/$tag^{}"
  )
  if (!$tagRefs) { return '' }

  $lines = @($tagRefs -split "`r?`n")
  $peeled = @($lines | Where-Object { ($_ -split '\s+', 2)[1] -eq "refs/tags/$tag^{}" } | Select-Object -First 1)
  $selected = if ($peeled.Count -gt 0) {
    $peeled[0]
  } else {
    @($lines | Where-Object { ($_ -split '\s+', 2)[1] -eq "refs/tags/$tag" } | Select-Object -First 1)[0]
  }
  if (!$selected) { throw "Could not read the existing remote tag $tag." }
  return ($selected -split '\s+')[0]
}

function Publish-PluginRelease {
  $dirty = Invoke-Git $repoRoot @('status', '--porcelain')
  if ($dirty) { throw 'Commit or stash working-tree changes before creating a release.' }

  $head = Invoke-Git $repoRoot @('rev-parse', 'HEAD')
  $remoteHead = Invoke-Gh @('api', "repos/$pluginRepo/commits/$head", '--jq', '.sha')
  if ($remoteHead -ne $head) {
    throw 'Push the release commit to GitHub before creating its release.'
  }

  $remoteTagCommit = Get-RemoteTagCommit
  if ($remoteTagCommit -and $remoteTagCommit -ne $head) {
    throw "Tag $tag already points to another commit ($remoteTagCommit), not HEAD ($head)."
  }

  # A release can exist after its directory notification failed; use -SyncOnly to retry it.
  & gh release view $tag --repo $pluginRepo *> $null
  if ($LASTEXITCODE -eq 0) { throw "Release $tag already exists. Use -SyncOnly to notify the shared plugin directory." }

  New-Item -ItemType Directory -Path $scratchPath | Out-Null
  $script:createdScratch = $true
  $stagePath = Join-Path $scratchPath $shortName
  New-Item -ItemType Directory -Path $stagePath | Out-Null

  foreach ($file in @('FugsChatBubbles.js', 'LICENSE', 'README.md')) {
    $source = Join-Path $repoRoot $file
    if (!(Test-Path -LiteralPath $source -PathType Leaf)) { throw "Required release file is missing: $file" }
    Copy-Item -LiteralPath $source -Destination $stagePath
  }

  $readme = [IO.File]::ReadAllText((Join-Path $repoRoot 'README.md'))
  $readme = $readme -replace '(?m)^#{1,6}\s*', ''
  $readme = $readme -replace '\*\*([^*]+)\*\*', '$1'
  $readme = $readme -replace '\*([^*]+)\*', '$1'
  $readme = $readme -replace '`([^`]+)`', '$1'
  $readme = $readme -replace '\[([^\]]+)\]\(([^)]+)\)', '$1 ($2)'
  $notes = @(
    'Enable FugsChatBubbles in Plugin Manager.'
    'MV: use ChatBubble next event:current duration:5, then Show Text.'
    'MZ: select Next Show Text as Bubble, then add Show Text.'
    'See README.md for text codes, normal-dialogue fallbacks, and compatibility limits.'
  ) -join "`r`n"
  $install = @(
    'Fugs Chat Bubbles'
    "Version $Version"
    "Repository: https://github.com/$pluginRepo"
    "Release tag: $tag"
    ''
    '======== INSTALL ========'
    ''
    '1. Unzip this archive.'
    "2. Copy the .js plugin file(s) into your RPG Maker project's js/plugins/ folder."
    '3. Open Plugin Manager, add the plugin, and turn it ON.'
    '4. Configure parameters as needed, then save your project.'
    ''
    '======== NOTES ========'
    ''
    $notes
    ''
    '======== README ========'
    ''
    $readme
    ''
    '======== LICENSE ========'
    ''
    [IO.File]::ReadAllText((Join-Path $repoRoot 'LICENSE'))
  ) -join "`r`n"
  [IO.File]::WriteAllText((Join-Path $stagePath 'INSTALL.txt'), $install, [Text.UTF8Encoding]::new($false))

  New-Item -ItemType Directory -Path $outputDirectory -Force | Out-Null
  $stagedZipPath = Join-Path $scratchPath $zipName
  Compress-Archive -Path $stagePath -DestinationPath $stagedZipPath -CompressionLevel Optimal
  Copy-Item -LiteralPath $stagedZipPath -Destination $zipPath -Force
  $releaseZipUrl = "https://github.com/$pluginRepo/releases/download/$tag/$zipName"
  $releaseNotes = Join-Path $scratchPath 'release-notes.md'
  [IO.File]::WriteAllText($releaseNotes, (Get-ReleaseNotes), [Text.UTF8Encoding]::new($false))

  Write-Host "Created $zipPath"
  $releaseUrl = Invoke-Gh @(
    'release', 'create', $tag, $zipPath, '--repo', $pluginRepo,
    '--target', $head, '--title', "Fugs Chat Bubbles $tag", '--notes-file', $releaseNotes
  )
  Write-Host "Published $releaseUrl"
  Sync-PluginDirectory -ReleaseZipUrl $releaseZipUrl
}

function Sync-PluginDirectory {
  param([string]$ReleaseZipUrl)
  $eventPath = Join-Path $scratchPath 'directory-release.json'
  $event = @{ slug = $pluginSlug; repository = $pluginRepo; version = $Version; tagName = $tag; releaseZipUrl = $ReleaseZipUrl }
  [IO.File]::WriteAllText($eventPath, ($event | ConvertTo-Json), [Text.UTF8Encoding]::new($false))
  $defaultBranch = Invoke-Gh @('repo', 'view', $directoryRepo, '--json', 'defaultBranchRef', '--jq', '.defaultBranchRef.name')
  $directoryPath = Join-Path $scratchPath 'directory'
  & git clone --depth 1 --branch $defaultBranch "https://github.com/$directoryRepo.git" $directoryPath
  if ($LASTEXITCODE -ne 0) { throw 'Could not clone the shared plugin directory.' }
  if (!(Test-Path -LiteralPath (Join-Path $directoryPath 'plugins.json'))) { throw 'The shared directory main branch has no plugins.json. Publish its manifest before syncing releases.' }
  & node (Join-Path $PSScriptRoot 'Sync-PluginDirectory.js') $directoryPath $eventPath
  if ($LASTEXITCODE -ne 0) { throw 'Local directory update failed; no changes were pushed.' }
  Invoke-Git $directoryPath @('add', '--', 'plugins.json', 'README.md') | Out-Null
  & git -C $directoryPath diff --cached --quiet
  $diffResult = $LASTEXITCODE
  if ($diffResult -eq 0) { Write-Host 'Shared plugin directory already matches this release.'; return }
  if ($diffResult -ne 1) { throw 'Could not inspect directory changes.' }
  $author = Invoke-Gh @('api', 'user') | ConvertFrom-Json
  Invoke-Git $directoryPath @('config', 'user.name', $author.login) | Out-Null
  Invoke-Git $directoryPath @('config', 'user.email', "$($author.id)+$($author.login)@users.noreply.github.com") | Out-Null
  Invoke-Git $directoryPath @('commit', '-m', "chore: sync $pluginSlug $tag [skip ci]") | Out-Null
  Invoke-Git $directoryPath @('push', 'origin', "HEAD:refs/heads/$defaultBranch") | Out-Null
  Write-Host "Updated $directoryRepo plugins.json and README from this PC."
}

try {
  if (!(Get-Command gh -ErrorAction SilentlyContinue)) { throw 'Install GitHub CLI (gh) before creating a release.' }
  if (!(Get-Command git -ErrorAction SilentlyContinue)) { throw 'Install Git before creating a release.' }
  if (!(Get-Command node -ErrorAction SilentlyContinue)) { throw 'Install Node.js before synchronizing the plugin directory.' }

  if (!$SyncOnly) {
    $pluginSource = [IO.File]::ReadAllText((Join-Path $repoRoot 'FugsChatBubbles.js'))
    $pluginVersion = [regex]::Match($pluginSource, '(?m)^\s*\*\s*@version\s+(\S+)').Groups[1].Value
    if (!$pluginVersion) { throw 'Could not find the plugin @version in FugsChatBubbles.js.' }
    if ($pluginVersion -ne $Version) {
      throw "Requested release version $Version does not match plugin @version $pluginVersion. Update the plugin version and changelog first."
    }
  }

  $script:githubLogin = Assert-GitHubAccess

  if ($SyncOnly) {
    $releaseZipUrl = Get-ExistingReleaseZipUrl
    New-Item -ItemType Directory -Path $scratchPath | Out-Null
    $createdScratch = $true
    Sync-PluginDirectory -ReleaseZipUrl $releaseZipUrl
  } else {
    Publish-PluginRelease
  }
} catch {
  $script:releaseFailure = $_.Exception.Message
} finally {
  if ($createdScratch -and (Test-Path -LiteralPath $scratchPath)) {
    $resolved = [IO.Path]::GetFullPath($scratchPath)
    $tempRoot = [IO.Path]::GetFullPath([IO.Path]::GetTempPath())
    if ($resolved.StartsWith($tempRoot, [StringComparison]::OrdinalIgnoreCase) -and
        [IO.Path]::GetFileName($resolved).StartsWith('FugsChatBubbles-release-', [StringComparison]::OrdinalIgnoreCase)) {
      Remove-Item -LiteralPath $resolved -Recurse -Force -ErrorAction SilentlyContinue
    }
  }
}

if ($script:releaseFailure) {
  Write-Host "Release failed: $script:releaseFailure" -ForegroundColor Red
  throw $script:releaseFailure
}
