import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from '../AppText/AppText';
import { hp, wp } from '../../utils/dimensions';

type Props = {
  label: string;
};

const SectionSeparator = ({ label }: Props) => (
  <View style={styles.container}>
    <View style={styles.line} />
    <AppText size={14} weight="400" color="#6F6F74" style={styles.label}>
      {label}
    </AppText>
    <View style={styles.line} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: wp(12),
    marginVertical: hp(20),
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#F4F4F4',
  },
  label: {
    textAlign: 'center',
  },
});

export default SectionSeparator;
