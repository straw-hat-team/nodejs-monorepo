export type ReferrerPolicy =
  | ''
  | 'no-referrer'
  | 'no-referrer-when-downgrade'
  | 'same-origin'
  | 'origin'
  | 'strict-origin'
  | 'origin-when-cross-origin'
  | 'strict-origin-when-cross-origin'
  | 'unsafe-url';

export type XDnsPrefetchControl = 'on' | 'off';

export type XContentTypeOptions = 'nosniff';

export type XFrameOptions = 'DENY' | 'SAMEORIGIN';
