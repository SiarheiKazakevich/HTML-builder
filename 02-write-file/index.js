const fs = require('fs');
const path = require('path');
const readline = require('readline');

//const filePath = './02-write-file/02-write-file.txt';
const filePath = path.join(__dirname, '02-write-file.txt');

const writeStream = fs.createWriteStream(filePath, { flags: 'a' });

console.log('Привет! Введите текст (для завершения введите "exit")');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function writeToFile(text) {
  writeStream.write(`${text}\n`);
}

rl.on('line', (input) => {
  if (input === 'exit') {
    console.log('До свидания!');
    process.exit();
  }

  writeToFile(input);

  console.log('Введите еще текст:');
});

process.on('SIGINT', () => {
  console.log('До свидания!');
  process.exit();
});
