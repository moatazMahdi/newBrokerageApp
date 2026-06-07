import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Assets } from '../../../assets';
import { wp, hp } from '../../../utils/dimensions';
import { SvgView } from '../../../components/SvgView/SvgView';
import { homeStyles, homeHeaderGradient } from '../styles/home.styles';
import ProductSection from './ProductSection';
import { Product } from '../types/home.types';

const INDIVIDUAL_PRODUCTS: Product[] = [
  { id: '1', title: 'تأمين المركبات', imageUrl: '' },
  { id: '2', title: 'التأمين الطبي', imageUrl: '' },
  { id: '3', title: 'تأمينات اخري', imageUrl: '' },
];

const COMPANY_PRODUCTS: Product[] = [
  { id: '4', title: 'تأمين المركبات', imageUrl: '' },
  { id: '5', title: 'التأمين الطبي', imageUrl: '' },
  { id: '6', title: 'تأمينات اخري', imageUrl: '' },
];

interface HomeHeaderProps {
  notificationCount?: number;
  onNotificationPress?: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({
  notificationCount = 0,
  onNotificationPress,
}) => {
  const { components: { logo, bell } } = Assets.images;

  return (
    <View
      style={[homeStyles.header, { backgroundColor: homeHeaderGradient.colors[0] }]}
    >
      <View style={homeStyles.headerRow}>
        <SvgView svgFile={logo} width={wp(95)} height={hp(32)} />
        <TouchableOpacity style={homeStyles.bellButton} onPress={onNotificationPress}>
          <SvgView svgFile={bell} width={wp(20)} height={hp(20)} />
          {notificationCount > 0 && (
            <View style={homeStyles.badge}>
              <Text style={homeStyles.badgeText}>
                {notificationCount > 99 ? '99+' : notificationCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
       <ProductSection
              individualProducts={INDIVIDUAL_PRODUCTS}
              companyProducts={COMPANY_PRODUCTS}
              
            />
    </View>
  );
};

export default HomeHeader;
