const fs = require('fs');
const buf = fs.readFileSync('c:/Users/gohil/OneDrive/Pictures/Screenshots/new 1/quickconnect/src/components/CustomerPanel.jsx');
const text = buf.toString('utf8');
const lines = text.split('\n');
console.log('Total lines:', lines.length);

function scan(n) {
  const l = lines[n - 1];
  if (!l) { console.log('Line ' + n + ' not found'); return; }
  console.log('Line ' + n + ' len=' + l.length);
  for (let i = 0; i < Math.min(200, l.length); i++) {
    const c = l.charCodeAt(i);
    if (c > 127 || (c < 32 && c !== 13 && c !== 10) || c === 0x200B || c === 0x200C || c === 0x200D || c === 0xFEFF) {
      console.log('  pos ' + i + ': U+' + c.toString(16).toUpperCase().padStart(4, '0'));
    }
  }
}

scan(231);
scan(239);
scan(255);

// Bracket balance
function calcBalance(startLine, endLine) {
  let b = { paren: 0, square: 0, curly: 0 };
  for (let l = startLine - 1; l < endLine; l++) {
    const ln = lines[l];
    if (!ln) continue;
    for (const ch of ln) {
      if (ch === '(') b.paren++;
      if (ch === ')') b.paren--;
      if (ch === '[') b.square++;
      if (ch === ']') b.square--;
      if (ch === '{') b.curly++;
      if (ch === '}') b.curly--;
    }
  }
  return b;
}

console.log('\nBalance lines 1-238:', JSON.stringify(calcBalance(1, 238)));
console.log('Balance lines 1-254:', JSON.stringify(calcBalance(1, 254)));
console.log('Balance lines 229-231:', JSON.stringify(calcBalance(229, 231)));
console.log('Balance lines 232-239:', JSON.stringify(calcBalance(232, 239)));
console.log('Balance lines 243-255:', JSON.stringify(calcBalance(243, 255)));
