import * as path from 'path';
import { createTmpDir, readPetStoreSpec } from './support-files';
import ReactQueryFetcherCodegen from '../../src/generators/react-query-fetcher';
import FetcherCodegen from '../../src/generators/fetcher';

test('fetcher generator', async () => {
  // GIVEN
  const tmpDir = await createTmpDir(['fetcher']);
  const openapiDocument = await readPetStoreSpec();
  const generator = new FetcherCodegen({
    outputDir: tmpDir.path,
  }).setDocument(openapiDocument);

  // WHEN
  await generator.generate();

  // THEN
  for await (const filePath of tmpDir.walkFiles('.')) {
    const snaptShotName = path.relative(tmpDir.path, filePath);
    expect(await tmpDir.readFile(filePath)).toMatchSnapshot(snaptShotName);
  }
});

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
    const snaptShotName = path.relative(tmpDir.path, filePath);
    expect(await tmpDir.readFile(filePath)).toMatchSnapshot(snaptShotName);
  }
});
