import { parseInput } from '../../helpers';

const data = parseInput(__dirname, 'input.txt');

const splitData = data.split('\n');

const splitDirectionAndValue = splitData.map((command) => command.split(' '));

let depth = 0;
let horizontalPosition = 0;

for (const command of splitDirectionAndValue) {
  if (command[0] === 'up') {
    depth -= parseInt(command[1]);
  } else if (command[0] === 'down') {
    depth += parseInt(command[1]);
  } else {
    horizontalPosition += parseInt(command[1]);
  }
}

console.log('a: ', depth * horizontalPosition);

// part two

let depth2 = 0;
let aim = 0;
let horizontalPosition2 = 0;

for (const command of splitDirectionAndValue) {
  if (command[0] === 'up') {
    aim -= parseInt(command[1]);
  } else if (command[0] === 'down') {
    aim += parseInt(command[1]);
  } else {
    horizontalPosition2 += parseInt(command[1]);
    depth2 += aim * parseInt(command[1]);
  }
}

console.log('b: ', depth2 * horizontalPosition2);
