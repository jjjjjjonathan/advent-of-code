const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf-8' });

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
  ) points += 6;

  // draws

  if (
    (round[0] === 'A' && round[1] === 'X') ||
    (round[0] === 'B' && round[1] === 'Y') ||
    (round[0] === 'C' && round[1] === 'Z')
  ) points += 3;
});

console.log(points);