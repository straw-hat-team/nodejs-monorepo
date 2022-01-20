# @straw-hat/react-fullscreen

A React hook for interacting with the Fullscreen API.

- [How-To Guides](#how-to-guides)
- [References](./docs/references/index.html) Please use `yarn docs:reference`
  to generate the reference docs.

## How-To Guides

### Create a Fullscreen Toggler Button

An example of a fullscreen button using https://material-ui.com/

1. Import the dependencies:

   ```tsx
   import IconButton from '@material-ui/core/IconButton';
   import FullscreenIcon from '@material-ui/icons/Fullscreen';
   import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
   import * as React from 'react';

   import { useFullscreen } from '@straw-hat/react-fullscreen';
   ```

2. Define the `FullscreenButton` component, and create a `ref` that with the targeted element that will display in
   fullscreen mode:

   ```tsx
   // ...
   export function FullscreenButton() {
     const target = React.useRef(window.document.body);
     return null;
   }
   ```

3. Pass the targeted element to the `useFullscreen` hook:

   ```tsx
   export function FullscreenButton() {
     const target = React.useRef(window.document.body);
     const { isFullscreen, toggleFullscreen } = useFullscreen(target);
     // ...
   }
   ```

4. Connect the data and the behavior to the UI:

   ```tsx
   // ...
   export function FullscreenButton() {
     const target = React.useRef(window.document.body);
     const { isFullscreen, toggleFullscreen } = useFullscreen(target);

     return (
       <IconButton color="inherit" onClick={toggleFullscreen}>
         {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
       </IconButton>
     );
   }
   ```
