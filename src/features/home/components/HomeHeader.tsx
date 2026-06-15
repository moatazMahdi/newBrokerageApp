import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Assets } from '../../../assets';
import { wp, hp } from '../../../utils/dimensions';
import { SvgView } from '../../../components/SvgView/SvgView';
import { homeStyles, homeHeaderGradient } from '../styles/home.styles';
import ProductSection from './ProductSection';
import { Product } from '../types/home.types';

interface HomeHeaderProps {
  notificationCount?: number;
  onNotificationPress?: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({
  notificationCount = 0,
  onNotificationPress,
}) => {
  const { t } = useTranslation();
  const { components: { logo, bell, otherInsurance, medicalInsurance, vehicleInsurance, otherCompanyInsurance, transitInsurance, engineeringInsurance } } = Assets.images;

  const INDIVIDUAL_PRODUCTS: Product[] = [
    { id: '3', title: t('home.products.otherInsurance'), image: otherInsurance },
    { id: '2', title: t('home.products.medicalInsurance'), image: medicalInsurance },
    { id: '1', title: t('home.products.vehicleInsurance'), image: vehicleInsurance },
  ];

  const COMPANY_PRODUCTS: Product[] = [
    { id: '6', title: t('home.products.otherInsurance'), image: otherCompanyInsurance },
    { id: '5', title: t('home.products.transitInsurance'), image: transitInsurance },
    { id: '4', title: t('home.products.engineeringInsurance'), image: engineeringInsurance },
  ];

  return (
    <View
      style={[homeStyles.header, { backgroundColor: homeHeaderGradient.colors[0] }]}
    >
      <View style={homeStyles.headerRow}>
        <SvgView svgFile={logo} width={wp(95)} height={hp(32)} />
        <Pressable style={homeStyles.bellButton} onPress={onNotificationPress}>
          <SvgView svgFile={bell} width={wp(20)} height={hp(20)} />
          {notificationCount > 0 && (
            <View style={homeStyles.badge}>
              <Text style={homeStyles.badgeText}>
                {notificationCount > 99 ? '99+' : notificationCount}
              </Text>
            </View>
          )}
        </Pressable>
      </View>
       <ProductSection
              individualProducts={INDIVIDUAL_PRODUCTS}
              companyProducts={COMPANY_PRODUCTS}
              
            />
    </View>
  );
};

export default HomeHeader;
