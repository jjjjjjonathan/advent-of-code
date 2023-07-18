import { parseInput, splitData } from '../helpers';
import { describe, it, expect } from 'vitest';

const data = parseInput(__dirname, 'data/01-sample.txt');
const elves = splitData(data, 2);

describe('setup', () => {
  it('parses txt file', () => {
    expect(Array.isArray(elves)).toBeTruthy();
    expect(elves[0]).toBeTypeOf('string');
  });
});
