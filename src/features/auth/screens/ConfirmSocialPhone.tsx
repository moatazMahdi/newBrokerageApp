import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import AppButton from '../../../components/AppButton';
import AppText from '../../../components/AppText/AppText';
import AppTextField from '../../../components/AppTextField/AppTextField';
import { useSendOtp } from '../hooks/useSendOtp';
import { buildSendOtpRequest } from '../../../api/auth';
import { Routes } from '../../../navigation/routes';
import type { AppStackParamList } from '../../../navigation/types';
import { Assets } from '../../../assets';
import { hp } from '../../../utils/dimensions';

const ConfirmSocialPhone = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const { params } =
    useRoute<RouteProp<AppStackParamList, 'ConfirmSocialPhone'>>();
  const { t } = useTranslation();
  const { tmpToken, provider } = params;

  const {
    images: {
      components: { phone: phoneIcon },
    },
  } = Assets;

  const [phone, setPhone] = React.useState('');
  const { mutate: sendOtp, isPending } = useSendOtp();

  const handleContinue = () => {
    if (!phone.trim()) {
      Alert.alert(t('common.error'), t('common.fillAllFields'));
      return;
    }

    sendOtp(buildSendOtpRequest(`+2${phone}`), {
      onSuccess: () => {
        navigation.navigate(Routes.CONFIRM_SOCIAL_OTP, {
          tmpToken,
          phone,
          provider,
        });
      },
      onError: error =>
        Alert.alert(
          t('common.error'),
          error.message || t('auth.otp.resendFailed'),
        ),
    });
  };

  return (
    <ScreenContainer>
      <View style={styles.headerText}>
        <AppText size={22} weight="700" color="#1A1A1A">
          {t('auth.login.phone')}
        </AppText>
      </View>

      <AppTextField
        label={t('auth.login.phone')}
        value={phone}
        onChangeText={setPhone}
        rightIcon={phoneIcon}
        keyboardType="phone-pad"
      />

      <View style={styles.buttonStyle}>
        <AppButton
          variant="primary"
          size="full"
          title={t('auth.otp.confirm')}
          onPress={handleContinue}
          loading={isPending}
          disabled = {!phone.trim()}
        />
      </View>
    </ScreenContainer>
  );
};

export default ConfirmSocialPhone;

const styles = StyleSheet.create({
  headerText: {
    marginBottom: hp(24)
  },
  buttonStyle: {
    marginTop: hp(32)
  },
})
