import { HttpHeader } from './http-header';
import { BooleanDirective, PairDirective } from './directive';

class MaxAgeDirective extends PairDirective {
  constructor(value?: number) {
    super('max-age', value);
    this.setQuotes('');
  }
}

class SMaxAgeDirective extends PairDirective {
  constructor(value?: number) {
    super('s-maxage', value);
    this.setQuotes('');
  }
}

class NoCacheDirective extends BooleanDirective {
  constructor(enabled?: boolean) {
    super('no-cache', enabled ?? false);
  }
}

class MustRevalidateDirective extends BooleanDirective {
  constructor(enabled?: boolean) {
    super('must-revalidate', enabled ?? false);
  }
}

class ProxyRevalidateDirective extends BooleanDirective {
  constructor(enabled?: boolean) {
    super('proxy-revalidate', enabled ?? false);
  }
}

class NoStoreDirective extends BooleanDirective {
  constructor(enabled?: boolean) {
    super('no-store', enabled ?? false);
  }
}

class PrivateDirective extends BooleanDirective {
  constructor(enabled?: boolean) {
    super('private', enabled ?? false);
  }
}

class PublicDirective extends BooleanDirective {
  constructor(enabled?: boolean) {
    super('public', enabled ?? false);
  }
}

class MustUnderstandDirective extends BooleanDirective {
  constructor(enabled?: boolean) {
    super('must-understand', enabled ?? false);
  }
}

class NoTransformDirective extends BooleanDirective {
  constructor(enabled?: boolean) {
    super('no-transform', enabled ?? false);
  }
}

class ImmutableDirective extends BooleanDirective {
  constructor(enabled?: boolean) {
    super('immutable', enabled ?? false);
  }
}

class OnlyIfCachedDirective extends BooleanDirective {
  constructor(enabled?: boolean) {
    super('only-if-cached', enabled ?? false);
  }
}

class StaleWhileRevalidateDirective extends PairDirective {
  constructor(value?: number) {
    super('stale-while-revalidate', value);
    this.setQuotes('');
  }
}

class StaleIfErrorDirective extends PairDirective {
  constructor(value?: number) {
    super('stale-if-error', value);
    this.setQuotes('');
  }
}

class MaxStaleDirective extends PairDirective {
  constructor(value?: number) {
    super('max-stale', value);
    this.setQuotes('');
  }
}

class MinFreshDirective extends PairDirective {
  constructor(value?: number) {
    super('min-fresh', value);
    this.setQuotes('');
  }
}

type CacheControlOptions = {
  minFresh: number;
  maxStale: number;
  onlyIfCached: boolean;
  staleWhileRevalidate: number;
  staleIfError: number;
  immutable: boolean;
  noTransform: boolean;
  mustUnderstand: boolean;
  public: boolean;
  private: boolean;
  noStore: boolean;
  proxyRevalidate: boolean;
  mustRevalidate: boolean;
  noCache: boolean;
  maxAge?: number;
  sMaxAge?: number;
};

/**
 * Read More: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
 */
class CacheControlHeader extends HttpHeader {
  constructor(opts?: CacheControlOptions) {
    super('Cache-Control');
    this.addDirective(new MaxAgeDirective(opts?.maxAge));
    this.addDirective(new SMaxAgeDirective(opts?.maxAge));
    this.addDirective(new NoCacheDirective(opts?.noCache));
    this.addDirective(new MustRevalidateDirective(opts?.mustRevalidate));
    this.addDirective(new ProxyRevalidateDirective(opts?.proxyRevalidate));
    this.addDirective(new NoStoreDirective(opts?.noStore));
    this.addDirective(new PrivateDirective(opts?.private));
    this.addDirective(new PublicDirective(opts?.public));
    this.addDirective(new MustUnderstandDirective(opts?.mustUnderstand));
    this.addDirective(new NoTransformDirective(opts?.noTransform));
    this.addDirective(new ImmutableDirective(opts?.immutable));
    this.addDirective(new StaleWhileRevalidateDirective(opts?.staleWhileRevalidate));
    this.addDirective(new StaleIfErrorDirective(opts?.staleIfError));
    this.addDirective(new OnlyIfCachedDirective(opts?.onlyIfCached));
    this.addDirective(new MaxStaleDirective(opts?.maxStale));
    this.addDirective(new MinFreshDirective(opts?.minFresh));
  }
}

export { CacheControlHeader, CacheControlOptions };
