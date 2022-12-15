import { parseInput, splitData } from '../../helpers';

const data = parseInput(__dirname, 'sample.txt');
const pairs: (number | object)[][] = splitData(data, 2).map((pair) =>
  pair.split('\n').map((element) => JSON.parse(element))
);

export const compareNumbers = (
  leftValue: number,
  rightValue: number
): number => {
  if (leftValue < rightValue) return 1;
  if (leftValue > rightValue) return -1;
  return 0;
};

export const comparePairs = (
  leftValues: (number | object)[],
  rightValues: (number | object)[]
): boolean | undefined => {
  let index = 0;
  while (index < leftValues.length && index < rightValues.length) {
    if (
      typeof leftValues[index] === 'number' &&
      typeof rightValues[index] === 'number'
    ) {
      const result = compareNumbers(
        leftValues[index] as number,
        rightValues[index] as number
      );

      if (result === 0) {
        index++;
      } else {
        return result > 0;
      }
    }
  }
  return leftValues.length < rightValues.length;
};

console.log(
  comparePairs(
    pairs[0][0] as (number | object)[],
    pairs[0][1] as (number | object)[]
  )
);
