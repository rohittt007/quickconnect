const fs = require('fs');
const buf = fs.readFileSync('c:/Users/gohil/OneDrive/Pictures/Screenshots/new 1/quickconnect/src/components/CustomerPanel.jsx');
const text = buf.toString('utf8');
// Split by \r\n or \n
const lines = text.split(/\r?\n/);
console.log('Total lines:', lines.length);

function scan(n) {
  const l = lines[n - 1];
  if (!l && l !== '') { console.log('Line ' + n + ' not found'); return; }
  console.log('Line ' + n + ' len=' + l.length);
  // Show first 80 and last 80 chars
  console.log('  start: ' + JSON.stringify(l.substring(0, 80)));
  console.log('  end:   ' + JSON.stringify(l.substring(Math.max(0, l.length - 80))));
  // Check for special chars
  let specials = [];
  for (let i = 0; i < l.length; i++) {
    const c = l.charCodeAt(i);
    if (c > 127 || (c < 32 && c !== 13 && c !== 10) || c === 0x200B || c === 0x200C || c === 0x200D || c === 0xFEFF) {
      specials.push('pos ' + i + ': U+' + c.toString(16).toUpperCase().padStart(4, '0'));
    }
  }
  if (specials.length > 0) console.log('  SPECIALS:', specials.join(', '));
}

scan(231);
scan(232);
scan(233);
scan(237);
scan(238);
scan(239);
scan(254);
scan(255);
scan(256);

// Full file bracket balance
function calcBalance(startLine, endLine) {
  let b = { paren: 0, square: 0, curly: 0 };
  for (let l = startLine - 1; l < endLine; l++) {
    const ln = lines[l];
    if (!ln) continue;
    let inStr = false; let strCh = ''; let inTpl = false;
    for (let i = 0; i < ln.length; i++) {
      const ch = ln[i];
      const prev = i > 0 ? ln[i-1] : '';
      if (inStr) { if (ch === strCh && prev !== '\\') inStr = false; continue; }
      if (inTpl) { if (ch === '`' && prev !== '\\') inTpl = false; continue; }
      if (ch === '"' || ch === "'") { inStr = true; strCh = ch; continue; }
      if (ch === '`') { inTpl = true; continue; }
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

console.log('\n--- Bracket balance (ignoring strings/templates) ---');
console.log('Full file (1-' + lines.length + '):', JSON.stringify(calcBalance(1, lines.length)));
console.log('Lines 1-239:', JSON.stringify(calcBalance(1, 239)));
console.log('Lines 1-255:', JSON.stringify(calcBalance(1, 255)));
