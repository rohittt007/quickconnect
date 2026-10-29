import fs from 'fs';
const content = fs.readFileSync('c:/Users/gohil/OneDrive/Pictures/Screenshots/new 1/quickconnect/src/components/CustomerPanel.jsx', 'utf8');
const lines = content.split('\n');

// Concatenate lines 239-255 (0-indexed 238-254) 
let text = '';
let lineOffsets = [];
for (let i = 238; i <= 254; i++) {
  lineOffsets.push({ line: i + 1, offset: text.length });
  text += lines[i] + '\n';
}

// Find bookings.map position
const mapPos = text.indexOf('bookings.map((booking)');
console.log('bookings.map at global offset:', mapPos);

// Find ": pastBookings" position  
const colonPos = text.indexOf(': pastBookings.map');
console.log('Ternary : at global offset:', colonPos);

// Count paren depth from bookings.map( to the ternary :
let depth = 0, inStr = false, strDel = '';
for (let i = mapPos; i < colonPos; i++) {
  const ch = text[i];
  if (inStr) {
    if (ch === '\\') { i++; continue; }
    if (ch === strDel) inStr = false;
    continue;
  }
  if (ch === '"' || ch === "'" || ch === '`') { inStr = true; strDel = ch; continue; }
  if (ch === '(') depth++;
  if (ch === ')') depth--;
}
console.log('Paren depth at ternary colon:', depth);
console.log('(positive = still inside open parens, 0 = all closed)');
