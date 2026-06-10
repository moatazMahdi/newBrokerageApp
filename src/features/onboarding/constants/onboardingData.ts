import { Assets } from '../../../assets';

import { OnboardingItem } from '../types/onboarding.types';

const {
  images: {
    components: { onBoarding1, onBoarding2, onBoarding3 },
  },
} = Assets;

type Language = 'ar' | 'en';


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

export const STRINGS = {
  ar: {
    title: 'اختار اللغة',
    confirmButton: 'اختار',
    options: {
      ar: 'العربية',
      en: 'الانجليزية',
    },
  },
  en: {
    title: 'Choose Language',
    confirmButton: 'Choose',
    options: {
      ar: 'Arabic',
      en: 'English',
    },
  },
};

export const LANGUAGE_FLAGS: Record<Language, string> = {
  ar: '🇪🇬',
  en: '🇺🇸',
};
