import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

/**
 * width scale
 */
export const wp = (size: number) => {
  return (width / BASE_WIDTH) * size;
};

/**
 * height scale
 */
export const hp = (size: number) => {
  return (height / BASE_HEIGHT) * size;
};

/**
 * font scale
 */
export const fs = (size: number) => {
  const scale = Math.min(width / BASE_WIDTH, height / BASE_HEIGHT);
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

/**
 * spacing scale
 */
export const sp = (size: number) => {
  const scale = width / BASE_WIDTH;
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};
