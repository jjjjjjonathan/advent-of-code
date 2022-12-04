import fs from 'fs';
import path from 'path';

const data = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf-8',
});

let count = 0;

const splitData = data.split('\n');

for (let i = 1; i < splitData.length; i++) {
  if (parseInt(splitData[i]) > parseInt(splitData[i - 1])) {
    count++;
  }
}

console.log('a: ', count);
