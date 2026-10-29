import fs from 'fs';
const content = fs.readFileSync('c:/Users/gohil/OneDrive/Pictures/Screenshots/new 1/quickconnect/src/components/CustomerPanel.jsx', 'utf8');
const lines = content.split('\n');
const l = lines[254];
console.log('Line 255 length:', l.length);
console.log('Col 250-280:', JSON.stringify(l.substring(250, 280)));
console.log('Col 255-265:', JSON.stringify(l.substring(255, 265)));
console.log('Col 240-270:', JSON.stringify(l.substring(240, 270)));
