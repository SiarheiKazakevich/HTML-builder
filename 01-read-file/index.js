const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(filePath);
readStream.pipe(process.stdout);
readStream.on('error', (err) => {
  console.error(`Error reading file: ${err.message}`);
});
readStream.on('end', () => {
  console.log('\nReading completed.');
});
