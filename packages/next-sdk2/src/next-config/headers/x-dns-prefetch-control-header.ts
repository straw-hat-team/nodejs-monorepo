import { HttpHeader } from './http-header';
import { SingleDirective } from './directive';

enum XDnsPrefetchControl {
  On = 'on',
  Off = 'off',
}

class XDnsPrefetchControlDirective extends SingleDirective<XDnsPrefetchControl> {
  constructor(value?: XDnsPrefetchControl) {
    super(value ?? XDnsPrefetchControl.On);
  }
}

/**
 * Read More: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
 */
class XDnsPrefetchControlHeader extends HttpHeader {
  constructor(value?: XDnsPrefetchControl) {
    super('X-DNS-Prefetch-Control');
    this.addDirective(new XDnsPrefetchControlDirective(value));
  }
}

export { XDnsPrefetchControlHeader, XDnsPrefetchControl };
