import fs from 'fs';
const content = fs.readFileSync('c:/Users/gohil/OneDrive/Pictures/Screenshots/new 1/quickconnect/src/components/CustomerPanel.jsx', 'utf8');
const lines = content.split('\n');
const l = lines[238];

// The error is at col 8884 - find the parent children array
// Search backward from 8884 for "children: ["
const before = l.substring(7700, 8884);
const lastChildren = before.lastIndexOf('children: [');
const absPos = 7700 + lastChildren;
console.log('Parent children: [ at column:', absPos);
console.log('Context:', l.substring(absPos - 50, absPos + 20));

// Now trace bracket depth from that position
let depth = 0;
let pos = absPos + 10; // position of '['
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
      console.log('Context:', l.substring(Math.max(0, i - 80), i + 50));
      break;
    }
  }
}
if (depth !== 0) console.log('\nBracket not closed! depth:', depth);
