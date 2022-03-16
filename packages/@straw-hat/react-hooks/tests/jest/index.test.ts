import { act, renderHook } from '@testing-library/react-hooks';
import { useBoolean, useCallOnce } from '../../src';

describe('given useCallOnce hook', () => {
  test('when running the callback multiple times then it only runs once', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useCallOnce(callback));
    expect(callback).not.toBeCalled();
    act(() => result.current());
    act(() => result.current());
    expect(callback).toBeCalledTimes(1);
  });
});

describe('given useBoolean hook', () => {
  test('when toggling then it toggles the boolean value', () => {
    const { result } = renderHook(() => useBoolean(true));
    expect(result.current.value).toBeTruthy();
    act(() => result.current.toggle());
    expect(result.current.value).toBeFalsy();
    act(() => result.current.toggle());
    expect(result.current.value).toBeTruthy();
  });
  test('when setting the value to false then it sets the value to false', () => {
    const { result } = renderHook(() => useBoolean(true));
    expect(result.current.value).toBeTruthy();
    act(() => result.current.setFalse());
    expect(result.current.value).toBeFalsy();
  });
  test('when setting the value to true then it sets the value to true', () => {
    const { result } = renderHook(() => useBoolean(false));
    expect(result.current.value).toBeFalsy();
    act(() => result.current.setTrue());
    expect(result.current.value).toBeTruthy();
  });
});
