import { parseInput, splitData } from '../../helpers';

const data = parseInput(__dirname, 'sample.txt');
const pairs = splitData(data, 2).map((pair) => pair.split('\n'));

console.log(pairs);
