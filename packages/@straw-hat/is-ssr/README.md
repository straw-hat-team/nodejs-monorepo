# @straw-hat/is-ssr

Contains some functions that help you to identify if the execution of the code
is happening in the server-side, or in the browser-side

## Usage

- [References](docs/references/index.html) Please use `yarn docs:reference`
  to generate the reference docs.

```tsx
import { isBrowser, isSSR, onBrowser, onSSR } from '@straw-hat/is-ssr';

if (isSSR()) {
  console.log('💻 I am running on the server-side.');
}

if (isBrowser()) {
  console.log('I am running on the browser-side.');
}

// Run the function on Server-Side

onSSR(function ssrCallback() {
  console.log('💻 I am running on the server-side.');
});

onSSR(
  function ssrCallback() {
    console.log('💻 I am running on the server-side.');
  },
  function browserCallback() {
    console.log('I am running on the browser-side.');
  }
);

// Run the function on Browser-Side

onBrowser(
  function browserCallback() {
    console.log('I am running on the browser-side.');
  },
  function ssrCallback() {
    console.log('💻 I am running on the server-side.');
  }
);

onBrowser(function browserCallback() {
  console.log('I am running on the browser-side.');
});
```
