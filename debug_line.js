const fs = require('fs');
const content = fs.readFileSync('c:/Users/gohil/OneDrive/Pictures/Screenshots/new 1/quickconnect/src/components/CustomerPanel.jsx', 'utf8');
const lines = content.split('\n');
const l = lines[238]; // line 239 (0-indexed)

// Find the parent children array for the booking section
// Look for: children: _jsxs("div", { className: "rounded-2xl border...shadow-premium space-y-4"
const pattern = 'shadow-premium space-y-4", children: [';
const idx = l.indexOf(pattern);
console.log('Parent children array starts at:', idx);

// Now let's count brackets from that point to find where it closes
let depth = 0;
let inStr = false;
let strChar = '';
let escape = false;
let start = idx + pattern.length - 1; // position of the '['

for (let i = start; i < l.length && i < start + 2000; i++) {
  const c = l[i];
  if (escape) { escape = false; continue; }
  if (c === '\\') { escape = true; continue; }
  if (inStr) {
    if (c === strChar) inStr = false;
    continue;
  }
  if (c === '"' || c === "'" || c === '`') { inStr = true; strChar = c; continue; }
  if (c === '[') depth++;
  if (c === ']') {
    depth--;
    if (depth === 0) {
      console.log('Matching ] at position:', i);
      console.log('Context around closing:', JSON.stringify(l.substring(i - 60, i + 30)));
      break;
    }
  }
}
