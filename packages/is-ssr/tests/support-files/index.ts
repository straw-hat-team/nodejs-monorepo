export function addBrowserContext(callback: Function) {
  globalThis.window = {
    document: {
      // @ts-ignore
      createElement() {},
    },
  };

  callback();

  // @ts-ignore
  delete globalThis.window;
}
