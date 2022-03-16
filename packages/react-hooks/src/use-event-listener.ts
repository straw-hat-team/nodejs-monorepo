import * as React from 'react';
import { useLatest } from './use-latest';

type Listener<TEvent extends Event> = (event: TEvent) => void;

type UseEventListenerProps<TEvent extends Event> = {
  element: HTMLElement | Window | Document;
  type: string;
  listener: Listener<TEvent>;
  options?: AddEventListenerOptions;
};

export function useEventListener<TEvent extends Event>(props: UseEventListenerProps<TEvent>) {
  const listenerRef = useLatest(props.listener);

  React.useEffect(() => {
    function handler(event: Event) {
      listenerRef.current?.call(props.element, event as TEvent);
    }
    props.element.addEventListener(props.type, handler, props.options);
    return () => props.element.removeEventListener(props.type, handler);
  }, [props.element, props.type, JSON.stringify(props.options)]);
}
