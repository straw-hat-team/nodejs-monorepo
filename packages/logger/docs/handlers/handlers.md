# Log Handlers

Logger supports different Log Handlers, Log Handlers allow you to decouple the
generation of the log from the processing of the logs.

The available handlers by default are:

- [ConsoleHandler](./console-handler.md) logs messages to the `console`.

### Setting handlers

You can set a log level when you create your logger instance, here is an example
using Console Log Handler:

```typescript
import { ConsoleHandler } from '@straw-hat/logger/dist/handlers/console-handler';
import { Logger, LogLevels } from '@straw-hat/logger';

const logger = new Logger({
  handlers: [new ConsoleHandler(LogLevels.Error)],
});

// Or use addHandler as well
const handler = new ConsoleHandler(LogLevels.Error);

// Use removeHandler to remove the handler
logger.removeHandler(handler);
```

### Custom handlers

Here is an example of how to create a Log Handler:

```typescript
import { LogHandler, LogEvent } from '@straw-hat/logger';

export class MyAmazingHandler extends LogHandler {
  async handleEvent(event: LogEvent) {
    // Do anything with the log event
  }
}
```
