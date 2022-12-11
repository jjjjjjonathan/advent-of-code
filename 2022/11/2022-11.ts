import { parseInput, splitData } from '../../helpers';

const data = parseInput(__dirname, 'input.txt');
const monkeys = splitData(data, 2);
const numberRegex = /[^0-9,]/g;

type MonkeyTest = {
  true: number;
  false: number;
};

class Monkey {
  id: number;
  items: number[];
  inspected: number;
  currentItem: number | null;
  operation: string;
  testNumber: number;
  ifTrue: number;
  ifFalse: number;
  siblingMonkeys: Monkey[] | null;

  constructor(
    id: number,
    items: number[],
    operation: string,
    testNumber: number,
    ifTrue: number,
    ifFalse: number
  ) {
    this.id = id;
    this.items = items;
    this.inspected = 0;
    this.currentItem = null;
    this.operation = operation;
    this.testNumber = testNumber;
    this.ifTrue = ifTrue;
    this.ifFalse = ifFalse;
    this.siblingMonkeys = null;
  }

  inspectItem() {
    this.currentItem = this.items[0];
    this.items.shift();
    this.inspected += 1;
    this.currentItem = this.multiplyWorryLevel(this.currentItem);
    this.currentItem = Math.floor((this.currentItem as number) / 3);
    this.throwItem();
  }

  multiplyWorryLevel(old: number) {
    return eval(this.operation);
  }

  addSiblings(monkeyArray: Monkey[]) {
    const selfRemoved = monkeyArray.filter((monkey) => monkey.id !== this.id);
    this.siblingMonkeys = selfRemoved;
  }

  throwItem() {
    if ((this.currentItem as number) % this.testNumber === 0) {
      const monkeyToThrowTo = this.siblingMonkeys?.find(
        (monkey) => monkey.id === this.ifTrue
      );
      monkeyToThrowTo?.items.push(this.currentItem as number);
      this.currentItem = null;
    } else {
      const monkeyToThrowTo = this.siblingMonkeys?.find(
        (monkey) => monkey.id === this.ifFalse
      );
      monkeyToThrowTo?.items.push(this.currentItem as number);
      this.currentItem = null;
    }
  }
}

const getId = (line: string, regex: RegExp) => {
  return parseInt(line.replace(numberRegex, ''), 10);
};

const getStartingItems = (line: string, regex: RegExp) => {
  return line
    .replace(regex, '')
    .split(',')
    .map((item) => parseInt(item, 10));
};

const getOperation = (line: string) => {
  return line.replace('Operation: new = ', '');
};

const getTestNumber = (line: string) => {
  const testNum = line.replace('Test: divisible by ', '');
  return parseInt(testNum, 10);
};

const getMonkeysToThrowTo = (
  trueLine: string,
  falseLine: string
): MonkeyTest => {
  const trueMonkeyId = trueLine.replace('If true: throw to monkey ', '');
  const falseMonkeyId = falseLine.replace('If false: throw to monkey ', '');

  return {
    true: parseInt(trueMonkeyId, 10),
    false: parseInt(falseMonkeyId, 10),
  };
};

export const createMonkey = (monkeyNotes: string) => {
  const splitMonkeyNotes = monkeyNotes.split('\n').map((line) => line.trim());

  const id = getId(splitMonkeyNotes[0], numberRegex);
  const items = getStartingItems(splitMonkeyNotes[1], numberRegex);
  const operation = getOperation(splitMonkeyNotes[2]);
  const testNumber = getTestNumber(splitMonkeyNotes[3]);
  const monkeystoThrowTo = getMonkeysToThrowTo(
    splitMonkeyNotes[4],
    splitMonkeyNotes[5]
  );

  return new Monkey(
    id,
    items,
    operation,
    testNumber,
    monkeystoThrowTo.true,
    monkeystoThrowTo.false
  );
};

export const buildMonkeyArray = (monkeys: string[]) => {
  const monkeyArray: Monkey[] = [];

  monkeys.forEach((monkey) => monkeyArray.push(createMonkey(monkey)));

  monkeyArray.forEach((monkey) => monkey.addSiblings(monkeyArray));

  return monkeyArray;
};

const monkeyArray = buildMonkeyArray(monkeys);

let round = 0;

while (round < 20) {
  monkeyArray.forEach((monkey) => {
    while (monkey.items.length > 0) {
      monkey.inspectItem();
    }
  });
  round++;
}

monkeyArray.sort((a, b) => b.inspected - a.inspected);

console.log(monkeyArray[0].inspected * monkeyArray[1].inspected);
