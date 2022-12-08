import { parseInput, splitData } from '../../helpers';
import { describe, it, expect } from 'vitest';
import {
  findTallTreeLocation,
  getVisibleTreesInRow,
  mergeLeftRight,
  transpose,
  listVisibleTrees,
  getAnswer1,
  getAnswer2,
  findLeftBlockingDistance,
  findRightBlockingDistance,
  findVerticalBlockingDistance,
} from './2022-08';

const data = parseInput(__dirname, 'sample.txt');
const treeRows = splitData(data, 1).map((row) => {
  return row.split('').map((treeHeight) => parseInt(treeHeight, 10));
});
const treeColumns = transpose(treeRows);

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
    const visibleTreesReverse = getVisibleTreesInRow(
      [...treeRows[0]].reverse(),
      true
    );
    const rowZero = Array.from(
      new Set(visibleTrees.concat(visibleTreesReverse))
    );
    expect(rowZero.length).toBe(3);
    expect(Array.isArray(visibleTrees)).toBe(true);
    expect(visibleTrees[0]).toBe(3);
    expect(visibleTrees[1]).toBe(0);
    const visibleTrees3 = getVisibleTreesInRow(treeRows[3]);
    expect(visibleTrees3[0]).toBe(4);
    expect(visibleTrees3[1]).toBe(2);
    expect(visibleTrees3[2]).toBe(0);
    expect(visibleTrees3.length).toBe(3);
    const visibleTrees3reverse = getVisibleTreesInRow(
      [...treeRows[3]].reverse(),
      true
    );

    expect(visibleTrees3reverse[0]).toBe(4);
    expect(visibleTrees3reverse.length).toBe(1);
    const rowThree = mergeLeftRight(visibleTrees3, visibleTrees3reverse);
    expect(rowThree.length).toBe(3);

    const visibleTrees4 = getVisibleTreesInRow(treeRows[4]);
    const visibleTrees4reverse = getVisibleTreesInRow(
      [...treeRows[4]].reverse(),
      true
    );
    expect(visibleTrees4.length).toBe(3);
    expect(visibleTrees4reverse.length).toBe(2);
    const rowFour = mergeLeftRight(visibleTrees4, visibleTrees4reverse);
    expect(rowFour.length).toBe(4);
  });
});

describe('part one', () => {
  it('gives the correct answer', () => {
    const visibleInRows = listVisibleTrees(treeRows);
    const visibleInColumns = listVisibleTrees(treeColumns, true);
    const answer = getAnswer1(visibleInRows, visibleInColumns);
    expect(answer).toBe(21);
  });
});

describe('part two', () => {
  it('finds the correct blocking distance from the left horizontally', () => {
    const leftBlockingDistance = findLeftBlockingDistance(treeRows[1], 2);
    expect(leftBlockingDistance).toBe(1);
    const rightBlockingDistance = findRightBlockingDistance(treeRows[1], 2);
    expect(rightBlockingDistance).toBe(2);
    const upperBlockingDistance = findVerticalBlockingDistance(
      treeRows,
      2,
      1,
      true
    );
    expect(upperBlockingDistance).toBe(1);
    const lowerBlockingDistance = findVerticalBlockingDistance(treeRows, 2, 1);
    expect(lowerBlockingDistance).toBe(2);

    const leftBlockingDistance2 = findLeftBlockingDistance(treeRows[3], 2);
    expect(leftBlockingDistance2).toBe(2);
    const rightBlockingDistance2 = findRightBlockingDistance(treeRows[3], 2);
    expect(rightBlockingDistance2).toBe(2);
    const upperBlockingDistance2 = findVerticalBlockingDistance(
      treeRows,
      2,
      3,
      true
    );
    expect(upperBlockingDistance2).toBe(2);
    const lowerBlockingDistance2 = findVerticalBlockingDistance(treeRows, 2, 3);
    expect(lowerBlockingDistance2).toBe(1);

    const leftBlockingDistance3 = findLeftBlockingDistance(treeRows[1], 1);
    expect(leftBlockingDistance3).toBe(1);
    const rightBlockingDistance3 = findRightBlockingDistance(treeRows[1], 1);
    expect(rightBlockingDistance3).toBe(1);
    const upperBlockingDistance3 = findVerticalBlockingDistance(
      treeRows,
      1,
      1,
      true
    );
    expect(upperBlockingDistance3).toBe(1);
    const lowerBlockingDistance3 = findVerticalBlockingDistance(treeRows, 1, 1);
    expect(lowerBlockingDistance3).toBe(1);

    const leftBlockingDistance4 = findLeftBlockingDistance(treeRows[1], 3);
    expect(leftBlockingDistance4).toBe(1);
  });
  it('gives the correct answer', () => {
    const answer = getAnswer2(treeRows);
    expect(answer).toBe(8);
  });
});
