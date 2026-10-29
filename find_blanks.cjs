const fs = require('fs');
const buf = fs.readFileSync('c:/Users/gohil/OneDrive/Pictures/Screenshots/new 1/quickconnect/src/components/CustomerPanel.jsx');
const text = buf.toString('utf8');
const lines = text.split(/\r?\n/);

// Find blank or near-blank lines in the problem areas
console.log('=== Blank lines near 231-260 ===');
for (let i = 220; i < 270 && i < lines.length; i++) {
  const l = lines[i];
  const trimmed = l.trim();
  if (trimmed.length === 0 || trimmed.length < 5) {
    console.log(`Line ${i+1} (len=${l.length}): "${trimmed}" ${trimmed.length === 0 ? '<-- EMPTY' : ''}`);
  }
}

// Show actual content of lines 235-260
console.log('\n=== Lines 235-260 (first 200 chars) ===');
for (let i = 234; i < 260 && i < lines.length; i++) {
  const l = lines[i];
  console.log(`L${i+1}: ${l.substring(0, 200)}`);
}

// Find the arrays with blank-line-separated items
console.log('\n=== Looking for array patterns with blank lines ===');
for (let i = 0; i < lines.length; i++) {
  const trimmed = lines[i].trim();
  if (trimmed === '' && i > 0 && i < lines.length - 1) {
    const prevTrimmed = lines[i-1].trim();
    const nextTrimmed = lines[i+1].trim();
    // Check if prev line ends with comma and next line starts with { or similar
    if (prevTrimmed.endsWith(',') && (nextTrimmed.startsWith('{') || nextTrimmed.startsWith('booking.'))) {
      console.log(`Blank line at ${i+1}: prev="${prevTrimmed.substring(0,60)}..." next="${nextTrimmed.substring(0,60)}..."`);
    }
  }
}
