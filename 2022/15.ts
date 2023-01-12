import { parseInput, splitData } from '../helpers';

const data = parseInput(__dirname, 'data/15-sample.txt');
const sensorReports = splitData(data, 1);
