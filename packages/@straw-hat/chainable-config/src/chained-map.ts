import deepMerge from 'deepmerge';
import isMergeable from 'is-mergeable-object';
import { Chainable } from './chainable';
import { Configurable, ToStringOptions } from './configurable';

export type ChainedMapOptions = {
  name?: string;
  asArray?: boolean;
  emptyAsUndefined?: boolean;
};

type AliasArgs<T> = {
  key: string;
  value: T;
  alias: string;
};

export class Alias<T> extends Configurable {
  value: T;
  alias: string;
  key: string;

  constructor(args: AliasArgs<T>) {
    super();
    this.alias = args.alias;
    this.key = args.key;
    this.value = args.value;
  }

  static isAlias<T = unknown>(value: unknown): value is Alias<T> {
    return value instanceof Alias;
  }

  override valueOf() {
    return {
      alias: this.alias,
      key: this.key,
      value: this.value,
    };
  }

  override toConfig() {
    return Chainable.toConfig(this.value);
  }
}

export class ChainedMap<P, S = unknown> extends Chainable<P> {
  protected store = new Map<string, S | Alias<S>>();
  private options: ChainedMapOptions;

  constructor(parent: P, options: ChainedMapOptions = {}) {
    super(parent);
    this.parent = parent;
    this.options = {
      asArray: false,
      emptyAsUndefined: false,
      ...options,
    };
  }

  private computeAndSet<T extends S>(key: string, fn: () => T) {
    const value = fn();
    this.set(key, value);
  }

  static isChainedMap<P = unknown, S = unknown>(value: unknown): value is ChainedMap<P, S> {
    return value instanceof ChainedMap;
  }

  clear() {
    this.store.clear();
    return this;
  }

  delete(key: string) {
    this.store.delete(key);
    return this;
  }

  get<T extends S>(key: string): T {
    return this.store.get(key) as unknown as T;
  }

  set<T extends S>(key: string, value: T, options: { alias?: string } = {}) {
    const theKey = options.alias ?? key;
    const theValue = options?.alias
      ? new Alias<T>({
          key,
          value,
          alias: options.alias,
        })
      : value;

    this.store.set(theKey, theValue);
    return this;
  }

  has(key: string) {
    return this.store.has(key);
  }

  entries() {
    return this.store.entries();
  }

  keys() {
    return this.store.keys();
  }

  values() {
    return this.store.values();
  }

  getOrCompute<T extends S>(key: string, fn: () => T): T {
    if (!this.has(key)) {
      this.computeAndSet(key, fn);
    }

    return this.get<T>(key)!;
  }

  merge(values: Record<string, any>, omit: string[] = []) {
    Object.keys(values).forEach((key) => {
      if (omit.includes(key)) {
        return;
      }

      const currentValue = this.get<any>(key);
      const nextValue = values[key];

      if (ChainedMap.isChainedMap(currentValue)) {
        // @ts-ignore TODO: figure out the casting from S to ChainedMap
        currentValue!.merge(nextValue);
        return;
      }

      if (isMergeable(currentValue) && isMergeable(nextValue)) {
        const mergedValue = deepMerge<any>(currentValue!, nextValue);
        this.set(key, mergedValue);
        return;
      }

      this.set(key, nextValue);
    });

    return this;
  }

  override toConfig() {
    if (this.options.emptyAsUndefined && this.store.size === 0) {
      return undefined;
    }

    if (this.options.asArray) {
      return Array.from(this.store).reduce(this.#asArrayConfig, []);
    }

    return Array.from(this.store).reduce(this.#asMapConfig, {});
  }

  override toString(options?: ToStringOptions) {
    const openBracket = this.options.asArray ? '[' : '{';
    const closeBracket = this.options.asArray ? ']' : '}';
    const output: string[] = [];

    Array.from(this.store).forEach(([key, value], index, list) => {
      const isLast = index === list.length - 1;
      const name = this.options.name ?? '';
      const docKey = Alias.isAlias(value) ? value.alias : key;
      const theKey = Alias.isAlias(value) ? value.key : key;

      output.push(`/* ${name}.get(${Configurable.toString(docKey, options)}) */ `);

      if (this.options.asArray) {
        output.push(`${Configurable.toString(value, options)}`);
      } else {
        output.push(`${Configurable.toString(theKey, options)}: ${Configurable.toString(value, options)}`);
      }

      // do not add trailing comma
      if (!isLast) {
        output.push(`, `);
      }
    });

    return `${openBracket}${output.join('').trim()}${closeBracket}`;
  }

  #asArrayConfig = (config: Record<any, any>, [_key, value]: [string, S | Alias<S>]) => {
    config.push(Configurable.toConfig(value));
    return config;
  };

  #asMapConfig = (config: Record<any, any>, [key, value]: [string, S | Alias<S>]) => {
    const theKey = Alias.isAlias(value) ? value.key : key;
    config[theKey] = Configurable.toConfig(value);
    return config;
  };
}
