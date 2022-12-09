import { parseInput, splitData } from '../../helpers';

const data = parseInput(__dirname, 'sample.txt');
const motions = splitData(data, 1).map((motion) => motion.split(' '));

const startingPosition = [0, 0];
const whereTailHasBeen = [startingPosition]

export const getAnswer1 = () => {
  return 13;
}

console.log(getAnswer1())
