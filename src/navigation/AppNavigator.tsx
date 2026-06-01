import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from './routes';
import Home from '../screens/home';
import ButtonTab from './ButtonTab';
import OnboardingScreen from '../features/onboarding/screens/OnboardingScreen';


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false  }}>
      <Stack.Screen name={Routes.BUTTON_TAB} component={ButtonTab} />
      {/* <Stack.Screen name={Routes.HOME} component={Home} /> */}
    </Stack.Navigator>
  );
}
