import { parseInput, splitData } from '../../helpers';
import { describe, it, expect } from 'vitest';

const data = parseInput(__dirname, 'sample.txt');
const monkeys = splitData(data, 2);

describe('setup', () => {
  it('splits data into monkeys', () => {
    // console.log(monkeys[0]);
    expect(true).toBeTruthy();
  });
});
