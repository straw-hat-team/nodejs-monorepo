import { LogLevels } from './levels';
import { LogEvent } from './log-event';
import { LogHandler } from './log-handler';
import { ILogger, Message, Metadata } from './types';

export interface LoggerOptions {
  handlers?: LogHandler[];
}

export class Logger implements ILogger {
  readonly #name: string;
  readonly #handlers: Set<LogHandler>;
  #metadata: Metadata;

  constructor(name: string, opts?: LoggerOptions) {
    this.#name = name;
    this.#handlers = new Set(opts?.handlers ?? []);
    this.#metadata = {};
  }

  addHandler(handler: LogHandler) {
    this.#handlers.add(handler);
    return this;
  }

  removeHandler(handler: LogHandler) {
    this.#handlers.delete(handler);
    return this;
  }

  addMetadata(metadata: Metadata) {
    this.#metadata = Object.assign(this.#metadata, metadata);
    return this;
  }

  debug(message: Message, metadata?: Metadata) {
    return this.log(LogLevels.Debug, message, metadata);
  }

  info(message: Message, metadata?: Metadata) {
    return this.log(LogLevels.Info, message, metadata);
  }

  notice(message: Message, metadata?: Metadata) {
    return this.log(LogLevels.Notice, message, metadata);
  }

  warning(message: Message, metadata?: Metadata) {
    return this.log(LogLevels.Warning, message, metadata);
  }

  error(message: Message, metadata?: Metadata) {
    return this.log(LogLevels.Error, message, metadata);
  }

  critical(message: Message, metadata?: Metadata) {
    return this.log(LogLevels.Critical, message, metadata);
  }

  alert(message: Message, metadata?: Metadata) {
    return this.log(LogLevels.Alert, message, metadata);
  }

  emergency(message: Message, metadata?: Metadata) {
    return this.log(LogLevels.Emergency, message, metadata);
  }

  log(level: LogLevels, message: Message, metadata: Metadata = {}) {
    const event = new LogEvent({
      logger: this.#name,
      level,
      message,
      time: new Date(),
      metadata: Object.assign({}, this.#metadata, metadata),
    });

    this.#handlers.forEach((handler) => handler.maybeHandleEvent(event));
    return this;
  }
}
