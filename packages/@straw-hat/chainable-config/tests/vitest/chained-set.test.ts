import { describe, expect, test } from 'vitest';
import { ChainedSet } from '../../src/chained-set';

describe('Given a ChainedSet object', () => {
  describe('When calling .add()', () => {
    test('Then saves the value', () => {
      const chainSet = new ChainedSet(undefined);
      const context = chainSet.add('alpha');
      expect(chainSet.toConfig()).toEqual(['alpha']);
      expect(context).toBe(chainSet);
    });
  });

  describe('When calling .delete()', () => {
    test('Then removes the value', () => {
      const chainSet = new ChainedSet(undefined);
      const context = chainSet.merge(['alpha', 'beta']).delete('alpha');
      expect(chainSet.toConfig()).toEqual(['beta']);
      expect(context).toBe(chainSet);
    });
  });

  describe('When calling .clear()', () => {
    test('Then removes all the values', () => {
      const chainSet = new ChainedSet(undefined);
      const context = chainSet.merge(['alpha', 'beta']).clear();
      expect(chainSet.toConfig()).toEqual([]);
      expect(context).toBe(chainSet);
    });
  });

  describe('When calling .has()', () => {
    describe('When the value does not exists', () => {
      test('Then returns false', () => {
        const chainSet = new ChainedSet(undefined);
        expect(chainSet.has('beta')).toBeFalsy();
      });
    });
    describe('When the value does exists', () => {
      test('Then returns true', () => {
        const chainSet = new ChainedSet(undefined);
        const context = chainSet.add('beta');
        expect(chainSet.has('beta')).toBeTruthy();
        expect(context).toBe(chainSet);
      });
    });
  });

  describe('When emptyAsUndefined configuration is set', () => {
    test('Then returns the config as undefined', () => {
      const config = new ChainedSet(undefined, { emptyAsUndefined: true }).toConfig();
      expect(config).toEqual(undefined);
    });
  });

  describe('When calling .values()', () => {
    test('Then returns the list of values', () => {
      const chainSet = new ChainedSet(undefined);
      chainSet.merge(['alpha', 'beta', 'gamma', 'delta']);
      const values = Array.from(chainSet.values());
      expect(values).toEqual(['alpha', 'beta', 'gamma', 'delta']);
    });
  });

  describe('When calling .prepend()', () => {
    test('Then prepends the value', () => {
      const chainSet = new ChainedSet(undefined);
      const context = chainSet.merge(['alpha', 'beta']).prepend('delta');
      expect(chainSet.toConfig()).toEqual(['delta', 'alpha', 'beta']);
      expect(context).toBe(chainSet);
    });
  });

  describe('When calling .merge()', () => {
    test('Then merges the values', () => {
      const chainSet = new ChainedSet(undefined);
      const context = chainSet.add('alpha').add('beta').merge(['gamma', 'delta']);
      expect(chainSet.toConfig()).toEqual(['alpha', 'beta', 'gamma', 'delta']);
      expect(context).toBe(chainSet);
    });
  });

  describe('When calling .toConfig()', () => {
    test('Then returns the configuration object', () => {
      const chainSet = new ChainedSet(undefined);
      const chainSet2 = new ChainedSet(chainSet).merge(['pepega', 'pogchamp']);
      chainSet.merge(['alpha', 'beta', 'gamma', 'delta', chainSet2]);
      expect(chainSet.toConfig()).toEqual(['alpha', 'beta', 'gamma', 'delta', ['pepega', 'pogchamp']]);
    });
  });
});
