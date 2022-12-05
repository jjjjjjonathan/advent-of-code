import { parseInput } from '../../helpers';

const data = parseInput(__dirname, 'input.txt');

const rounds = data.split('\n').map((round) => round.split(' '));

let points = 0;

rounds.forEach((round) => {
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

rounds.forEach((round) => {
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
