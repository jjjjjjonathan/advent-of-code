import { parseInput, splitData } from '../../helpers';
import { describe, it, expect } from 'vitest';
import { compareNumbers } from './2022-13';

const data = parseInput(__dirname, 'sample.txt');
const pairs = splitData(data, 2).map((pair) => pair.split('\n').map((element) => JSON.parse(element)));

describe('setup', () => {
  it('splits the pairs into left and right', () => {
    pairs.forEach((pair) => {
      expect(pair.length).toBe(2);
    });
  });
  it('parses the string as JSON into an array', () => {
    pairs.forEach((pair) => {
      expect(Array.isArray(pair[0])).toBeTruthy();
      expect(Array.isArray(pair[1])).toBeTruthy();
    })
  })
});

describe('first part', () => {
  it('returns whether values compared are true or not', () => {
    const leftPair1 = pairs[0][0]
    const rightPair1 = pairs[0][1];

    const answer1 = compareNumbers(leftPair1[0], rightPair1[0])
    expect(answer1).toBe(0)
    const answer2 = compareNumbers(leftPair1[1], rightPair1[1])
    expect(answer2).toBe(0)
    const answer3 = compareNumbers(leftPair1[2], rightPair1[2])
    expect(answer3).toBe(1)

  })
})
