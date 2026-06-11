import React from 'react';
import { I18nManager, ScrollView } from 'react-native';
import HomeHeader from '../components/HomeHeader';
import OffersSection, { Offer } from '../components/OffersSection';
import ServicesSection from '../components/ServicesSection';
import PartnersSection, { Partner } from '../components/PartnersSection';
import { Assets } from '../../../assets';

const { components } = Assets.images;

// TODO: replace with backend data
const DUMMY_PARTNERS: Partner[] = [
  { id: '1', image: components.ourProduct },
  { id: '2', image: components.claims },
  { id: '3', image: components.menu },
];

const DUMMY_OFFERS: Offer[] = [
  { id: '1', image: components.offersDummy },
  { id: '2', image: components.offersDummy },
  { id: '3', image: components.offersDummy },
];

const Home = () => {
  console.log(I18nManager.isRTL);
  return (
    <ScrollView>
      <HomeHeader />
      <OffersSection offers={DUMMY_OFFERS} />
      <ServicesSection />
      <PartnersSection partners={DUMMY_PARTNERS} />
    </ScrollView>
  );
};

export default Home;
