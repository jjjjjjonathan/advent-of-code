import { parseInput, splitData } from '../../helpers';

const data = parseInput(__dirname, 'sample.txt');
const pairs: (number | object)[][] = splitData(data, 2).map((pair) => pair.split('\n').map((element) => JSON.parse(element)));

export const compareNumbers = (leftValue: number, rightValue: number): number => {
  if (leftValue < rightValue) return 1;
  if (leftValue > rightValue) return -1;
  return 0;
}