/**
 * Returns the value of a given key, running the callback in case the key
 * isn't found.
 * @param map the map to look check they key in
 * @param key the name of the key.
 * @param callback the callback ran in case no key was not found.
 * @returns the value of found in the map.
 */
export function getOrSetSync<TKey, TValue>(map: Map<TKey, TValue>, key: TKey, callback: (key: TKey) => TValue): TValue {
  if (!map.has(key)) {
    const value = callback(key);
    map.set(key, value);
  }

  return map.get(key) as TValue;
}

/**
 * Returns the value of a given key, running the callback in case the key
 * isn't found.
 * @param map the map to look check they key in
 * @param key the name of the key.
 * @param callback the callback ran in case no key was not found.
 * @returns the value of found in the map.
 */
export async function getOrSet<TKey, TValue>(
  map: Map<TKey, TValue>,
  key: TKey,
  callback: (key: TKey) => Promise<TValue>
): Promise<TValue> {
  if (!map.has(key)) {
    const value = await callback(key);
    map.set(key, value);
  }
  return map.get(key) as TValue;
}
