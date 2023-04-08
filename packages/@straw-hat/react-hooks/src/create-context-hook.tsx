import * as React from 'react';

type Hook<T, P> = (props: P) => T;

type ContextHook<T> = () => T;
type Provider<P> = React.FunctionComponent<React.PropsWithChildren<P>>;
type CreateContextHookReturn<T, P> = [Provider<P>, ContextHook<T>];

export function createContextHook<T = unknown, P = unknown>(
  useHook: Hook<T, P>,
  args: { name: string }
): CreateContextHookReturn<T, P> {
  const Context = React.createContext<T | undefined>(undefined);

  function useContextHook(): T {
    const context = React.useContext(Context);

    if (context === undefined) {
      throw new Error(
        `${args.name} Context value is undefined. Make sure you use the ${args.name} Provider before using the context.`
      );
    }

    return context!;
  }

  function Provider(props: React.PropsWithChildren<P>) {
    const value = useHook(props);
    return <Context.Provider value={value}>{props.children}</Context.Provider>;
  }

  return [Provider, useContextHook];
}
