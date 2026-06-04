import React from 'react';
import { Alert } from 'react-native';
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
import { showToast } from '../../../components/Toast/toastService';

const Login = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [openEye, setOpenEye] = React.useState(false);
  const { mutate: login, isPending } = useLogin();

  const handleLoginPress = () => {
    if (!phone.trim() || !password.trim()) {
      Alert.alert('خطأ', 'الرجاء ملء جميع الحقول');
      return;
    }

    const fcmToken = ''; // TODO: Get FCM token from Firebase
    const loginPayload = buildLoginRequest(phone, password, fcmToken);

    login(loginPayload, {
      onSuccess: (data) => {
        Alert.alert('نجح', 'تم تسجيل الدخول بنجاح');
        // TODO: Save token and navigate to home screen
      },
      onError: (error) => {
        showToast({
          type: 'error',
          title: 'رقم الهاتف أو كلمة المرور خاطئة',
          message: 'حاول مرة أخرى.',
        });
      },
    });
  };

  const handleFingerprintPress = () => {
    showToast({
      type: 'error',
      title: 'رقم الهاتف أو كلمة المرور خاطئة',
      // message: 'حاول مرة أخرى.',
    });
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
      <GuestButton />
    </ScreenContainer>
  );
};

export default Login;
