import { parseInput, splitData } from '../../helpers';
import { describe, it, expect } from 'vitest';
import { Directory, File } from './2022-07';

const data = parseInput(__dirname, 'sample.txt');
const terminalOutput = splitData(data, 1);

describe('setup', () => {
  it('parses input into array of strings', () => {
    expect(Array.isArray(terminalOutput)).toBe(true);
    expect(terminalOutput[0]).toBeTypeOf('string');
  });

  it('creates directories', () => {
    const testRoot = new Directory('/');
    expect(testRoot.name).toBe('/');
    expect(testRoot.parentDirectory).toBe(null);
    expect(Array.isArray(testRoot.childDirectories)).toBe(true);
    expect(Array.isArray(testRoot.files)).toBe(true);
  });

  it('creates files', () => {
    const testFile = new File('test name', 500);
    expect(testFile.name).toBe('test name');
    expect(testFile.size).toBe(500);
  });

  it('labels parent and adds child directories', () => {
    const parent = new Directory('the parent');
    const child = new Directory('the child');
    parent.addChild(child);
    child.labelParent(parent);

    expect(parent.parentDirectory).toBe(null);
    expect(child.parentDirectory).toBe(parent);
    expect(parent.childDirectories.length).toBe(1);
    expect(parent.childDirectories[0]).toBe(child);
    expect(parent.childDirectories[0].name).toBe('the child');
    expect(child.parentDirectory?.name).toBe('the parent');
    expect(parent.parentDirectory?.name).toBe(undefined);
  });

  it('calculates directory size', () => {
    const dir = new Directory('directory');
    const file1 = new File('file1', 1111);
    const file2 = new File('file2', 1111);

    dir.addFile(file1);
    dir.addFile(file2);

    expect(dir.getDirectorySize()).toBe(2222);
  });

  it('calculates directory sizes with nested directories', () => {
    const parentDir = new Directory('parent directory');
    const file1 = new File('file1', 1111);
    const file2 = new File('file2', 1111);
    const childDir = new Directory('child directory');
    const file3 = new File('file1', 1111);
    const file4 = new File('file2', 1111);

    parentDir.addFile(file1);
    parentDir.addFile(file2);
    childDir.addFile(file3);
    childDir.addFile(file4);

    childDir.labelParent(parentDir);
    parentDir.addChild(childDir);

    expect(parentDir.getDirectorySize()).toBe(4444);
    expect(childDir.getDirectorySize()).toBe(2222);
  });
});
