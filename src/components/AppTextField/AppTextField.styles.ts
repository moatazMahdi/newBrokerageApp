import { I18nManager, StyleSheet } from 'react-native';
import { hp, wp } from '../../utils/dimensions';

export const styles = StyleSheet.create({
  container: {
    marginBottom: hp(16),
  },

  inputContainer: {
    height: hp(52),
    borderWidth: 1.5,
    borderRadius: wp(18),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(16),
    backgroundColor: '#fff',
    gap: wp(8),
  },

  input: {
    flex: 1,
    fontSize: 18,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },

  errorText: {
    marginTop: hp(4),
    marginHorizontal: wp(4),
    textAlign: I18nManager.isRTL ? "right" : 'left',
  },

  separator: {
    width: 1,
    height: hp(30),
    backgroundColor: '#fff',
    // marginHorizontal: wp(12),
  },
});
