import * as path from 'node:path';
import { expect, test } from 'vitest';
import FetcherCodegen from '../../src/generators/fetcher';
import { createTmpDir, readPetStoreSpec } from './support-files';

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
    const snapshotName = path.relative(tmpDir.path, filePath);

    if (snapshotName === 'index.ts') {
      // TODO: figure out how to deal with the indeterministic ordering
      // of exports in index.ts
      continue;
    }

    expect(await tmpDir.readFile(filePath)).toMatchSnapshot(snapshotName);
  }

  const pkg = await import(tmpDir.resolve('components/helpers'));

  // Getters
  expect(pkg.getOrderId({ id: '123' })).toBe('123');

  // Booleans
  expect(pkg.isOrderComplete({ complete: true })).toBeTruthy();
  expect(pkg.isOrderComplete({ complete: false })).toBeFalsy();
  expect(pkg.isNotOrderComplete({ complete: true })).toBeFalsy();
  expect(pkg.isNotOrderComplete({ complete: false })).toBeTruthy();

  // Equality
  expect(pkg.isEqualToOrderId({ id: '123' }, '456')).toBeFalsy();
  expect(pkg.isEqualToOrderId({ id: '123' }, '123')).toBeTruthy();

  // Strings
  expect(pkg.getCustomerUsernameLength({ username: 'ubi' })).toBe(3);
  expect(pkg.getUserPhoneLength({ username: 'ubi', phone: undefined })).toBe(undefined);
  expect(pkg.isCustomerUsernameEmpty({ username: '' })).toBeTruthy();
  expect(pkg.isUserPhoneEmpty({ username: 'ubi', phone: undefined })).toBe(undefined);
  expect(pkg.isOrderStatus('placed')).toBeTruthy();
  expect(pkg.isOrderStatus('pepeg')).toBeFalsy();
  expect(pkg.getOrderStatusLowerCased({ status: 'PlAced' })).toBe('placed');
  expect(pkg.getOrderStatusUpperCased({ status: 'placed' })).toBe('PLACED');
  expect(pkg.PET_STATUS).toStrictEqual(['available', 'pending', 'sold']);
  expect(pkg.PET_STATUS_AVAILABLE).toBe('available');
  expect(pkg.PET_STATUS_PENDING).toBe('pending');
  expect(pkg.PET_STATUS_2).toBe('sold');
  expect(pkg.isPetStatus2('sold')).toBeTruthy();
  expect(pkg.isOrderStatusPlaced('placed')).toBeTruthy();
  expect(pkg.isOrderStatusPlaced('approved')).toBeFalsy();
  expect(pkg.isNotOrderStatusPlaced('placed')).toBeFalsy();
  expect(pkg.isNotOrderStatusPlaced('approved')).toBeTruthy();
  expect(pkg.isOrderWithStatusApproved({ status: 'approved' })).toBeTruthy();
  expect(pkg.isOrderWithStatusApproved({ status: 'placed' })).toBeFalsy();
  expect(pkg.isNotOrderWithStatusApproved({ status: 'approved' })).toBeFalsy();
  expect(pkg.isNotOrderWithStatusApproved({ status: 'placed' })).toBeTruthy();
});
