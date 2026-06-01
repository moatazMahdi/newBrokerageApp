import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const onboardingStyles = StyleSheet.create({
  container: {
    width,
    height,
  },

  backgroundImage: {
    flex: 1,
  },

  gradient: {
    flex: 1,
  },

  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap:32,
  },

  skipText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },

  bottomContent: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: '800',
    lineHeight: 54,
    textAlign: 'right',
  },

  highlightedText: {
    color: '#F5A623',
  },

  description: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 16,
    lineHeight: 28,
    marginTop: 24,
    textAlign: 'right',
  },

  buttonContainer: {
    marginTop: 40,
  },

  button: {
    height: 56,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '700',
  },
  skipContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 10,
  padding: 10,
  borderRadius: 100,
  backgroundColor: 'rgba(255,255,255,0.15)',
},
slideContent: {
  flex: 1,
  justifyContent: 'flex-end',

  paddingHorizontal: 24,
  paddingBottom: 140,
},

screen: {
  flex: 1,
},

fixedHeader: {
  position: 'absolute',

  top: 60,
  left: 24,
  right: 24,

  zIndex: 100,
},

fixedFooter: {
  position: 'absolute',

  bottom: 40,
  left: 24,
  right: 24,
},

});