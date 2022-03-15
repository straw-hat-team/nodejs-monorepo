import { HttpHeader } from './http-header';
import { SingleDirective } from './directive';

enum XFrameOptions {
  Deny = 'DENY',
  SameOrigin = 'SAMEORIGIN',
}

class XFrameOptionsDirective extends SingleDirective<XFrameOptions> {
  constructor(value?: XFrameOptions) {
    super(value ?? XFrameOptions.Deny);
  }
}

/**
 * Read More: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
 */
class XFrameOptionsHeader extends HttpHeader {
  constructor(value?: XFrameOptions) {
    super('X-Frame-Options');
    this.addDirective(new XFrameOptionsDirective(value));
  }
}

export { XFrameOptionsHeader, XFrameOptions };
