$path = "c:\Users\gohil\OneDrive\Pictures\Screenshots\new 1\quickconnect\src\components\CustomerPanel.jsx"
$t = [System.IO.File]::ReadAllText($path)
$i = $t.IndexOf("const handleTicketSubmit")
Write-Host $t.Substring($i, 900)
