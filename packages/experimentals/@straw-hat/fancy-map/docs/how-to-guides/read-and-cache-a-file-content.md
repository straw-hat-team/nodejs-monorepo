# Read and Cache a file content

1. Create a map that will be saving the file content:

   ```typescript
   import { FancyMap } from '@straw-hat/fancy-map';
   const fileCache = new FancyMap<string, string>();
   ```

2. Add a function that takes a file path and reads its content:

   ```typescript
   import { FancyMap } from '@straw-hat/fancy-map';

   const fileCache = new FancyMap<string, string>();

   function readTemplate(key: string) {
     // The callback will be trigger only when `key` is not found in the map.
     // It could be useful to do some caching.
     return fs.promises.readFile(key, { encoding: 'utf-8' });
   }
   ```

3. Use `readTemplate` function as a callback if the `key` in the map representing the file path doesn't exist Ensuring
   that only once the file will be read.

   ```typescript
   import { FancyMap } from '@straw-hat/fancy-map';

   const fileCache = new FancyMap<string, string>();

   function readTemplate(key: string) {
     return fs.promises.readFile(key, { encoding: 'utf-8' });
   }

   // The callback will be trigger only when `key` is not found in the map.
   // It could be useful to do some caching.
   await map.getOrSet('template', readTemplate);
   ```
