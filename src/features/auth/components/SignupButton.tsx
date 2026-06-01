import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import AppText from '../../../components/AppText/AppText'
import { hp } from '../../../utils/dimensions'

const SignupButton = () => {
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
    <TouchableOpacity onPress={() => {}}>
      <AppText size={16} weight="700" color="#1A3167">
       إنشاء حساب
      </AppText>
    </TouchableOpacity>
  </View>
  )
}

export default SignupButton