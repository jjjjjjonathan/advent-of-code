import { parseInput } from '../helpers';

const data = parseInput(__dirname, 'data/06-input.txt');

const startOfPacketIndex = 4;
const startOfPacketCharacters = 4;
const messagesIndex = 14;
const messagesCharacters = 14;

export const findCorrectMarker = (
  data: string,
  endingIndex: number,
  numOfCharacters: number
): number => {
  const markerToCheck = data
    .slice(endingIndex - numOfCharacters, endingIndex)
    .split('');

  const setToCompare = Array.from(new Set(markerToCheck));

  if (markerToCheck.length === setToCompare.length) {
    return endingIndex;
  }
  return findCorrectMarker(data, endingIndex + 1, numOfCharacters);
};

console.log(
  'a',
  findCorrectMarker(data, startOfPacketIndex, startOfPacketCharacters)
);

console.log('b', findCorrectMarker(data, messagesIndex, messagesCharacters));
