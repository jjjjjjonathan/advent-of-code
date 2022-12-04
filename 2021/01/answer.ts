import { parseInput } from '../../helpers';

const data = parseInput(__dirname);

let count = 0;

const splitData = data
  .split('\n')
  .map((measurement) => parseInt(measurement, 10));

for (let i = 1; i < splitData.length; i++) {
  if (splitData[i] > splitData[i - 1]) {
    count++;
  }
}

console.log('a: ', count);

// part two

let count2 = 0;

for (let i = 0; i < splitData.length - 3; i++) {
  const previousValue = splitData[i] + splitData[i + 1] + splitData[i + 2];
  const nextValue = splitData[i + 1] + splitData[i + 2] + splitData[i + 3];

  if (nextValue > previousValue) count2++;
}

console.log('b: ', count2);
