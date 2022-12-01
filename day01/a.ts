const fs = require('fs');
const path = require('path');
const FILE_NAME = 'input.txt';

const readAndSplitData = (data) => {
  const dataRead = fs.readFileSync(path.join(__dirname, data), {
    encoding: 'utf-8',
  });

  return dataRead.split('\n\n');
};

const addElfCalories = (elf) => {
  const splitElfFood = elf.split('\n');

  const foodToNumbers = splitElfFood.map((calories) => parseInt(calories, 10));

  return foodToNumbers.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
};

const elves = readAndSplitData(FILE_NAME);

const foodTotaledElves = elves.map((elf) => addElfCalories(elf));

const sortedElves = foodTotaledElves.sort((a, b) => b - a);

console.log(sortedElves[0]);
