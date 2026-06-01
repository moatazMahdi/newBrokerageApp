import React, {
  useEffect,
  useState,
} from 'react';

import {
  NavigationContainer,
} from '@react-navigation/native';

import AppNavigator from './AppNavigator';

import OnboardingNavigator from './OnboardingNavigator';

import { storage } from '../storage/mmkv';

import { STORAGE_KEYS } from '../config/storage';

export default function RootNavigator() {
  const [
    hasSeenOnboarding,
    setHasSeenOnboarding,
  ] = useState(false);

  useEffect(() => {
    const value = storage.getString(
      STORAGE_KEYS.HAS_SEEN_ONBOARDING,
    );

    setHasSeenOnboarding(
      value === 'true',
    );
  }, []);

  useEffect(() => {
    const listener =
      storage.addOnValueChangedListener(
        key => {
          if (
            key ===
            STORAGE_KEYS.HAS_SEEN_ONBOARDING
          ) {
            const value =
              storage.getString(key);

            setHasSeenOnboarding(
              value === 'true',
            );
          }
        },
      );

    return () => {
      listener.remove();
    };
  }, []);

  return (
    <NavigationContainer key={storage.getString('language') || 'en'}>
      {hasSeenOnboarding ? (
        <AppNavigator />
      ) : (
        <OnboardingNavigator />
      )}
    </NavigationContainer>
  );
}