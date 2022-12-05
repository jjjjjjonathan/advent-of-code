import { describe, expect, it } from 'vitest';
import { parseInput, splitData } from '../../helpers';
import { organizeDrawing } from './answer';

const data = parseInput(__dirname, 'sample.txt');
const [drawing, moves] = splitData(data, 2);

describe('setup', () => {
  it('parses the input text file', () => {
    expect(data).toBeTypeOf('string');
    expect(drawing.includes('[D]')).toBe(true);
    expect(moves.includes('move 1 from 2 to 1')).toBe(true);
  });

  it('organizes drawing into rows', () => {
    const coordinates = organizeDrawing(drawing);
    expect(Array.isArray(coordinates[0])).toBe(true);
    expect(coordinates[0][0]).toBe(' ');
    expect(coordinates[0][1]).toBe('D');
    expect(coordinates[0][2]).toBe(' ');
  });
});

describe('answer', () => {
  const answer = 'CMZ';
  it('should be a string', () => {
    expect(answer).toBeTypeOf('string');
    expect(answer).toBe('CMZ');
  });
});
