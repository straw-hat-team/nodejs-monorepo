export type ContextDir = string;

export type Environments = 'development' | 'production' | 'test';

export interface TsConfig {
  compilerOptions?: {
    paths?: {};
  };
}
