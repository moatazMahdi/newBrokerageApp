import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../navigation/routes';

const OnBoarding = () => {
    const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>OnBoarding</Text>
      <Button title='Go to Home' onPress={() => {
        navigation.navigate(Routes.BUTTON_TAB as never);
      }} />
    </View>
  )
}

export default OnBoarding

