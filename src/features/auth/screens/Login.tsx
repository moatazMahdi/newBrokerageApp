import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenContainer from 'src/components/ScreenContainer/ScreenContainer';
import LoginHeader from 'src/features/auth/components/LoginHeader';
import LoginForm from 'src/features/auth/components/LoginForm';
import LoginButton from 'src/features/auth/components/loginButton';
import SocialLogin from 'src/features/auth/components/SocialLogin';
import SignupButton from 'src/features/auth/components/SignupButton';
import GuestButton from 'src/features/auth/components/GuestButton';
import BiometricModal from 'src/features/auth/components/BiometricModal';
import { useLogin } from 'src/features/auth/hooks/useLogin';
import { buildLoginRequest } from 'src/api/auth';
import { Routes } from 'src/navigation/routes';
import type { AppStackParamList } from 'src/navigation/types';
import { hp } from 'src/utils/dimensions';
import { getFCMToken } from 'src/utils/helperFunctions';
import { showToast } from 'src/components/Toast/toastService';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from 'src/store/auth/authSlice';
import { RootState } from 'src/store/store';


const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showBiometricModal, setShowBiometricModal] = useState(false);
  const fcmTokenRef = useRef<string>('');
  const { mutate: login, isPending } = useLogin();

  useEffect(()=>{
    const fetchFCMToken = async () => {
      try {
        const token = await getFCMToken();
        fcmTokenRef.current = token || '';
      } catch (error) {
        console.log('Failed to fetch FCM token', error);
      }
    };
    fetchFCMToken();
  },[])

    const isPhoneValid = phone.trim().length === 11;
    const isPasswordValid = password.length >= 8;
    const canSubmit = isPhoneValid && isPasswordValid;
   
  const handleLoginPress = useCallback (() => {

    const fcmToken = fcmTokenRef.current; 
    const loginPayload = buildLoginRequest(`+2${phone}`, password, fcmToken);

    login(loginPayload, {
      onSuccess: (response) => {
        dispatch(
          setCredentials({
            token: response.data.token,
          }),
        );
        setShowBiometricModal(true);
      },
    });
  }, [phone, password, login, dispatch]);

  const goToHome = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: Routes.BUTTON_TAB }],
    });
  }, [navigation]);

  const handleEnableBiometric = useCallback(() => {
    setShowBiometricModal(false);
    // TODO: Persist biometric enrollment before navigating.
    goToHome();
  }, [goToHome]);

  const handleSkipBiometric = useCallback(() => {
    setShowBiometricModal(false);
    goToHome();
  }, [goToHome]);

  const handleFingerprintPress = () => {
    showToast({
      type: 'error',
      title: 'رقم الهاتف أو كلمة المرور خاطئة',
      // message: 'حاول مرة أخرى.',
    });
    // TODO: Implement biometric authentication
  };

  const handleToggleEye = useCallback(() => {
    setIsPasswordVisible(prev => !prev);
  }, []);

  const handleForgotPassword = useCallback(() => {
    navigation.navigate(Routes.FORGOT_PASSWORD);
  }, [navigation]);

  return (
    <ScreenContainer>
      <LoginHeader />
      <LoginForm
        phone={phone}
        password={password}
        isPasswordVisible={isPasswordVisible}
        onPhoneChange={setPhone}
        onPasswordChange={setPassword}
        onToggleEye={handleToggleEye}
        onForgotPassword={handleForgotPassword}
      />
      <LoginButton
        onLoginPress={handleLoginPress}
        onFingerprintPress={handleFingerprintPress}
        loading={isPending}
        disabled={!canSubmit}
      />
      <SocialLogin />
      <SignupButton />
      <View style={styles.guestButtonContainer}>
        <GuestButton />
      </View>
      <BiometricModal
        visible={showBiometricModal}
        onClose={handleSkipBiometric}
        onEnable={handleEnableBiometric}
      />
    </ScreenContainer>
  );
}

export default Login;

const styles = StyleSheet.create({
  guestButtonContainer: {
    position: "absolute",
    bottom: hp(36),
    alignSelf: "center",
  },
});