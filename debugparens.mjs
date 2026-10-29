import fs from 'fs';
const content = fs.readFileSync('c:/Users/gohil/OneDrive/Pictures/Screenshots/new 1/quickconnect/src/components/CustomerPanel.jsx', 'utf8');
const lines = content.split('\n');
const l = lines[238];

// Find "booking.id))" on line 239
const idx = l.indexOf('booking.id))');
console.log('booking.id)) at col:', idx);
console.log('Context:', l.substring(idx - 30, idx + 30));

// Now trace parens in the active bookings section
// Find "bookings.map" on line 239
const mapIdx = l.indexOf('bookings.map((booking)');
console.log('\nbookings.map at col:', mapIdx);

// Count open/close parens from bookings.map to booking.id))
let depth = 0, inStr = false, strDel = '';
let openParens = 0, closeParens = 0;
for (let i = mapIdx; i < idx + 12; i++) {
  const ch = l[i];
  if (inStr) {
    if (ch === '\\') { i++; continue; }
    if (ch === strDel) inStr = false;
    continue;
  }
  if (ch === '"' || ch === "'" || ch === '`') { inStr = true; strDel = ch; continue; }
  if (ch === '(') { depth++; openParens++; }
  if (ch === ')') { depth--; closeParens++; }
}
console.log('Open parens:', openParens, 'Close parens:', closeParens, 'Final depth:', depth);
