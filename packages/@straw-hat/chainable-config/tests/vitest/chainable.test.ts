import { expect, describe, test, vi } from 'vitest';
import { Chainable } from '../../src/chainable';

test('validates if a value is a chainable object', () => {
  const chain = new Chainable(undefined);
  expect(Chainable.isChainable(chain)).toBeTruthy();
  expect(Chainable.isChainable('helloi')).toBeFalsy();
});

describe('Given a Chainable object', () => {
  describe('When calling .toConfig()', () => {
    test('Then throws an error', () => {
      expect(() => new Chainable(undefined).toConfig()).toThrow();
    });
  });

  describe('When calling .end()', () => {
    test('Then returns the parent object', () => {
      const parent = {};
      const chain = new Chainable(parent);
      expect(chain.end()).toBe(parent);
    });
  });

  describe('When calling .batch()', () => {
    test('Then calls the callback with the current object', () => {
      const callback = vi.fn();
      const chain = new Chainable(undefined);
      const context = chain.batch(callback);
      expect(callback).toBeCalledWith(chain);
      expect(context).toBe(chain);
    });
  });

  describe('When calling .when()', () => {
    describe('When the predicate is truthy', () => {
      test('Then calls the truthy callback', () => {
        const truthyCallback = vi.fn();
        const falsyCallback = vi.fn();
        const chain = new Chainable(undefined);
        const context = chain.when(true, truthyCallback, falsyCallback);
        expect(truthyCallback).toBeCalledWith(chain);
        expect(falsyCallback).toBeCalledTimes(0);
        expect(context).toBe(chain);
      });
      test('Then calls the default truthy callback ', () => {
        const chain = new Chainable(undefined);
        const context = chain.when(false);
        expect(context).toBe(chain);
      });
    });

    describe('When the predicate is falsy', () => {
      test('Then calls the falsy callback', () => {
        const truthyCallback = vi.fn();
        const falsyCallback = vi.fn();
        const chain = new Chainable(undefined);
        const context = chain.when(false, truthyCallback, falsyCallback);
        expect(falsyCallback).toBeCalledWith(chain);
        expect(truthyCallback).toBeCalledTimes(0);
        expect(context).toBe(chain);
      });

      test('Then calls the default falsy callback ', () => {
        const truthyCallback = vi.fn();
        const chain = new Chainable(undefined);
        const context = chain.when(false, truthyCallback);
        expect(truthyCallback).toBeCalledTimes(0);
        expect(context).toBe(chain);
      });
    });
  });
});
