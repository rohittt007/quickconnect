import fs from 'fs';
const content = fs.readFileSync('c:/Users/gohil/OneDrive/Pictures/Screenshots/new 1/quickconnect/src/components/CustomerPanel.jsx', 'utf8');
const lines = content.split('\n');
const l = lines[238];

// Find the booking section parent div
const pat = 'shadow-premium space-y-4', idx = l.indexOf(pat);
console.log('Found at:', idx);

// Extract the section around column 8884 (error point)
const errCol = 8884;
console.log('\n=== Around error column 8850-8920 ===');
console.log(l.substring(8850, 8920));

// Check structure: look for the children array opening
const childStart = l.indexOf('children: [', idx);
console.log('\nchildren: [ at:', childStart);

// Now trace bracket depth manually, skipping strings
let depth = 0;
let pos = childStart + 10; // position of '['
let inString = false;
let stringDelim = '';

for (let i = pos; i < Math.min(l.length, pos + 3000); i++) {
  const ch = l[i];
  
  if (inString) {
    if (ch === '\\') { i++; continue; }
    if (ch === stringDelim) { inString = false; }
    continue;
  }
  
  if (ch === '"' || ch === "'" || ch === '`') {
    inString = true;
    stringDelim = ch;
    continue;
  }
  
  if (ch === '[') depth++;
  if (ch === ']') {
    depth--;
    if (depth === 0) {
      console.log('\nMatching ] found at column:', i);
      console.log('Context:', l.substring(i - 100, i + 50));
      break;
    }
  }
}

if (depth !== 0) {
  console.log('\nNo matching ] found! Remaining depth:', depth);
}
