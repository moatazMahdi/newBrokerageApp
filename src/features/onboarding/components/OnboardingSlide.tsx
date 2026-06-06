import React from 'react';

import {
  ImageBackground,
  Text,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { onboardingStyles } from '../styles/onboarding.styles';

import { OnboardingItem } from '../types/onboarding.types';

interface Props {
  item: OnboardingItem;
}

const OnboardingSlide = ({
  item,
}: Props) => {
  const { t } = useTranslation();

  return (
    <View style={onboardingStyles.container}>
      <ImageBackground
        source={item.image}
        resizeMode="cover"
        style={onboardingStyles.backgroundImage}
      >
        <View style={onboardingStyles.slideContent}>
          <Text style={onboardingStyles.title}>
            {t(`onboarding.${item.key}.title`)}{' '}

            <Text style={onboardingStyles.highlightedText}>
              {t(`onboarding.${item.key}.highlightedTitle`)}
            </Text>

            {'\n'}

            {t(`onboarding.${item.key}.secondLine`)}
          </Text>
          <View style={onboardingStyles.line} />

          <Text style={onboardingStyles.description}>
            {t(`onboarding.${item.key}.description`)}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default OnboardingSlide;
