import { StyleSheet } from 'react-native';
import { hp, wp } from '../../utils/dimensions';

export const appCardStyles = StyleSheet.create({
  card: {
    backgroundColor: '#F8F9FB',
    borderRadius: wp(12),
    padding: wp(12),
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: wp(12),
    fontWeight: '500',
    color: '#1A1A1A',
    marginTop: hp(8),
    textAlign: 'center',
  },
});
