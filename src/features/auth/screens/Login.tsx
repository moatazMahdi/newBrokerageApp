import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import ScreenContainer from 'src/components/ScreenContainer/ScreenContainer';
import LoginHeader from 'src/features/auth/components/LoginHeader';
import LoginForm from 'src/features/auth/components/LoginForm';
import LoginButton from 'src/features/auth/components/loginButton';
import SocialLogin from 'src/features/auth/components/SocialLogin';
import SignupButton from 'src/features/auth/components/SignupButton';
import GuestButton from 'src/features/auth/components/GuestButton';
import BiometricModal from 'src/features/auth/components/BiometricModal';
import { useLogin } from 'src/features/auth/hooks/useLogin';
import { buildLoginRequest, LoginResponse } from 'src/api/auth';
import { Routes } from 'src/navigation/routes';
import type { AppStackParamList } from 'src/navigation/types';
import { hp } from 'src/utils/dimensions';
import { getFCMToken } from 'src/utils/helperFunctions';
import { showToast } from 'src/components/Toast/toastService';
import { useDispatch } from 'react-redux';
import { setCredentials } from 'src/store/auth/authSlice';
import {
  getBiometricCredentials,
  isBiometricEnabled,
  saveBiometricCredentials,
  saveLoginProvider,
  saveToken,
  setBiometricEnabled,
  setGuest,
} from 'src/storage/mmkv';
import {
  isBiometricSensorAvailable,
  promptBiometric,
} from 'src/utils/biometrics';

const Login = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showBiometricModal, setShowBiometricModal] = useState(false);
  const [showFingerprint, setShowFingerprint] = useState(false);
  const fcmTokenRef = useRef<string>('');
  const { mutate: login, isPending } = useLogin();

  useEffect(() => {
    const fetchFCMToken = async () => {
      try {
        const token = await getFCMToken();
        fcmTokenRef.current = token || '';
      } catch (error) {
        console.log('Failed to fetch FCM token', error);
      }
    };
    fetchFCMToken();
  }, []);

useFocusEffect(
  useCallback(() => {
    const resolveFingerprint = async () => {
      const sensorAvailable = await isBiometricSensorAvailable();
      const enabled = isBiometricEnabled();
      const hasCredentials = getBiometricCredentials() !== null;

      setShowFingerprint(sensorAvailable && enabled && hasCredentials);
    };

    resolveFingerprint();
  }, [])
);

  const isPhoneValid = phone.trim().length === 11;
  const isPasswordValid = password.length >= 8;
  const canSubmit = isPhoneValid && isPasswordValid;

  const persistSession = useCallback(
    (response: LoginResponse) => {
      const token = response.data.token;
      saveToken(token);
      saveLoginProvider('normal');
      setGuest(false);
      dispatch(setCredentials({ token }));
    },
    [dispatch],
  );

  const goToHome = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: Routes.BUTTON_TAB }],
    });
  }, [navigation]);

  const handleLoginPress = useCallback(() => {
    if (!canSubmit) return;

    const fcmToken = fcmTokenRef.current;
    const loginPayload = buildLoginRequest(`+2${phone}`, password, fcmToken);

    login(loginPayload, {
      onSuccess: response => {
        persistSession(response);
        if (isBiometricEnabled()) {
          goToHome();
          return;
        }
        setShowBiometricModal(true);
      },
    });
  }, [phone, password, canSubmit, login, persistSession, goToHome]);

  const handleEnableBiometric = useCallback(async () => {
    const sensorAvailable = await isBiometricSensorAvailable();
    if (!sensorAvailable) {
      showToast({ type: 'error', title: t('auth.biometric.notAvailable') });
      setShowBiometricModal(false);
      goToHome();
      return;
    }

    const authenticated = await promptBiometric(t('auth.biometric.title'));
    if (authenticated) {
      saveBiometricCredentials({ phone, password });
      setBiometricEnabled(true);
    }
    setShowBiometricModal(false);
    goToHome();
  }, [phone, password, goToHome, t]);

  const handleSkipBiometric = useCallback(() => {
    setShowBiometricModal(false);
    goToHome();
  }, [goToHome]);

  const handleFingerprintPress = useCallback(async () => {
    const credentials = getBiometricCredentials();
    if (!credentials) {
      setShowFingerprint(false);
      return;
    }

    const authenticated = await promptBiometric(t('auth.biometric.title'));
    if (!authenticated) {
      return;
    }

    const fcmToken = fcmTokenRef.current;
    const loginPayload = buildLoginRequest(
      `+2${credentials.phone}`,
      credentials.password,
      fcmToken,
    );

    login(loginPayload, {
      onSuccess: response => {
        persistSession(response);
        goToHome();
      },
    });
  }, [login, persistSession, goToHome, t]);

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
        showFingerprint={showFingerprint}
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
};

export default Login;

const styles = StyleSheet.create({
  guestButtonContainer: {
    position: 'absolute',
    bottom: hp(46),
    alignSelf: 'center',
  },
});
