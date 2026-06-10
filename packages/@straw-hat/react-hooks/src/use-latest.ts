import { RefObject, useLayoutEffect, useRef } from 'react';

export function useLatest<T extends unknown>(value: T): RefObject<T> {
  const ref = useRef(value);
  useLayoutEffect(() => {
    ref.current = value;
  });
  return ref;
}
