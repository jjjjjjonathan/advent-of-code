import { parseInput } from '../../helpers';
import { describe, it, expect } from 'vitest';
import { fishTimer, produceNewFish } from './2021-06';

const data = parseInput(__dirname, 'sample.txt');
const fishAges = fishTimer(data);

describe('first part', () => {
  it('parses data into a string', () => {
    expect(data).toBeTypeOf('string');
  });
  it('converts data into array of numbers', () => {
    expect(Array.isArray(fishAges)).toBe(true);
    expect(fishAges.filter((age) => typeof age !== 'number').length).toBe(0);
  });
  it('gives the correct answer', () => {
    const answer = produceNewFish(80, fishAges);
    expect(answer).toBe(5934);
  });
});

describe('second part', () => {
  it('gives the correct answer', () => {
    const answer = produceNewFish(256, fishAges);
    expect(answer).toBe(26984457539);
  });
});
