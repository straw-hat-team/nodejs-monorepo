export function isSSR() {
  return typeof globalThis.window?.document?.createElement === 'undefined';
}

export function isBrowser() {
  return !isSSR();
}

export function onSSR(callback: Function, otherwise?: Function) {
  return isSSR() ? callback() : otherwise?.();
}

export function onBrowser(callback: Function, otherwise?: Function) {
  return isBrowser() ? callback() : otherwise?.();
}
