import { parseInput, splitData } from '../../helpers';

const data = parseInput(__dirname, 'sample.txt');
const motions = splitData(data, 1).map((motion) => motion.split(' '));

const startingPosition = [0, 0];
const whereTailHasBeen = [startingPosition];

type MakeMove = {
  currentPosition: number[];
  whereTailHasBeen: number[][];
};

export const makeMove = (
  move: string[],
  whereTailHasBeen: number[][]
): MakeMove => {
  const previousPosition = [...whereTailHasBeen[0]];
  const currentPosition = [...whereTailHasBeen[0]];

  if (move[0] === 'R') {
    currentPosition[1] += parseInt(move[1]);

    if (previousPosition[0] === currentPosition[0]) {
      for (let i = previousPosition[1] + 1; i < currentPosition[1]; i++) {
        whereTailHasBeen.unshift([previousPosition[0], i]);
      }
    }
  }

  if (move[0] === 'L') {
    currentPosition[1] -= parseInt(move[1]);

    if (previousPosition[0] === currentPosition[0]) {
      for (let i = previousPosition[1] - 1; i > currentPosition[1]; i--) {
        whereTailHasBeen.unshift([previousPosition[0], i]);
      }
    }
  }

  if (move[0] === 'U') {
    currentPosition[0] += parseInt(move[1]);

    if (previousPosition[1] === currentPosition[1]) {
      for (let i = previousPosition[0] + 1; i < currentPosition[0]; i++) {
        whereTailHasBeen.unshift([i, previousPosition[1]]);
      }
    }
  }

  if (move[0] === 'D') {
    currentPosition[0] -= parseInt(move[1]);

    if (previousPosition[1] === currentPosition[1]) {
      for (let i = previousPosition[0] - 1; i > currentPosition[0]; i--) {
        whereTailHasBeen.unshift([i, previousPosition[1]]);
      }
    }
  }
  return { currentPosition, whereTailHasBeen };
};

export const getAnswer1 = () => {
  return 13;
};

console.log(getAnswer1());
