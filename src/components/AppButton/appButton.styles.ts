import {
  StyleSheet,
} from 'react-native';
import { hp } from '../../utils/dimensions';

export const appButtonStyles =
  StyleSheet.create({
    button: {
      height: hp(48),
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 20,
    },

    disabledButton: {
      opacity: 0.4,
    },

    title: {
      fontSize: 18,
      fontWeight: '700',
      color: '#000000',
    },
  });