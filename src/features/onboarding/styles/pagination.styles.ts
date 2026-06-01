import { StyleSheet } from 'react-native';
import { wp } from '../../../utils/dimensions';

export const paginationStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  activeDot: {
    width: wp(80),
    height: 8,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
  },

  inactiveDot: {
    width: wp(80),
    height: 8,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
});