$path = "c:\Users\gohil\OneDrive\Pictures\Screenshots\new 1\quickconnect\src\components\CustomerPanel.jsx"
$t = [System.IO.File]::ReadAllText($path)

# Show full broken textarea context
Write-Host "=== CONTACT PAGE textarea (full) ==="
$k = 99590
Write-Host $t.Substring($k - 150, 700)

Write-Host ""
Write-Host "=== contact page form onSubmit ==="
# Find the form on the contact page
$contactIdx = $t.IndexOf("currentPage === 'contact'")
$formIdx = $t.IndexOf("onSubmit: handleTicketSubmit", $contactIdx)
if ($formIdx -ge 0) {
    Write-Host "form onSubmit found at $formIdx"
    Write-Host $t.Substring($formIdx - 50, 200)
} else {
    Write-Host "NOT FOUND - searching all handleTicketSubmit references"
    $pos = 0
    while ($true) {
        $pos = $t.IndexOf("handleTicketSubmit", $pos)
        if ($pos -lt 0) { break }
        Write-Host "handleTicketSubmit at $pos"
        Write-Host $t.Substring([Math]::Max(0,$pos-30), 120)
        Write-Host ""
        $pos += 18
    }
}
