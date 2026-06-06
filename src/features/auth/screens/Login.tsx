import React from 'react';
import { Alert, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import LoginHeader from '../components/LoginHeader';
import LoginForm from '../components/LoginForm';
import LoginButton from '../components/loginButton';
import SocialLogin from '../components/SocialLogin';
import SignupButton from '../components/SignupButton';
import GuestButton from '../components/GuestButton';
import { useLogin } from '../hooks/useLogin';
import { buildLoginRequest } from '../../../api/auth';
import { Routes } from '../../../navigation/routes';
import type { AppStackParamList } from '../../../navigation/types';
import { hp } from '../../../utils/dimensions';

const Login = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const { t } = useTranslation();
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [openEye, setOpenEye] = React.useState(false);
  const { mutate: login, isPending } = useLogin();

  const handleLoginPress = () => {
    if (!phone.trim() || !password.trim()) {
      Alert.alert(t('common.error'), t('common.fillAllFields'));
      return;
    }

    const fcmToken = ''; // TODO: Get FCM token from Firebase
    const loginPayload = buildLoginRequest(phone, password, fcmToken);

    login(loginPayload, {
      onSuccess: (data) => {
        Alert.alert(t('common.success'), t('auth.login.success'));
        // TODO: Save token and navigate to home screen
      },
      onError: (error) => {
        Alert.alert(t('common.error'), error.message || t('auth.login.failed'));
      },
    });
  };

  const handleFingerprintPress = () => {
    // TODO: Implement biometric authentication
  };

  const handleToggleEye = () => {
    setOpenEye(prev => !prev);
  };

  const handleForgotPassword = () => {
    navigation.navigate(Routes.FORGOT_PASSWORD);
  };

  return (
    <ScreenContainer>
      <LoginHeader />
      <LoginForm
        phone={phone}
        password={password}
        openEye={openEye}
        onPhoneChange={setPhone}
        onPasswordChange={setPassword}
        onToggleEye={handleToggleEye}
        onForgotPassword={handleForgotPassword}
      />
      <LoginButton
        onLoginPress={handleLoginPress}
        onFingerprintPress={handleFingerprintPress}
        loading={isPending}
      />
      <SocialLogin />
      <SignupButton />
      <View style={{ marginTop: hp(42) }}>
        <GuestButton />
      </View>
    </ScreenContainer>
  );
}


export default Login;
