import fs from 'fs';
const content = fs.readFileSync('c:/Users/gohil/OneDrive/Pictures/Screenshots/new 1/quickconnect/src/components/CustomerPanel.jsx', 'utf8');
const lines = content.split('\n');

// Find where space-y-3.5 div closes by tracking bracket depth
// Start from line 239 col 8905 where space-y-3.5 is
let fullText = '';
let lineOffsets = [];
for (let i = 0; i < lines.length; i++) {
  lineOffsets.push(fullText.length);
  fullText += lines[i] + '\n';
}

// Position of space-y-3.5 on line 239 (0-indexed 238)
const startPos = lineOffsets[238] + 8884;
console.log('Global pos of booking div:', startPos);

// Find "children:" after "space-y-3.5"
const childPos = fullText.indexOf('children:', startPos);
console.log('children: at global pos:', childPos);
console.log('On line:', lines.findIndex((_, i) => lineOffsets[i] <= childPos && (i + 1 >= lines.length || lineOffsets[i + 1] > childPos)));

// Find the start of children value (the conditional expression)
const childValPos = fullText.indexOf('bookingHistoryTab', childPos);
console.log('Conditional at:', childValPos);

// We need to find where the _jsx("div", { className: "space-y-3.5" ... }) closes
// Track from the opening _jsx( 
const jsxPos = fullText.lastIndexOf('_jsx("div"', startPos);
console.log('_jsx("div" at:', jsxPos);

// Track parens from _jsx( to find matching )
let depth = 0, inStr = false, strDel = '';
for (let i = jsxPos + 4; i < fullText.length; i++) {
  const ch = fullText[i];
  if (inStr) {
    if (ch === '\\') { i++; continue; }
    if (ch === strDel) inStr = false;
    continue;
  }
  if (ch === '"' || ch === "'" || ch === '`') { inStr = true; strDel = ch; continue; }
  if (ch === '(') depth++;
  if (ch === ')') {
    depth--;
    if (depth === 0) {
      console.log('Closing ) at global pos:', i);
      // Find which line this is on
      for (let li = lines.length - 1; li >= 0; li--) {
        if (lineOffsets[li] <= i) {
          console.log('On line:', li + 1, 'col:', i - lineOffsets[li]);
          console.log('Context:', fullText.substring(i - 40, i + 20));
          break;
        }
      }
      break;
    }
  }
}
