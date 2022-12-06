import { describe, expect, it } from 'vitest';
import { parseInput, splitData } from '../../helpers';
import {
  mapData,
  getMaxXY,
  buildGrid,
  isHorizontal,
  isVertical,
  labelVents,
  getAnswer,
  isDiagonal
} from './2021-05';

const data = parseInput(__dirname, 'sample.txt');
const rows = splitData(data, 1);
const mappedData = mapData(rows);
const [x, y] = getMaxXY([...mappedData]) as number[];
const grid = buildGrid(x, y);
const grid2 = buildGrid(x, y);

describe('part one', () => {
  const labelledVents = labelVents([...grid], [...mappedData]);
  const answer = getAnswer(labelledVents);

  it('is a double nested array', () => {
    expect(Array.isArray(mappedData)).toBe(true);
    expect(Array.isArray(mappedData[0])).toBe(true);
  });

  it('holds two sets of coordinates in the inner arrays', () => {
    expect(mappedData[0][0][0]).toBeTypeOf('string');
    expect(mappedData[0][0][1]).toBeTypeOf('string');
  });

  it('gives the max x and y coordinate', () => {
    expect(x).toBeTypeOf('number');
    expect(y).toBeTypeOf('number');
    expect(x).toBe(9);
    expect(y).toBe(9);
  });

  it('builds a grid with correct lengths', () => {
    expect(grid.length).toBe(10);
    expect(grid[0].length).toBe(10);
  });

  it('tells you when a vent goes horizontal or vertical', () => {
    const horizontalTrue = isHorizontal(mappedData[0]);
    const verticalTrue = isVertical(mappedData[3]);
    const horizontalFalse = isHorizontal(mappedData[3]);
    const verticalFalse = isVertical(mappedData[0]);
    const diagonal = isHorizontal(mappedData[1]);
    const diagonal2 = isVertical(mappedData[1]);

    expect(horizontalTrue).toBe(true);
    expect(verticalTrue).toBe(true);
    expect(diagonal).toBe(false);
    expect(diagonal2).toBe(false);
    expect(horizontalFalse).toBe(false);
    expect(verticalFalse).toBe(false);
  });

  it('labels vents on the grid', () => {
    expect(labelledVents[0].filter((vent) => vent === 1).length).toBe(1);
    expect(labelledVents[9].filter((vent) => vent === 2).length).toBe(3);
    expect(labelledVents[9].filter((vent) => vent === 1).length).toBe(3);
  });

  it('gives the correct answer', () => {
    expect(answer).toBe(5);
  });
});

describe('part two', () => {
  const labelledVents = labelVents([...grid2], [...mappedData], true);
  const answer2 = getAnswer(labelledVents);
  it('tells you when a vent goes diagonally', () => {
    const diagonalTrue = isDiagonal(mappedData[1]);
    const diagonalTrue2 = isDiagonal(mappedData[9]);
    const diagonalTrue3 = isDiagonal(mappedData[8]);
    const diagonalFalse = isDiagonal(mappedData[0]);
    expect(diagonalTrue).toBe(true);
    expect(diagonalFalse).toBe(false);
    expect(diagonalTrue2).toBe(true);
    expect(diagonalTrue3).toBe(true);
  });

  it('gives the correct answer', () => {
    expect(answer2).toBe(12);
  });
});
