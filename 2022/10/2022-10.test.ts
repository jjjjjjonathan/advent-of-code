import { parseInput, splitData } from '../../helpers';
import { describe, it, expect } from 'vitest';
import { getSignalStrength } from './2022-10';

const data = parseInput(__dirname, 'sample.txt');
const program = splitData(data, 1);
const cyclesToCheck = [20, 60, 100, 140, 180, 220];

describe('setup', () => {
  it('parses data into array of strings', () => {
    expect(program).toBeTypeOf('object');
    expect(Array.isArray(program)).toBe(true);
    expect(program[0]).toBeTypeOf('string');
  });
});

describe('first part', () => {
  it('gives the correct answer', () => {
    const answer = getSignalStrength(cyclesToCheck, program);
    expect(answer).toBe(13140);
  });
});
