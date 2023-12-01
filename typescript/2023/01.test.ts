import { parseInput, splitData } from '../helpers';
import { describe, it, expect } from 'vitest';

const data = parseInput(__dirname, 'data/01-a-sample.txt');
const calibrationValues = splitData(data, 1);
const secondData = parseInput(__dirname, 'data/01-b-sample.txt');
const secondCalibrationValues = splitData(secondData, 1);

import { getAnswer } from './01';

describe('part one', () => {
  it('gives the correct answer', () => {
    const answer = getAnswer(calibrationValues, false);
    expect(answer).toBe(142);
  });
});

describe('part two', () => {
  it('gives the correct answer', () => {
    const answer = getAnswer(secondCalibrationValues, true);
    expect(answer).toBe(281);
  });
});
