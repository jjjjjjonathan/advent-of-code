import { parseInput, splitData } from '../../helpers';

const data = parseInput(__dirname, 'sample.txt');

const terminalOutput = splitData(data, 1);

console.log(terminalOutput);

export class Directory {
  name: string;
  parentDirectory: Directory | null;
  childDirectories: Directory[];
  files: File[];

  constructor(name: string) {
    this.name = name;
    this.parentDirectory = null;
    this.childDirectories = [];
    this.files = [];
  }

  labelParent(directory: Directory) {
    this.parentDirectory = directory;
  }

  addChild(directory: Directory) {
    this.childDirectories.push(directory);
  }

  addFile(file: File) {
    this.files.push(file);
  }
}

export class File {
  name: string;
  size: number;

  constructor(name: string, size: number) {
    this.name = name;
    this.size = size;
  }
}
