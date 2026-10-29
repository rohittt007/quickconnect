const fs = require('fs');
const buf = fs.readFileSync('c:\\Users\\gohil\\OneDrive\\Pictures\\Screenshots\\new 1\\quickconnect\\src\\components\\CustomerPanel.jsx');
const text = buf.toString('utf8');
const lines = text.split('\n');

function scanLine(lineNum) {
  const line = lines[lineNum - 1];
  console.log(`Line ${lineNum} length: ${line.length}`);
  // Show first 100 chars
  console.log(`First 100 chars: ${JSON.stringify(line.substring(0, 100))}`);
  // Check for non-ASCII or zero-width chars
  for (let i = 0; i < Math.min(120, line.length); i++) {
    const code = line.charCodeAt(i);
    if (code > 127 || (code < 32 && code !== 13 && code !== 10) || code === 0x200B || code === 0x200C || code === 0x200D || code === 0xFEFF) {
      console.log(`  Special char at pos ${i}: U+${code.toString(16).toUpperCase().padStart(4, '0')}`);
    }
  }
}

scanLine(231);
scanLine(239);
scanLine(255);

// Check bracket balance for lines 229-239
console.log('\n--- Bracket balance lines 229-239 ---');
let balance = { '(': 0, '[': 0, '{': 0 };
for (let l = 228; l < 239; l++) {
  const line = lines[l];
  for (const ch of line) {
    if (ch === '(') balance['(']++;
    if (ch === ')') balance['(']--;
    if (ch === '[') balance['[']++;
    if (ch === ']') balance['[']--;
    if (ch === '{') balance['{']++;
    if (ch === '}') balance['{']--;
  }
}
console.log('Balance at end of line 238:', balance);

// Check bracket balance for lines 243-255
console.log('\n--- Bracket balance lines 243-255 ---');
let balance2 = { '(': 0, '[': 0, '{': 0 };
for (let l = 242; l < 255; l++) {
  const line = lines[l];
  for (const ch of line) {
    if (ch === '(') balance2['(']++;
    if (ch === ')') balance2['(']--;
    if (ch === '[') balance2['[']++;
    if (ch === ']') balance2['[']--;
    if (ch === '{') balance2['{']++;
    if (ch === '}') balance2['{']--;
  }
}
console.log('Balance at end of line 254:', balance2);
