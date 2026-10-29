import fs from 'fs';
const content = fs.readFileSync('c:/Users/gohil/OneDrive/Pictures/Screenshots/new 1/quickconnect/src/components/CustomerPanel.jsx', 'utf8');
const lines = content.split('\n');
const l = lines[238];
console.log('Col 8850-8920:', l.substring(8850, 8920));
console.log('Col 8860-8890:', l.substring(8860, 8890));
// Also show where the booking list div ends
const endPat = 'pb.id))) })';
const endIdx = l.indexOf(endPat, 8884);
console.log('Booking list end at:', endIdx);
console.log('After booking list:', l.substring(endIdx, endIdx + 50));
