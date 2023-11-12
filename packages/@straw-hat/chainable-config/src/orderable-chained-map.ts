import { Chainable } from './chainable';
import { ChainedMap } from './chained-map';

export enum OrderPositions {
  Before = 'before',
  After = 'after',
}

export type MoveCallback = (args: { before(relativeKey: string): void; after(relativeKey: string): void }) => any;

function relativePosition(index: number, order: OrderPositions) {
  return order === OrderPositions.Before ? index : index + 1;
}

function byKey(key: string) {
  return (entry: [string, any]) => entry[0] === key;
}

type MoveableValueArgs<T> = {
  parent: OrderableChainedMap<any, any>;
  key: string;
  value: T;
};

class MoveableValue<P, T> extends Chainable<OrderableChainedMap<P>> {
  private value: T;
  private key: string;

  constructor(args: MoveableValueArgs<T>) {
    super(args.parent);
    this.key = args.key;
    this.value = args.value;
  }

  override valueOf() {
    return this.value;
  }

  override toConfig() {
    return this.value;
  }

  before(key: string) {
    this.parent.move(this.key, ({ before }) => before(key));
    return this;
  }

  after(key: string) {
    this.parent.move(this.key, ({ after }) => after(key));
    return this;
  }
}

export class OrderableChainedMap<P, S = unknown> extends ChainedMap<P, MoveableValue<P, S>> {
  // @ts-ignore TODO: figure out how to fix this issue
  set<T extends S>(key: string, value: T, options: { alias?: string } = {}) {
    const theKey = options.alias ?? key;

    const item = new MoveableValue<P, T>({
      parent: this,
      key: theKey,
      value,
    });

    super.set(key, item, options);
    return this;
  }

  move(key: string, callback: MoveCallback) {
    callback({
      before: (relativeKey: string) => {
        this.#doMove(key, OrderPositions.Before, relativeKey);
      },
      after: (relativeKey: string) => {
        this.#doMove(key, OrderPositions.After, relativeKey);
      },
    });

    return this;
  }

  #doMove = (key: string, order: OrderPositions, relativeKey: string) => {
    if (!this.store.has(key) || !this.store.has(relativeKey)) {
      return this;
    }

    const entries = Array.from(this.store.entries());

    const fromIndex = entries.findIndex(byKey(key));
    const element = entries[fromIndex];

    if (!element) {
      return this;
    }

    entries.splice(fromIndex, 1);

    const relativeIndex = entries.findIndex(byKey(relativeKey));
    const toIndex = relativePosition(relativeIndex, order);

    entries.splice(toIndex, 0, element);

    this.store = new Map(entries);

    return this;
  };
}
