import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import AppCard from '../../../components/AppCard';
import { Assets } from '../../../assets';
import { hp, wp } from '../../../utils/dimensions';
import AppText from 'src/components/AppText/AppText';

const { components } = Assets.images;

interface ServicesSectionProps {
  onServicePress?: (id: string) => void;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ onServicePress }) => {
  const { t } = useTranslation();

  const SERVICES = [
    { id: '1', title: t('home.services.policies'), svgIcon: components.policies },
    { id: '2', title: t('home.services.claims'), svgIcon: components.insuranceClaims },
    { id: '3', title: t('home.services.pricing'), svgIcon: components.pricing },
  ];

  return (
  <View style={styles.container}>
    <AppText style={styles.title}>{t('home.services.sectionTitle')}</AppText>
    <View style={styles.row}>
      {SERVICES.map((service) => (
        <AppCard
          key={service.id}
          title={service.title}
          svgIcon={service.svgIcon}
          onPress={() => onServicePress?.(service.id)}
        />
      ))}
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: wp(16),
    padding: wp(16),
    marginTop: hp(16),
  },
  title: {
    fontSize: wp(16),
    fontWeight: '400',
    color: '#1A1A1A',
    marginBottom: hp(16),
  },
  row: {
    flexDirection: 'row',
    gap: wp(10),
  },
});

export default ServicesSection;
