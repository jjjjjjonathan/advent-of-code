import { parseInput, splitData } from '../../helpers'

const data = parseInput(__dirname, 'input.txt')
const program = splitData(data, 1)
const cyclesToCheck = [20, 60, 100, 140, 180, 220];

export const getSignalStrength = (cyclesToCheck: number[], program: string[]): number => {
  const values: number[] = [];
  const lastCycleToCheck = cyclesToCheck[cyclesToCheck.length - 1]
  let cycle = 1;
  let i = 0;
  let x = 1;
  while (cycle <= lastCycleToCheck) {
    if (program[i] === 'noop') {
      cycle += 1;
      if (cyclesToCheck.includes(cycle)) {
        values.push(cycle * x)
      }
      if (cycle === lastCycleToCheck) {
        break;
      }
    } else {

      const step = program[i].split(' ')

      cycle += 1;

      if (cyclesToCheck.includes(cycle)) {
        values.push(cycle * x)
      }
      if (cycle === lastCycleToCheck) {
        break;
      }

      x += parseInt(step[1], 10);

      cycle += 1

      if (cyclesToCheck.includes(cycle)) {
        values.push(cycle * x)
      }
      if (cycle === lastCycleToCheck) {
        break;
      }

    }
    i++;
  }
  return values.reduce((previousValue, currentValue) => previousValue + currentValue)
}

console.log(getSignalStrength(cyclesToCheck, program)) 