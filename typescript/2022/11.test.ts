import { parseInput, splitData } from '../helpers';
import { describe, it, expect } from 'vitest';

const data = parseInput(__dirname, 'data/11-sample.txt');
const monkeys = splitData(data, 2);

describe('setup', () => {
  it('splits data into monkeys', () => {
    // console.log(monkeys[0]);
    expect(true).toBeTruthy();
  });
});
