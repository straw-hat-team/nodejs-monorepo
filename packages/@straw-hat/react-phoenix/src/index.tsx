import { Channel, Socket, SocketConnectOption } from 'phoenix';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

type SocketState = { socket: Socket | null };

export const SocketContext = createContext<SocketState | undefined>(undefined);

function useSocket(props: { url: string; options?: Partial<SocketConnectOption> }) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const s = new Socket(props.url, props.options);
    s.connect();
    setSocket(s);

    return () => {
      s.disconnect();
      setSocket(null);
    };
  }, [props.options, props.url]);

  return {
    socket,
  };
}

export function SocketProvider(props: {
  children: React.ReactNode;
  options?: Partial<SocketConnectOption>;
  url: string;
}) {
  const value = useSocket({
    options: props.options,
    url: props.url,
  });
  return <SocketContext.Provider value={value}>{props.children}</SocketContext.Provider>;
}

function useSocketContext() {
  const value = useContext(SocketContext);
  if (value === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return value.socket;
}

export function useChannel<Message extends unknown>(props: {
  enabled?: boolean;
  topic: string;
  params?: object;
  onJoin?: (channel: Channel, message: Message) => void;
  onError?: (channel: Channel, message: Message) => void;
  onTimeout?: () => void;
}) {
  const { enabled = true } = props;

  const socket = useSocketContext();
  const [channel, setChannel] = useState<Channel | null>(null);
  const onJoin = useRef(props.onJoin);
  const onError = useRef(props.onError);
  const onTimeout = useRef(props.onTimeout);

  useEffect(() => {
    if (socket === null || !enabled) {
      return;
    }

    const ch = socket.channel(props.topic, props.params);

    ch.join()
      .receive('ok', (message) => onJoin.current?.(ch, message))
      .receive('error', (message) => onError.current?.(ch, message))
      .receive('timeout', () => onTimeout.current?.());

    setChannel(ch);
    return () => {
      ch.leave();
      setChannel(null);
    };
  }, [socket, props.topic, props.params, enabled]);

  return channel;
}

export function useChannelEvent<Message extends unknown>(props: {
  channel: Channel | null;
  event: string;
  onMessage: (message: Message) => void;
}) {
  const onMessage = useRef(props.onMessage);

  useEffect(() => {
    const ref = props.channel?.on(props.event, onMessage.current);

    return () => {
      props.channel?.off(props.event, ref);
    };
  }, [props.channel, props.event]);
}
