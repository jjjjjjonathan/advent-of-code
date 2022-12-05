import { parseInput, splitData } from '../../helpers';

const data = parseInput(__dirname, 'input.txt');
const [drawing, moves] = splitData(data, 2);

export const organizeDrawing = (drawing: string) => {
  const rows = splitData(drawing, 1);
  rows.pop();

  return rows.map((row) => {
    let temp: string[] = [];
    for (let i = 1; i < row.length; i += 4) {
      temp.push(row[i]);
    }
    return temp;
  });
};

console.log(organizeDrawing(drawing));
