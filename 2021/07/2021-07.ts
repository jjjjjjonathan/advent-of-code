import { parseInput } from '../../helpers';

const data = parseInput(__dirname, 'input.txt');

const sortedCrabs = data
  .split(',')
  .map((crab) => parseInt(crab, 10))
  .sort((previousValue, currentValue) => previousValue - currentValue);

export const getMedian = (crabs: number[]): number => {
  const middleIndex = crabs.length / 2;

  const floor = Math.floor(middleIndex);
  const ceiling = Math.ceil(middleIndex);

  return (crabs[floor] + crabs[ceiling]) / 2;
};

const median = getMedian(sortedCrabs);

export const getAnswer1 = (crabs: number[], median: number): number => {
  const fuelNeededPerCrab = crabs.map((position) =>
    Math.abs(median - position)
  );
  return fuelNeededPerCrab.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );
};

export const getMean = (crabs: number[]): number => {
  return (
    crabs.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    ) / crabs.length
  );
};

const mean = getMean(sortedCrabs);

export const getAnswer2 = (crabs: number[], mean: number): number => {
  const reducer = (previousValue: number, currentValue: number) =>
    previousValue + currentValue;
  const floor = crabs.map((position) => {
    const stepsNeeded = Math.abs(Math.floor(mean) - position);
    return (stepsNeeded * (stepsNeeded + 1)) / 2;
  });

  const ceiling = crabs.map((position) => {
    const stepsNeeded = Math.abs(Math.ceil(mean) - position);
    return (stepsNeeded * (stepsNeeded + 1)) / 2;
  });
  return Math.min(floor.reduce(reducer, 0), ceiling.reduce(reducer, 0));
};

console.log(getAnswer1(sortedCrabs, median));
console.log(getAnswer2(sortedCrabs, mean));
