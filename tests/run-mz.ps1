param(
  [string]$EnginePath = 'C:\Program Files (x86)\Steam\steamapps\common\RPG Maker MV',
  [Parameter(Mandatory = $true)][string]$MzPath
)
$ErrorActionPreference = 'Stop'
$repoPath = Split-Path -Parent $PSScriptRoot
$scratchPath = Join-Path $repoPath '.runtime-check-mz'
if (Test-Path -LiteralPath $scratchPath) { throw "Scratch directory already exists: $scratchPath" }
$engineExe = Join-Path $EnginePath 'nwjs-win-test\Game.exe'
$pixiPath = Join-Path $mzPath 'js\libs\pixi.js'
if (!(Test-Path -LiteralPath $engineExe) -or !(Test-Path -LiteralPath $pixiPath)) {
  throw 'MV SDK runtime or Pixi source not found. Pass -EnginePath.'
}
$testProcess = $null
$createdScratch = $false
try {
  New-Item -ItemType Directory -Path $scratchPath | Out-Null
  $createdScratch = $true
  '{"name":"bubble-check","main":"index.html","window":{"show":false}}' |
    Set-Content -LiteralPath (Join-Path $scratchPath 'package.json')
  $resultPath = Join-Path $scratchPath 'result.json'
  Copy-Item -LiteralPath (Join-Path $EnginePath 'NewData\fonts\mplus-1m-regular.ttf') -Destination (Join-Path $scratchPath 'gamefont.ttf')
  foreach ($asset in @('Window.png','IconSet.png')) {
    Copy-Item -LiteralPath (Join-Path $EnginePath ('NewData\img\system\' + $asset)) -Destination $scratchPath
  }
  $html = '<!doctype html><meta charset="utf-8"><style>@font-face{font-family:GameFont;src:url(gamefont.ttf)}</style><script>window.testResultPath=' +
    (ConvertTo-Json -Compress $resultPath) + ';</script>'
  foreach ($scriptPath in @($pixiPath,
      
      
      (Join-Path $mzPath 'js\rmmz_core.js'),
      (Join-Path $mzPath 'js\rmmz_windows.js'),
      (Join-Path $mzPath 'js\rmmz_objects.js'),
      (Join-Path $PSScriptRoot 'setup-mz.js'),
      (Join-Path $repoPath 'FugsChatBubbles.js'),
      (Join-Path $PSScriptRoot 'legacy-mz.js'))) {
    Copy-Item -LiteralPath $scriptPath -Destination $scratchPath
    $html += '<script src="' + (Split-Path -Leaf $scriptPath) + '"></script>'
    if ((Split-Path -Leaf $scriptPath) -eq 'rmmz_objects.js') {
      $html += '<script>window.NativeInterpreter=Game_Interpreter;window.NativeMessage=Game_Message;</script>'
    }
  }
  $html | Set-Content -LiteralPath (Join-Path $scratchPath 'index.html') -Encoding utf8
  $testProcess = Start-Process -FilePath $engineExe -ArgumentList (
    '--user-data-dir="' + (Join-Path $scratchPath 'profile') + '" "' + $scratchPath + '"'
  ) -WorkingDirectory $scratchPath -WindowStyle Hidden -PassThru
  $deadline = (Get-Date).AddSeconds(30)
  while (!(Test-Path -LiteralPath $resultPath) -and (Get-Date) -lt $deadline) {
    Start-Sleep -Milliseconds 100
  }
  if (!(Test-Path -LiteralPath $resultPath)) { throw 'MV runtime check timed out.' }
  $result = Get-Content -LiteralPath $resultPath -Raw | ConvertFrom-Json
  $result | ConvertTo-Json
  if (!$result.passed) { throw $result.error }
} finally {
  if ($testProcess -and !$testProcess.HasExited) {
    # Let NW finish closing its renderer/profile before removing the package.
    if (!$testProcess.WaitForExit(5000)) {
      Stop-Process -Id $testProcess.Id -ErrorAction SilentlyContinue
      $testProcess.WaitForExit()
    }
  }
  # This task creates this exact scratch path; never remove an existing folder.
  if ($createdScratch -and (Test-Path -LiteralPath $scratchPath)) {
    $resolvedScratch = (Resolve-Path -LiteralPath $scratchPath).Path
    if ($resolvedScratch -ne (Join-Path $repoPath '.runtime-check-mz')) { throw 'Unexpected scratch path.' }
    for ($attempt = 0; $attempt -lt 10; $attempt++) {
      try { Remove-Item -LiteralPath $resolvedScratch -Recurse -Force; break }
      catch { if ($attempt -eq 9) { throw }; Start-Sleep -Milliseconds 100 }
    }
  }
}
