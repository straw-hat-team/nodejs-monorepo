import { useRef } from 'react';

export function useCallOnce(callback: Function) {
  const calledRef = useRef(false);
  const returnRef = useRef(null);

  return (...args: any[]) => {
    if (calledRef.current) {
      return returnRef.current;
    }

    returnRef.current = callback(...args);
    calledRef.current = true;

    return returnRef.current;
  };
}
