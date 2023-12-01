import { parseInput, splitData } from '../helpers';

const data = parseInput(__dirname, 'data/01-input.txt');
const calibrationValues = splitData(data, 1);
const numbersOnlyFirstInstance = /(1|2|3|4|5|6|7|8|9)/;
const numbersOnlyLastInstance = /(1|2|3|4|5|6|7|8|9)(?!.*(1|2|3|4|5|6|7|8|9))/;
const withWordsFirstInstance =
  /(1|2|3|4|5|6|7|8|9|one|two|three|four|five|six|seven|eight|nine)/;
const withWordsLastInstance =
  /(1|2|3|4|5|6|7|8|9|one|two|three|four|five|six|seven|eight|nine)(?!.*(1|2|3|4|5|6|7|8|9|one|two|three|four|five|six|seven|eight|nine))/;

export const getDigits = (value: string, withWordsAsNumbers: boolean) => {
  let firstDigit = '';
  let lastDigit = '';
  if (withWordsAsNumbers) {
    const firstDigitArr = value.match(withWordsFirstInstance);
    const lastDigitArr = value.match(withWordsLastInstance);
    if (firstDigitArr) {
      if (firstDigitArr[0].length > 1) {
        firstDigit = replaceWordsWithNumbers(firstDigitArr[0]);
      } else {
        firstDigit = firstDigitArr[0];
      }
    }
    if (lastDigitArr) {
      if (lastDigitArr[0].length > 1) {
        lastDigit = replaceWordsWithNumbers(lastDigitArr[0]);
      } else {
        lastDigit = lastDigitArr[0];
      }
    }
  } else {
    const firstDigitArr = value.match(numbersOnlyFirstInstance);
    const lastDigitArr = value.match(numbersOnlyLastInstance);
    if (firstDigitArr) firstDigit = firstDigitArr[0];
    if (lastDigitArr) lastDigit = lastDigitArr[0];
  }

  return parseInt(`${firstDigit}${lastDigit}`, 10);
};

export const calculateTotalValues = (values: number[]) => {
  return values.reduce((a, b) => a + b);
};

export const getAnswer = (
  values: string[],
  replaceWordsWithNumbers: boolean
) => {
  const mappedValues = values.map((value) =>
    getDigits(value, replaceWordsWithNumbers)
  );
  console.log(values);
  console.log(mappedValues);
  return calculateTotalValues(mappedValues);
};

console.log('first answer', getAnswer(calibrationValues, false));

export const replaceWordsWithNumbers = (value: string) => {
  if (value === 'one') return '1';
  if (value === 'two') return '2';
  if (value === 'three') return '3';
  if (value === 'four') return '4';
  if (value === 'five') return '5';
  if (value === 'six') return '6';
  if (value === 'seven') return '7';
  if (value === 'eight') return '8';
  if (value === 'nine') return '9';
  return '';
};

console.log('second answer', getAnswer(calibrationValues, true));
