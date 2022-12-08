import { parseInput, splitData } from '../../helpers';

const data = parseInput(__dirname, 'input.txt');
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

export const listVisibleTrees = (
  data: number[][],
  columns: boolean = false
) => {
  let treeList: number[][] = [];
  for (let y = 0; y < data.length; y++) {
    const rowFromLeft = getVisibleTreesInRow(data[y]);

    const rowFromRight = getVisibleTreesInRow([...data[y]].reverse(), true);

    const row = mergeLeftRight(rowFromLeft, rowFromRight).map((x) =>
      columns ? [y, x] : [x, y]
    );

    treeList = treeList.concat(row);
  }
  return treeList;
};

export const transpose = (matrix: number[][]): number[][] => {
  let newArray: number[][] = [];

  for (let i = 0; i < matrix[0].length; i++) {
    newArray.push([]);
  }

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      newArray[j].push(matrix[i][j]);
    }
  }
  return newArray;
};

const columns = transpose(treeRows);

const visibleInRows = listVisibleTrees(treeRows);
const visibleInColumns = listVisibleTrees(columns, true);

export const getAnswer1 = (
  rowTrees: number[][],
  columnTrees: number[][]
): number => {
  const totalTrees = [...rowTrees];
  columnTrees.forEach((tree) => {
    if (
      totalTrees.find(
        (totalTree: number[]) =>
          totalTree[0] === tree[0] && totalTree[1] === tree[1]
      ) === undefined
    ) {
      totalTrees.push(tree);
    }
  });
  return totalTrees.length;
};

console.log(getAnswer1(visibleInRows, visibleInColumns));
