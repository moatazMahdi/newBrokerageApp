import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Product, CustomerType } from '../types/home.types';
import { homeStyles } from '../styles/home.styles';
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
          <ProductCard
            key={product.id}
            product={product}
            onPress={onProductPress}
            width={wp(98)}
          />
        ))}
      </View>
    </View>
  );
};

interface ProductCardProps {
  product: Product;
  onPress?: (product: Product) => void;
  width:number
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress,width }) => (
  <TouchableOpacity
    style={[homeStyles.card,{width:width}]}
    onPress={() => onPress?.(product)}
    activeOpacity={0.8}
  >
    <View style={homeStyles.cardImageContainer}>
      {product.imageUrl ? (
        <Image
          source={{ uri: product.imageUrl }}
          style={homeStyles.cardImage}
          resizeMode="contain"
        />
      ) : (
        <View style={homeStyles.cardImagePlaceholder} />
      )}
    </View>
    <Text style={homeStyles.cardTitle}>{product.title}</Text>
  </TouchableOpacity>
);

export default ProductSection;
