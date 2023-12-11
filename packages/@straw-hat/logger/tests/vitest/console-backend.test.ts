import { describe, expect, test, vi } from 'vitest';
import { LogEvent, LogLevels } from '../../src';
import { ConsoleHandler } from '../../src/handlers/console-handler';

function createConsole() {
  return {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  };
}

describe('ConsoleHandler', () => {
  test('changing the log level', () => {
    const handler = new ConsoleHandler(LogLevels.Notset);
    handler.setLevel(LogLevels.Info);
    expect(handler.level).toBe(LogLevels.Info);
  });
  test('formats the prefix of the message properly', () => {
    const mockConsole = createConsole();
    const handler = new ConsoleHandler(LogLevels.Notset, { console: mockConsole });
    handler.handleEvent(
      new LogEvent({
        logger: 'app',
        level: LogLevels.Warning,
        message: 'Hello, World',
        time: new Date('2020-01-01T00:00:00'),
        metadata: { hello: 'world' },
      }),
    );
    expect(mockConsole.warn).toBeCalledWith('[Warning] 00:00.0 - Hello, World', { hello: 'world' });

    handler.handleEvent(
      new LogEvent({
        logger: 'app',
        level: LogLevels.Warning,
        message: 'Hello, World',
        time: new Date('2020-01-01T12:30:00'),
        metadata: { hello: 'world' },
      }),
    );
    expect(mockConsole.warn).toBeCalledWith('[Warning] 30:00.0 - Hello, World', { hello: 'world' });
  });
});
