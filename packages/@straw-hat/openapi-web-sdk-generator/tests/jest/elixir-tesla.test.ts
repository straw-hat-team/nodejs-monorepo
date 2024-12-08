import { createTmpDir, readPetStoreSpec } from './support-files';
import * as path from 'path';
import ElixirTeslaCodegen from '../../src/generators/elixir-tesla';

test('elixir-tesla generator', async () => {
  // GIVEN
  const tmpDir = await createTmpDir(['elixir-tesla']);
  const openapiDocument = await readPetStoreSpec();

  const generator = new ElixirTeslaCodegen({
    outputDir: tmpDir.path,
  }).setDocument(openapiDocument);

  // WHEN
  await generator.generate();

  // THEN
  for await (const filePath of tmpDir.walkFiles('.')) {
    const snapshotName = path.relative(tmpDir.path, filePath);
    expect(await tmpDir.readFile(filePath)).toMatchSnapshot(snapshotName);
  }
});
