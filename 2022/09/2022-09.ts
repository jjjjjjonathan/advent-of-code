import { parseInput, splitData } from '../../helpers';

const data = parseInput(__dirname, 'input.txt');
const motions = splitData(data, 1).map((motion) => motion.split(' '));

const startingPosition = [0, 0];
const whereTailHasBeen = [startingPosition];

type MakeMove = {
  currentPosition: number[];
  whereTailHasBeen: number[][];
};

const tailVisitedBefore = (location: number[], moves: number[][]): number => {
  return moves.findIndex(
    (move) => move[0] === location[0] && move[1] === location[1]
  );
};

const isTouching = (firstSpot: number[], secondSpot: number[]): boolean => {
  const touchingUD = [
    firstSpot[0],
    firstSpot[0] + 1,
    firstSpot[0] - 1,
  ].includes(secondSpot[0]);

  const touchingLR = [
    firstSpot[1],
    firstSpot[1] + 1,
    firstSpot[1] - 1,
  ].includes(secondSpot[1]);

  return touchingUD && touchingLR;
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
        const indexOfExisting = tailVisitedBefore(
          [previousPosition[0], i],
          whereTailHasBeen
        );
        if (indexOfExisting < 0) {
          whereTailHasBeen.unshift([previousPosition[0], i]);
        } else {
          whereTailHasBeen.splice(indexOfExisting, 1);
          whereTailHasBeen.unshift([previousPosition[0], i]);
        }
      }
    } else if (!isTouching(currentPosition, previousPosition)) {
      const diagonalPosition =
        previousPosition[0] < currentPosition[0]
          ? [previousPosition[0] + 1, previousPosition[1] + 1]
          : [previousPosition[0] - 1, previousPosition[1] + 1];
      const indexOfExisting = tailVisitedBefore(
        diagonalPosition,
        whereTailHasBeen
      );
      if (indexOfExisting < 0) {
        whereTailHasBeen.unshift(diagonalPosition);
      } else {
        whereTailHasBeen.splice(indexOfExisting, 1);
        whereTailHasBeen.unshift(diagonalPosition);
      }
      for (let i = diagonalPosition[1] + 1; i < currentPosition[1]; i++) {
        const indexOfExisting = tailVisitedBefore(
          [diagonalPosition[0], i],
          whereTailHasBeen
        );
        if (indexOfExisting < 0) {
          whereTailHasBeen.unshift([diagonalPosition[0], i]);
        } else {
          whereTailHasBeen.splice(indexOfExisting, 1);
          whereTailHasBeen.unshift([diagonalPosition[0], i]);
        }
      }
    }
  }

  if (move[0] === 'L') {
    currentPosition[1] -= parseInt(move[1]);

    if (previousPosition[0] === currentPosition[0]) {
      for (let i = previousPosition[1] - 1; i > currentPosition[1]; i--) {
        const indexOfExisting = tailVisitedBefore(
          [previousPosition[0], i],
          whereTailHasBeen
        );
        if (indexOfExisting < 0) {
          whereTailHasBeen.unshift([previousPosition[0], i]);
        } else {
          whereTailHasBeen.splice(indexOfExisting, 1);
          whereTailHasBeen.unshift([previousPosition[0], i]);
        }
      }
    } else if (!isTouching(currentPosition, previousPosition)) {
      const diagonalPosition =
        previousPosition[0] < currentPosition[0]
          ? [previousPosition[0] + 1, previousPosition[1] - 1]
          : [previousPosition[0] - 1, previousPosition[1] - 1];

      const indexOfExisting = tailVisitedBefore(
        diagonalPosition,
        whereTailHasBeen
      );
      if (indexOfExisting < 0) {
        whereTailHasBeen.unshift(diagonalPosition);
      } else {
        whereTailHasBeen.splice(indexOfExisting, 1);
        whereTailHasBeen.unshift(diagonalPosition);
      }
      for (let i = diagonalPosition[1] - 1; i > currentPosition[1]; i--) {
        const indexOfExisting = tailVisitedBefore(
          [diagonalPosition[0], i],
          whereTailHasBeen
        );
        if (indexOfExisting < 0) {
          whereTailHasBeen.unshift([diagonalPosition[0], i]);
        } else {
          whereTailHasBeen.splice(indexOfExisting, 1);
          whereTailHasBeen.unshift([diagonalPosition[0], i]);
        }
      }
    }
  }

  if (move[0] === 'U') {
    currentPosition[0] += parseInt(move[1]);

    if (previousPosition[1] === currentPosition[1]) {
      for (let i = previousPosition[0] + 1; i < currentPosition[0]; i++) {
        const indexOfExisting = tailVisitedBefore(
          [i, previousPosition[1]],
          whereTailHasBeen
        );
        if (indexOfExisting < 0) {
          whereTailHasBeen.unshift([i, previousPosition[1]]);
        } else {
          whereTailHasBeen.splice(indexOfExisting, 1);
          whereTailHasBeen.unshift([i, previousPosition[1]]);
        }
      }
    } else if (!isTouching(currentPosition, previousPosition)) {
      const diagonalPosition =
        previousPosition[1] < currentPosition[1]
          ? [previousPosition[0] + 1, previousPosition[1] + 1]
          : [previousPosition[0] + 1, previousPosition[1] - 1];
      const indexOfExisting = tailVisitedBefore(
        diagonalPosition,
        whereTailHasBeen
      );
      if (indexOfExisting < 0) {
        whereTailHasBeen.unshift(diagonalPosition);
      } else {
        whereTailHasBeen.splice(indexOfExisting, 1);
        whereTailHasBeen.unshift(diagonalPosition);
      }
      for (let i = diagonalPosition[0] + 1; i < currentPosition[0]; i++) {
        const indexOfExisting = tailVisitedBefore(
          [i, diagonalPosition[1]],
          whereTailHasBeen
        );
        if (indexOfExisting < 0) {
          whereTailHasBeen.unshift([i, diagonalPosition[1]]);
        } else {
          whereTailHasBeen.splice(indexOfExisting, 1);
          whereTailHasBeen.unshift([i, diagonalPosition[1]]);
        }
      }
    }
  }

  if (move[0] === 'D') {
    currentPosition[0] -= parseInt(move[1]);

    if (previousPosition[1] === currentPosition[1]) {
      for (let i = previousPosition[0] - 1; i > currentPosition[0]; i--) {
        const indexOfExisting = tailVisitedBefore(
          [i, previousPosition[1]],
          whereTailHasBeen
        );
        if (indexOfExisting < 0) {
          whereTailHasBeen.unshift([i, previousPosition[1]]);
        } else {
          whereTailHasBeen.splice(indexOfExisting, 1);
          whereTailHasBeen.unshift([i, previousPosition[1]]);
        }
      }
    } else if (!isTouching(currentPosition, previousPosition)) {
      const diagonalPosition =
        previousPosition[1] < currentPosition[1]
          ? [previousPosition[0] - 1, previousPosition[1] + 1]
          : [previousPosition[0] - 1, previousPosition[1] - 1];
      const indexOfExisting = tailVisitedBefore(
        diagonalPosition,
        whereTailHasBeen
      );
      if (indexOfExisting < 0) {
        whereTailHasBeen.unshift(diagonalPosition);
      } else {
        whereTailHasBeen.splice(indexOfExisting, 1);
        whereTailHasBeen.unshift(diagonalPosition);
      }
      for (let i = diagonalPosition[0] - 1; i > currentPosition[0]; i--) {
        const indexOfExisting = tailVisitedBefore(
          [i, diagonalPosition[1]],
          whereTailHasBeen
        );
        if (indexOfExisting < 0) {
          whereTailHasBeen.unshift([i, diagonalPosition[1]]);
        } else {
          whereTailHasBeen.splice(indexOfExisting, 1);
          whereTailHasBeen.unshift([i, diagonalPosition[1]]);
        }
      }
    }
  }
  return { currentPosition, whereTailHasBeen };
};

export const getAnswer1 = (
  moveQueue: string[][],
  whereTailHasBeen: number[][]
): number => {
  let position = startingPosition;
  const { currentPosition, whereTailHasBeen: tailPath } = makeMove(
    position,
    moveQueue[0],
    whereTailHasBeen
  );

  moveQueue.shift();
  position = currentPosition;
  whereTailHasBeen = tailPath;
  while (moveQueue.length > 0) {
    const nextMove = makeMove(position, moveQueue[0], whereTailHasBeen);
    moveQueue.shift();
    position = nextMove.currentPosition;
    whereTailHasBeen = nextMove.whereTailHasBeen;
  }
  return whereTailHasBeen.length;
};

// console.log(getAnswer1(motions, whereTailHasBeen));
