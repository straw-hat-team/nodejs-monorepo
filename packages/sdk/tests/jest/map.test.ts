import { getOrSet, getOrSetSync } from '../../src/map';

describe('given a "getOrSetSync" function', () => {
  describe('when calling multiple times with the same key', () => {
    test('then sets the value and call the callback once', async () => {
      const cb = jest.fn(async () => 123);
      const map = new Map();

      await getOrSet(map, 'key', cb);
      await getOrSet(map, 'key', cb);

      await expect(getOrSet(map, 'key', cb)).resolves.toBe(123);
      expect(cb).toBeCalledTimes(1);
    });
  });
});

describe('given a "getOrSetSync" function', () => {
  describe('when calling multiple times with the same key', () => {
    test('then sets the value and call the callback once', () => {
      const cb = jest.fn(() => 123);
      const map = new Map();

      getOrSetSync(map, 'key', cb);
      getOrSetSync(map, 'key', cb);

      expect(getOrSetSync(map, 'key', cb)).toBe(123);
      expect(cb).toBeCalledTimes(1);
    });
  });
});
