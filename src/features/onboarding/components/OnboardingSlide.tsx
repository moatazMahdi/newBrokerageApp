import React from 'react';

import {
  ImageBackground,
  Text,
  View,
} from 'react-native';

import { onboardingStyles } from '../styles/onboarding.styles';

import { OnboardingItem } from '../types/onboarding.types';

interface Props {
  item: OnboardingItem;
}

const OnboardingSlide = ({
  item,
}: Props) => {
  return (
    <View style={onboardingStyles.container}>
      <ImageBackground
        source={item.image}
        resizeMode="cover"
        style={onboardingStyles.backgroundImage}
      >
        <View style={onboardingStyles.slideContent}>
         <Text style={onboardingStyles.title}>
  {item.title}{' '}

  <Text
    style={
      onboardingStyles.highlightedText
    }
  >
    {item.highlightedTitle}
  </Text>

  {'\n'}

  {item.secondLine}
</Text>

          <Text style={onboardingStyles.description}>
            {item.description}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default OnboardingSlide;