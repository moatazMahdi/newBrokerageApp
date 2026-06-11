import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppCard from '../../../components/AppCard';
import { Assets } from '../../../assets';
import { hp, wp } from '../../../utils/dimensions';

const { components } = Assets.images;

const SERVICES = [
  { id: '1', title: 'الوثائق', svgIcon: components.policies },
  { id: '2', title: 'المطالبات', svgIcon: components.insuranceClaims },
  { id: '3', title: 'التسعير', svgIcon: components.pricing },
];

interface ServicesSectionProps {
  onServicePress?: (id: string) => void;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ onServicePress }) => (
  <View style={styles.container}>
    <Text style={styles.title}>خدماتنا التأمينية</Text>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: wp(16),
    padding: wp(16),
    marginTop: hp(16),
  },
  title: {
    fontSize: wp(16),
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'right',
    marginBottom: hp(16),
  },
  row: {
    flexDirection: 'row',
    gap: wp(10),
  },
});

export default ServicesSection;
