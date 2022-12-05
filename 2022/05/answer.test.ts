import { describe, expect, it } from 'vitest';
import { parseInput } from '../../helpers';

const data = parseInput(__dirname, 'sample.txt');

describe('setup', () => {
  it('parses the input text file', () => {
    expect(data).toBeTypeOf('string');
  });
});

describe('answer', () => {
  const answer = 'CMX';
  it('should be a string', () => {
    expect(answer).toBeTypeOf('string');
    expect(answer).toBe('CMZ');
  });
});
