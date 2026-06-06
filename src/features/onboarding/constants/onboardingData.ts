import { Assets } from '../../../assets';

import { OnboardingItem } from '../types/onboarding.types';

const {
  images: {
    components: { onBoarding1, onBoarding2, onBoarding3 },
  },
} = Assets;

export const onboardingData: OnboardingItem[] = [
  {
    id: 1,
    key: 'slide1',
    image: onBoarding1,
  },
  {
    id: 2,
    key: 'slide2',
    image: onBoarding2,
  },
  {
    id: 3,
    key: 'slide3',
    image: onBoarding3,
  },
];
