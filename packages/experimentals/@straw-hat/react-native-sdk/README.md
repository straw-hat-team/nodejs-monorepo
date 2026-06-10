# @straw-hat/react-native

## Usage

```ts
import {
  isTablet,
  isPhone,
  getDeviseType,
  isLandscape,
  isPortrait,
  getOrientation,
  onDevelopment,
  onProduction,
} from '@straw-hat/react-native';
import * as Stylesheet from '@straw-hat/react-native/stylesheet';

// Returns if the device is a tablet
isTablet();

// Returns if the device is a phone
isPhone();

// Returns the device type
getDeviseType();

// Returns if the device is in landscape
isLandscape();

// Returns if the device is in portrait
isPortrait();

// Returns if the orientation of the device
getOrientation();

// Runs the callbacks based on the environment
onDevelopment(function developmentCallback() {
  console.log('💻 I am running in development.');
});

onDevelopment(
  function developmentCallback() {
    console.log('💻 I am running in development.');
  },
  function productionCallback() {
    console.log('I am running in production.');
  },
);

// Runs the callbacks based on the environment
onProduction(
  function productionCallback() {
    console.log('I am running in production.');
  },
  function developmentCallback() {
    console.log('💻 I am running in development.');
  },
);

onProduction(function productionCallback() {
  console.log('I am running in production.');
});

// Allow you to define the styles for iOS and Android in a cohesive way.
const styles = Stylesheet.create({
  // Shared styles
  ios: {
    // all your iOS styles here
  },
  android: {
    // all your Android styles here
  },
});

// It takes a number and respect the pixel ratio across the devices.
const value = Stylesheet.normalize(20);
```
