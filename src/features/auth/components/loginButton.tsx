import { View, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import AppButton from '../../../components/AppButton'
import SvgView from '../../../components/SvgView/SvgView'
import { Assets } from '../../../assets'
import { hp, wp } from '../../../utils/dimensions'

type Props = {
    onLoginPress: () => void;
    onFingerprintPress?: () => void;
    loading?: boolean;
}
const LoginButton = ({onLoginPress, onFingerprintPress, loading = false}: Props) => {
  const { t } = useTranslation();
  const {images:{
    components: {fingerprint}
  }} = Assets;
  return (
    <View style={styles.container}>
      <AppButton variant='primary' size='full' title={t('auth.login.loginButton')} onPress={onLoginPress} loading={loading}  />
      <TouchableOpacity style={styles.fingerprintButton} onPress={onFingerprintPress}>
        <SvgView  svgFile={fingerprint} width={32} height={32} />
      </TouchableOpacity>
    </View>
  )
}

export default LoginButton

const styles = StyleSheet.create({
  container: {
    width: '85%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginTop: hp(42),
  },
  fingerprintButton: {
    width: wp(48),
    height: hp(48),
    borderRadius: 12,
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
});