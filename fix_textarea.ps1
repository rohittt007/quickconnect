$path = "c:\Users\gohil\OneDrive\Pictures\Screenshots\new 1\quickconnect\src\components\CustomerPanel.jsx"
$bytes = [System.IO.File]::ReadAllBytes($path)
$text  = [System.Text.Encoding]::UTF8.GetString($bytes)

$old = '_jsx("textarea", { rows: 3, required: true, placeholder: ticketCategory === ''billing'' ? "Please describe your billing or payment issue in detail..." : ticketCategory === ''technical'' ? "Please describe your issue in detail..." : "Please describe the issue in detail...", className: "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-700 font-semibold outline-none focus:border-indigo-600 mt-1 resize-none shadow-inner-sm" })'

$new = '_jsx("textarea", { rows: 3, required: true, value: ticketDescription, onChange: (e) => setTicketDescription(e.target.value), placeholder: ticketCategory === ''billing'' ? "Please describe your billing or payment issue in detail..." : ticketCategory === ''technical'' ? "Please describe your issue in detail..." : "Please describe the issue in detail...", className: "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-700 font-semibold outline-none focus:border-indigo-600 mt-1 resize-none shadow-inner-sm" })'

if ($text.Contains($old)) {
    $newText  = $text.Replace($old, $new)
    $newBytes = [System.Text.Encoding]::UTF8.GetBytes($newText)
    [System.IO.File]::WriteAllBytes($path, $newBytes)
    Write-Host "SUCCESS"
} else {
    Write-Host "NOT FOUND - showing actual text around the textarea"
    $idx = $text.IndexOf("rows: 3, required: true, placeholder: ticketCategory")
    if ($idx -ge 0) {
        Write-Host $text.Substring($idx, 450)
    } else {
        Write-Host "textarea anchor not found either"
    }
}
