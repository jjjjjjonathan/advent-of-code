import { parseInput, splitData } from '../../helpers';
import { describe, it, expect } from 'vitest';
import { findTallTreeLocation, getVisibleTreesInRow } from './2022-08';

const data = parseInput(__dirname, 'sample.txt');
const treeRows = splitData(data, 1).map((row) => {
  return row.split('').map((treeHeight) => parseInt(treeHeight, 10));
});

describe('setup', () => {
  it('parses input into an array of array of numbers', () => {
    expect(Array.isArray(treeRows)).toBe(true);
    expect(Array.isArray(treeRows[0])).toBe(true);
    expect(treeRows[0][0]).toBeTypeOf('number');
  });

  it('finds index of tallest tree in a row', () => {
    const tallTreeIndex = findTallTreeLocation(treeRows[0]);
    const reverseTallTreeIndex = findTallTreeLocation(
      [...treeRows[0]].reverse()
    );
    expect(tallTreeIndex).toBe(3);
    expect(reverseTallTreeIndex).toBe(1);
  });

  it('returns array of visible trees in a row', () => {
    const visibleTrees = getVisibleTreesInRow(treeRows[0]);
    expect(Array.isArray(visibleTrees)).toBe(true);
    expect(visibleTrees[0]).toBe(3);
    expect(visibleTrees[1]).toBe(0);
    const visibleTrees3 = getVisibleTreesInRow(treeRows[3]);
    expect(visibleTrees3[0]).toBe(4);
    expect(visibleTrees3[1]).toBe(2);
    expect(visibleTrees3[2]).toBe(0);
    expect(visibleTrees3.length).toBe(3);
    const visibleTrees3reverse = getVisibleTreesInRow(
      [...treeRows[3]].reverse()
    );
    expect(visibleTrees3reverse[0]).toBe(0);
    expect(visibleTrees3reverse.length).toBe(1);
  });
});
