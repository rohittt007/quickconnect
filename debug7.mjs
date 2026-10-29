import fs from 'fs';
const content = fs.readFileSync('c:/Users/gohil/OneDrive/Pictures/Screenshots/new 1/quickconnect/src/components/CustomerPanel.jsx', 'utf8');
const lines = content.split('\n');

// Check lines 239-260 for the booking list structure
for (let i = 238; i < 260; i++) {
  const l = lines[i];
  if (!l) continue;
  console.log(`\nLine ${i+1} (len ${l.length}):`);
  console.log('  Start:', l.substring(0, Math.min(120, l.length)));
  console.log('  End:', l.substring(Math.max(0, l.length - 120)));
}
