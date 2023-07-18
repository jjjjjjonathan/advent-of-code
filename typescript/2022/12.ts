import { parseInput, splitData } from '../helpers';

const data = parseInput(__dirname, 'data/12-sample.txt');
const rows = splitData(data, 1).map((row) => row.split(''));
export const START = 'S';
export const END = 'E';

export const findPoint = (rows: string[][], point: string): number[] => {
  let pointToReturn: number[] = [-1, -1];
  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
      if (rows[y][x] === point) {
        pointToReturn = [y, x];
        break;
      }
    }
    if (pointToReturn[0] > -1 && pointToReturn[1] > -1) {
      break;
    }
  }
  return pointToReturn;
};
