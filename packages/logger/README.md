# @straw-hat/logger

A logging library.

## Usage

- [Reference guides](./docs/reference/index.html) Please use `yarn docs:reference`
  to generate the reference docs.

Create a logger instance:

```typescript
import { ConsoleHandler } from '@straw-hat/logger/dist/handlers/console-handler';
import { Logger, LogLevels } from '@straw-hat/logger';

const logger = new Logger('app', {
  handlers: [
    // Log everything
    new ConsoleHandler(LogLevels.Notset),
  ],
});

// For debug-related messages.
logger.debug('a debug log');

// For information of any kind.
logger.info('a info log');

// For normal, but significant, messages.
logger.notice('a notice log');

// For warnings.
logger.warning('a warning log');

// For errors.
logger.error('a error log');

// For critical conditions.
logger.critical('a critical log');

// For alerts, actions that must be taken immediately, ex. corrupted database.
logger.alert('a alert log');

// For when system is unusable, panics.
logger.emergency('a emergency log');

// Or you can call `log` directly.
logger.log(LogLevels.Notice, 'a notice log');

// For example, when handling an error:
try {
  // Do something ...
} catch (error) {
  logger.error('error happened', { error });
}
```

You can also create a no-op logger, useful for disabling production logs and
save some bytes.

```ts
import { NoopLogger } from '@straw-hat/logger';

// It does nothing
const noopLogger = new NoopLogger();
```

### Filtering log events

Log events are filter by the log level set in the log handler. The log handler
filter any event that is below specified log level.

The supported levels, ordered by precedence, are:

|   Level   | Order |
| :-------: | :---: |
|  Notset   |   0   |
|   Debug   |   1   |
|   Info    |   2   |
|  Notice   |   3   |
|  Warning  |   4   |
|   Error   |   5   |
| Critical  |   6   |
|   Alert   |   7   |
| Emergency |   8   |

You could also override the log level for all the log handlers globally:

```typescript
globalThis.STRAW_HAT_GLOBALS = {
  logger: {
    level: 5, // Error
  },
};
```

That will take present over all the instance log handler level.

### Metadata

You can pass metadata related to the log event. That is useful for passing
information related to the log event.

```typescript
logger.error('invalid account', {
  accountId: '123',
});
```

You could also set default metadata for all the log events.

```typescript
logger.addMetadata({
  authenticatedUser: '123',
  deploymentId: '123',
});
```

## What is next?

- Read about [Handlers](./docs/handlers/handlers.md)
