import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../features/onboarding/screens/OnboardingScreen';
import LanguageSelectionScreen from '../features/onboarding/screens/LanguageSelectionScreen';
import { storage } from '../storage/mmkv';
import { STORAGE_KEYS } from '../config/storage';
import { Routes } from './routes';

const Stack = createNativeStackNavigator();

const OnboardingNavigator = () => {
  const hasSelectedLanguage =
    storage.getString(STORAGE_KEYS.HAS_SELECTED_LANGUAGE) === 'true';

  return (
    <Stack.Navigator
      initialRouteName={hasSelectedLanguage ? Routes.ON_BOARDING : Routes.LANGUAGE_SELECTION}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={Routes.LANGUAGE_SELECTION}
        component={LanguageSelectionScreen}
      />
      <Stack.Screen
        name={Routes.ON_BOARDING}
        component={OnboardingScreen}
      />
    </Stack.Navigator>
  );
};

export default OnboardingNavigator;