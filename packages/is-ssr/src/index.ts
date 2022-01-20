export function isSSR() {
  return typeof globalThis.window?.document?.createElement === 'undefined';
}

export function isBrowser() {
  return !isSSR();
}

export function onSSR(callback: () => any, otherwise?: () => any) {
  return isSSR() ? callback() : otherwise?.();
}

export function onBrowser(callback: () => any, otherwise?: () => any) {
  return isBrowser() ? callback() : otherwise?.();
}
