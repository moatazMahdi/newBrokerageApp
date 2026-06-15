import { I18nManager, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import AppText from '../../../components/AppText/AppText'
import SvgView from '../../../components/SvgView/SvgView'
import { Assets } from '../../../assets'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppStackParamList } from 'src/navigation/types'
import { Routes } from 'src/navigation/routes'

const GuestButton = () => {
  const { t } = useTranslation()
const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();  const {images:{
    components: {ArrowLeft},
  }} = Assets

  const handelGuestPress = () => {
    navigation.navigate(Routes.BUTTON_TAB )
  }

  return (
    <TouchableOpacity style= {styles.container}
    onPress={handelGuestPress}
    >
      <AppText size={16} weight="500" color="black">
       {t('auth.login.guestBrowse')}
      </AppText>
      <View style={styles.arrow}>
        <SvgView  svgFile={ArrowLeft} width={20} height={20} />
      </View>
    </TouchableOpacity>
  )
}

export default GuestButton

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  arrow: {
    transform: I18nManager.isRTL ? [] : [{ rotate: '180deg' }]
  },
})