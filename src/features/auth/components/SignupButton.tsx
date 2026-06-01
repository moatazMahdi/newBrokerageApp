import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import AppText from '../../../components/AppText/AppText'
import { hp } from '../../../utils/dimensions'
import { Routes } from '../../../navigation/routes'
import type { AppStackParamList } from '../../../navigation/types'

const SignupButton = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>()
  return (
    <View style={{
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 4,
      marginTop: hp(40),
    }}>
    <AppText size={16} weight="500" color="#6F6F74">
      ليس لديك حساب؟
    </AppText>
    <TouchableOpacity onPress={() => navigation.navigate(Routes.SIGNUP)}>
      <AppText size={16} weight="700" color="#1A3167">
       إنشاء حساب
      </AppText>
    </TouchableOpacity>
  </View>
  )
}

export default SignupButton