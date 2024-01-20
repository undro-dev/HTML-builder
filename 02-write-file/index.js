const { stdout, stdin } = process;
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

stdout.write('Hello!! Write text and I will it in 02-write-file.txt!\n');
fs.writeFile(path.join(__dirname, '02-write-file.txt'), ' ', (err) => {
  if (err) throw err;
});
stdin.on('data', (data) => {
  const text = data.toString();
  fs.appendFile(path.join(__dirname, '02-write-file.txt'), text, (err) => {
    if (err) throw err;
  });
});
rl.on('line', (input) => {
  if ('exit' == `${input}`) {
    process.exit();
  }
});
process.on('exit', () =>
  stdout.write('Bye bye!! Good luck learning Node.js !'),
);
