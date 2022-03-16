/**
 * Synchronous callback ran when the key was not found in the map.
 */
export type GetOrSetCallbackSync<K, V> = (key: K) => V;

/**
 * Asynchronous callback ran when the key was not found in the map.
 */
export type GetOrSetCallback<K, V> = (key: K) => Promise<V>;

/**
 * An extension class for native Map.
 */
export class FancyMap<K, V> extends Map<K, V> {
  /**
   * Returns the value of a given key, running a the callback in case the key
   * isn't found.
   * @param key the name of the key.
   * @param callback the callback ran in case no key was not found.
   * @returns the value of found in the map.
   */
  getOrSetSync(key: K, callback: GetOrSetCallbackSync<K, V>): V {
    if (!this.has(key)) {
      const value = callback(key);
      this.set(key, value);
    }
    return this.get(key) as V;
  }

  /**
   * Returns the value of a given key, running a the callback in case the key
   * isn't found.
   * @param key the name of the key.
   * @param callback the callback ran in case no key was not found.
   * @returns the value of found in the map.
   */
  async getOrSet(key: K, callback: GetOrSetCallback<K, V>): Promise<V> {
    if (!this.has(key)) {
      const value = await callback(key);
      this.set(key, value);
    }
    return this.get(key) as V;
  }
}
