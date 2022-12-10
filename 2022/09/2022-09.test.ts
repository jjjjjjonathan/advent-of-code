import { parseInput, splitData } from '../../helpers';
import { describe, it, expect } from 'vitest';
import { getAnswer1, makeMove } from './2022-09';

const data = parseInput(__dirname, 'sample.txt');
const motions = splitData(data, 1).map((motion) => motion.split(' '));
const startingPosition = [0, 0];
const whereTailHasBeen = [startingPosition];

describe('setup', () => {
  it('gives a string and a string-number for direction and number of steps', () => {
    expect(motions[0][0]).toBeTypeOf('string');
    expect(motions[0][0]).toBe('R');
    expect(motions[0][1]).toBeTypeOf('string');
    expect(motions[0][1]).toBe('4');
  });

  it('makes a move to right, and stays in same row as tail', () => {
    const firstMove = makeMove([...startingPosition], motions[0], [
      ...whereTailHasBeen,
    ]);

    expect(firstMove.currentPosition[0]).toBe(0);
    expect(firstMove.currentPosition[1]).toBe(4);
    expect(firstMove.whereTailHasBeen[0][0]).toBe(0);
    expect(firstMove.whereTailHasBeen[0][1]).toBe(3);
  });

  it('makes a move to left, and stays in same row as tail', () => {
    const thirdMove = makeMove([...startingPosition], motions[2], [
      ...whereTailHasBeen,
    ]);
    expect(thirdMove.currentPosition[0]).toBe(0);
    expect(thirdMove.currentPosition[1]).toBe(-3);
    expect(thirdMove.whereTailHasBeen[0][0]).toBe(0);
    expect(thirdMove.whereTailHasBeen[0][1]).toBe(-2);
  });

  it('makes a move up, and stays in same column as tail', () => {
    const secondMove = makeMove([...startingPosition], motions[1], [
      ...whereTailHasBeen,
    ]);
    expect(secondMove.currentPosition[0]).toBe(4);
    expect(secondMove.currentPosition[1]).toBe(0);
    expect(secondMove.whereTailHasBeen[0][0]).toBe(3);
    expect(secondMove.whereTailHasBeen[0][1]).toBe(0);
  });

  it('makes a move down, and stays in same column as tail', () => {
    const fourthMove = makeMove([...startingPosition], motions[3], [
      ...whereTailHasBeen,
    ]);
    expect(fourthMove.currentPosition[0]).toBe(-1);
    expect(fourthMove.currentPosition[1]).toBe(0);
    expect(fourthMove.whereTailHasBeen[0][0]).toBe(0);
    expect(fourthMove.whereTailHasBeen[0][1]).toBe(0);
  });

  it('does not add to whereTailHasBeen if the location already exists in the array', () => {
    const moveR = makeMove([...startingPosition], motions[0], [
      [0, 0],
      [0, 1],
    ]);
    expect(moveR.whereTailHasBeen.length).toBe(4);

    const moveL = makeMove([...startingPosition], motions[2], [
      [0, 0],
      [0, -1],
    ]);
    expect(moveL.whereTailHasBeen.length).toBe(3);

    const moveU = makeMove([...startingPosition], motions[1], [
      [0, 0],
      [1, 0],
      [2, 0],
    ]);
    expect(moveU.whereTailHasBeen.length).toBe(4);

    const moveD = makeMove(
      [...startingPosition],
      ['D', '4'],
      [
        [0, 0],
        [-1, 0],
      ]
    );
    expect(moveD.whereTailHasBeen.length).toBe(4);
  });

  it('can move tail diagonally when going up', () => {
    const moveUR = makeMove([0, 4], motions[1], [
      [0, 3],
      [1, 4],
    ]);
    expect(moveUR.whereTailHasBeen.length).toBe(4);
    const moveUL = makeMove([0, 2], motions[1], [
      [0, 3],
      [1, 2],
    ]);
    expect(moveUL.whereTailHasBeen.length).toBe(4);
  });

  it('can move tail diagonally when moving down', () => {
    const moveDR = makeMove([4, 1], ['D', '4'], [[4, 0]]);
    expect(moveDR.whereTailHasBeen.length).toBe(4);
    const moveDL = makeMove([4, 4], ['D', '4'], [[4, 5]]);
    expect(moveDL.whereTailHasBeen.length).toBe(4);
    expect(moveDL.whereTailHasBeen[2][0]).toBe(3);
    expect(moveDL.whereTailHasBeen[2][1]).toBe(4);
  });
});

describe('first part', () => {
  it('gives the correct answer', () => {
    const answer = getAnswer1();
    expect(answer).toBe(13);
  });
});
