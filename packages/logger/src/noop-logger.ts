import { ILogger } from './types';

export class NoopLogger implements ILogger {
  alert() {}
  critical() {}
  debug() {}
  emergency() {}
  error() {}
  info() {}
  notice() {}
  warning() {}
  log() {}
}
