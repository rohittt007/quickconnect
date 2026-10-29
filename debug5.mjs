import fs from 'fs';
const content = fs.readFileSync('c:/Users/gohil/OneDrive/Pictures/Screenshots/new 1/quickconnect/src/components/CustomerPanel.jsx', 'utf8');
const lines = content.split('\n');
const l = lines[238];
// Find "pb.id)" pattern to find end of pastBookings map
let idx = l.indexOf('pb.id)', 8884);
console.log('pb.id) at:', idx);
if (idx > -1) {
  console.log('Around pb.id):', l.substring(idx - 20, idx + 60));
}
// Also search for the closing of the space-y-3.5 div
idx = l.indexOf('})] })', 8884);
while (idx > -1 && idx < 9814) {
  console.log('\nFound })] }) at:', idx);
  console.log('Context:', l.substring(idx - 30, idx + 40));
  idx = l.indexOf('})] })', idx + 1);
}
