import fs from 'fs';
const content = fs.readFileSync('c:/Users/gohil/OneDrive/Pictures/Screenshots/new 1/quickconnect/src/components/CustomerPanel.jsx', 'utf8');
const lines = content.split('\n');
const l = lines[238];

// Find all pb.id occurrences
let idx = 0;
while ((idx = l.indexOf('pb.id', idx)) > -1) {
  console.log('pb.id at:', idx, '->', l.substring(idx - 10, idx + 30));
  idx++;
}

// Find the closing of space-y-3.5 div
idx = 0;
let count = 0;
while ((idx = l.indexOf('space-y-3.5', idx)) > -1) {
  console.log('\nspace-y-3.5 at:', idx);
  idx++;
  count++;
}

// Show what's at the end of the line (last 200 chars)
console.log('\n=== Last 200 chars of line 239 ===');
console.log(l.substring(l.length - 200));
