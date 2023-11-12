import { describe, test, expect, vi } from 'vitest';
import { isBrowser, isSSR, onBrowser, onSSR } from '../../src';
import { withMockedWindow } from '../support-files';

describe('given a "isSSR" function', () => {
  describe('when the function runs on server-side', () => {
    test('then returns true', () => {
      // GIVEN

      // WHEN
      const expected = isSSR();

      // THEN
      expect(expected).toBeTruthy();
    });
  });
  describe('when the function runs on client-side', () => {
    test('then returns true', () => {
      // GIVEN

      // WHEN
      const expected = withMockedWindow(() => isSSR());

      // THEN
      expect(expected).toBeFalsy();
    });
  });
});

describe('given a "isBrowser" function', () => {
  describe('when the function runs on server-side', () => {
    test('then returns true', () => {
      // GIVEN

      // WHEN
      const expected = withMockedWindow(() => isBrowser());

      // THEN
      expect(expected).toBeTruthy();
    });
  });
  describe('when the function runs on client-side', () => {
    test('then returns true', () => {
      // GIVEN

      // WHEN
      const expected = isBrowser();

      // THEN
      expect(expected).toBeFalsy();
    });
  });
});

describe('given a "onSSR" function', () => {
  describe('when the function runs on server-side', () => {
    test('then runs the server-side callback', () => {
      // GIVEN
      const callback = vi.fn();
      const otherwise = vi.fn();

      // WHEN
      onSSR(callback, otherwise);

      // THEN
      expect(callback).toBeCalled();
      expect(otherwise).toBeCalledTimes(0);
    });
  });
  describe('when the function runs on client-side ', () => {
    test('then runs the client-side callback', () => {
      // GIVEN
      const callback = vi.fn();
      const otherwise = vi.fn();

      // WHEN
      withMockedWindow(() => onSSR(callback, otherwise));

      // THEN
      expect(otherwise).toBeCalled();
      expect(callback).toBeCalledTimes(0);
    });
  });
});

describe('given a "onBrowser" function', () => {
  describe('when the function runs on server-side', () => {
    test('then runs the server-side callback', () => {
      // GIVEN
      const callback = vi.fn();
      const otherwise = vi.fn();

      // WHEN
      withMockedWindow(() => onBrowser(callback, otherwise));

      // THEN
      expect(callback).toBeCalled();
      expect(otherwise).toBeCalledTimes(0);
    });
  });
  describe('when the function runs on client-side ', () => {
    test('then runs the client-side callback', () => {
      // GIVEN
      const callback = vi.fn();
      const otherwise = vi.fn();

      // WHEN
      onBrowser(callback, otherwise);

      // THEN
      expect(otherwise).toBeCalled();
      expect(callback).toBeCalledTimes(0);
    });
  });
});
