$path = "c:\Users\gohil\OneDrive\Pictures\Screenshots\new 1\quickconnect\src\components\CustomerPanel.jsx"
$bytes = [System.IO.File]::ReadAllBytes($path)
$text  = [System.Text.Encoding]::UTF8.GetString($bytes)

# The file uses CRLF + non-breaking-space (0xC2 0xA0 decoded as \u00A0) for indentation.
# We do a regex replace targeting the exact function by its unique content markers.

$pattern = '(?s)const handleTicketSubmit = \(e\) => \{.*?setTimeout\(\(\) => setTicketMessageSuccess\(false\), 4000\);[\s\S]*?\};'

$replacement = @'
const handleTicketSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            alert('Please log in to submit a support request.');
            setPanelAndPage('customer', 'login');
            return;
        }
        const subject = ticketSubject.trim() || ticketCategory;
        const description = ticketDescription.trim();
        if (!description) { alert('Please describe your issue before submitting.'); return; }
        try {
            await submitTicketToAPI({ category: ticketCategory, subject, description, priority: ticketPriority });
        } catch (err) {
            addTicket({
                id: 'T-' + Math.floor(Math.random() * 9000 + 1000),
                category: ticketCategory, subject, description,
                status: 'Open', date: new Date().toISOString().slice(0, 10),
                email: authUser?.email || 'customer@example.com',
                name: authUser?.name || 'Customer', priority: ticketPriority,
            });
            console.warn('Ticket API unavailable, saved locally:', err.message);
        }
        setTicketSubject('');
        setTicketDescription('');
        setTicketMessageSuccess(true);
        setTimeout(() => setTicketMessageSuccess(false), 4000);
    };
'@

# Use non-greedy match — only up to the first closing }; after setTimeout
# We need the match to stop at the correct closing brace.
# Use a more targeted approach: find-and-replace by char indices.
$startIdx = $text.IndexOf("const handleTicketSubmit = (e) => {")
$endMarker = "setTimeout(() => setTicketMessageSuccess(false), 4000);"
$endIdx = $text.IndexOf($endMarker, $startIdx)

if ($startIdx -lt 0) { Write-Host "START NOT FOUND"; exit }
if ($endIdx -lt 0)   { Write-Host "END NOT FOUND"; exit }

# Move past the end marker and find the closing };
$afterEnd = $endIdx + $endMarker.Length
# Find the next }; after that
$closeIdx = $text.IndexOf("};", $afterEnd)
$fullEnd = $closeIdx + 2  # include the };

$oldBlock = $text.Substring($startIdx, $fullEnd - $startIdx)
Write-Host "Old block length: $($oldBlock.Length)"
Write-Host "Snippet: $($oldBlock.Substring(0,80))"

$newBlock = $replacement.TrimStart("`r","`n")

$newText = $text.Substring(0, $startIdx) + $newBlock + $text.Substring($fullEnd)
$newBytes = [System.Text.Encoding]::UTF8.GetBytes($newText)
[System.IO.File]::WriteAllBytes($path, $newBytes)
Write-Host "SUCCESS - new file length: $($newText.Length)"
