import fs from 'fs';
import path from 'path';

export const parseInput = (dirname: string, file: string): string => {
  return fs.readFileSync(path.join(dirname, file), {
    encoding: 'utf-8',
  });
};
