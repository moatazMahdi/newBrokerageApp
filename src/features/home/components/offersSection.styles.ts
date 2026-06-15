import { Dimensions, StyleSheet } from 'react-native';
import { hp, wp } from '../../../utils/dimensions';

export const SLIDE_WIDTH = Dimensions.get('window').width;

export const offersSectionStyles = StyleSheet.create({
  container: {
    marginTop: hp(16),
  },
  slide: {
    width: SLIDE_WIDTH,
    paddingHorizontal: wp(16),
  },
  image: {
    width: '100%',
    height: hp(160),
    borderRadius: wp(12),
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: wp(6),
    marginTop: hp(12),
  },
  dot: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
    backgroundColor: '#D9D9D9',
  },
  activeDot: {
    width: wp(20),
    borderRadius: wp(4),
    backgroundColor: '#F5821F',
  },
});
