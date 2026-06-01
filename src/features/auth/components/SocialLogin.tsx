import { View, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import React from 'react';
import AppText from '../../../components/AppText/AppText';
import { hp, wp } from '../../../utils/dimensions';
import { Assets } from '../../../assets';
import SvgView from '../../../components/SvgView/SvgView';
import SectionSeparator from '../../../components/SectionSeparator';

const SocialLogin = () => {
  const {
    images: {
      components: { google, facebook, apple },
    },
  } = Assets;

  return (
    <View>
      <SectionSeparator label="أو سجل الدخول باستخدام" />
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 24 }}>
        <TouchableOpacity style={styles.socialButton} onPress={() => {}}>
          <SvgView svgFile={google} width={wp(24)} height={hp(24)} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={() => {}}>
          <SvgView svgFile={facebook} width={wp(24)} height={hp(24)} />
        </TouchableOpacity>
        {Platform.OS === 'ios' ? (
          <TouchableOpacity style={styles.socialButton} onPress={() => {}}>
            <SvgView svgFile={apple} width={wp(24)} height={hp(24)} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  socialButton: {
    width: wp(98),
    height: hp(56),
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
});
export default SocialLogin;
