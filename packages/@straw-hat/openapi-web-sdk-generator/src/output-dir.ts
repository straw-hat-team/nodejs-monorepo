import { Dir } from './dir';
import { createDebugger } from './helpers';

export class OutputDir extends Dir {
  override debug = createDebugger('out-dir');
}
