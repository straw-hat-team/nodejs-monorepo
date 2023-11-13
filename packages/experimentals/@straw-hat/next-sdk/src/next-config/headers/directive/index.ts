/**
 * @internal
 */
class Directive {
  toJSON() {
    throw new Error('Not Implemented');
  }
}

/**
 * @internal
 */
class SingleDirective<TValue = unknown> extends Directive {
  readonly #value: TValue;

  constructor(value: TValue) {
    super();
    this.#value = value;
  }

  override toJSON() {
    return this.#value;
  }
}

/**
 * @internal
 */
export class BooleanDirective extends Directive {
  readonly #value: string;
  readonly #present: boolean;

  constructor(value: string, present: boolean) {
    super();
    this.#value = value;
    this.#present = present;
  }

  override toJSON() {
    if (!this.#present) {
      return;
    }

    return this.#value;
  }
}

type PairDirectiveQuotes = '' | "'" | '"';

/**
 * @internal
 */
class PairDirective extends Directive {
  readonly #key: string;
  readonly #value: any;
  #quotes: PairDirectiveQuotes;
  #joinBy: string;

  constructor(key: string, value?: any) {
    super();
    this.#value = value;
    this.#key = key;
    this.#quotes = '"';
    this.#joinBy = '=';
  }

  protected setQuotes(quotes: PairDirectiveQuotes) {
    this.#quotes = quotes;
    return this;
  }

  protected setJoinBy(value: string) {
    this.#joinBy = value;
    return this;
  }

  override toJSON() {
    if (!this.#value) {
      return undefined;
    }

    return [this.#key, this.#joinBy, this.#quotes, this.#value, this.#quotes].join('');
  }
}

export { Directive, PairDirective, PairDirectiveQuotes, SingleDirective };
