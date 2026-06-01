import {
  StyleSheet,
} from 'react-native';

export const appButtonStyles =
  StyleSheet.create({
    button: {
      height: 56,

      borderRadius: 20,

      alignItems: 'center',

      justifyContent: 'center',

      backgroundColor: '#FFFFFF',
    },

    disabledButton: {
      opacity: 0.5,
    },

    title: {
      fontSize: 18,

      fontWeight: '700',

      color: '#000000',
    },
  });