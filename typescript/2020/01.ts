import { parseInput, splitData } from '../helpers';

const data = parseInput(__dirname, 'data/01-input.txt');

const expenseReport = splitData(data, 1).map((item) => parseInt(item, 10));

const solvePartOne = () => {
  return findSumWithTwoPointer(sortExpenseReport(expenseReport), 2020);
};

const solvePartTwo = () => {
  return findSumWithThreePointer(sortExpenseReport(expenseReport), 2020);
};

console.log(solvePartTwo());

function sortExpenseReport(expenseReport: number[]) {
  return expenseReport.sort((a, b) => a - b);
}

function findSumWithTwoPointer(
  sortedExpenseReport: number[],
  sumToFind: number
) {
  let left = 0;
  let right = sortedExpenseReport.length - 1;
  while (left < right) {
    if (sortedExpenseReport[left] + sortedExpenseReport[right] === sumToFind) {
      return sortedExpenseReport[left] * sortedExpenseReport[right];
    } else if (
      sortedExpenseReport[left] + sortedExpenseReport[right] <
      sumToFind
    ) {
      left++;
    } else {
      right--;
    }
  }
  return sortedExpenseReport[left] * sortedExpenseReport[right];
}

function findSumWithThreePointer(
  sortedExpenseReport: number[],
  sumToFind: number
) {
  for (let i = 0; i < sortedExpenseReport.length; i++) {
    let l = i + 1;
    let r = sortedExpenseReport.length - 1;

    while (l < r) {
      if (
        sortedExpenseReport[i] +
          sortedExpenseReport[l] +
          sortedExpenseReport[r] ===
        sumToFind
      ) {
        return (
          sortedExpenseReport[i] *
          sortedExpenseReport[l] *
          sortedExpenseReport[r]
        );
      } else if (
        sortedExpenseReport[i] +
          sortedExpenseReport[l] +
          sortedExpenseReport[r] <
        sumToFind
      ) {
        l++;
      } else {
        r--;
      }
    }
  }
}
