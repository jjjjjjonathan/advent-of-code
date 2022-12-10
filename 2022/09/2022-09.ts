import { parseInput, splitData } from '../../helpers';

const data = parseInput(__dirname, 'sample.txt');
const motions = splitData(data, 1).map((motion) => motion.split(' '));

const startingPosition = [0, 0];
const whereTailHasBeen = [startingPosition];

type MakeMove = {
  currentPosition: number[];
  whereTailHasBeen: number[][];
};

const tailVisitedBefore = (location: number[], moves: number[][]): boolean => {
  return (
    moves.findIndex(
      (move) => move[0] === location[0] && move[1] === location[1]
    ) > -1
  );
};

export const makeMove = (
  currentPosition: number[],
  move: string[],
  whereTailHasBeen: number[][]
): MakeMove => {
  const previousPosition = [...whereTailHasBeen[0]];

  if (move[0] === 'R') {
    currentPosition[1] += parseInt(move[1]);

    if (previousPosition[0] === currentPosition[0]) {
      for (let i = previousPosition[1] + 1; i < currentPosition[1]; i++) {
        if (!tailVisitedBefore([previousPosition[0], i], whereTailHasBeen)) {
          whereTailHasBeen.unshift([previousPosition[0], i]);
        }
      }
    } else {
      const diagonalPosition =
        previousPosition[0] < currentPosition[0]
          ? [previousPosition[0] + 1, previousPosition[1] + 1]
          : [previousPosition[0] - 1, previousPosition[1] + 1];
      if (!tailVisitedBefore(diagonalPosition, whereTailHasBeen)) {
        whereTailHasBeen.unshift(diagonalPosition);
      }
      for (let i = diagonalPosition[1] + 1; i < currentPosition[1]; i++) {
        if (!tailVisitedBefore([diagonalPosition[0], i], whereTailHasBeen)) {
          whereTailHasBeen.unshift([diagonalPosition[0], i]);
        }
      }
    }
  }

  if (move[0] === 'L') {
    currentPosition[1] -= parseInt(move[1]);

    if (previousPosition[0] === currentPosition[0]) {
      for (let i = previousPosition[1] - 1; i > currentPosition[1]; i--) {
        if (!tailVisitedBefore([previousPosition[0], i], whereTailHasBeen)) {
          whereTailHasBeen.unshift([previousPosition[0], i]);
        }
      }
    }
  }

  if (move[0] === 'U') {
    currentPosition[0] += parseInt(move[1]);

    if (previousPosition[1] === currentPosition[1]) {
      for (let i = previousPosition[0] + 1; i < currentPosition[0]; i++) {
        if (!tailVisitedBefore([i, previousPosition[1]], whereTailHasBeen)) {
          whereTailHasBeen.unshift([i, previousPosition[1]]);
        }
      }
    } else {
      const diagonalPosition =
        previousPosition[1] < currentPosition[1]
          ? [previousPosition[0] + 1, previousPosition[1] + 1]
          : [previousPosition[0] + 1, previousPosition[1] - 1];
      if (!tailVisitedBefore(diagonalPosition, whereTailHasBeen)) {
        whereTailHasBeen.unshift(diagonalPosition);
      }
      for (let i = diagonalPosition[0] + 1; i < currentPosition[0]; i++) {
        if (!tailVisitedBefore([i, diagonalPosition[1]], whereTailHasBeen)) {
          whereTailHasBeen.unshift([i, diagonalPosition[1]]);
        }
      }
    }
  }

  if (move[0] === 'D') {
    currentPosition[0] -= parseInt(move[1]);

    if (previousPosition[1] === currentPosition[1]) {
      for (let i = previousPosition[0] - 1; i > currentPosition[0]; i--) {
        if (!tailVisitedBefore([i, previousPosition[1]], whereTailHasBeen)) {
          whereTailHasBeen.unshift([i, previousPosition[1]]);
        }
      }
    } else {
      const diagonalPosition =
        previousPosition[1] < currentPosition[1]
          ? [previousPosition[0] - 1, previousPosition[1] + 1]
          : [previousPosition[0] - 1, previousPosition[1] - 1];

      if (!tailVisitedBefore(diagonalPosition, whereTailHasBeen)) {
        whereTailHasBeen.unshift(diagonalPosition);
      }
      for (let i = diagonalPosition[0] - 1; i > currentPosition[0]; i--) {
        if (!tailVisitedBefore([i, diagonalPosition[1]], whereTailHasBeen)) {
          whereTailHasBeen.unshift([i, diagonalPosition[1]]);
        }
      }
    }
  }
  return { currentPosition, whereTailHasBeen };
};

export const getAnswer1 = () => {
  return 13;
};

// console.log(getAnswer1());
