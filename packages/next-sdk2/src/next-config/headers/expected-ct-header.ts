import { HttpHeader } from './http-header';
import { BooleanDirective, PairDirective } from './directive';

class EnforceDirective extends BooleanDirective {
  constructor(enabled?: boolean) {
    super('enforce', enabled ?? true);
  }
}

class ReportUriDirective extends PairDirective {
  constructor(value?: string) {
    super('report-uri', value);
  }
}

class MaxAgeDirective extends PairDirective {
  constructor(value: number) {
    super('max-age', value);
    this.setQuotes('');
  }
}

/**
 * Read More: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expect-CT
 */
class ExpectCtHeader extends HttpHeader {
  constructor(opts: { enforce?: boolean; maxAge: number; reportUri?: string }) {
    super('Expect-CT');
    this.setJoinBy(',')
      .addDirective(new MaxAgeDirective(opts.maxAge))
      .addDirective(new EnforceDirective(opts.enforce))
      .addDirective(new ReportUriDirective(opts.reportUri));
  }
}

export { ExpectCtHeader };
