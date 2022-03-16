import { isSSR, isBrowser, onSSR, onBrowser } from '../../src';
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
      const callback = jest.fn();
      const otherwise = jest.fn();

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
      const callback = jest.fn();
      const otherwise = jest.fn();

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
      const callback = jest.fn();
      const otherwise = jest.fn();

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
      const callback = jest.fn();
      const otherwise = jest.fn();

      // WHEN
      onBrowser(callback, otherwise);

      // THEN
      expect(otherwise).toBeCalled();
      expect(callback).toBeCalledTimes(0);
    });
  });
});
