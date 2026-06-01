import { View, Text, TouchableOpacity, Platform } from 'react-native';
import React from 'react';
import AppText from '../../../components/AppText/AppText';
import { hp, wp } from '../../../utils/dimensions';
import { Assets } from '../../../assets';
import SvgView from '../../../components/SvgView/SvgView';

const SocialLogin = () => {
  const {
    images: {
      components: { google, facebook, apple },
    },
  } = Assets;
  
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          marginVertical: 20,
        }}
      >
        <View
          style={{
            width: wp(90),
            height: 1,
            backgroundColor: '#F4F4F4',
          }}
        />
        <AppText size={14} weight="400" color="#6F6F74">
          أو سجل الدخول باستخدام
        </AppText>
        <View
          style={{
            width: wp(90),
            height: 1,
            backgroundColor: '#F4F4F4',
          }}
        />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 24 }}>
        <TouchableOpacity style={styles.socialButton} onPress={() => {}}>
          <SvgView
            svgFile={google}
            width={wp(24)}
            height={hp(24)}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={() => {}}>
          <SvgView
            svgFile={facebook}
            width={wp(24)}
            height={hp(24)}
          />
        </TouchableOpacity>
        {Platform.OS === 'ios' ? (
          <TouchableOpacity style={styles.socialButton} onPress={() => {}}>
            <SvgView
              svgFile={apple}
              width={wp(24)}
              height={hp(24)}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = {
  socialButton: {
    width: wp(98),
    height: hp(56),
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
};
export default SocialLogin;
