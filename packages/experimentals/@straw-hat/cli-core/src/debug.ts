import debug from 'debug';

export function createDebugger(...scope: string[]) {
  const namespace = ['@straw-hat/cli'].concat(scope).join(':');
  return debug(namespace);
}
