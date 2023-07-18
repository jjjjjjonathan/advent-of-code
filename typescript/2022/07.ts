import { parseInput, splitData } from '../helpers';

const data = parseInput(__dirname, 'data/07-input.txt');

const terminalOutput = splitData(data, 1);

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

  getDirectorySize(): number {
    let count = 0;
    this.files.forEach((file) => {
      count += file.size;
    });

    this.childDirectories.forEach((directory) => {
      count += directory.getDirectorySize();
    });

    return count;
  }

  goToRoot(): Directory {
    return this.parentDirectory === null
      ? this
      : this.parentDirectory.goToRoot();
  }
}

export class File {
  name: string;
  size: number;

  constructor(name: string, size: string) {
    this.name = name;
    this.size = parseInt(size, 10);
  }
}

export const buildDataTree = (data: string[]) => {
  const regex = /(\$ )/;
  const fileRegex = /[1234567890]/;
  let currentDirectory: Directory | undefined;

  if (data[0].replace(regex, '') === 'cd /') {
    currentDirectory = new Directory('/');
  }

  data.shift();

  data.forEach((command) => {
    // create directories and add to children
    if (command.startsWith('dir ')) {
      const newDirectoryName = command.substring(4);
      const newDirectory = new Directory(newDirectoryName);
      currentDirectory?.addChild(newDirectory);
      newDirectory.parentDirectory = currentDirectory as Directory;
    }

    // create files and link to current directory
    if (fileRegex.test(command)) {
      const [size, name] = command.split(' ');
      currentDirectory?.addFile(new File(name, size));
    }

    // switch directories
    if (command.startsWith('$ cd')) {
      const directoryToGo = command.split(' ')[2];

      if (directoryToGo === '..') {
        currentDirectory = currentDirectory?.parentDirectory as Directory;
      } else {
        currentDirectory = currentDirectory?.childDirectories.find(
          (dir) => dir.name === directoryToGo
        );
      }
    }
  });

  return currentDirectory?.goToRoot() as Directory;
};

const root = buildDataTree(terminalOutput);

export const getAnswer1 = (queue: Directory[], sum: number = 0): number => {
  const node = queue[0];
  const directorySize = node.getDirectorySize();
  if (directorySize <= 100000) sum += directorySize;
  queue = queue.concat(node.childDirectories);

  queue.shift();

  if (queue.length > 0) {
    return getAnswer1(queue, sum);
  }
  return sum;
};

console.log(getAnswer1([root]));

export const getAnswer2 = (
  queue: Directory[],
  minimumDirectorySize: number = Infinity,
  rootSize: number | undefined = undefined
): number => {
  const node = queue[0];
  const directorySize = node.getDirectorySize();
  const TOTAL_DISK_SPACE = 70000000;
  const DISK_SPACE_NEEDED = 30000000;

  if (rootSize === undefined) {
    rootSize = node.getDirectorySize();
  }

  const USED_SPACE = TOTAL_DISK_SPACE - rootSize;
  const REMAINING_NEEDED_SPACE = DISK_SPACE_NEEDED - USED_SPACE;

  if (directorySize >= REMAINING_NEEDED_SPACE) {
    minimumDirectorySize = Math.min(minimumDirectorySize, directorySize);
  }

  queue = queue.concat(node.childDirectories);
  queue.shift();
  if (queue.length > 0) {
    return getAnswer2(queue, minimumDirectorySize, rootSize);
  }
  return minimumDirectorySize;
};

console.log(getAnswer2([root]));
