import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Assets } from '../../assets';
import { hp, wp } from '../../utils/dimensions';
import { SvgView } from '../SvgView/SvgView';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../../localization/changeLanguage';

const { lang, logo } = Assets.images.components;

const AppHeaderWithLogo = () => {
  const { i18n } = useTranslation();

  return (
    <View style={styles.container}>
        <SvgView svgFile={logo} width={wp(95)} height={hp(32)} />
        <TouchableOpacity style={styles.changeLanguageContainer} onPress = {changeLanguage}>
          <SvgView svgFile={lang} width={wp(14)} height={hp(14)} />
          <Text style={styles.changeLanguageText} >
            { i18n.language === 'en' ? 'العربية' : 'English'}
          </Text>
        </TouchableOpacity>
    </View>
   );
};

export default AppHeaderWithLogo;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: hp(110),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(20),
    paddingTop: hp(20),
  },
  changeLanguageContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(6),
  },
  changeLanguageText: { 
    color: 'white', 
    fontSize: hp(16), 
  },
})
