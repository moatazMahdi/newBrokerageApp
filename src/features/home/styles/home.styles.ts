import { StyleSheet, Dimensions, I18nManager } from 'react-native';
import { hp, wp } from '../../../utils/dimensions';

const { width } = Dimensions.get('window');
const SECTION_H_PADDING = wp(16);
const CARD_GAP = wp(10);
// const CARD_WIDTH = (width - SECTION_H_PADDING * 2 - CARD_GAP * 2) / 3;

export const homeHeaderGradient = {
  colors: ['#1840A0', '#1A326A'],
  locations: [0, 0.8177] as [number, number],
  angle: 237.36,
};

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    // height: 316,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    padding:wp(12)
  },
  headerRow: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: hp(50),
  },
  bellButton: {
    padding: 10,
    borderRadius: wp(12),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -wp(-3),
    right: -wp(-4),
    borderRadius: wp(12),
    backgroundColor: '#F5821F',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3.5,
  },
  badgeText: {
    color: 'white',
    fontSize: 8,
    fontWeight: '700',
  },

  // Product Section
  productSection: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: wp(16),
    marginTop:hp(20)
  },
  productSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(20),
  },
  productSectionTitle: {
    fontSize: wp(16),
    fontWeight: '400',
    lineHeight: 24,
    color: '#1A1A1A',
    flexShrink: 1,
    marginRight: wp(8),
  },
  tabsRow: {
    backgroundColor: '#F8F9FB',
    flexDirection: 'row',
    gap: wp(8),
    padding: 4,
    borderRadius: 8,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
    paddingVertical: hp(8),
    paddingHorizontal: wp(14),
    borderRadius: wp(8),
    backgroundColor: '#FFFFFFB2',
  },
  activeTab: {
    backgroundColor: '#1840A0',
  },
  tabText: {
    fontSize: wp(12),
    fontWeight: '500',
    color: '#6F6F74',
  },
  activeTabText: {
    
    color: '#FFFFFF',
    fontWeight: '700',
  },
  tabIcon: {
    fontSize: wp(13),
  },

  // Product Cards
  cardsRow: {
    flexDirection: 'row',
    gap: CARD_GAP,
  },
  card: {
    backgroundColor: '#F8F9FB',
    borderRadius: wp(12),
    padding:wp(12),
    justifyContent:"center",
    alignItems:"center"

  },
  cardImageContainer: {
    width: wp(68),
    height:hp(50),
    aspectRatio: 1,
    backgroundColor: '#F7F8FF',
    // alignItems: 'center',
    // justifyContent: 'center',
    // padding: wp(12),
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E8EDFF',
    borderRadius: wp(8),
  },
  cardTitle: {
    fontSize: wp(12),
    fontWeight: '500',
    color: '#1A1A1A',
    marginTop:hp(8)
  },
});
