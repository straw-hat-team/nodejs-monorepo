export function withMockedWindow(callback: Function) {
  globalThis.window = {
    document: {
      // @ts-ignore
      createElement() {},
    },
  };

  const result = callback();

  // @ts-ignore
  delete globalThis.window;

  return result;
}
