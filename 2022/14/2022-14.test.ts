import { parseInput, splitData } from '../../helpers';
import { describe, it, expect } from 'vitest';

const data = parseInput(__dirname, 'sample.txt');
const lines = splitData(data, 1);

describe('setup', () => {
  it('splits data into lines', () => {
    expect(Array.isArray(lines)).toBeTruthy();
    expect(lines[0]).toBeTypeOf('string');
  });
});
