import { View, Text, ImageBackground, TouchableOpacity, I18nManager } from 'react-native';
import React from 'react';
import { Assets } from '../../assets';
import { hp, wp } from '../../utils/dimensions';
import { SvgView } from '../SvgView/SvgView';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../../localization/changeLanguage';


const AppHeader = () => {
  const {
    images: {
      components: { lang, logo },
    },
  } = Assets;
  const { i18n } = useTranslation();
 return (
    <View
      style={{
        width: '100%',
        height: hp(110),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(20),
        paddingTop: hp(20),

      }}
    >
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center',gap: wp(6)}} onPress = {changeLanguage}>
            <SvgView svgFile={lang} width={wp(14)} height={hp(14)} />
            <Text style={{ color: 'white', fontSize: 16 }} >{i18n.language === 'en'
    ? 'العربية'
    : 'English'}</Text>
        </TouchableOpacity>

        <SvgView svgFile={logo} width={wp(95)} height={hp(32)} />

    </View>
  );
};

export default AppHeader;
