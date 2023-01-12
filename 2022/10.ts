import { parseInput, splitData } from '../helpers';

const data = parseInput(__dirname, 'data/10-input.txt');
const program = splitData(data, 1);
const cyclesToCheck = [20, 60, 100, 140, 180, 220];

export const getSignalStrength = (
  cyclesToCheck: number[],
  program: string[]
): number => {
  const values: number[] = [];
  const lastCycleToCheck = cyclesToCheck[cyclesToCheck.length - 1];
  let cycle = 1;
  let i = 0;
  let x = 1;
  while (cycle <= lastCycleToCheck) {
    if (program[i] === 'noop') {
      cycle += 1;
      if (cyclesToCheck.includes(cycle)) {
        values.push(cycle * x);
      }
      if (cycle === lastCycleToCheck) {
        break;
      }
    } else {
      const step = program[i].split(' ');

      cycle += 1;

      if (cyclesToCheck.includes(cycle)) {
        values.push(cycle * x);
      }
      if (cycle === lastCycleToCheck) {
        break;
      }

      x += parseInt(step[1], 10);

      cycle += 1;

      if (cyclesToCheck.includes(cycle)) {
        values.push(cycle * x);
      }
      if (cycle === lastCycleToCheck) {
        break;
      }
    }
    i++;
  }
  return values.reduce(
    (previousValue, currentValue) => previousValue + currentValue
  );
};

// console.log(getSignalStrength(cyclesToCheck, program))

const drawImage = (program: string[]) => {
  let cycle = 0;
  let x = 1;
  let crt = '';
  let multiplier = 0;

  for (let i = 0; i < program.length; i++) {
    if (program[i] === 'noop') {
      cycle += 1;
      if ([x, x - 1, x + 1].includes(cycle - 40 * multiplier)) {
        crt += '#';
      } else {
        crt += '.';
      }

      if (cycle % 40 === 0) {
        crt += '\n';
        multiplier += 1;
      }
    } else {
      const step = program[i].split(' ');
      const xToAdd = parseInt(step[1], 10);

      cycle += 1;
      if ([x, x - 1, x + 1].includes(cycle - 40 * multiplier)) {
        crt += '#';
      } else {
        crt += '.';
      }

      if (cycle % 40 === 0) {
        crt += '\n';
        multiplier += 1;
      }

      cycle += 1;
      x += xToAdd;

      if ([x, x - 1, x + 1].includes(cycle - 40 * multiplier)) {
        crt += '#';
      } else {
        crt += '.';
      }

      if (cycle % 40 === 0) {
        crt += '\n';
        multiplier += 1;
      }
    }
  }
  return crt;
};

console.log(drawImage(program));
