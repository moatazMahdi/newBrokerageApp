import { View, Text, TouchableOpacity, StyleSheet, I18nManager } from 'react-native';
import React from 'react';
import { Assets } from '../../assets';
import { hp, wp } from '../../utils/dimensions';
import { SvgView } from '../SvgView/SvgView';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../../localization/changeLanguage';

const { BackArrow, lang } = Assets.images.components;

interface Props {
  title?: string 
  onPress?: () => void;
  showLanguage?: boolean;
}

const AppHeaderTitle = ({ title, onPress, showLanguage = false }: Props) => {
  const { i18n } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.titleGroup}>
        <TouchableOpacity style={styles.arrow} onPress={onPress}>
            <SvgView svgFile={BackArrow} width={wp(28)} height={hp(28)} />
        </TouchableOpacity>
        <Text style={styles.title}>
            {title}
        </Text>
      </View>
      {showLanguage ? (
        <TouchableOpacity
          style={styles.changeLanguageContainer}
          onPress={changeLanguage}
        >
          <SvgView svgFile={lang} width={wp(14)} height={hp(14)} />
          <Text style={styles.changeLanguageText}>
            {i18n.language === 'en' ? 'العربية' : 'English'}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
   );
};

export default AppHeaderTitle;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: hp(110),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(20),
    paddingTop: hp(30),
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(12),
    flex: 1,
  },
  arrow: {
    backgroundColor: "#FFFFFF33",
    borderRadius: "50%",
    width: wp(36),
    height: hp(36),
    alignItems: "center",
    justifyContent: "center",
    transform: I18nManager.isRTL ? [] : [{ rotate: '180deg' }] ,
  },
  title: { 
    color: 'white', 
    fontSize: hp(16),
    fontWeight: "700",
    lineHeight: hp(24),
    flexShrink: 1,
  },
  changeLanguageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(6),
    marginLeft: wp(12),
  },
  changeLanguageText: {
    color: 'white',
    fontSize: hp(16),
  },
})
