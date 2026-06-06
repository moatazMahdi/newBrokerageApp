export interface OnboardingItem {
  id: number;
  // Localization key group under `onboarding` (e.g. 'slide1').
  key: 'slide1' | 'slide2' | 'slide3';
  image: any;
}
