import { parseInput, splitData } from '../../helpers';

const data = parseInput(__dirname, 'sample.txt');
const sensorReports = splitData(data, 1);
