const fs = require('fs');
const path = require('path');

const inputData = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf-8'
});

const organizedRucksacks = inputData
  .split('\n')
  .map((rucksack) => [
    rucksack.slice(0, Math.floor(rucksack.length / 2)),
    rucksack.slice(Math.floor(rucksack.length / 2))
  ]);

const priorityValues = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

let totalValue = 0;
organizedRucksacks.forEach((rucksack) => {
  let value = 0;

  for (let i = 0; i < rucksack[0].length; i++) {
    for (let j = 0; j < rucksack[1].length; j++) {
      if (rucksack[0][i] === rucksack[1][j]) {
        value = priorityValues.indexOf(rucksack[0][i]) + 1;
      }
    }
    if (value > 0) break;
  }
  totalValue += value;
});

console.log('a: ', totalValue);
