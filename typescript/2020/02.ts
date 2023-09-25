import { parseInput, splitData } from '../helpers';

const data = parseInput(__dirname, 'data/02-input.txt');

const splittedData = splitData(data, 1);

const mappedData = splittedData.map((item) => item.split(' '));

const splitMappedData = mappedData.map((item) => {
  const minMax = item[0].split('-');
  return {
    min: parseInt(minMax[0], 10),
    max: parseInt(minMax[1], 10),
    letter: item[1][0],
    password: item[2].split('')
  };
});

type Data = typeof splitMappedData;

const solvePartOne = (data: Data) => {
  let count = 0;
  data.forEach((item) => {
    const letterAppearances = item.password.filter(
      (letter) => letter === item.letter
    ).length;
    if (letterAppearances >= item.min && letterAppearances <= item.max) {
      count++;
    }
  });
  return count;
};

const solvePartTwo = (data: Data) => {
  let count = 0;
  data.forEach((item) => {
    const firstLetter = item.password[item.min - 1];
    const secondLetter = item.password[item.max - 1];
    if (firstLetter === item.letter && secondLetter !== item.letter) {
      count++;
    }
    if (firstLetter !== item.letter && secondLetter === item.letter) {
      count++;
    }
  });
  return count;
};

console.log(solvePartTwo(splitMappedData));
