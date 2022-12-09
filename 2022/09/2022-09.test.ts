import { parseInput, splitData } from '../../helpers';
import { describe, it, expect } from 'vitest';
import { getAnswer1} from './2022-09'

const data = parseInput(__dirname, 'sample.txt');
const motions = splitData(data, 1).map((motion) => motion.split(' '));
describe('setup', () => {
  it('gives a string and a string-number for direction and number of steps', () => {
    expect(motions[0][0]).toBeTypeOf('string');
    expect(motions[0][0]).toBe('R');
    expect(motions[0][1]).toBeTypeOf('string');
    expect(motions[0][1]).toBe('4');
  });
});

describe('first part', () => {
  it('gives the correct answer', () =>{
    const answer = getAnswer1();
    expect(answer).toBe(13)
  })
})
