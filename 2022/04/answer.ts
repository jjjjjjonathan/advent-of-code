import fs from 'fs';
import path from 'path';

const inputData = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf-8',
});

const splitData = inputData.split('\n');

const pairedElves = splitData.map((data) =>
  data.split(',').map((data2) => data2.split('-'))
);

let count = 0;

pairedElves.forEach((pair) => {
  if (
    parseInt(pair[0][0]) >= parseInt(pair[1][0]) &&
    parseInt(pair[0][1]) <= parseInt(pair[1][1])
  ) {
    count++;
  } else if (
    parseInt(pair[1][0]) >= parseInt(pair[0][0]) &&
    parseInt(pair[1][1]) <= parseInt(pair[0][1])
  ) {
    count++;
  }
});

console.log('a: ', count);

// part 2

let count2 = 0;

pairedElves.forEach((pair) => {
  const first = parseInt(pair[0][0]);
  const second = parseInt(pair[0][1]);
  const third = parseInt(pair[1][0]);
  const fourth = parseInt(pair[1][1]);

  if (
    (first >= third && first <= fourth) ||
    (second >= third && second <= fourth) ||
    (third >= first && third <= second) ||
    (fourth >= first && fourth <= second)
  ) {
    count2++;
  }
});

console.log('b: ', count2);
