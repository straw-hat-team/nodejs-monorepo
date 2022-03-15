import { Directive } from './directive';

/**
 * @internal
 */
class HttpHeader {
  readonly name: string;
  readonly directives: Set<Directive>;
  #joinBy?: string;

  constructor(name: string) {
    this.name = name;
    this.directives = new Set();
    this.#joinBy = ';';
  }

  protected setJoinBy(value: string) {
    this.#joinBy = value;
    return this;
  }

  protected addDirective(directive: Directive) {
    this.directives.add(directive);
    return this;
  }

  /**
   * Returns the JSON representation of the header.
   */
  toJSON() {
    return {
      name: this.name,
      value: Array.from(this.directives)
        .map((v) => v.toJSON())
        .filter(Boolean)
        .join(this.#joinBy),
    };
  }
}

export { HttpHeader };
