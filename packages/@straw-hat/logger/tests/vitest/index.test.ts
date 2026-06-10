import { describe, expect, test, vi } from 'vitest';
import { LogEvent, LogHandler, LogLevels, Logger } from '../../src';

class NullableHandler extends LogHandler {
  override handleEvent = vi.fn();
}

class WithoutEventHandler extends LogHandler {}

describe('Logger', () => {
  test('sends a log event to the handlers', () => {
    const handler = new NullableHandler(LogLevels.Notset);
    const logger = new Logger('app', {
      handlers: [handler],
    });
    logger.log(LogLevels.Alert, 'Hello');
    expect(handler.handleEvent).toBeCalled();
  });

  test('adding handlers', () => {
    const handler = new NullableHandler(LogLevels.Notset);
    const logger = new Logger('app').alert('Hello');
    expect(handler.handleEvent).not.toBeCalled();
    logger.addHandler(handler).alert('Hello');
    expect(handler.handleEvent).toBeCalled();
  });

  test('removing handlers', () => {
    const handler = new NullableHandler(LogLevels.Notset);
    new Logger('app').addHandler(handler).alert('Hello').removeHandler(handler).alert('Hello');
    expect(handler.handleEvent).toBeCalledTimes(1);
  });

  test('adding metadata to logger instance', () => {
    const handler = new NullableHandler(LogLevels.Notset);
    new Logger('app').addHandler(handler).addMetadata({ hello: 'world' }).alert('Hello');
    expect(handler.handleEvent.mock.calls[0][0].metadata).toEqual({
      hello: 'world',
    });
  });

  test('sends a debug log level event', () => {
    const handler = new NullableHandler(LogLevels.Notset);
    new Logger('app').addHandler(handler).debug('Hello');
    expect(handler.handleEvent.mock.calls[0][0].level).toEqual(LogLevels.Debug);
  });

  test('sends an info log level event', () => {
    const handler = new NullableHandler(LogLevels.Notset);
    new Logger('app').addHandler(handler).info('Hello');
    expect(handler.handleEvent.mock.calls[0][0].level).toEqual(LogLevels.Info);
  });

  test('sends a notice log level event', () => {
    const handler = new NullableHandler(LogLevels.Notset);
    new Logger('app').addHandler(handler).notice('Hello');
    expect(handler.handleEvent.mock.calls[0][0].level).toEqual(LogLevels.Notice);
  });

  test('sends a warning log level event', () => {
    const handler = new NullableHandler(LogLevels.Notset);
    new Logger('app').addHandler(handler).warning('Hello');
    expect(handler.handleEvent.mock.calls[0][0].level).toEqual(LogLevels.Warning);
  });

  test('sends an error log level event', () => {
    const handler = new NullableHandler(LogLevels.Notset);
    new Logger('app').addHandler(handler).error('Hello');
    expect(handler.handleEvent.mock.calls[0][0].level).toEqual(LogLevels.Error);
  });

  test('sends a critical log level event', () => {
    const handler = new NullableHandler(LogLevels.Notset);
    new Logger('app').addHandler(handler).critical('Hello');
    expect(handler.handleEvent.mock.calls[0][0].level).toEqual(LogLevels.Critical);
  });

  test('sends an alert log level event', () => {
    const handler = new NullableHandler(LogLevels.Notset);
    new Logger('app').addHandler(handler).alert('Hello');
    expect(handler.handleEvent.mock.calls[0][0].level).toEqual(LogLevels.Alert);
  });

  test('sends an emergency log level event', () => {
    const handler = new NullableHandler(LogLevels.Notset);
    new Logger('app').addHandler(handler).emergency('Hello');
    expect(handler.handleEvent.mock.calls[0][0].level).toEqual(LogLevels.Emergency);
  });
});

describe('LogHandler', () => {
  test('when handleEvent is not implemented then throw an error', () => {
    const handler = new WithoutEventHandler(LogLevels.Notset);
    const event = new LogEvent({
      level: LogLevels.Notset,
      logger: 'app',
      message: 'Hello',
      metadata: {},
      time: new Date(),
    });
    expect(() => handler.handleEvent(event)).rejects.toThrow();
  });
  test('rejects out of range events', () => {
    const handler = new NullableHandler(LogLevels.Critical);
    new Logger('app').addHandler(handler).debug('Hello');
    expect(handler.handleEvent).not.toBeCalled();
  });
  test('using global logger level', () => {
    (globalThis as any).STRAW_HAT_GLOBALS = {
      logger: { level: 4 },
    };
    const handler = new NullableHandler(LogLevels.Critical);
    new Logger('app').addHandler(handler).warning('Hello');
    expect(handler.handleEvent).toBeCalled();

    delete (globalThis as any).STRAW_HAT_GLOBALS;
  });
});

describe('LogEvent', () => {
  test('serialize the event to JSON', () => {
    const time = new Date(Date.UTC(1993, 7, 22, 7, 30));
    const event = new LogEvent({
      level: LogLevels.Notset,
      logger: 'app',
      message: 'Hello',
      metadata: {
        hello: 'world',
      },
      time,
    });

    expect(JSON.stringify(event)).toBe(
      '{"logger":"app","level":0,"levelName":"Notset","message":"Hello","metadata":{"hello":"world"},"time":746004600000}',
    );
  });
});
