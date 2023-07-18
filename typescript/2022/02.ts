import { parseInput, splitData } from '../helpers';

const data = parseInput(__dirname, 'data/02-input.txt');
const rounds = splitData(data, 1);

const splitRounds = rounds.map((round) => round.split(' '));

let points = 0;

splitRounds.forEach((round) => {
  if (round[1] === 'X') points += 1;
  if (round[1] === 'Y') points += 2;
  if (round[1] === 'Z') points += 3;

  // wins
  if (
    (round[0] === 'A' && round[1] === 'Y') ||
    (round[0] === 'B' && round[1] === 'Z') ||
    (round[0] === 'C' && round[1] === 'X')
  )
    points += 6;

  // draws

  if (
    (round[0] === 'A' && round[1] === 'X') ||
    (round[0] === 'B' && round[1] === 'Y') ||
    (round[0] === 'C' && round[1] === 'Z')
  )
    points += 3;
});

console.log('a: ', points);

// second part

let realPoints = 0;

splitRounds.forEach((round) => {
  if (round[1] === 'Y') {
    realPoints += 3;
    if (round[0] === 'A') realPoints += 1;
    if (round[0] === 'B') realPoints += 2;
    if (round[0] === 'C') realPoints += 3;
  } else if (round[1] === 'Z') {
    realPoints += 6;
    if (round[0] === 'A') realPoints += 2;
    if (round[0] === 'B') realPoints += 3;
    if (round[0] === 'C') realPoints += 1;
  } else {
    if (round[0] === 'A') realPoints += 3;
    if (round[0] === 'B') realPoints += 1;
    if (round[0] === 'C') realPoints += 2;
  }
});

console.log('b: ', realPoints);
