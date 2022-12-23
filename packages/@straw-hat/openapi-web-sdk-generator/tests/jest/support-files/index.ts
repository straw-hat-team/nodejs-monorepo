import * as path from 'path';
import { Dir } from '../../../src/dir';
import { readOpenApiFile } from '../../../src/helpers';

const TMP_BASE_DIR = path.resolve(__dirname, '..', '..', '..', 'tmp');
const PET_STORE_FILE_PATH = path.resolve(__dirname, 'pet-store.json');

export async function createTmpDir(dirPath: string[]) {
  const dir = new Dir(path.resolve(TMP_BASE_DIR, ...dirPath));
  await dir.resetDir();
  return dir;
}

export function readPetStoreSpec() {
  return readOpenApiFile(PET_STORE_FILE_PATH);
}
