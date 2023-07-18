import { parseInput, splitData } from '../helpers';

const data = parseInput(__dirname, 'data/05-input.txt');
const [drawing, moves] = splitData(data, 2);

export const organizeDrawing = (drawing: string): string[][] => {
  const rows = splitData(drawing, 1);
  rows.pop();

  const coordinates = rows.map((row) => {
    let temp: string[] = [];
    for (let i = 1; i < row.length; i += 4) {
      temp.push(row[i]);
    }
    return temp;
  });

  const transposed: string[][] = new Array(coordinates.length);

  for (let i = coordinates.length - 1; i >= 0; i--) {
    for (let j = 0; j < coordinates[i].length; j++) {
      if (i === coordinates.length - 1) {
        transposed[j] = [coordinates[i][j]];
      } else if (coordinates[i][j] !== ' ') {
        transposed[j].push(coordinates[i][j]);
      }
    }
  }

  return transposed;
};

export const organizeMoves = (moves: string): number[][] => {
  const rows = splitData(moves, 1);

  const steps = rows.map((row) => {
    const wordsRemoved = row.replace(/[A-Za-z]/gi, '');
    return wordsRemoved
      .split(' ')
      .filter((element) => element.length > 0)
      .map((number, index) =>
        index === 0 ? parseInt(number) : parseInt(number) - 1
      );
  });
  return steps;
};

const transposedDrawing = organizeDrawing(drawing);
const moveQueue = organizeMoves(moves);

const makeStep = (
  drawing: string[][],
  count: number,
  prevLocation: number,
  newLocation: number
): string[][] | undefined => {
  const crate: string | undefined = drawing[prevLocation].pop();

  drawing[newLocation].push(crate as string);

  count--;

  if (count > 0) {
    return makeStep(drawing, count, prevLocation, newLocation);
  } else {
    return drawing;
  }
};

export const makeMoves = (
  drawing: string[][],
  queue: number[][]
): string[][] | undefined => {
  const [count, prevLocation, newLocation] = queue[0];

  const completeStep = makeStep(drawing, count, prevLocation, newLocation);

  queue.shift();

  if (queue.length > 0) {
    return makeMoves(completeStep as string[][], queue);
  } else {
    return completeStep;
  }
};

export const getAnswer = (drawing: string[][]): string => {
  let stringAnswer = '';
  for (let i = 0; i < drawing.length; i++) {
    stringAnswer += drawing[i][drawing[i].length - 1];
  }

  return stringAnswer;
};

console.log(
  'a: ',
  getAnswer(makeMoves(transposedDrawing, moveQueue) as string[][])
);

// part two

const transposedDrawing2 = organizeDrawing(drawing);
const moveQueue2 = organizeMoves(moves);

export const makeMoves9001 = (
  drawing: string[][],
  queue: number[][]
): string[][] | undefined => {
  const [count, prevLocation, newLocation] = queue[0];

  // grab crates

  const cratesToMove: string[] = [];
  let step = 0;
  while (step < count) {
    const crate: string | undefined = drawing[prevLocation].pop();
    cratesToMove.unshift(crate as string);
    step++;
  }

  // move crates to new location
  for (const crate of cratesToMove) {
    drawing[newLocation].push(crate);
  }

  queue.shift();

  if (queue.length > 0) {
    return makeMoves9001(drawing, queue);
  } else {
    return drawing;
  }
};

console.log(
  'b: ',
  getAnswer(makeMoves9001(transposedDrawing2, moveQueue2) as string[][])
);
