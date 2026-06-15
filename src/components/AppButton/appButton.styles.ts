import { I18nManager, StyleSheet } from 'react-native';

import { hp, wp } from '../../utils/dimensions';

export const appButtonStyles = StyleSheet.create({
  button: {
    height: hp(48),
    borderRadius: hp(12),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(20),
  },

  content: {
    flexDirection: "row-reverse",
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    marginHorizontal: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
    transform: I18nManager.isRTL ? [] : [{ rotate: '180deg' }],
  },

  title: {
    fontSize: hp(16),
    fontWeight: "700",
    textAlign: 'center',
  },

  disabledButton: {
    opacity: 0.4,
  },

  loader: {
    width: wp(70),
    height: hp(70),
  },

});