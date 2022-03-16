import * as React from 'react';

export type UseControlledProps<T = unknown> = {
  controlled?: T;
  default?: T;
};

export function useControlled<T = unknown>(props: UseControlledProps<T>) {
  const controlledRef = React.useRef(props.controlled !== undefined);
  const [valueState, setValue] = React.useState<T | undefined>(props.default);
  const value = controlledRef.current ? props.controlled : valueState;

  const setValueIfUncontrolled: React.Dispatch<T> = React.useCallback((newValue) => {
    if (!controlledRef.current) {
      setValue(newValue);
    }
  }, []);

  return [value, setValueIfUncontrolled];
}
