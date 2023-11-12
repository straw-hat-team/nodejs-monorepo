import * as path from 'path';

export function resolveOwn(relativePath: string) {
  return path.join(__dirname, '..', relativePath);
}
