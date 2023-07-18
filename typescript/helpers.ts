import fs from 'fs';
import path from 'path';

export const parseInput = (dirname: string, file: string): string => {
  return fs.readFileSync(path.join(dirname, file), {
    encoding: 'utf-8',
  });
};

export const splitData = (data: string, number: number): string[] => {
  let lineBreaks = '';
  let count = 0;

  while (count < number) {
    lineBreaks += '\n';
    count++;
  }

  return data.split(lineBreaks);
};
