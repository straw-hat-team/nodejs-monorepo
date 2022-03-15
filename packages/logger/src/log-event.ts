import { getLevelName, LevelName, LogLevels } from './levels';
import { Message, Metadata } from './types';

export interface LogEventOptions {
  logger: string;
  level: LogLevels;
  message: Message;
  metadata: Metadata;
  time: Date;
}

export class LogEvent {
  readonly logger: string;
  readonly levelName: LevelName;
  readonly level: LogLevels;
  readonly message: Message;
  readonly time: Date;
  metadata: Metadata;

  constructor(opts: LogEventOptions) {
    this.logger = opts.logger;
    this.level = opts.level;
    this.message = opts.message;
    this.metadata = opts.metadata;
    this.time = opts.time;
    this.levelName = getLevelName(opts.level);
  }

  toJSON() {
    return {
      logger: this.logger,
      level: this.level,
      levelName: this.levelName,
      message: this.message,
      metadata: this.metadata,
      time: this.time.getTime(),
    };
  }
}
