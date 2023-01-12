import { parseInput, splitData } from '../helpers';

const data = parseInput(__dirname, 'data/08-input.txt');
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

// part two

export const findLeftBlockingDistance = (
  row: number[],
  index: number
): number => {
  const rowToCheck = row.slice(0, index);
  const checkReversed = [...rowToCheck].reverse();
  const lastBlockingTree = checkReversed.findIndex(
    (treeHeight) => treeHeight >= row[index]
  );
  if (lastBlockingTree < 0) {
    return rowToCheck.length;
  } else {
    return lastBlockingTree + 1;
  }
};

export const findRightBlockingDistance = (row: number[], index: number) => {
  const rowToCheck = row.slice(index + 1);
  const firstBlockingTree = rowToCheck.findIndex(
    (treeHeight) => treeHeight >= row[index]
  );
  if (firstBlockingTree < 0) {
    return rowToCheck.length;
  } else {
    return firstBlockingTree + 1;
  }
};

export const findVerticalBlockingDistance = (
  trees: number[][],
  xIndex: number,
  yIndex: number,
  checkUpper: boolean = false
) => {
  const column: number[] = [];

  for (let y = 0; y < trees.length; y++) {
    column.push(trees[y][xIndex]);
  }

  if (checkUpper) {
    return findLeftBlockingDistance(column, yIndex);
  } else {
    return findRightBlockingDistance(column, yIndex);
  }
};

export const getAnswer2 = (treeRows: number[][]): number => {
  let scenicScore = 0;

  for (let i = 1; i < treeRows.length - 1; i++) {
    for (let j = 1; j < treeRows[0].length - 1; j++) {
      const left = findLeftBlockingDistance(treeRows[i], j);
      const right = findRightBlockingDistance(treeRows[i], j);
      const upper = findVerticalBlockingDistance(treeRows, j, i, true);
      const lower = findVerticalBlockingDistance(treeRows, j, i);
      let newScenicScore = left * right * upper * lower;
      if (newScenicScore > scenicScore) {
        scenicScore = newScenicScore;
      }
    }
  }
  return scenicScore;
};

console.log(getAnswer2(treeRows));
