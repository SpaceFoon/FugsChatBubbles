[CmdletBinding()]
param()

$taskName = 'FugsChatBubblesLocalReleaseWatcher'
if (Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue) {
  Stop-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue
  Unregister-ScheduledTask -TaskName $taskName -Confirm:$false
  Write-Host "Removed $taskName. Existing release ZIPs, logs, and state were kept."
} else {
  Write-Host "$taskName is not installed."
}
