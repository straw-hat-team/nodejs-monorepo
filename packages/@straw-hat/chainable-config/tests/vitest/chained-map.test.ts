import { expect, describe, test } from 'vitest';
import { ChainedMap } from '../../src/chained-map';
import { ChainedSet } from '../../src/chained-set';

test('validates if a value is a chainable map object', () => {
  const chainMap = new ChainedMap(undefined);
  expect(ChainedMap.isChainedMap(chainMap)).toBeTruthy();
  expect(ChainedMap.isChainedMap('helloi')).toBeFalsy();
});

describe('Given a ChainedMap object', () => {
  describe('When calling .set()', () => {
    test('Then saves the value', () => {
      const chaiMap = new ChainedMap(undefined);
      const context = chaiMap.set('name', 'pepega');
      expect(chaiMap.toConfig()).toEqual({ name: 'pepega' });
      expect(context).toBe(chaiMap);
    });
  });

  describe('When calling .delete()', () => {
    test('Then removes the value', () => {
      const chaiMap = new ChainedMap(undefined).merge({ name: 'pepega', reaction: 'pogchamp' });
      const context = chaiMap.delete('name');
      expect(chaiMap.toConfig()).toEqual({
        reaction: 'pogchamp',
      });
      expect(context).toBe(chaiMap);
    });
  });

  describe('When calling .keys()', () => {
    test('Then returns the list of keys', () => {
      const chaiMap = new ChainedMap(undefined).merge({ name: 'pepega', reaction: 'pogchamp' });
      const keys = Array.from(chaiMap.keys());
      expect(keys).toEqual(['name', 'reaction']);
    });
  });

  describe('When calling .clear()', () => {
    test('Then removes all the values', () => {
      const chaiMap = new ChainedMap(undefined).merge({ name: 'pepega', reaction: 'pogchamp' });
      const context = chaiMap.clear();
      expect(chaiMap.toConfig()).toEqual({});
      expect(context).toBe(chaiMap);
    });
  });

  describe('When calling .values()', () => {
    test('Then returns the list of values', () => {
      const chaiMap = new ChainedMap(undefined).merge({
        name: 'pepega',
        reaction: 'pogchamp',
        channel: 'alchemist_ubi',
      });
      const values = Array.from(chaiMap.values());
      expect(values).toEqual(['pepega', 'pogchamp', 'alchemist_ubi']);
    });
  });

  describe('When calling .entries()', () => {
    describe('When have entries', () => {
      test('Then returns the list of entries', () => {
        const chaiMap = new ChainedMap(undefined).merge({
          name: 'pepega',
          reaction: 'pogchamp',
          channel: 'alchemist_ubi',
        });
        const entries = Array.from(chaiMap.entries());
        expect(entries).toEqual([
          ['name', 'pepega'],
          ['reaction', 'pogchamp'],
          ['channel', 'alchemist_ubi'],
        ]);
      });
    });
  });

  describe('When calling .has()', () => {
    describe('When the value does not exists', () => {
      test('Then returns false', () => {
        const chaiMap = new ChainedMap(undefined);
        expect(chaiMap.has('name')).toBeFalsy();
      });
    });
    describe('When the value does exists', () => {
      test('Then returns true', () => {
        const chaiMap = new ChainedMap(undefined).set('name', 'pepega');
        expect(chaiMap.has('name')).toBeTruthy();
      });
    });
  });

  describe('When calling .merge()', () => {
    test('Then merges the values', () => {
      const chaiMap = new ChainedMap(undefined).merge({
        name: 'pepeg',
        hello: 'world',
        items: [1, 2, 3],
        complex: new ChainedMap(undefined).set('something', 'else'),
      });
      const context = chaiMap.merge({
        newKey: true,
        name: 'pepega',
        items: [4, 5, 6],
        complex: {
          more: 'stuff',
        },
      });
      const config = chaiMap.toConfig();
      expect(config).toEqual({
        complex: { something: 'else', more: 'stuff' },
        hello: 'world',
        items: [1, 2, 3, 4, 5, 6],
        name: 'pepega',
        newKey: true,
      });
      expect(context).toBe(chaiMap);
    });

    describe('When omitting keys', () => {
      test('Then merges the values omitting the keys', () => {
        const config = new ChainedMap(undefined)
          .merge(
            {
              name: 'pepeg',
              hello: 'world',
              items: [1, 2, 3],
            },
            ['items'],
          )
          .toConfig();
        expect(config).toEqual({ hello: 'world', name: 'pepeg' });
      });
    });
  });

  describe('When calling .getOrCompute()', () => {
    describe('When the key is not present', () => {
      test('Then sets and returns the value', () => {
        const chaiMap = new ChainedMap(undefined);
        expect(chaiMap.getOrCompute('a', () => 'alpha')).toBe('alpha');
        expect(chaiMap.toConfig()).toEqual({
          a: 'alpha',
        });
      });
    });

    describe('When the key is present', () => {
      test('Then returns the value', () => {
        const chaiMap = new ChainedMap(undefined).set('a', 1);
        expect(chaiMap.getOrCompute('a', () => 'alpha')).toBe(1);
        expect(chaiMap.toConfig()).toEqual({
          a: 1,
        });
      });
    });
  });

  describe('When calling .toConfig()', () => {
    describe('When does not have entries', () => {
      test('Then returns a empty configuration object', () => {
        const config = new ChainedMap(undefined).toConfig();
        expect(config).toEqual({});
      });
    });
    describe('When have some entries', () => {
      test('Then returns a configuration object', () => {
        const config = new ChainedMap(undefined)
          .set('^image![a-zA-Z0-9$_-]+$', 'GlobalImageStub', { alias: 'images' })
          .merge({
            name: 'pepeg',
            hello: 'world',
            answer: new ChainedMap(undefined).merge({
              name: 'pogchamp',
              hello: 'ubi',
            }),
          })
          .toConfig();
        expect(config).toEqual({
          name: 'pepeg',
          hello: 'world',
          '^image![a-zA-Z0-9$_-]+$': 'GlobalImageStub',
          answer: {
            name: 'pogchamp',
            hello: 'ubi',
          },
        });
      });
    });
  });

  describe('When asArray configuration is set', () => {
    test('Then returns the config as an array', () => {
      const config = new ChainedMap(undefined, { asArray: true })
        .set('js', 'js')
        .set('jsx', 'jsx')
        .set('complex', 'jsx')
        .set('alias', 'pepeg', { alias: 'myalias' })
        .set('complex', new ChainedSet(undefined).add('nice'))
        .toConfig();
      expect(config).toEqual(['js', 'jsx', ['nice'], 'pepeg']);
    });
  });

  describe('When emptyAsUndefined configuration is set', () => {
    test('Then returns the config as undefined', () => {
      const config = new ChainedMap(undefined, { asArray: true, emptyAsUndefined: true }).toConfig();
      expect(config).toEqual(undefined);
    });
  });

  describe('When calling .toString()', () => {
    test('Then returns the correct string', () => {
      const pepegMap = new ChainedMap(undefined, { name: 'config.pepeg' })
        .set('twitter', 'alchemist_ubi')
        .set('twitch', 'alchemist_ubi')
        .set('^image![a-zA-Z0-9$_-]+$', 'GlobalImageStub', { alias: 'images' });
      const complexSet = new ChainedSet(undefined).add('nice');
      const output = new ChainedMap(undefined, { asArray: true, name: 'config' })
        .set('js', 'js')
        .set('jsx', 'jsx')
        .set('complex', 'jsx')
        .set('complex', complexSet)
        .set('pepeg', pepegMap)
        .toString();

      expect(output).toMatchSnapshot();
    });
  });
});
