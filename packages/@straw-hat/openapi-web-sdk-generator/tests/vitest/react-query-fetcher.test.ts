import * as path from 'path';
import { expect, test } from 'vitest';
import ReactQueryFetcherCodegen from '../../src/generators/react-query-fetcher';
import { createTmpDir, readPetStoreSpec } from './support-files';

test('react-query-fetcher generator', async () => {
  // GIVEN
  const tmpDir = await createTmpDir(['react-query-fetcher']);
  const openapiDocument = await readPetStoreSpec();

  const generator = new ReactQueryFetcherCodegen({
    outputDir: tmpDir.path,
    packageName: '@my-sdk/pepeg',
  }).setDocument(openapiDocument);

  // WHEN
  await generator.generate();

  // THEN
  for await (const filePath of tmpDir.walkFiles('.')) {
    const snapshotName = path.relative(tmpDir.path, filePath);

    if (snapshotName === 'index.ts') {
      // TODO: figure out how to deal with the indeterministic ordering
      // of exports in index.ts
      continue;
    }

    expect(await tmpDir.readFile(filePath)).toMatchSnapshot(snapshotName);
  }
});
