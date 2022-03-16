import * as React from 'react';

export function usePrevious<T extends unknown>(value: T) {
  const ref = React.useRef<T>();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
