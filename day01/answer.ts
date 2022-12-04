import fs from 'node:fs';
import path from 'node:path';

const FILE_NAME = 'input.txt';

const readAndSplitData = (data: string) => {
  const dataRead = fs.readFileSync(path.join(__dirname, data), {
    encoding: 'utf-8',
  });

  return dataRead.split('\n\n');
};

const addElfCalories = (elf: string) => {
  const splitElfFood: string[] = elf.split('\n');

  const foodToNumbers = splitElfFood.map((calories: string): number =>
    parseInt(calories, 10)
  );

  return foodToNumbers.reduce(
    (accumulator: number, currentValue: number) => accumulator + currentValue,
    0
  );
};

const elves = readAndSplitData(FILE_NAME);

const foodTotaledElves = elves.map((elf) => addElfCalories(elf));

const sortedElves = foodTotaledElves.sort((a, b) => b - a);

console.log('a: ', sortedElves[0]);

// solution for second part below

console.log('b: ', sortedElves[0] + sortedElves[1] + sortedElves[2]);
