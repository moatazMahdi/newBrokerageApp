import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageSourcePropType, FlatList, I18nManager } from 'react-native';
import { useTranslation } from 'react-i18next';
import AppCard from '../../../components/AppCard';
import { hp, wp } from '../../../utils/dimensions';
import AppText from 'src/components/AppText/AppText';
import i18n from 'src/localization';

export type Partner = {
  id: string;
  image: ImageSourcePropType; 
};

interface PartnersSectionProps {
  partners: Partner[];
  onViewAll?: () => void;
  onPartnerPress?: (partner: Partner) => void;
}

const PartnersSection: React.FC<PartnersSectionProps> = ({
  partners,
  onViewAll,
  onPartnerPress,
}) => {
  const { t } = useTranslation();

  return (
  <View style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity onPress={onViewAll}>
        <AppText style={styles.viewAll}>{t('home.partners.viewAll')}</AppText>
      </TouchableOpacity>
      <AppText style={styles.title}>{t('home.partners.sectionTitle')}</AppText>
    </View>
    <FlatList
      data={partners}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item }) => (
        <AppCard
          image={item.image}
          onPress={() => onPartnerPress?.(item)}
          cardStyle={styles.card}
          width={wp(110)}
        />
      )}
    />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: hp(16),
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(16),
    paddingHorizontal: wp(16),
  },
  title: {
    
    fontSize: wp(16),
    fontWeight: '400',
    color: '#1A1A1A',
  },
  viewAll: {
    fontSize: wp(13),
    color: '#8A8A8E',
  },
  listContent: {
    paddingHorizontal: wp(16),
  },
  separator: {
    width: wp(10),
  },
  card: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
});

export default PartnersSection;
