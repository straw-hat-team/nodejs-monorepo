import { LogLevels } from './levels';

export type Metadata = Record<any, any>;

export type Message = string;

export interface ILogger {
  /**
   * For debug-related messages
   */
  debug(message: Message, metadata?: Metadata): void;

  /**
   * For information of any kind
   */
  info(message: Message, metadata?: Metadata): void;

  /**
   * For normal, but significant, messages
   */
  notice(message: Message, metadata?: Metadata): void;

  /**
   * For warnings
   */
  warning(message: Message, metadata?: Metadata): void;

  /**
   * For errors
   */
  error(message: Message, metadata?: Metadata): void;

  /**
   * For critical conditions
   */
  critical(message: Message, metadata?: Metadata): void;

  /**
   * For alerts, actions that must be taken immediately, ex. corrupted database
   */
  alert(message: Message, metadata?: Metadata): void;

  /**
   * For when system is unusable, panics
   */
  emergency(message: Message, metadata?: Metadata): void;

  /**
   * For any log, useful when the log level is dynamically passed.
   */
  log(level: LogLevels, message: Message, metadata?: Metadata): void;
}

export interface StrawHatGlobals {
  STRAW_HAT_GLOBALS: {
    logger?: {
      level?: LogLevels;
    };
  };
}
