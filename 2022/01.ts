import { parseInput, splitData } from '../helpers';

const data = parseInput(__dirname, 'data/01-input.txt');
const elves = splitData(data, 2);

export const countCalories = (elf: string): number => {
  const splitElfFood: number[] = elf
    .split('\n')
    .map((calories: string): number => parseInt(calories, 10));

  return splitElfFood.reduce(
    (accumulator: number, currentValue: number) => accumulator + currentValue,
    0
  );
};

const foodTotaledElves = elves.map((elf) => countCalories(elf));

const sortedElves = foodTotaledElves.sort((a, b) => b - a);

console.log('a: ', sortedElves[0]);

// solution for second part below

console.log('b: ', sortedElves[0] + sortedElves[1] + sortedElves[2]);
