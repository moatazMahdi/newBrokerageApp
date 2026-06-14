import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import AppButton from '../../../components/AppButton';
import OtpHeader from '../components/OtpHeader';
import OtpInput from '../components/OtpInput';
import OtpTimer from '../components/OtpTimer';
import BiometricModal from '../components/BiometricModal';
import SuccessSignupModal from '../components/SuccessSignupModal';
import { useSendOtp } from '../hooks/useSendOtp';
import { useVerifyCode } from '../hooks/useVerifyCode';
import { useForgetPassword } from '../hooks/useForgetPassword';
import { useForgetVerifyCode } from '../hooks/useForgetVerifyCode';
import { useSignup } from '../hooks/useSignup';
import {
  buildSendOtpRequest,
  buildVerifyCodeRequest,
  buildForgetPasswordRequest,
  buildForgetVerifyCodeRequest,
} from '../../../api/auth';
import { Routes } from '../../../navigation/routes';
import type { AppStackParamList } from '../../../navigation/types';
import { hp } from '../../../utils/dimensions';
import { showToast } from 'src/components/Toast/toastService';
import {
  saveBiometricCredentials,
  saveLoginProvider,
  saveToken,
  setBiometricEnabled,
  setGuest,
} from '../../../storage/mmkv';
import {
  isBiometricSensorAvailable,
  promptBiometric,
} from '../../../utils/biometrics';
import {
  getAppVersion,
  getDeviceInfo,
  getErrorMessage,
  getFCMToken,
} from '../../../utils/helperFunctions';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../../store/auth/authSlice';

const CODE_LENGTH = 6;

const Otp = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const { params } = useRoute<RouteProp<AppStackParamList, 'Otp'>>();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { phone, mode = 'signup', otpSent = false, signupPayload } = params;
  const isReset = mode === 'reset';

  const [code, setCode] = useState('');
  const [resetKey, setResetKey] = useState(0);
  const [error, setError] = useState<boolean>(false);
  const [verified, setVerified] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showBiometricModal, setShowBiometricModal] = useState(false);

  const { mutate: sendOtp } = useSendOtp();
  const { mutate: verifyCode, isPending: isVerifying } = useVerifyCode();
  const { mutate: signup, isPending: isSigningUp } = useSignup();
  const { mutate: forgetPassword } = useForgetPassword();
  const { mutate: forgetVerifyCode, isPending: isForgetVerifying } =
    useForgetVerifyCode();

  const isCodeValid = /^\d{6}$/.test(code);

  const isPending = isReset ? isForgetVerifying : isVerifying || isSigningUp;

  useEffect(() => {
    if (!isReset && !otpSent) {
      sendOtp(buildSendOtpRequest(phone));
    }
  }, [isReset, otpSent, phone, sendOtp]);

  const goToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: Routes.BUTTON_TAB }],
    });
  };

  const persistSignupSession = (token?: string) => {
    setGuest(false);
    saveLoginProvider('normal');

    if (token) {
      saveToken(token);
      dispatch(setCredentials({ token }));
    }
  };

  const showSignupSuccess = () => {
    setShowSuccess(true);
  };

  const handleSuccessDismiss = useCallback(() => {
    setShowSuccess(false);
    setShowBiometricModal(true);
  }, []);

  const buildSignupMetadata = async () => {
    const timezoneOffset = -new Date().getTimezoneOffset();
    const sign = timezoneOffset >= 0 ? '+' : '-';
    const absoluteOffset = Math.abs(timezoneOffset);
    const hours = Math.floor(absoluteOffset / 60).toString().padStart(2, '0');
    const minutes = (absoluteOffset % 60).toString().padStart(2, '0');

    return {
      appVersion: getAppVersion(),
      firebaseNotificationToken: await getFCMToken(),
      location: {
        time: new Date()
          .toISOString()
          .replace('T', ' ')
          .slice(0, 19)
          .concat(` ${sign}${hours}:${minutes}`),
      },
      mobile_info: await getDeviceInfo(),
    };
  };

  const completeSignup = async () => {
    if (!signupPayload) {
      goToHome();
      return;
    }

    const signupRequest = {
      ...signupPayload,
      ...(await buildSignupMetadata()),
    };

    signup(signupRequest, {
      onSuccess: response => {
        persistSignupSession(response.data?.token ?? response.token);
        showSignupSuccess();
      },
      onError: err => {
        showToast({
          type: 'error',
          title: err.message || t('auth.signup.failed'),
        });
      },
    });
  };

  const handleResend = () => {
    const onResult = {
      onSuccess: (response: any) => {
        setCode('');
        setError(false);
        setVerified(false);
        setResetKey(prev => prev + 1);
        
        showToast({
          type: 'success',
          message: response?.msg,
          dismissible: false
        });
      },
      onError: (err: any) =>{
        showToast({
          type: "error",
          message: getErrorMessage(err),
          dismissible: false,
        })
      }
    };

    if (isReset) {
      forgetPassword(buildForgetPasswordRequest(phone), onResult);
    } else {
      sendOtp(buildSendOtpRequest(phone), onResult);
    }
  };

  const handleConfirm = () => {
    
    if (isReset) {
      forgetVerifyCode(buildForgetVerifyCodeRequest(phone, code), {
        onSuccess: () => {
          navigation.reset({
            index: 0,
            routes: [{ name: Routes.CREATE_NEW_PASSWORD, params: { phone, code } }],
          });
        },
        onError: (err) => {
             showToast({
              type: "error",
              message: getErrorMessage(err),
              dismissible: false,
            })
            setVerified(false);
            setError(true);
        }
      });
      return;
    }

    verifyCode(buildVerifyCodeRequest(phone, code), {
      onSuccess: () => {
        setVerified(true);
        completeSignup();
      },
       onError: (err) => {
           showToast({
            type: "error",
            message: getErrorMessage(err),
            dismissible: false,
          })
          setVerified(false);
          setError(true);
        }
      });
    
  };

  const handleEnableBiometric = async () => {
    const sensorAvailable = await isBiometricSensorAvailable();
    if (!sensorAvailable) {
      showToast({ type: 'error', title: t('auth.biometric.notAvailable') });
      setShowBiometricModal(false);
      goToHome();
      return;
    }

    const authenticated = await promptBiometric(t('auth.biometric.title'));
    if (authenticated && signupPayload) {
      saveBiometricCredentials({
        phone: signupPayload.phone,
        password: signupPayload.password,
      });
      setBiometricEnabled(true);
    }

    setShowBiometricModal(false);
    goToHome();
  };

  const handleSkipBiometric = () => {
    setBiometricEnabled(false);
    setShowBiometricModal(false);
    goToHome();
  };
  
  const goBack = () =>{
    navigation.goBack();
  }

  return (
    <ScreenContainer screenTitle={t('auth.otp.screenTitle')} onBackPress={goBack} scrollable>
      <OtpHeader phone={phone} />
      <OtpInput 
        length={CODE_LENGTH} 
        value={code} 
        onChange={(value) => {
          setError(false);
          setVerified(false);
          setCode(value)
        }} 
        error={error}
        success={verified}
      />
      <OtpTimer resetKey={resetKey} onResend={handleResend} />

      <View style={{ marginTop: hp(32) }}>
        <AppButton
          variant='primary'
          size='full'
          title={t('auth.otp.confirm')}
          onPress={handleConfirm}
          loading={isPending}
          disabled={!isCodeValid || isPending}
        />
      </View>
      <SuccessSignupModal
        visible={showSuccess}
        onClose={handleSuccessDismiss}
      />
      <BiometricModal
        visible={showBiometricModal}
        onClose={handleSkipBiometric}
        onEnable={handleEnableBiometric}
      />
    </ScreenContainer>
  );
};

export default Otp;
