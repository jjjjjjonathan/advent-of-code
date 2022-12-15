import { parseInput, splitData } from '../../helpers';
import { describe, it, expect } from 'vitest';

const data = parseInput(__dirname, 'sample.txt');
const sensorReports = splitData(data, 1);

describe('setup', () => {
  it('parses input data and splits by line', () => {
    expect(Array.isArray(sensorReports)).toBeTruthy();
    expect(sensorReports[0]).toBeTypeOf('string');
  });
});
