import { SingleDirective } from './directive';
import { HttpHeader } from './http-header';

class NosniffDirective extends SingleDirective<'nosniff'> {
  constructor() {
    super('nosniff');
  }
}

/**
 * Read More: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
 */
class XContentTypeOptionsHeader extends HttpHeader {
  constructor() {
    super('X-Content-Type-Options');
    this.addDirective(new NosniffDirective());
  }
}

export { XContentTypeOptionsHeader };
