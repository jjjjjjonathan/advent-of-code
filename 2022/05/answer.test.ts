import { describe, expect, it } from 'vitest';
import { parseInput, splitData } from '../../helpers';
import { organizeDrawing, organizeMoves, getAnswer, makeMoves } from './answer';

const data = parseInput(__dirname, 'sample.txt');
const [drawing, moves] = splitData(data, 2);
const coordinates = organizeDrawing(drawing);
const steps = organizeMoves(moves);

describe('setup', () => {
  it('parses the input text file', () => {
    expect(data).toBeTypeOf('string');
    expect(drawing.includes('[D]')).toBe(true);
    expect(moves.includes('move 1 from 2 to 1')).toBe(true);
  });

  it('organizes drawing into rows', () => {
    const coordinates = organizeDrawing(drawing);
    expect(Array.isArray(coordinates[0])).toBe(true);
    expect(coordinates[0][0]).toBe('Z');
    expect(coordinates[1][0]).toBe('M');
    expect(coordinates[2][0]).toBe('P');
    expect(coordinates[0].includes(' ')).toBe(false);
  });

  it('leaves only numbers for moves', () => {
    const steps = organizeMoves(moves);
    expect(Array.isArray(steps[0])).toBe(true);
    expect(steps[0][0]).toBe(1);
    expect(steps[0][1]).toBe(1);
    expect(steps[0][2]).toBe(0);
  });
});

describe('answer', () => {
  const answer = getAnswer(makeMoves(coordinates, steps) as string[][]);
  it('should be a string', () => {
    expect(answer).toBeTypeOf('string');
    expect(answer).toBe('CMZ');
  });
});
