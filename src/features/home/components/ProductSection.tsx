import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Product, CustomerType } from '../types/home.types';
import { homeStyles } from '../styles/home.styles';
import AppCard from '../../../components/AppCard';
import { Assets } from '../../../assets';
import { SvgView } from '../../../components/SvgView/SvgView';
import { hp, wp } from '../../../utils/dimensions';

interface ProductSectionProps {
  individualProducts?: Product[];
  companyProducts?: Product[];
  onProductPress?: (product: Product) => void;
}

const ProductSection: React.FC<ProductSectionProps> = ({
  individualProducts = [],
  companyProducts = [],
  onProductPress,
}) => {
  const [activeTab, setActiveTab] = useState<CustomerType>('individuals');

  const products = activeTab === 'individuals' ? individualProducts : companyProducts;
    const { components: { userTab, building } } = Assets.images;

  return (
    <View style={homeStyles.productSection}>
      <View style={homeStyles.productSectionHeader}>
        <Text style={homeStyles.productSectionTitle}>المنتجات التأمينية</Text>
        <View style={homeStyles.tabsRow}>
         
          <TouchableOpacity
            style={[homeStyles.tab, activeTab === 'individuals' && homeStyles.activeTab]}
            onPress={() => setActiveTab('individuals')}
          >
                   <SvgView svgFile={userTab} width={wp(12)} height={hp(12)} color={activeTab === 'individuals' ? '#FFFFFF' : '#6F6F74'} />
            <Text style={[homeStyles.tabText, activeTab === 'individuals' && homeStyles.activeTabText]}>
              أفراد
            </Text>
          </TouchableOpacity>
           <TouchableOpacity
            style={[homeStyles.tab, activeTab === 'companies' && homeStyles.activeTab]}
            onPress={() => setActiveTab('companies')}
          >
                               <SvgView svgFile={building} width={wp(12)} height={hp(12)} color={activeTab === 'individuals' ? '#FFFFFF' : '#6F6F74'} />
            <Text style={[homeStyles.tabText, activeTab === 'companies' && homeStyles.activeTabText]}>
              شركات
            </Text>

          </TouchableOpacity>
        </View>
      </View>

      <View style={homeStyles.cardsRow}>
        {products.map((product) => (
          <AppCard
            key={product.id}
            title={product.title}
            image={product.image}
            onPress={() => onProductPress?.(product)}
          />
        ))}
      </View>
    </View>
  );
};

export default ProductSection;
