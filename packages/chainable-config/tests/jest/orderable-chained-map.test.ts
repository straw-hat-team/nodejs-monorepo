import { OrderableChainedMap } from '../../src/orderable-chained-map';

describe('Given a OrderableChainedMap object', () => {
  describe('When calling .move()', () => {
    it('Then inserts the value before the other value', () => {
      const config = new OrderableChainedMap(undefined, { asArray: true })
        .set('zero', 0)
        .set('one', 1)
        .set('two', 2)
        .move('two', ({ before }) => before('one'))
        .toConfig();
      expect(config).toEqual([0, 2, 1]);
    });
    it.only('Then inserts the value after the other value', () => {
      const config = new OrderableChainedMap(undefined, { asArray: true })
        .set('zero', 0)
        .set('one', 1)
        .set('random', 'pepeg', { alias: 'myrandom' })
        .set('two', 2)
        .set('three', 3)
        .set('four', 4)
        .move('two', ({ after }) => after('three'))
        .move('myrandom', ({ after }) => after('four'))
        .toConfig();

      expect(config).toEqual([0, 1, 3, 2, 4, 'pepeg']);
    });

    it('Then does not move the value if the keys do not exists', () => {
      const config = new OrderableChainedMap(undefined, { asArray: true })
        .set('zero', 0)
        .set('one', 1)
        .set('two', 2)
        .set('three', 3)
        .set('four', 4)
        .move('five', ({ after }) => after('one'))
        .move('four', ({ after }) => after('six'))
        .toConfig();
      expect(config).toEqual([0, 1, 2, 3, 4]);
    });
  });
  describe('Movable values', () => {
    describe('When calling .before()', () => {
      it('Then inserts the value before the other value', () => {
        const config = new OrderableChainedMap<undefined, number>(undefined, { asArray: true })
          .set('zero', 0)
          .set('one', 1)
          .set('two', 2)
          .set('three', 3)
          .get('two')
          .before('one')
          .end()
          .get('three')
          .before('two')
          .end()
          .toConfig();
        expect(config).toEqual([0, 3, 2, 1]);
      });
    });
    describe('When calling .after()', () => {
      it('Then inserts the value after the other value', () => {
        const config = new OrderableChainedMap<undefined, number>(undefined, { asArray: true })
          .set('zero', 0)
          .set('one', 1)
          .set('two', 2)
          .set('three', 3)
          .get('zero')
          .after('two')
          .end()
          .get('one')
          .after('three')
          .end()
          .toConfig();
        expect(config).toEqual([2, 0, 3, 1]);
      });
    });
    it('When calling .valueOf() Then returns the wrapped value', () => {
      const expected = new OrderableChainedMap<undefined, number>(undefined, { asArray: true })
        .set('zero', 0)
        .get('zero')
        .valueOf();
      expect(expected).toEqual(0);
    });
  });
});
