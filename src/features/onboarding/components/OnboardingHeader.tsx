import React from 'react';

import { Text, TouchableOpacity, View } from 'react-native';

import OnboardingPagination from './OnboardingPagination';

import { onboardingStyles } from '../styles/onboarding.styles';
import SvgView from '../../../components/SvgView/SvgView';
import { Assets } from '../../../assets';

interface Props {
  currentIndex: number;
  total: number;
  onSkip: () => void;
}

const OnboardingHeader = ({ currentIndex, total, onSkip }: Props) => {
  const {
    images: {
      components: { closeWhite },
    },
  } = Assets;
  return (
    <View style={onboardingStyles.headerContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onSkip}
        style={onboardingStyles.skipContainer}
      >
        {/* <CloseIcon
          width={16}
          height={16}
        /> */}

        <SvgView svgFile={closeWhite} width={12} height={12} />

        <Text style={onboardingStyles.skipText}>تخطي</Text>
      </TouchableOpacity>

      <OnboardingPagination currentIndex={currentIndex} total={total} />
    </View>
  );
};

export default OnboardingHeader;
