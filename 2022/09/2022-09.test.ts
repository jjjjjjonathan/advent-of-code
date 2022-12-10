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
    const firstMove = makeMove(motions[0], [...whereTailHasBeen]);
    expect(firstMove.currentPosition[0]).toBe(0);
    expect(firstMove.currentPosition[1]).toBe(4);
    expect(firstMove.whereTailHasBeen[0][0]).toBe(0);
    expect(firstMove.whereTailHasBeen[0][1]).toBe(3);
  });

  it('makes a move to left, and stays in same row as tail', () => {
    const thirdMove = makeMove(motions[2], [...whereTailHasBeen]);
    expect(thirdMove.currentPosition[0]).toBe(0);
    expect(thirdMove.currentPosition[1]).toBe(-3);
    expect(thirdMove.whereTailHasBeen[0][0]).toBe(0);
    expect(thirdMove.whereTailHasBeen[0][1]).toBe(-2);
  });

  it('makes a move up, and stays in same column as tail', () => {
    const secondMove = makeMove(motions[1], [...whereTailHasBeen]);
    expect(secondMove.currentPosition[0]).toBe(4);
    expect(secondMove.currentPosition[1]).toBe(0);
    expect(secondMove.whereTailHasBeen[0][0]).toBe(3);
    expect(secondMove.whereTailHasBeen[0][1]).toBe(0);
  });

  it('makes a move down, and stays in same column as tail', () => {
    const fourthMove = makeMove(motions[3], [...whereTailHasBeen]);
    expect(fourthMove.currentPosition[0]).toBe(-1);
    expect(fourthMove.currentPosition[1]).toBe(0);
    expect(fourthMove.whereTailHasBeen[0][0]).toBe(0);
    expect(fourthMove.whereTailHasBeen[0][1]).toBe(0);
    console.log(fourthMove.whereTailHasBeen);
  });
});

describe('first part', () => {
  it('gives the correct answer', () => {
    const answer = getAnswer1();
    expect(answer).toBe(13);
  });
});
