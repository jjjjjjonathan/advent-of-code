import { parseInput, splitData } from '../helpers';
import { describe, it, expect } from 'vitest';
import { findPoint, START, END } from './12';

const data = parseInput(__dirname, 'data/12-sample.txt');
const rows = splitData(data, 1).map((row) => row.split(''));

describe('setup', () => {
  it('finds the start', () => {
    const start = findPoint(rows, START);
    expect(start[0]).toBe(0);
    expect(start[1]).toBe(0);
  });

  it('finds the end', () => {
    const end = findPoint(rows, END);
    expect(end[0]).toBe(2);
    expect(end[1]).toBe(5);
  });
});
