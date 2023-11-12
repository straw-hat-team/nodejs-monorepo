import { Directive, PairDirective } from './directive';
import { HttpHeader } from './http-header';

type AnythingSource = '*';
type ShaSource = `'sha${'256' | '384' | '512'}-${string}'`;
type NonceSource = `'nonce-${string}'`;
type SchemeSource = `${string}:`;
type HostSource = string;
type SelfSource = "'self'";
type UnsafeEvalSource = "'unsafe-eval'";
type UnsafeHashes = "'unsafe-hashes'";
type UnsafeInline = "'unsafe-inline'";
type None = "'none'";
type StrictDynamicSource = "'strict-dynamic'";
type ReportSample = "'report-sample'";
type AllSources =
  | AnythingSource
  | ShaSource
  | NonceSource
  | SchemeSource
  | HostSource
  | SelfSource
  | UnsafeEvalSource
  | UnsafeHashes
  | UnsafeInline
  | None
  | StrictDynamicSource
  | ReportSample
  | string;

class PolicyDirective extends Directive {
  readonly #key: string;
  readonly #sources: Set<AllSources>;

  constructor(key: string, sources?: AllSources[]) {
    super();
    this.#key = key;
    this.#sources = new Set(sources);
  }

  override toJSON() {
    if (this.#sources.size == 0) {
      return;
    }

    return [this.#key, ...this.#sources].join(' ');
  }
}

type ConfigurableSrc = Record<
  | 'mediaSrc'
  | 'objectSrc'
  | 'prefetchSrc'
  | 'scriptSrc'
  | 'scriptSrcElem'
  | 'scriptSrcAttr'
  | 'styleSrc'
  | 'styleSrcElem'
  | 'styleSrcAttr'
  | 'workerSrc'
  | 'baseUri'
  | 'sandbox'
  | 'formAction'
  | 'frameAncestors'
  | 'navigateTo'
  | 'manifestSrc'
  | 'imgSrc'
  | 'frameSrc'
  | 'fontSrc'
  | 'connectSrc'
  | 'childSrc'
  | 'defaultSrc',
  AllSources[]
>;

type ContentSecurityPolicyOptions = Partial<ConfigurableSrc> & {
  reportUri?: string;
};

class ReportingDirective extends PairDirective {
  constructor(key: string, value?: string) {
    super(key, value);

    this.setJoinBy(' ').setQuotes('');
  }
}

class ReportUriDirective extends ReportingDirective {
  constructor(value?: string) {
    super('report-uri', value);
  }
}

class ChildSrcPolicyDirective extends PolicyDirective {
  constructor(sources?: AllSources[]) {
    super('child-src', sources);
  }
}

class ConnectSrcPolicyDirective extends PolicyDirective {
  constructor(sources?: AllSources[]) {
    super('connect-src', sources);
  }
}

class DefaultSrcPolicyDirective extends PolicyDirective {
  constructor(sources?: AllSources[]) {
    super('default-src', sources);
  }
}

class FontSrcPolicyDirective extends PolicyDirective {
  constructor(sources?: AllSources[]) {
    super('font-src', sources);
  }
}

class FrameSrcPolicyDirective extends PolicyDirective {
  constructor(sources?: AllSources[]) {
    super('frame-src', sources);
  }
}

class ImgSrcPolicyDirective extends PolicyDirective {
  constructor(sources?: AllSources[]) {
    super('img-src', sources);
  }
}

class ManifestSrcPolicyDirective extends PolicyDirective {
  constructor(sources?: AllSources[]) {
    super('manifest-src', sources);
  }
}

class MediaSrcPolicyDirective extends PolicyDirective {
  constructor(sources?: AllSources[]) {
    super('media-src', sources);
  }
}

class ObjectSrcPolicyDirective extends PolicyDirective {
  constructor(sources?: AllSources[]) {
    super('object-src', sources);
  }
}

class PrefetchSrcPolicyDirective extends PolicyDirective {
  constructor(sources?: AllSources[]) {
    super('prefetch-src', sources);
  }
}

class ScriptSrcPolicyDirective extends PolicyDirective {
  constructor(sources?: AllSources[]) {
    super('script-src', sources);
  }
}

class ScriptSrcElemPolicyDirective extends PolicyDirective {
  constructor(sources?: AllSources[]) {
    super('script-src-elem', sources);
  }
}

class ScriptSrcAttrPolicyDirective extends PolicyDirective {
  constructor(sources?: AllSources[]) {
    super('script-src-attr', sources);
  }
}

class StyleSrcPolicyDirective extends PolicyDirective {
  constructor(sources?: AllSources[]) {
    super('style-src', sources);
  }
}

class StyleSrcElemPolicyDirective extends PolicyDirective {
  constructor(sources?: AllSources[]) {
    super('style-src-elem', sources);
  }
}

class StyleSrcAttrPolicyDirective extends PolicyDirective {
  constructor(sources?: AllSources[]) {
    super('style-src-attr', sources);
  }
}

class WorkerSrcPolicyDirective extends PolicyDirective {
  constructor(sources?: AllSources[]) {
    super('worker-src', sources);
  }
}

class BaseUriPolicyDirective extends PolicyDirective {
  constructor(sources?: AllSources[]) {
    super('base-uri', sources);
  }
}

class SandboxPolicyDirective extends PolicyDirective {
  constructor(sources?: AllSources[]) {
    super('sandbox', sources);
  }
}

class FormActionPolicyDirective extends PolicyDirective {
  constructor(sources?: AllSources[]) {
    super('form-action', sources);
  }
}

class FrameAncestorsPolicyDirective extends PolicyDirective {
  constructor(sources?: AllSources[]) {
    super('frame-ancestors', sources);
  }
}

class NavigateToPolicyDirective extends PolicyDirective {
  constructor(sources?: AllSources[]) {
    super('navigate-to', sources);
  }
}

class ContentSecurityPolicyBaseHeader extends HttpHeader {
  constructor(name: string, opts: ContentSecurityPolicyOptions) {
    super(name);

    this.setJoinBy(';')
      .addDirective(new ReportUriDirective(opts.reportUri))
      .addDirective(new ChildSrcPolicyDirective(opts.childSrc))
      .addDirective(new ConnectSrcPolicyDirective(opts.connectSrc))
      .addDirective(new DefaultSrcPolicyDirective(opts.defaultSrc))
      .addDirective(new FontSrcPolicyDirective(opts.fontSrc))
      .addDirective(new FrameSrcPolicyDirective(opts.frameSrc))
      .addDirective(new ImgSrcPolicyDirective(opts.imgSrc))
      .addDirective(new ManifestSrcPolicyDirective(opts.manifestSrc))
      .addDirective(new MediaSrcPolicyDirective(opts.mediaSrc))
      .addDirective(new ObjectSrcPolicyDirective(opts.objectSrc))
      .addDirective(new PrefetchSrcPolicyDirective(opts.prefetchSrc))
      .addDirective(new ScriptSrcPolicyDirective(opts.scriptSrc))
      .addDirective(new ScriptSrcElemPolicyDirective(opts.scriptSrcElem))
      .addDirective(new ScriptSrcAttrPolicyDirective(opts.scriptSrcAttr))
      .addDirective(new StyleSrcPolicyDirective(opts.styleSrc))
      .addDirective(new StyleSrcElemPolicyDirective(opts.styleSrcElem))
      .addDirective(new StyleSrcAttrPolicyDirective(opts.styleSrcAttr))
      .addDirective(new WorkerSrcPolicyDirective(opts.workerSrc))
      .addDirective(new BaseUriPolicyDirective(opts.baseUri))
      .addDirective(new SandboxPolicyDirective(opts.sandbox))
      .addDirective(new FormActionPolicyDirective(opts.formAction))
      .addDirective(new FrameAncestorsPolicyDirective(opts.frameAncestors))
      .addDirective(new NavigateToPolicyDirective(opts.navigateTo));
  }
}

/**
 * Read More: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
 */
class ContentSecurityPolicyHeader extends ContentSecurityPolicyBaseHeader {
  constructor(opts: ContentSecurityPolicyOptions) {
    super('Content-Security-Policy', opts);
  }
}

/**
 * Read More: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy-Report-Only
 */
class ContentSecurityPolicyReportOnlyHeader extends ContentSecurityPolicyBaseHeader {
  constructor(opts: ContentSecurityPolicyOptions) {
    super('Content-Security-Policy-Report-Only', opts);
  }
}

export {
  AllSources,
  AnythingSource,
  ConfigurableSrc,
  ContentSecurityPolicyHeader,
  ContentSecurityPolicyOptions,
  ContentSecurityPolicyReportOnlyHeader,
  HostSource,
  NonceSource,
  None,
  ReportSample,
  SchemeSource,
  SelfSource,
  ShaSource,
  StrictDynamicSource,
  UnsafeEvalSource,
  UnsafeHashes,
  UnsafeInline,
};
