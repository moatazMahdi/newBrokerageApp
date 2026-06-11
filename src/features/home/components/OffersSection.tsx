import React, { useState } from 'react';
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ImageSourcePropType,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { offersSectionStyles, SLIDE_WIDTH } from './offersSection.styles';

export type Offer = {
  id: string;
  image: ImageSourcePropType;
};

interface OffersSectionProps {
  offers: Offer[];
  onOfferPress?: (offer: Offer) => void;
}

const OffersSection: React.FC<OffersSectionProps> = ({ offers, onOfferPress }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / SLIDE_WIDTH);
    setActiveIndex(index);
  };

  return (
    <View style={offersSectionStyles.container}>
      <FlatList
        data={offers}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => onOfferPress?.(item)}
            style={offersSectionStyles.slide}
          >
            <Image source={item.image} style={offersSectionStyles.image} resizeMode="cover" />
          </TouchableOpacity>
        )}
      />
      <View style={offersSectionStyles.dots}>
        {offers.map((_, i) => (
          <View
            key={i}
            style={[offersSectionStyles.dot, i === activeIndex && offersSectionStyles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

export default OffersSection;
