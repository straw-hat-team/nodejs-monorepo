import { describe, expect, test, vi } from 'vitest';
import { FancyMap } from '../../src';

describe('getOrSetSync', () => {
  test('sets the value properly', async () => {
    const cb = vi.fn(async () => 123);
    const map = new FancyMap();

    expect(map.getOrSet('key', cb)).resolves.toBe(123);
    expect(cb).toBeCalledWith('key');
  });

  test('sets the value once', async () => {
    const cb = vi.fn(async () => 123);
    const map = new FancyMap();

    await map.getOrSet('key', cb);
    await map.getOrSet('key', cb);

    expect(cb).toBeCalledTimes(1);
  });
});

describe('getOrSetSync', () => {
  test('sets the value properly', () => {
    const cb = vi.fn(() => 123);
    const map = new FancyMap();

    expect(map.getOrSetSync('key', cb)).toBe(123);
    expect(cb).toBeCalledWith('key');
  });

  test('sets the value once', () => {
    const cb = vi.fn(() => 123);
    const map = new FancyMap();

    map.getOrSetSync('key', cb);
    map.getOrSetSync('key', cb);

    expect(cb).toBeCalledTimes(1);
  });
});
