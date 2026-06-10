export enum LogLevels {
  /**
   * Unset level
   */
  Notset,

  /**
   * For debug-related messages
   */
  Debug,

  /**
   * For information of any kind
   */
  Info,

  /**
   * For normal, but significant, messages
   */
  Notice,

  /**
   * For warnings
   */
  Warning,

  /**
   * For errors
   */
  Error,

  /**
   * For critical conditions
   */
  Critical,

  /**
   * For alerts, actions that must be taken immediately, ex. corrupted database
   */
  Alert,

  /**
   * When system is unusable, panics
   */
  Emergency,
}

export type LevelName = keyof typeof LogLevels;

const LEVEL_NAME_MAPPING: Record<LogLevels, LevelName> = {
  [LogLevels.Notset]: 'Notset',
  [LogLevels.Debug]: 'Debug',
  [LogLevels.Info]: 'Info',
  [LogLevels.Notice]: 'Notice',
  [LogLevels.Warning]: 'Warning',
  [LogLevels.Error]: 'Error',
  [LogLevels.Critical]: 'Critical',
  [LogLevels.Alert]: 'Alert',
  [LogLevels.Emergency]: 'Emergency',
};

export function getLevelName(level: LogLevels): LevelName {
  return LEVEL_NAME_MAPPING[level];
}
