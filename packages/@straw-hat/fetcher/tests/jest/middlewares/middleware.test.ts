import { composeMiddleware, createMiddleware } from '../../../src/middlewares/middleware';

describe('createMiddleware', () => {
  it('returns the param as it is', () => {
    const middleware = jest.fn();
    const value = createMiddleware(middleware);
    expect(value).toBe(middleware);
  });
});

describe('composeMiddleware', () => {
  it('defaults to a curry function without params', () => {
    const value = composeMiddleware()(123);
    expect(value).toBe(123);
  });

  it('returns the same function if is a singular composition', () => {
    const fn1 = jest.fn();
    const value = composeMiddleware(fn1);
    expect(value).toBe(fn1);
  });

  it('composes together the function', () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    composeMiddleware(fn1, fn2)('123');
    expect(fn1).toBeCalled();
    expect(fn2).toBeCalled();
  });
});
