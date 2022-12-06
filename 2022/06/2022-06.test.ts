import { parseInput } from '../../helpers';
import { describe, it, expect } from 'vitest';
import { findCorrectMarker } from './2022-06';

const data = parseInput(__dirname, 'sample.txt');
describe('part 1', () => {
  it('parses txt file into a string', () => {
    expect(data).toBeTypeOf('string');
  });

  it('gives the correct answer', () => {
    const answer = findCorrectMarker(data, 4, 4);
    expect(answer).toBe(7);
  });
});

describe('part 2', () => {
  it('gives the correct answer', () => {
    const answer2 = findCorrectMarker(data, 14, 14);
    expect(answer2).toBe(19);
  });
});
