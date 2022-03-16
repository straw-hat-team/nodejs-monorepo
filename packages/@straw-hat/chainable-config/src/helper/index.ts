import { stringify } from 'javascript-stringify';

export function shouldShortenFunction(value: any, verbose: boolean) {
  return typeof value === 'function' && !verbose && value.toString().length > 100;
}

export function toString(config: any, options?: { verbose?: boolean }) {
  const verbose = options?.verbose ?? false;
  const output = stringify(config, (value, spaces, next) => {
    if (shouldShortenFunction(value, verbose)) {
      const funcName = value.name ?? 'anonymous';
      return spaces + `function ${funcName}() { /* omitted long function */ }`;
    }
    return spaces + next(value);
  });
  return output ?? '';
}
