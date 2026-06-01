import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AppButton from '../../../components/AppButton'
import SvgView from '../../../components/SvgView/SvgView'
import { Assets } from '../../../assets'
import { hp, wp } from '../../../utils/dimensions'

type Props = {
    onLoginPress: () => void;
    onFingerprintPress?: () => void;
}
const LoginButton = ({onLoginPress, onFingerprintPress}: Props) => {
  const {images:{
    components: {fingerprint}
  }} = Assets;
  return (
    <View style={{
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        marginTop: hp(42),
    }}>
      <AppButton width={wp(275)} title="تسجيل الدخول" onPress={onLoginPress} loading={false}  />
      <TouchableOpacity style={{
        width: wp(48),
        height: hp(48),
        borderRadius: 12,
        backgroundColor: '#F3F3F3',
        justifyContent: 'center',
        alignItems: 'center',
      }} onPress={onFingerprintPress}>
        <SvgView  svgFile={fingerprint} width={32} height={32} />
      </TouchableOpacity>
    </View>
  )
}

export default LoginButton