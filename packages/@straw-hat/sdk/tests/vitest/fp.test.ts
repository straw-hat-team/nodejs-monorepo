import { describe, test, expect, vi } from 'vitest';
import { compose, groupBy, identity } from '../../src/fp';

describe('given a "identity" function', () => {
  describe('when pass 1 parameter ', () => {
    test('then returns the parameter supplied to it', () => {
      // GIVEN
      const one = identity('hello, world');

      // WHEN
      const actual = one();

      // THEN
      expect(actual).toBe('hello, world');
    });
  });
});

describe('given a "groupBy" function', () => {
  describe('when a list of students is pass', () => {
    test('then groups the list by name', () => {
      // GIVEN
      const students = [
        { name: 'Yordis', score: 95 },
        { name: 'Yordis', score: 83 },
        { name: 'Abby', score: 100 },
        { name: 'Jack', score: 43 },
        { name: 'Jack', score: 100 },
      ];
      const byFirstName = groupBy((person: any) => person.name);

      // WHEN
      const actual = byFirstName(students);

      // THEN
      expect(actual).toEqual({
        Yordis: [
          { name: 'Yordis', score: 95 },
          { name: 'Yordis', score: 83 },
        ],
        Abby: [{ name: 'Abby', score: 100 }],
        Jack: [
          { name: 'Jack', score: 43 },
          { name: 'Jack', score: 100 },
        ],
      });
    });
  });
});

describe('given a "compose" function', () => {
  describe('when a list of functions is pass', () => {
    test('then performs right-to-left function composition', () => {
      // GIVEN
      const getLuckyMessage = vi.fn((num: number) => {
        return `My lucky number was ${num}`;
      });
      const multiplyByFive = vi.fn((num: number) => {
        return num * 5;
      });
      const parseInteger = vi.fn((num: string, radix: number) => {
        return parseInt(num, radix);
      });
      const multiplyStringByFive = compose(getLuckyMessage, multiplyByFive, parseInteger);

      // WHEN
      const actual = multiplyStringByFive('20', 10);

      // THEN
      expect(actual).toEqual(`My lucky number was 100`);
      expect(parseInteger).toBeCalledWith('20', 10);
      expect(multiplyByFive).toBeCalledWith(20);
      expect(getLuckyMessage).toBeCalledWith(100);
    });
  });
});
