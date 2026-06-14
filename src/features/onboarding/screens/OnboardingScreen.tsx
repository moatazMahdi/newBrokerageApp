import React, { useCallback, useEffect, useRef, useState } from 'react';

import { FlatList, View, ViewToken } from 'react-native';
import { useTranslation } from 'react-i18next';

import OnboardingSlide from '../components/OnboardingSlide';
import OnboardingHeader from '../components/OnboardingHeader';
import { onboardingData } from '../constants/onboardingData';
import { onboardingStyles } from '../styles/onboarding.styles';
import { storage } from '../../../storage/mmkv';
import { STORAGE_KEYS } from '../../../config/storage';
import AppButton from '../../../components/AppButton';
import { Assets } from 'src/assets';

const { OnboardingNextArrow } = Assets.images.components;
const SLIDE_DELAY = 3000;

const OnboardingScreen = () => {
  const { t } = useTranslation();

  const flatListRef = useRef<FlatList>(null);
  const autoAdvanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const isLastSlide = currentIndex === onboardingData.length - 1;

  const clearAutoAdvanceTimer = useCallback(() => {
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
  }, []);

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

  const handleCompleteOnboarding = useCallback(() => {
    storage.set(
      STORAGE_KEYS.HAS_SEEN_ONBOARDING,
      'true',
    );
  }, []);

  const handleNext = useCallback(() => {
    clearAutoAdvanceTimer();

    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      handleCompleteOnboarding();
    }
  }, [clearAutoAdvanceTimer, currentIndex, handleCompleteOnboarding]);

  const handleSkip = useCallback(() => {
    clearAutoAdvanceTimer();
    handleCompleteOnboarding();
  }, [clearAutoAdvanceTimer, handleCompleteOnboarding]);

  const handleScrollBeginDrag = useCallback(() => {
    clearAutoAdvanceTimer();
    setIsUserInteracting(true);
  }, [clearAutoAdvanceTimer]);

  const handleScrollSettled = useCallback(() => {
    setIsUserInteracting(false);
  }, []);

  useEffect(() => {
    if (isUserInteracting || isLastSlide) {
      return clearAutoAdvanceTimer;
    }

    clearAutoAdvanceTimer();
    autoAdvanceTimerRef.current = setTimeout(() => {
      handleNext();
    }, SLIDE_DELAY);

    return clearAutoAdvanceTimer;
  }, [clearAutoAdvanceTimer, currentIndex, handleNext, isLastSlide, isUserInteracting]);

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
        onScrollBeginDrag={handleScrollBeginDrag}
        onScrollEndDrag={handleScrollSettled}
        onMomentumScrollEnd={handleScrollSettled}
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
            isLastSlide
              ? t('onboarding.start')
              : t('onboarding.next')
          }
          onPress={handleNext}
          variant='secondary'
          size="full"
          leftIcon={!isLastSlide ? OnboardingNextArrow : undefined}
        />
      </View>
    </View>
  );
};

export default OnboardingScreen;
