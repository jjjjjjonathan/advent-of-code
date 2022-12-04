import fs from 'fs';
import path from 'path';

export const parseInput = (dirname: string): string => {
  return fs.readFileSync(path.join(dirname, 'input.txt'), {
    encoding: 'utf-8',
  });
};
