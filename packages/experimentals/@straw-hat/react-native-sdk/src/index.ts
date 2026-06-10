import { Dimensions, ScaledSize } from 'react-native';

// @ts-ignore
export const IS_DEVELOPMENT = __DEV__ === true;

function msp(dimension: ScaledSize, limit: number) {
  return dimension.scale * dimension.width >= limit || dimension.scale * dimension.height >= limit;
}

export enum DeviseTypes {
  tablet = 'tablet',
  phone = 'phone',
}

export enum DeviceOrientationTypes {
  portrait = 'portrait',
  landscape = 'landscape',
}

export function isTablet() {
  const dimension = Dimensions.get('screen');
  return (dimension.scale < 2 && msp(dimension, 1000)) || (dimension.scale >= 2 && msp(dimension, 1900));
}

export function isPhone() {
  return !isTablet();
}

export function getDeviseType() {
  return isTablet() ? DeviseTypes.tablet : DeviseTypes.phone;
}

export function isLandscape() {
  const dimension = Dimensions.get('screen');
  return dimension.width >= dimension.height;
}

export function isPortrait() {
  return !isLandscape();
}

export function getOrientation() {
  return isPortrait() ? DeviceOrientationTypes.portrait : DeviceOrientationTypes.landscape;
}

export function onDevelopment(onDevelopmentCallback: Function, onProductionCallback = Function.prototype) {
  return IS_DEVELOPMENT ? onDevelopmentCallback() : onProductionCallback();
}

export function onProduction(onProductionCallback: Function, onDevelopmentCallback = Function.prototype) {
  return onDevelopment(onDevelopmentCallback, onProductionCallback);
}
