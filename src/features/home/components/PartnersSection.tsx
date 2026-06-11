import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageSourcePropType, FlatList } from 'react-native';
import AppCard from '../../../components/AppCard';
import { hp, wp } from '../../../utils/dimensions';

export type Partner = {
  id: string;
  image: ImageSourcePropType; // local asset now; { uri: backendUrl } when API is ready
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
}) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity onPress={onViewAll}>
        <Text style={styles.viewAll}>رؤية الكل</Text>
      </TouchableOpacity>
      <Text style={styles.title}>شركائنا</Text>
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

const styles = StyleSheet.create({
  container: {
    marginTop: hp(16),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(16),
    paddingHorizontal: wp(16),
  },
  title: {
    fontSize: wp(18),
    fontWeight: '700',
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
