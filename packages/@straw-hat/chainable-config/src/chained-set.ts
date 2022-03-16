import { Chainable } from './chainable';
import { Configurable } from './configurable';

export type ChainedSetOptions = {
  emptyAsUndefined?: boolean;
};

export class ChainedSet<P, S = unknown> extends Chainable<P> {
  private store = new Set<S>();
  private options: ChainedSetOptions;

  constructor(parent: P, options: ChainedSetOptions = {}) {
    super(parent);
    this.parent = parent;
    this.options = {
      emptyAsUndefined: false,
      ...options,
    };
  }

  add<T extends S>(value: T) {
    this.store.add(value);
    return this;
  }

  prepend<T extends S>(value: T) {
    this.store = new Set([value, ...this.store]);
    return this;
  }

  clear() {
    this.store.clear();
    return this;
  }

  delete<T extends S>(value: T) {
    this.store.delete(value);
    return this;
  }

  values() {
    return this.store.values();
  }

  has<T extends S>(value: T) {
    return this.store.has(value);
  }

  merge<T extends S>(values: T[]) {
    this.store = new Set([...this.store, ...values]);
    return this;
  }

  override toConfig() {
    if (this.options.emptyAsUndefined && this.store.size === 0) {
      return undefined;
    }

    return Array.from(this.values()).map(Configurable.toConfig);
  }
}
