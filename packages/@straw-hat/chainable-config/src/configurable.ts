import { toString } from './helper';

export interface ToStringOptions {
  [key: string]: any;
  verbose?: boolean;
}

export class Configurable {
  static isConfigurable(value: unknown): value is Configurable {
    return value instanceof Configurable;
  }

  static toConfig(value: unknown) {
    return Configurable.isConfigurable(value) ? (value as unknown as Configurable).toConfig() : value;
  }

  static toString(value: unknown, options?: ToStringOptions) {
    return Configurable.isConfigurable(value)
      ? (value as unknown as Configurable).toString(options)
      : toString(value, options);
  }

  toConfig() {
    throw new Error('toConfig method not implemented');
  }

  toString(options?: ToStringOptions) {
    const config = this.toConfig();
    return toString(config, options);
  }
}
