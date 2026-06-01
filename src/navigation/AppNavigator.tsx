import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from './routes';
import ButtonTab from './ButtonTab';
import Login from '../features/auth/screens/Login';


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{
    headerShown: false,
    contentStyle: {
      backgroundColor: 'transparent',
    },
  }}>
      <Stack.Screen name={Routes.LOGIN} component={Login} />
      <Stack.Screen name={Routes.BUTTON_TAB} component={ButtonTab} />
      {/* <Stack.Screen name={Routes.HOME} component={Home} /> */}
    </Stack.Navigator>
  );
}
