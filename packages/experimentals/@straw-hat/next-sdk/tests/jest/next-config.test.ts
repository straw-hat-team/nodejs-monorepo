import { describe, test, expect, vi } from 'vitest';
import { CacheControlHeader } from '../../src/next-config/headers/cache-control-header';
import {
  ContentSecurityPolicyHeader,
  ContentSecurityPolicyReportOnlyHeader,
} from '../../src/next-config/headers/content-security-policy-header';
import { Directive } from '../../src/next-config/headers/directive';
import { ExpectCtHeader } from '../../src/next-config/headers/expected-ct-header';
import { ReferrerPolicy, ReferrerPolicyHeader } from '../../src/next-config/headers/referrer-policy-header';
import { StrictTransportSecurityHeader } from '../../src/next-config/headers/strict-transport-security-header';
import { XContentTypeOptionsHeader } from '../../src/next-config/headers/x-content-type-options-header';
import {
  XDnsPrefetchControl,
  XDnsPrefetchControlHeader,
} from '../../src/next-config/headers/x-dns-prefetch-control-header';
import { XFrameOptions, XFrameOptionsHeader } from '../../src/next-config/headers/x-frame-options-header';

describe('given directive instance', () => {
  test('when calling to JSON then it throws an error calling toJSON', () => {
    // GIVEN
    const directive = new Directive();
    // WHEN THEN
    expect(() => directive.toJSON()).toThrow('Not Implemented');
  });
});

describe('given an x dns prefetch control header', () => {
  describe('when minimal configuration is provided', () => {
    test('then it adds sensitive defaults', () => {
      // GIVEN
      const header = new XDnsPrefetchControlHeader();
      // WHEN
      const actual = header.toJSON();
      // THEN
      expect(actual).toEqual({
        name: 'X-DNS-Prefetch-Control',
        value: 'on',
      });
    });
  });
  describe('when a control is provided', () => {
    test('then it adds control directive', () => {
      // GIVEN
      const header = new XDnsPrefetchControlHeader(XDnsPrefetchControl.Off);
      // WHEN
      const actual = header.toJSON();
      // THEN
      expect(actual).toEqual({
        name: 'X-DNS-Prefetch-Control',
        value: 'off',
      });
    });
  });
});

describe('given an x content type options header', () => {
  describe('when minimal configuration is provided', () => {
    test('then it adds sensitive defaults', () => {
      // GIVEN
      const header = new XContentTypeOptionsHeader();
      // WHEN
      const actual = header.toJSON();
      // THEN
      expect(actual).toEqual({
        name: 'X-Content-Type-Options',
        value: 'nosniff',
      });
    });
  });
});

describe('given an x frame options header', () => {
  describe('when minimal configuration is provided', () => {
    test('then it adds sensitive defaults', () => {
      // GIVEN
      const header = new XFrameOptionsHeader();
      // WHEN
      const actual = header.toJSON();
      // THEN
      expect(actual).toEqual({
        name: 'X-Frame-Options',
        value: 'DENY',
      });
    });
  });
  describe('when an option is provided', () => {
    test('then it adds the direction', () => {
      // GIVEN
      const header = new XFrameOptionsHeader(XFrameOptions.SameOrigin);
      // WHEN
      const actual = header.toJSON();
      // THEN
      expect(actual).toEqual({
        name: 'X-Frame-Options',
        value: 'SAMEORIGIN',
      });
    });
  });
});

describe('given a referrer policy header', () => {
  describe('when minimal configuration is provided', () => {
    test('then it adds sensitive defaults', () => {
      // GIVEN
      const header = new ReferrerPolicyHeader();
      // WHEN
      const actual = header.toJSON();
      // THEN
      expect(actual).toEqual({
        name: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin',
      });
    });
  });
  describe('when a policy is provided', () => {
    test('then it adds policy to the directive', () => {
      // GIVEN
      const header = new ReferrerPolicyHeader(ReferrerPolicy.Origin);
      // WHEN
      const actual = header.toJSON();
      // THEN
      expect(actual).toEqual({
        name: 'Referrer-Policy',
        value: 'origin',
      });
    });
  });
});

describe('given a expected ct header', () => {
  describe('when minimal configuration is provided', () => {
    test('then it adds sensitive defaults', () => {
      // GIVEN
      const header = new ExpectCtHeader({
        maxAge: 86400,
      });
      // WHEN
      const actual = header.toJSON();
      // THEN
      expect(actual).toEqual({
        name: 'Expect-CT',
        value: 'max-age=86400,enforce',
      });
    });
  });
  describe('when a report uri is provided', () => {
    test('then it adds the report uri directive', () => {
      // GIVEN
      const header = new ExpectCtHeader({
        maxAge: 86400,
        reportUri: 'https//dns.sentry.com/somewhere',
      });
      // WHEN
      const actual = header.toJSON();
      // THEN
      expect(actual).toEqual({
        name: 'Expect-CT',
        value: 'max-age=86400,enforce,report-uri="https//dns.sentry.com/somewhere"',
      });
    });
  });
  describe('when a report enforce is disabled', () => {
    test('then it removes the enforce directive', () => {
      // GIVEN
      const header = new ExpectCtHeader({
        maxAge: 86400,
        enforce: false,
      });
      // WHEN
      const actual = header.toJSON();
      // THEN
      expect(actual).toEqual({
        name: 'Expect-CT',
        value: 'max-age=86400',
      });
    });
  });
});

describe('given a strict transport security header', () => {
  describe('when minimal configuration is provided', () => {
    test('then it adds sensitive defaults', () => {
      // GIVEN
      const header = new StrictTransportSecurityHeader();
      // WHEN
      const actual = header.toJSON();
      // THEN
      expect(actual).toEqual({
        name: 'Strict-Transport-Security',
        value: 'max-age=63072000;includeSubDomains;preload',
      });
    });
  });
  describe('when a preload option', () => {
    test('then it returns the preload directive', () => {
      // GIVEN
      const header = new StrictTransportSecurityHeader({
        preload: true,
      });
      // WHEN
      const actual = header.toJSON();
      // THEN
      expect(actual).toEqual({
        name: 'Strict-Transport-Security',
        value: 'max-age=63072000;includeSubDomains;preload',
      });
    });
  });
  describe('when a maxAge option', () => {
    test('then it returns the maxAge directive', () => {
      // GIVEN
      const header = new StrictTransportSecurityHeader({
        maxAge: 32345344,
      });
      // WHEN
      const actual = header.toJSON();
      // THEN
      expect(actual).toEqual({
        name: 'Strict-Transport-Security',
        value: 'max-age=32345344;includeSubDomains;preload',
      });
    });
  });
  describe('when a disabling includeSubDomains option', () => {
    test('then it removes includeSubDomains directive', () => {
      // GIVEN
      const header = new StrictTransportSecurityHeader({
        maxAge: 86400,
        includeSubDomains: false,
      });
      // WHEN
      const actual = header.toJSON();
      // THEN
      expect(actual).toEqual({
        name: 'Strict-Transport-Security',
        value: 'max-age=86400;preload',
      });
    });
  });
});

describe('given a content security policy header', () => {
  describe('when creating a content security policy report only header', () => {
    test('then it should be equal to a regular content security header', () => {
      // GIVEN
      const opts = {
        reportUri: 'https//dsn.sentry/somewhere',
        defaultSrc: ['*', "'self'", "'none'"],
        scriptSrc: ['*', "'self'", "'unsafe-inline'", "'none'"],
      };
      const expected = new ContentSecurityPolicyHeader(opts).toJSON();
      const reportOnlyHeader = new ContentSecurityPolicyReportOnlyHeader(opts);
      // WHEN
      const actual = reportOnlyHeader.toJSON();
      // THEN
      expect(actual.name).toBe('Content-Security-Policy-Report-Only');
      expect(actual.value).toBe(expected.value);
    });
  });
  describe('when configuration of sources is provided', () => {
    test('then it returns the directives', () => {
      // GIVEN
      const header = new ContentSecurityPolicyHeader({
        reportUri: 'https//dsn.sentry/somewhere',
        defaultSrc: ['*', "'self'", "'none'"],
        scriptSrc: ['*', "'self'", "'unsafe-inline'", "'none'"],
      });
      // WHEN
      const actual = header.toJSON();
      // THEN
      expect(actual).toEqual({
        name: 'Content-Security-Policy',
        value: `report-uri https//dsn.sentry/somewhere;default-src * 'self' 'none';script-src * 'self' 'unsafe-inline' 'none'`,
      });
    });
  });
});

describe('given cache control header', () => {
  describe('when minimal configuration is provided', () => {
    test('then it adds sensitive defaults', () => {
      // GIVEN
      const header = new CacheControlHeader();
      // WHEN
      const actual = header.toJSON();
      // THEN
      expect(actual).toEqual({
        name: 'Cache-Control',
        value: '',
      });
    });
  });
});
