import { parseInput, splitData } from '../../helpers';
const data = parseInput(__dirname, 'input.txt');
const rows = splitData(data, 1);

export const mapData = (data: string[]): string[][][] =>
  data.map((row) =>
    row.split(' -> ').map((coordinates) => coordinates.split(','))
  );

const mappedData = mapData(rows);
const mappedData2 = mapData(rows);

export const getMaxXY = (
  data: string[][][],
  x = 0,
  y = 0
): number[] | undefined => {
  x = Math.max(x, parseInt(data[0][0][0]), parseInt(data[0][1][0]));

  y = Math.max(y, parseInt(data[0][0][1]), parseInt(data[0][1][1]));

  data.shift();

  if (data.length === 0) {
    return [x, y];
  }

  return getMaxXY(data, x, y);
};

export const buildGrid = (x: number, y: number): number[][] => {
  const grid = Array.apply(null, Array(x + 1)).map((row: unknown) =>
    Array.apply(null, Array(x + 1)).map((content: unknown) => {
      return 0;
    })
  );

  return grid;
};

const [x, y] = getMaxXY([...mappedData]) as number[];
const grid = buildGrid(x, y);
const grid2 = buildGrid(x, y);

export const isHorizontal = (ventCoordinates: string[][]): boolean => {
  return ventCoordinates[0][1] === ventCoordinates[1][1];
};

export const isVertical = (ventCoordinates: string[][]): boolean => {
  return ventCoordinates[0][0] === ventCoordinates[1][0];
};

export const isDiagonal = (ventCoodrinates: string[][]): boolean => {
  const x1 = parseInt(ventCoodrinates[0][0]);
  const y1 = parseInt(ventCoodrinates[0][1]);
  const x2 = parseInt(ventCoodrinates[1][0]);
  const y2 = parseInt(ventCoodrinates[1][1]);

  return Math.abs(x1 - x2) === Math.abs(y1 - y2);
};

export const labelVents = (
  grid: number[][],
  data: string[][][],
  withDiagonals: boolean = false
): number[][] => {
  if (isHorizontal(data[0])) {
    const y = parseInt(data[0][0][1]);
    const x1 = parseInt(data[0][0][0]);
    const x2 = parseInt(data[0][1][0]);
    const xMin = Math.min(x1, x2);
    const xMax = Math.max(x1, x2);
    for (let x = xMin; x <= xMax; x++) {
      grid[y][x] += 1;
    }
  }

  if (isVertical(data[0])) {
    const x = parseInt(data[0][0][0]);
    const y1 = parseInt(data[0][0][1]);
    const y2 = parseInt(data[0][1][1]);
    const yMin = Math.min(y1, y2);
    const yMax = Math.max(y1, y2);
    for (let y = yMin; y <= yMax; y++) {
      grid[y][x] += 1;
    }
  }
  if (withDiagonals && isDiagonal(data[0])) {
    const x1 = parseInt(data[0][0][0]);
    const y1 = parseInt(data[0][0][1]);
    const x2 = parseInt(data[0][1][0]);
    const y2 = parseInt(data[0][1][1]);

    let x = x1;
    let y = y1;

    while (x1 < x2 ? x <= x2 : x >= x2) {
      grid[y][x] += 1;
      x1 < x2 ? x++ : x--;
      y1 < y2 ? y++ : y--;
    }
  }

  data.shift();
  if (data.length > 0) {
    return labelVents(grid, data, withDiagonals);
  }
  return grid;
};

export const getAnswer = (grid: number[][]): number => {
  let points = 0;
  grid.forEach((row) => {
    points += row.filter((value) => value >= 2).length;
  });
  return points;
};

const answer1 = getAnswer(labelVents([...grid], [...mappedData]));
const answer2 = getAnswer(labelVents([...grid2], [...mappedData2], true));

console.log('a: ', answer1);
console.log('b: ', answer2);
