import { HttpHeader } from './http-header';
import { BooleanDirective, PairDirective } from './directive';

class MaxAgeDirective extends PairDirective {
  constructor(value?: number) {
    super('max-age', value ?? 63072000);
    this.setQuotes('');
  }
}

class IncludeSubDomainsDirective extends BooleanDirective {
  constructor(enabled?: boolean) {
    super('includeSubDomains', enabled ?? true);
  }
}

class PreloadDirective extends BooleanDirective {
  constructor(enabled?: boolean) {
    super('preload', enabled ?? true);
  }
}

/**
 * Read More: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
 */
class StrictTransportSecurityHeader extends HttpHeader {
  constructor(opts?: { includeSubDomains?: boolean; maxAge?: number; preload?: boolean }) {
    super('Strict-Transport-Security');

    this.setJoinBy(';')
      .addDirective(new MaxAgeDirective(opts?.maxAge))
      .addDirective(new IncludeSubDomainsDirective(opts?.includeSubDomains))
      .addDirective(new PreloadDirective(opts?.preload));
  }
}

export { StrictTransportSecurityHeader };
