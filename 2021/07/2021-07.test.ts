import { parseInput } from '../../helpers';
import { describe, it, expect } from 'vitest';
import { getMedian, getAnswer1, getMean, getAnswer2 } from './2021-07';

const data = parseInput(__dirname, 'sample.txt');
const sortedCrabs = data
  .split(',')
  .map((crab) => parseInt(crab, 10))
  .sort((previousValue, currentValue) => previousValue - currentValue);

describe('setup', () => {
  it('parses input', () => {
    expect(data).toBeTypeOf('string');
    expect(Array.isArray(sortedCrabs)).toBe(true);
    expect(sortedCrabs[0]).toBeTypeOf('number');
  });
});

describe('first answer', () => {
  const median = getMedian(sortedCrabs);
  it('gets the correct median', () => {
    expect(median).toBe(2);
  });

  it('returns the correct answer for first part', () => {
    const answer = getAnswer1(sortedCrabs, median);
    expect(answer).toEqual(37);
  });
});

describe('second answer', () => {
  const mean = getMean(sortedCrabs);
  it('gets the correct mean', () => {
    expect(mean).toBe(4.9);
  });

  it('returns the correct answer for second part', () => {
    const answer = getAnswer2(sortedCrabs, mean);
    expect(answer).toBe(168);
  });
});
