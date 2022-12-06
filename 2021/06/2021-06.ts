import { parseInput } from '../../helpers';

const data = parseInput(__dirname, 'input.txt');

export const fishTimer = (data: string) =>
  data.split(',').map((fishAge) => parseInt(fishAge, 10));

const fishAges = fishTimer(data);

export const produceNewFish = (days: number, data: number[]): number => {
  const counts = Array(9).fill(0);
  data.forEach((n) => (counts[n] += 1));

  for (let i = 0; i < days; i++) {
    const newCount = counts.shift();
    counts[6] += newCount;
    counts.push(newCount);
  }

  return counts.reduce((count, total) => count + total);
};

console.log(produceNewFish(256, fishAges));
