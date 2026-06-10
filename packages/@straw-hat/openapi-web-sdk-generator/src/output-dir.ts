import { Dir } from './dir.js';
import { createDebugger } from './helpers.js';

export class OutputDir extends Dir {
  override debug = createDebugger('out-dir');
}
