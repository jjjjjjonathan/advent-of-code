import { describe, expect, it } from 'vitest';
import { parseInput, splitData } from '../helpers';
import { pairElves, countFullContains, countOverlaps } from './04';

const data = parseInput(__dirname, 'data/04-sample.txt');
const organizedData = splitData(data, 1);
const pairedElves = pairElves(organizedData);

describe('data organization', () => {
  it('organizes elves into pairs with min and max floor', () => {
    expect(pairedElves[0][0][0]).toBe('2');
    expect(pairedElves[0][0][1]).toBe('4');
  });
});

describe('first part answer', () => {
  const answer = countFullContains(pairedElves, 0);
  it('returns a number', () => {
    expect(Number.isInteger(answer)).toBe(true);
  });
  it('returns the correct answer', () => {
    expect(answer).toBe(2);
  });
});

describe('second part answer', () => {
  const answer = countOverlaps(pairedElves, 0);
  it('returns a number', () => {
    expect(Number.isInteger(4)).toBe(true);
  });
  it('returns the correct answer', () => {
    expect(answer).toBe(4);
  });
});
