/**
 * Returns true if the execution context is a server-side context.
 */
export function isSSR() {
  return typeof globalThis.window?.document?.createElement === 'undefined';
}

/**
 * Returns true if the execution context is a browser context.
 */
export function isBrowser() {
  return !isSSR();
}

/**
 * Runs the callback if the execution context is a server-side context. Otherwise,
 * runs the {otherwise} second callback.
 * @param callback
 * @param otherwise
 *
 * @example
 * ```
 * onSSR(
 *   function ssrCallback() {
 *     console.log('💻 I am running on the server-side.');
 *   },
 *   function browserCallback() {
 *     console.log('I am running on the browser-side.');
 *   }
 * );
 * ```
 */
export function onSSR(callback: () => any, otherwise?: () => any) {
  return isSSR() ? callback() : otherwise?.();
}

/**
 * Runs the callback if the execution context is a browser context. Otherwise,
 * runs the {otherwise} second callback.
 * @param callback
 * @param otherwise
 *
 * @example
 * ```
 * onBrowser(
 *   function browserCallback() {
 *     console.log('I am running on the browser-side.');
 *   },
 *   function ssrCallback() {
 *     console.log('💻 I am running on the server-side.');
 *   }
 * );
 * ```
 */
export function onBrowser(callback: () => any, otherwise?: () => any) {
  return isBrowser() ? callback() : otherwise?.();
}
