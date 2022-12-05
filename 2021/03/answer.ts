import { parseInput } from '../../helpers';

const data = parseInput(__dirname, 'input.txt');

const splitData = data.split('\n');

interface BitTracker {
  [key: string]: { '0': number; '1': number };
}

const bitTracker: BitTracker = <BitTracker>{};

for (let i = 0; i < splitData[0].length; i++) {
  bitTracker[i] = { '0': 0, '1': 0 };
}

for (let i = 0; i < splitData.length; i++) {
  for (let j = 0; j < splitData[i].length; j++) {
    const strIndex = splitData[i][j] as '1' | '0';
    bitTracker[j][strIndex] += 1;
  }
}

let gammaRate = '';
let epsilonRate = '';

for (const digit in bitTracker) {
  const zero = bitTracker[digit]['0'];
  const one = bitTracker[digit]['1'];

  if (Math.max(zero, one) === zero) {
    gammaRate += '0';
    epsilonRate += '1';
  } else {
    gammaRate += '1';
    epsilonRate += '0';
  }
}

console.log('a: ', parseInt(gammaRate, 2) * parseInt(epsilonRate, 2));

// part two

const oxygenGeneratorRating = (binaries: string[], index: number): number => {
  const values = {
    '0': 0,
    '1': 0,
  };

  for (let i = 0; i < binaries.length; i++) {
    const valueToCheck = binaries[i][index] as '0' | '1';

    values[valueToCheck] += 1;
  }

  if (values[1] >= values[0]) {
    binaries = binaries.filter((binary) => binary[index] === '1');
  } else {
    binaries = binaries.filter((binary) => binary[index] === '0');
  }

  if (binaries.length > 1 && index < 11) {
    return oxygenGeneratorRating(binaries, index + 1);
  } else {
    return parseInt(binaries[0], 2);
  }
};

const c02ScrubberRating = (binaries: string[], index: number): number => {
  const values = {
    '0': 0,
    '1': 0,
  };

  for (let i = 0; i < binaries.length; i++) {
    const valueToCheck = binaries[i][index] as '0' | '1';

    values[valueToCheck] += 1;
  }

  if (values[0] <= values[1]) {
    binaries = binaries.filter((binary) => binary[index] === '0');
  } else {
    binaries = binaries.filter((binary) => binary[index] === '1');
  }

  if (binaries.length > 1 && index < 11) {
    return c02ScrubberRating(binaries, index + 1);
  } else {
    return parseInt(binaries[0], 2);
  }
};

console.log(
  'b: ',
  c02ScrubberRating(splitData, 0) * oxygenGeneratorRating(splitData, 0)
);
