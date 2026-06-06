import React, { useRef, useState } from 'react';

import { FlatList, View, ViewToken } from 'react-native';
import { useTranslation } from 'react-i18next';

import OnboardingSlide from '../components/OnboardingSlide';
import OnboardingHeader from '../components/OnboardingHeader';
import { onboardingData } from '../constants/onboardingData';
import { onboardingStyles } from '../styles/onboarding.styles';
import { useNavigation } from '@react-navigation/native';
import { storage } from '../../../storage/mmkv';
import { STORAGE_KEYS } from '../../../config/storage';
import AppButton from '../../../components/AppButton';

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const flatListRef = useRef<FlatList>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems[0]?.index !== null) {
        setCurrentIndex(viewableItems[0]?.index || 0);
      }
    },
  ).current;

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 50,
  };

const handleCompleteOnboarding = () => {
  storage.set(
    STORAGE_KEYS.HAS_SEEN_ONBOARDING,
    'true',
  );
};

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      handleCompleteOnboarding();
    }
  };

  const handleSkip = () => {
    handleCompleteOnboarding();
  };

  return (
    <View style={onboardingStyles.screen}>
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        renderItem={({ item }) => <OnboardingSlide item={item} />}
      />

      <View style={onboardingStyles.fixedHeader}>
        <OnboardingHeader
          currentIndex={currentIndex}
          total={onboardingData.length}
          onSkip={handleSkip}
        />
      </View>

      <View style={onboardingStyles.fixedFooter}>
        <AppButton
        title={
            currentIndex === onboardingData.length - 1
              ? t('onboarding.start')
              : t('onboarding.next')
          }
          onPress={handleNext}
        />
      </View>
    </View>
  );
};

export default OnboardingScreen;
