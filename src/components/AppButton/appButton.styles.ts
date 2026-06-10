import { I18nManager, StyleSheet } from 'react-native';

import { hp } from '../../utils/dimensions';

export const appButtonStyles = StyleSheet.create({
  button: {
    height: hp(48),
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  content: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: 'center',
    paddingHorizontal: 2,
    paddingVertical: 4,
  },

  disabledButton: {
    opacity: 0.4,
  },

  loader: {
    width: 70,
    height: 70,
  },

});