import React from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import AppButton from '../../../components/AppButton';
import ForgotPasswordHeader from '../components/ForgotPasswordHeader';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import SignupButton from '../components/SignupButton';
import { useForgetPassword } from '../hooks/useForgetPassword';
import { buildForgetPasswordRequest } from '../../../api/auth';
import { Routes } from '../../../navigation/routes';
import type { AppStackParamList } from '../../../navigation/types';

const ForgotPassword = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const { t } = useTranslation();

  const [phone, setPhone] = React.useState('');

  const { mutate: forgetPassword, isPending } = useForgetPassword();

  const handleNext = () => {
    if (!phone.trim()) {
      Alert.alert(t('common.error'), t('auth.forgotPassword.enterPhone'));
      return;
    }
    const phoneNumber = `+2${phone}`

    forgetPassword(buildForgetPasswordRequest(phoneNumber), {
      onSuccess: () => {
        navigation.navigate(Routes.OTP, { 
          phone: phoneNumber, 
          mode: 'reset' 
        });
      },
      onError: error => {
        Alert.alert(t('common.error'), error.message || t('auth.forgotPassword.sendFailed'));
      },
    });
  };

  return (
    <ScreenContainer>
      <ForgotPasswordHeader />
      <ForgotPasswordForm phone={phone} onPhoneChange={setPhone} />

      <AppButton
        width="100%"
        title={t('auth.forgotPassword.next')}
        onPress={handleNext}
        loading={isPending}
      />
      <SignupButton />
    </ScreenContainer>
  );
};

export default ForgotPassword;
