import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from './routes';
import ButtonTab from './ButtonTab';
import Login from '../features/auth/screens/Login';
import Signup from '../features/auth/screens/Signup';
import Otp from '../features/auth/screens/Otp';
import ForgotPassword from '../features/auth/screens/ForgotPassword';
import CreateNewPassword from '../features/auth/screens/CreateNewPassword';


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
      <Stack.Screen name={Routes.SIGNUP} component={Signup} />
      <Stack.Screen name={Routes.OTP} component={Otp} />
      <Stack.Screen
        name={Routes.FORGOT_PASSWORD}
        component={ForgotPassword}
      />
      <Stack.Screen
        name={Routes.CREATE_NEW_PASSWORD}
        component={CreateNewPassword}
      />
      <Stack.Screen name={Routes.BUTTON_TAB} component={ButtonTab} />
      {/* <Stack.Screen name={Routes.HOME} component={Home} /> */}
    </Stack.Navigator>
  );
}
