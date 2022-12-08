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
  visibleTrees: number[] = []
): number[] => {
  const tallestTree = findTallTreeLocation(row);
  visibleTrees.push(tallestTree);

  if (tallestTree === 0) {
    return visibleTrees;
  } else {
    return getVisibleTreesInRow(row.slice(0, tallestTree), visibleTrees);
  }
};
