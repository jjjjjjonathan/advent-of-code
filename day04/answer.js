const fs = require('fs');
const path = require('path');

const inputData = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf-8'
});

const splitData = inputData.split('\n');

const pairedElves = splitData.map((data) => data.split(',').map((data2) => data2.split('-')));

let count = 0;

pairedElves.forEach((pair) => {
  if (parseInt(pair[0][0]) >= parseInt(pair[1][0]) && parseInt(pair[0][1]) <= parseInt(pair[1][1])) {
    count++;
  } else if (parseInt(pair[1][0]) >= parseInt(pair[0][0]) && parseInt(pair[1][1]) <= parseInt(pair[0][1])) {
    count++;
  }
});

console.log('a: ', count);