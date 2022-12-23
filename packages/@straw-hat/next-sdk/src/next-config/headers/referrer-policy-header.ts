import { SingleDirective } from './directive';
import { HttpHeader } from './http-header';

enum ReferrerPolicy {
  Empty = '',
  NoReferrer = 'no-referrer',
  NoReferrerWhenDowngrade = 'no-referrer-when-downgrade',
  SameOrigin = 'same-origin',
  Origin = 'origin',
  StrictOrigin = 'strict-origin',
  OriginWhenCrossOrigin = 'origin-when-cross-origin',
  StrictOriginWhenCrossOrigin = 'strict-origin-when-cross-origin',
  UnsafeUrl = 'unsafe-url',
}

class ReferrerPolicyDirective extends SingleDirective<ReferrerPolicy> {
  constructor(value?: ReferrerPolicy) {
    super(value ?? ReferrerPolicy.StrictOriginWhenCrossOrigin);
  }
}

/**
 * Read More: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
 */
class ReferrerPolicyHeader extends HttpHeader {
  constructor(value?: ReferrerPolicy) {
    super('Referrer-Policy');
    this.addDirective(new ReferrerPolicyDirective(value));
  }
}

export { ReferrerPolicyHeader, ReferrerPolicy };
