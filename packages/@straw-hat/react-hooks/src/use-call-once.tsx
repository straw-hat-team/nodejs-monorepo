import * as React from 'react';

export function useCallOnce(callback: Function) {
  const calledRef = React.useRef(false);
  const returnRef = React.useRef();

  return (...args: any[]) => {
    if (calledRef.current) {
      return returnRef.current;
    }

    returnRef.current = callback(...args);
    calledRef.current = true;

    return returnRef.current;
  };
}
