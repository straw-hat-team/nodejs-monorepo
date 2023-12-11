import { describe, expect, test, vi } from 'vitest';
import { getOrSet, getOrSetSync } from '../../src/map';

describe('given a "getOrSetSync" function', () => {
  describe('when calling multiple times with the same key', () => {
    test('then sets the value and call the callback once', async () => {
      // GIVEN
      const cb = vi.fn(async () => 123);
      const map = new Map();

      // WHEN
      await getOrSet(map, 'key', cb);
      await getOrSet(map, 'key', cb);
      const expected = await getOrSet(map, 'key', cb);

      // THEN
      expect(expected).toBe(123);
      expect(cb).toBeCalledTimes(1);
    });
  });
});

describe('given a "getOrSetSync" function', () => {
  describe('when calling multiple times with the same key', () => {
    test('then sets the value and call the callback once', () => {
      // GIVEN
      const cb = vi.fn(() => 123);
      const map = new Map();

      // WHEN
      getOrSetSync(map, 'key', cb);
      getOrSetSync(map, 'key', cb);
      const expected = getOrSetSync(map, 'key', cb);

      // THEN
      expect(expected).toBe(123);
      expect(cb).toBeCalledTimes(1);
    });
  });
});
