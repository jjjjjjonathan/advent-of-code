import { parseInput } from '../../helpers';

const data = parseInput(__dirname);

const rucksacks = data.split('\n');

const organizedRucksacks = rucksacks.map((rucksack) => [
  rucksack.slice(0, Math.floor(rucksack.length / 2)),
  rucksack.slice(Math.floor(rucksack.length / 2)),
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

// part 2

const secondOrganizedSacks = [];

for (let i = 0; i < rucksacks.length; i += 3) {
  secondOrganizedSacks.push([rucksacks[i], rucksacks[i + 1], rucksacks[i + 2]]);
}

let secondTotalValue = 0;

secondOrganizedSacks.forEach((rucksack) => {
  let value = 0;

  for (let i = 0; i < rucksack[0].length; i++) {
    if (
      rucksack[1].includes(rucksack[0][i]) &&
      rucksack[2].includes(rucksack[0][i])
    ) {
      value = priorityValues.indexOf(rucksack[0][i]) + 1;
    }
    if (value > 0) break;
  }
  secondTotalValue += value;
});

console.log('b: ', secondTotalValue);
