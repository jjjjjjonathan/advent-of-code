import { parseInput, splitData } from '../helpers';

const data = parseInput(__dirname, 'data/04-input.txt');

const organizedData = splitData(data, 1);

export const pairElves = (data: string[]) => {
  return data.map((pair) =>
    pair.split(',').map((floorRange) => floorRange.split('-'))
  );
};

const pairedElves = pairElves(organizedData);

const getFirstDataset = (data: string[][][]): number[] => {
  return [
    parseInt(data[0][0][0]),
    parseInt(data[0][0][1]),
    parseInt(data[0][1][0]),
    parseInt(data[0][1][1])
  ];
};

export const countFullContains = (
  data: string[][][],
  count: number
): number | undefined => {
  if (data.length > 0) {
    const [first, second, third, fourth] = getFirstDataset(data);

    if (
      (first >= third && second <= fourth) ||
      (third >= first && fourth <= second)
    ) {
      count++;
    }
    return countFullContains(data.slice(1), count);
  }
  return count;
};

console.log('a: ', countFullContains(pairedElves, 0));

// part 2

export const countOverlaps = (
  data: string[][][],
  count: number
): number | undefined => {
  if (data.length > 0) {
    const [first, second, third, fourth] = getFirstDataset(data);

    if (
      (first >= third && first <= fourth) ||
      (second >= third && second <= fourth) ||
      (third >= first && third <= second) ||
      (fourth >= first && fourth <= second)
    ) {
      count++;
    }
    return countOverlaps(data.slice(1), count);
  }
  return count;
};

console.log('b: ', countOverlaps(pairedElves, 0));
