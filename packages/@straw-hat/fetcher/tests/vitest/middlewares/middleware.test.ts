import { describe, expect, test, vi } from 'vitest';
import { composeMiddleware, createMiddleware } from '../../../src/middleware';

describe('createMiddleware', () => {
  test('returns the param as it is', () => {
    const middleware = vi.fn();
    const value = createMiddleware(middleware);
    expect(value).toBe(middleware);
  });
});

describe('composeMiddleware', () => {
  test('defaults to a curry function without params', () => {
    const value = composeMiddleware()(123);
    expect(value).toBe(123);
  });

  test('returns the same function if is a singular composition', () => {
    const fn1 = vi.fn();
    const value = composeMiddleware(fn1);
    expect(value).toBe(fn1);
  });

  test('composes together the function', () => {
    const fn1 = vi.fn();
    const fn2 = vi.fn();
    composeMiddleware(fn1, fn2)('123');
    expect(fn1).toBeCalled();
    expect(fn2).toBeCalled();
  });
});
