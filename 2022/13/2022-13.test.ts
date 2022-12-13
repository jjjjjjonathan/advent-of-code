import { parseInput, splitData } from '../../helpers';
import { describe, it, expect } from 'vitest';

const data = parseInput(__dirname, 'sample.txt');
const pairs = splitData(data, 2).map((pair) => pair.split('\n'));

describe('setup', () => {
  it('splits the pairs into left and right', () => {
    pairs.forEach((pair) => {
      expect(pair.length).toBe(2);
    });
  });
});
