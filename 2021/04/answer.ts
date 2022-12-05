import { parseInput } from '../../helpers';

const data = parseInput(__dirname, 'input.txt');

const splitData = data.split('\n\n');

const boards = splitData.slice(1, splitData.length);

const organizedBoards = boards.map((board) => board.split('\n'));

const mappedRows = organizedBoards.map((board) =>
  board.map((row) => row.split(' ').filter((value) => value.length > 0))
);

const drawnNumbers = splitData[0].split(',');

const checkWinner = (numbers: string[]): boolean => {
  return numbers.filter((value) => value === 'x').length === 5;
};

interface BingoWinner {
  card: string;
  winningNumber: string;
  index: number;
}

const findBingoWinner = (
  cards: string[][][],
  numbers: string[]
): BingoWinner[] | undefined => {
  const winners: BingoWinner[] = [];
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
      for (let h = 0; h < cards.length; h++) {
        const transposed: string[][] = new Array(cards[h][0].length);

        for (let k = 0; k < cards[h].length; k++) {
          let solved = false;
          if (
            checkWinner(cards[h][k]) &&
            winners.findIndex((element) => element.index === h) === -1
          ) {
            winners.push({
              card: JSON.stringify(cards[h]),
              winningNumber: numbers[i],
              index: h,
            });
          }
          for (let j = 0; j < cards[h][k].length; j++) {
            if (k === 0) {
              transposed[j] = [cards[h][k][j]];
            } else {
              transposed[j].push(cards[h][k][j]);
            }
          }

          transposed.forEach((column) => {
            if (checkWinner(column)) {
              solved = true;
            }
          });

          if (
            solved &&
            winners.findIndex((element) => element.index === h) === -1
          ) {
            winners.push({
              card: JSON.stringify(cards[h]),
              winningNumber: numbers[i],
              index: h,
            });
          }
        }
      }
    }
  }
  return winners;
};

const bingoWinners = findBingoWinner(mappedRows, drawnNumbers) as BingoWinner[];

const firstWinner = bingoWinners[0];

const lastWinner = bingoWinners[bingoWinners.length - 1];

const scoreWinner = (card: string[][], winningNumber: string): number => {
  const numbers = card.map((row) =>
    row.map((value) => parseInt(value)).filter((int) => !Number.isNaN(int))
  );

  let points = 0;
  numbers.forEach((row) => {
    row.forEach((value) => {
      points += value;
    });
  });

  return points * parseInt(winningNumber);
};

console.log(
  'a: ',
  scoreWinner(JSON.parse(firstWinner.card), firstWinner.winningNumber)
);

console.log(
  'b: ',
  scoreWinner(JSON.parse(lastWinner.card), lastWinner.winningNumber)
);
