import fs from 'fs';
const content = fs.readFileSync('c:/Users/gohil/OneDrive/Pictures/Screenshots/new 1/quickconnect/src/components/CustomerPanel.jsx', 'utf8');
const lines = content.split('\n');

// Line 255 (0-indexed 254), around col 2084
const l255 = lines[254];
console.log('=== Line 255 around col 2060-2120 ===');
console.log(l255.substring(2060, 2120));

// Line 239 (0-indexed 238), around col 8860-8895
const l239 = lines[238];
console.log('\n=== Line 239 around col 8850-8910 ===');
console.log(l239.substring(8850, 8910));

// Also show unique context around the premature close
console.log('\n=== Premature close area ===');
console.log(l239.substring(8830, 8900));
