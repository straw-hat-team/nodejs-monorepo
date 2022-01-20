import { isSSR, isBrowser, onSSR, onBrowser } from '../../src/index';
import { addBrowserContext } from '../support-files';

describe('server side', () => {
  test('check that is server side', () => {
    expect(isSSR()).toBe(true);
  });

  test('run callback on server side', () => {
    const callback = jest.fn();
    const otherwise = jest.fn();

    onSSR(callback, otherwise);

    expect(callback).toBeCalled();
    expect(otherwise).toBeCalledTimes(0);
  });

  test('run otherwise callback on server side', () => {
    const callback = jest.fn();
    const otherwise = jest.fn();

    addBrowserContext(() => onSSR(callback, otherwise));

    expect(otherwise).toBeCalled();
    expect(callback).toBeCalledTimes(0);
  });
});

describe('browser side', () => {
  test('check that is browser side', () => {
    addBrowserContext(() => expect(isBrowser()).toBe(true));
  });

  test('run callback on browser side', () => {
    const callback = jest.fn();
    const otherwise = jest.fn();

    addBrowserContext(() => onBrowser(callback, otherwise));

    expect(callback).toBeCalled();
    expect(otherwise).toBeCalledTimes(0);
  });

  test('run otherwise callback on browser side', () => {
    const callback = jest.fn();
    const otherwise = jest.fn();

    onBrowser(callback, otherwise);

    expect(otherwise).toBeCalled();
    expect(callback).toBeCalledTimes(0);
  });
});
