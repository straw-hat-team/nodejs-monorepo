import { deleteAsync } from 'del';
import { makeDirectory } from 'make-dir';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { createDebugger, formatCode } from './helpers.js';

export class Dir {
  protected debug = createDebugger('dir');
  readonly path: string;

  constructor(thePath: string) {
    this.path = thePath;
  }

  async resetDir() {
    await this.createDir('.');
    await this.emptyDir('.');
  }

  emptyDir(...pathsSegments: string[]) {
    const dirPath = this.resolve(...pathsSegments);
    this.debug(`Removing directory content of ${dirPath}`);
    return deleteAsync(`${dirPath}/**`);
  }

  resolve(...pathsSegments: string[]) {
    return path.resolve(this.path, ...pathsSegments);
  }

  resolveDir(...pathsSegments: string[]) {
    return path.dirname(this.resolve(...pathsSegments));
  }

  createDir(...pathsSegments: string[]) {
    const dirPath = this.resolve(...pathsSegments);
    this.debug(`Ensure directory ${dirPath}`);
    return makeDirectory(dirPath);
  }

  readFile(relativePath: string) {
    const filePath = this.resolve(relativePath);
    return fs.readFile(filePath, { encoding: 'utf-8' });
  }

  async formatFile(relativePath: string) {
    const text = await this.readFile(relativePath);
    const formatted = await formatCode(text);
    return this.writeFile(relativePath, formatted);
  }

  writeFile(relativePath: string, data: string) {
    const filePath = this.resolve(relativePath);
    this.debug(`Writing to ${filePath}`);
    return fs.writeFile(filePath, data);
  }

  appendFile(relativePath: string, data: string) {
    const filePath = this.resolve(relativePath);
    this.debug(`Appending to ${filePath}`);
    return fs.appendFile(filePath, data);
  }

  async *walkFiles(relativePath: string): AsyncIterableIterator<string> {
    const dirPath = this.resolve(relativePath);
    for await (const d of await fs.opendir(dirPath)) {
      const entry = path.join(dirPath, d.name);
      if (d.isDirectory()) yield* this.walkFiles(entry);
      else if (d.isFile()) yield entry;
    }
  }

  async prependFile(relativePath: string, data: string) {
    const filePath = this.resolve(relativePath);
    const fileData = await this.readFile(relativePath);
    this.debug(`Prepending to ${filePath}`);
    return fs.writeFile(filePath, Buffer.concat([Buffer.from(data), Buffer.from(fileData)]));
  }
}
