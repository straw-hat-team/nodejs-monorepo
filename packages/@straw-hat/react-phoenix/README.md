# @straw-hat/react-phoenix

A React hooks library for seamlessly integrating Phoenix WebSocket channels
into your React applications. This package provides a set of hooks and context
providers that make it easy to manage Phoenix socket connections and channel
subscriptions in a React-friendly way.

## Reference

- [Reference guides](./docs/reference/index.html) Please use `yarn docs:reference`
  to generate the reference docs.

## How-To

### Quick Start

1. Wrap your application with the `SocketProvider`:

```tsx
import { SocketProvider } from '@straw-hat/react-phoenix';

function App() {
  return (
    <SocketProvider url="ws://your-phoenix-server/socket">
      <YourComponents />
    </SocketProvider>
  );
}
```

2. Use the hooks in your components:

```tsx
import { useChannel, useChannelEvent } from '@straw-hat/react-phoenix';

function ChatRoom() {
  const channel = useChannel({
    topic: 'room:123',
    onJoin: (channel, message) => {
      console.log('Joined successfully!', message);
    },
  });

  useChannelEvent({
    channel,
    event: 'new_message',
    onMessage: (message) => {
      console.log('New message received:', message);
    },
  });

  return <div>Chat Room Component</div>;
}
```

## Example Usage

Here's a complete example showing how to use the hooks together:

```tsx
import { SocketProvider, useChannel, useChannelEvent } from 'phoenix-react-hooks';

function ChatApp() {
  return (
    <SocketProvider url="ws://localhost:4000/socket" options={{ params: { token: 'user-token' } }}>
      <ChatRoom />
    </SocketProvider>
  );
}

function ChatRoom() {
  const [messages, setMessages] = useState([]);

  const channel = useChannel({
    topic: 'room:lobby',
    onJoin: (channel, response) => {
      console.log('Joined lobby:', response);
    },
    onError: (channel, error) => {
      console.error('Failed to join:', error);
    },
  });

  useChannelEvent({
    channel,
    event: 'new_msg',
    onMessage: (msg) => {
      setMessages((prev) => [...prev, msg]);
    },
  });

  const sendMessage = (text) => {
    channel?.push('new_msg', { text });
  };

  return <div>{/* Your chat UI */}</div>;
}
```
