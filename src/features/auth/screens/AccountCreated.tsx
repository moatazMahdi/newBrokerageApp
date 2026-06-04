import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import AppButton from '../../../components/AppButton';
import AppText from '../../../components/AppText/AppText';
import { Routes } from '../../../navigation/routes';
import type { AppStackParamList } from '../../../navigation/types';
import { hp, wp } from '../../../utils/dimensions';

const AccountCreated = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const handleContinue = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: Routes.LOGIN }],
    });
  };

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <View style={styles.checkCircle}>
          <AppText size={40} weight="700" color="#FFFFFF">
            ✓
          </AppText>
        </View>

        <AppText
          size={20}
          weight="700"
          color="#1A1A1A"
          style={styles.title}
        >
          تم إنشاء الحساب بنجاح
        </AppText>

        <AppText size={14} color="#6F6F74" style={styles.subtitle}>
          يمكنك الآن تسجيل الدخول إلى حسابك
        </AppText>
      </View>

      <AppButton width="100%" title="تسجيل الدخول" onPress={handleContinue} />
    </ScreenContainer>
  );
};

export default AccountCreated;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircle: {
    width: wp(96),
    height: wp(96),
    borderRadius: wp(48),
    backgroundColor: '#1A3167',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(24),
  },
  title: {
    textAlign: 'center',
    marginBottom: hp(8),
  },
  subtitle: {
    textAlign: 'center',
  },
});
