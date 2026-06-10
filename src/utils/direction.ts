import { I18nManager } from 'react-native';
import type { FlexStyle, TextStyle } from 'react-native';

export const isRTL = (): boolean => I18nManager.isRTL;

/** Text alignment that follows the active direction. */
export const textAlign = (): TextStyle['textAlign'] =>
  I18nManager.isRTL ? 'right' : 'left';

/** Row direction that follows the active direction. */
export const flexRowDirection = (): FlexStyle['flexDirection'] =>
  I18nManager.isRTL ? 'row-reverse' : 'row';
