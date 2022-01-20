/**
 * Reference: https://developer.mozilla.org/en-US/docs/Glossary/Primitive.
 */
export type Primitive = null | undefined | string | number | boolean | symbol | bigint;

/**
 * Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray
 */
export type TypedArray =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array;

export type EntryTuple<V, K = string> = [K, V];
