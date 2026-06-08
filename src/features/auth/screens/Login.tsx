import { useTranslation } from 'react-i18next';
import React, { useEffect } from 'react';
import { Alert, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenContainer from 'src/components/ScreenContainer/ScreenContainer';
import LoginHeader from 'src/features/auth/components/LoginHeader';
import LoginForm from 'src/features/auth/components/LoginForm';
import LoginButton from 'src/features/auth/components/loginButton';
import SocialLogin from 'src/features/auth/components/SocialLogin';
import SignupButton from 'src/features/auth/components/SignupButton';
import GuestButton from 'src/features/auth/components/GuestButton';
import { useLogin } from 'src/features/auth/hooks/useLogin';
import { buildLoginRequest } from 'src/api/auth';
import { Routes } from 'src/navigation/routes';
import type { AppStackParamList } from 'src/navigation/types';
import { hp } from 'src/utils/dimensions';
import { getFCMToken } from 'src/utils/hellperFuncation';
import { showToast } from 'src/components/Toast/toastService';

const Login = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const { t } = useTranslation();
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [openEye, setOpenEye] = React.useState(false);
  const [token , setToken] =React.useState('')
  const { mutate: login, isPending } = useLogin();

  useEffect(()=>{
    const FCMToken = async() =>{
          const token = await getFCMToken();
      setToken(token)
    }
    FCMToken()
  },[])
   
  const handleLoginPress = () => {
    if (!phone.trim() || !password.trim()) {
      Alert.alert(t('common.error'), t('common.fillAllFields'));
      return;
    }

    const fcmToken = token; // TODO: Get FCM token from Firebase
    const loginPayload = buildLoginRequest(`+2${phone}`, password, fcmToken);

    login(loginPayload, {
      onSuccess: (data) => {
        navigation.reset({
          index: 0,
          routes: [{ name: Routes.BUTTON_TAB }],
        });
      },
      onError: (error: Error) => {
        showToast({
          type: 'error',
          title: error.message,
          // message: error.message,
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
      <View style={{ marginTop: hp(42) }}>
        <GuestButton />
      </View>
    </ScreenContainer>
  );
}


export default Login;
