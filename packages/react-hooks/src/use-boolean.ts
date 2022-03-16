import * as React from 'react';

export function useBoolean(initial: boolean | (() => boolean)) {
  const [value, setValue] = React.useState(initial);

  function toggle() {
    return setValue((v) => !v);
  }

  function setTrue() {
    return setValue(true);
  }

  function setFalse() {
    return setValue(false);
  }

  return {
    value,
    setValue,
    toggle,
    setTrue,
    setFalse,
  };
}
