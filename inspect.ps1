$path = "c:\Users\gohil\OneDrive\Pictures\Screenshots\new 1\quickconnect\src\components\CustomerPanel.jsx"
$t = [System.IO.File]::ReadAllText($path)

Write-Host "=== handleTicketSubmit ==="
$i = $t.IndexOf("const handleTicketSubmit")
Write-Host $t.Substring($i, 1100)

Write-Host ""
Write-Host "=== ticketDescription state ==="
$j = $t.IndexOf("ticketDescription")
Write-Host $t.Substring($j, 300)

Write-Host ""
Write-Host "=== DESCRIBE YOUR ISSUE textarea ==="
$k = $t.IndexOf("DESCRIBE YOUR ISSUE")
if ($k -ge 0) { Write-Host $t.Substring($k, 500) } else { Write-Host "NOT FOUND - searching for textarea near ticketDescription" }

Write-Host ""
Write-Host "=== All textarea occurrences near description ==="
$pos = 0
while ($true) {
    $pos = $t.IndexOf("textarea", $pos)
    if ($pos -lt 0) { break }
    Write-Host "--- textarea at $pos ---"
    Write-Host $t.Substring([Math]::Max(0,$pos-100), 400)
    Write-Host ""
    $pos += 8
}
