import fs from 'fs';
const content = fs.readFileSync('c:/Users/gohil/OneDrive/Pictures/Screenshots/new 1/quickconnect/src/components/CustomerPanel.jsx', 'utf8');
const lines = content.split('\n');
const l = lines[238];

// Find the shadow-premium space-y-4 div in the DASHBOARD section (not tracking)
// Search for "lg:col-span-8 space-y-6" which is the dashboard left column
const dashCol = l.indexOf('lg:col-span-8 space-y-6');
console.log('Dashboard left col at:', dashCol);

// Find shadow-premium space-y-4 after that
const bookingDiv = l.indexOf('shadow-premium space-y-4', dashCol);
console.log('Booking div at:', bookingDiv);
console.log('Context:', l.substring(bookingDiv - 30, bookingDiv + 80));

// Find children: [ for this div
const childrenPos = l.indexOf('children: [', bookingDiv);
console.log('children: [ at:', childrenPos);

// Trace bracket depth
let depth = 0, inString = false, stringDelim = '';
for (let i = childrenPos + 10; i < Math.min(l.length, childrenPos + 5000); i++) {
  const ch = l[i];
  if (inString) {
    if (ch === '\\') { i++; continue; }
    if (ch === stringDelim) { inString = false; }
    continue;
  }
  if (ch === '"' || ch === "'" || ch === '`') { inString = true; stringDelim = ch; continue; }
  if (ch === '[') depth++;
  if (ch === ']') {
    depth--;
    if (depth === 0) {
      console.log('Matching ] at:', i);
      console.log('Context:', l.substring(i - 60, i + 40));
      break;
    }
  }
}
if (depth !== 0) console.log('Unclosed! depth:', depth);
