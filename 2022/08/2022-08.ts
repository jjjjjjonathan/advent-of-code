import { parseInput, splitData } from '../../helpers';

const data = parseInput(__dirname, 'sample.txt');
const treeRows = splitData(data, 1).map((row) => {
  return row.split('').map((treeHeight) => parseInt(treeHeight, 10));
});

export const findTallTreeLocation = (row: number[]): number => {
  return row.indexOf(Math.max(...row));
};

export const getVisibleTreesInRow = (
  row: number[],
  fromRight: boolean = false,
  visibleTrees: number[] = [],
  originalLength: number = row.length
): number[] => {
  const tallestTree = findTallTreeLocation(row);

  visibleTrees.push(
    fromRight ? Math.abs(tallestTree - (originalLength - 1)) : tallestTree
  );

  if (tallestTree === 0) {
    return visibleTrees;
  } else {
    return getVisibleTreesInRow(
      row.slice(0, tallestTree),
      fromRight,
      visibleTrees,
      originalLength
    );
  }
};

export const mergeLeftRight = (
  rowFromLeft: number[],
  rowFromRight: number[]
): number[] => {
  return Array.from(new Set(rowFromLeft.concat(rowFromRight)));
};
