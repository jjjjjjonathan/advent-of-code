import { parseInput } from '../../helpers';

const data = parseInput(__dirname, 'input.txt');

const splitData = data.split('\n\n');

const boards = splitData.slice(1, splitData.length);

const organizedBoards = boards.map((board) => board.split('\n'));

const mappedRows = organizedBoards.map((board) =>
  board.map((row) => row.split(' ').filter((value) => value.length > 0))
);

const drawnNumbers = splitData[0].split(',');

const findBingoWinner = (
  cards: string[][][],
  numbers: string[]
): string[][] | undefined => {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < cards.length; j++) {
      for (let k = 0; k < cards[j].length; k++) {
        const valueCheck = cards[j][k].indexOf(numbers[i]);

        if (valueCheck >= 0) {
          cards[j][k][valueCheck] = 'x';
        }
      }
    }

    if (i >= 4) {
      for (const card of cards) {
        let coordinates: number[][] = [];
        for (let i = 0; i < card.length; i++) {
          for (let j = 0; j < card[i].length; j++) {
            if (card[i][j] === 'x') {
              coordinates.push([i, j]);
            }
          }
        }
        console.log(coordinates);
      }
    }
  }
  return cards[0];
};

console.log(findBingoWinner(mappedRows, drawnNumbers));
