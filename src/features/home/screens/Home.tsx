import React from 'react';
import { I18nManager, ScrollView } from 'react-native';
import HomeHeader from '../components/HomeHeader';
import ProductSection from '../components/ProductSection';
import { Product } from '../types/home.types';



const Home = () => {
  console.log(I18nManager.isRTL)
  return (
    <ScrollView>
      <HomeHeader />
     
    </ScrollView>
  );
};

export default Home;
