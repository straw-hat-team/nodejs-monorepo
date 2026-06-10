import * as React from 'react';

const DATA_STATUS_ATTR = 'data-state';

enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Ready = 'ready',
  Error = 'error',
}

export type UseScriptProps = {
  src?: string;
  nonce?: string;
  type?: string;
  noModule?: boolean;
};

export function useScript(props: UseScriptProps) {
  const [status, setStatus] = React.useState(() => (props.src ? Status.Loading : Status.Idle));

  React.useEffect(() => {
    if (!props.src) {
      setStatus(Status.Idle);
      return;
    }

    let script = document.querySelector<HTMLScriptElement>(`script[src="${props.src}"]`);

    if (!script) {
      script = document.createElement('script');
      script.src = props.src;
      script.defer = true;
      script.nonce = props.nonce;
      script.type = props.type ?? 'text/javascript';
      script.noModule = props.noModule ?? false;
      script.setAttribute(DATA_STATUS_ATTR, Status.Loading);
      script.addEventListener('load', setReadyAttr);
      script.addEventListener('error', setErrorAttr);

      document.head.appendChild(script);
    } else {
      setStatus(script.getAttribute(DATA_STATUS_ATTR) as Status);
    }

    function setReadyAttr() {
      script?.setAttribute(DATA_STATUS_ATTR, Status.Ready);
    }

    function setErrorAttr() {
      script?.setAttribute(DATA_STATUS_ATTR, Status.Error);
    }

    function setReadyStatus() {
      setStatus(Status.Ready);
    }

    function setErrorStatus() {
      setStatus(Status.Error);
    }

    script.addEventListener('load', setReadyStatus);
    script.addEventListener('error', setErrorStatus);

    return () => {
      script?.removeEventListener('load', setReadyStatus);
      script?.removeEventListener('error', setErrorStatus);
    };
  }, [props.src]);

  return {
    status,
    isIdle: status === Status.Idle,
    isLoading: status === Status.Loading,
    isReady: status === Status.Ready,
    isError: status === Status.Error,
  };
}
