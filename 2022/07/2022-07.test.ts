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
});
