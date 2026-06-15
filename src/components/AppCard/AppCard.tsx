import React from 'react';
import { View, Text, Image, Pressable, ImageSourcePropType, ViewStyle } from 'react-native';
import { appCardStyles } from './appCard.styles';
import { SvgView } from '../SvgView/SvgView';

interface AppCardProps {
  title?: string;
  image?: ImageSourcePropType;
  svgIcon?: React.FC<any>;
  onPress?: () => void;
  width?: number;
  cardStyle?: ViewStyle;
}

const AppCard: React.FC<AppCardProps> = ({ title, image, svgIcon, onPress, width, cardStyle }) => (
  <Pressable
    style={[appCardStyles.card, width !== undefined ? { width } : { flex: 1 }, cardStyle]}
    onPress={onPress}
  >
    {svgIcon !== undefined && (
      <View style={appCardStyles.imageContainer}>
        <SvgView svgFile={svgIcon} width="100%" height="100%" />
      </View>
    )}
    {image !== undefined && svgIcon === undefined && (
      <View style={appCardStyles.imageContainer}>
        {image ? (
          <Image
            source={image}
            style={appCardStyles.image}
            resizeMode="contain"
          />
        ) : (
          <View style={appCardStyles.imagePlaceholder} />
        )}
      </View>
    )}
    {title !== undefined && (
      <Text style={appCardStyles.title}>{title}</Text>
    )}
  </Pressable>
);

export default AppCard;
