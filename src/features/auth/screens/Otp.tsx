import React, { useEffect } from 'react';
import { Alert, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import AppButton from '../../../components/AppButton';
import OtpHeader from '../components/OtpHeader';
import OtpInput from '../components/OtpInput';
import OtpTimer from '../components/OtpTimer';
import { useSendOtp } from '../hooks/useSendOtp';
import { useVerifyCode } from '../hooks/useVerifyCode';
import { useForgetPassword } from '../hooks/useForgetPassword';
import { useForgetVerifyCode } from '../hooks/useForgetVerifyCode';
import {
  buildSendOtpRequest,
  buildVerifyCodeRequest,
  buildForgetPasswordRequest,
  buildForgetVerifyCodeRequest,
} from '../../../api/auth';
import { Routes } from '../../../navigation/routes';
import type { AppStackParamList } from '../../../navigation/types';
import { hp } from '../../../utils/dimensions';

const CODE_LENGTH = 6;

const Otp = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const { params } = useRoute<RouteProp<AppStackParamList, 'Otp'>>();
  const { t } = useTranslation();
  const { phone, mode = 'signup' } = params;
  const isReset = mode === 'reset';

  const [code, setCode] = React.useState('');
  const [resetKey, setResetKey] = React.useState(0);

  const { mutate: sendOtp } = useSendOtp();
  const { mutate: verifyCode, isPending: isVerifying } = useVerifyCode();
  const { mutate: forgetPassword } = useForgetPassword();
  const { mutate: forgetVerifyCode, isPending: isForgetVerifying } =
    useForgetVerifyCode();

  const isPending = isReset ? isForgetVerifying : isVerifying;

  useEffect(() => {
    if (!isReset) {
      sendOtp(buildSendOtpRequest(phone));
    }
  }, [isReset, phone, sendOtp]);

  const handleResend = () => {
    const onResult = {
      onSuccess: () => setResetKey(prev => prev + 1),
      onError: (error: Error) =>
        Alert.alert(t('common.error'), error.message || t('auth.otp.resendFailed')),
    };

    if (isReset) {
      forgetPassword(buildForgetPasswordRequest(phone), onResult);
    } else {
      sendOtp(buildSendOtpRequest(phone), onResult);
    }
  };

  const handleConfirm = () => {
    if (code.length < CODE_LENGTH) {
      Alert.alert(t('common.error'), t('auth.otp.enterFullCode'));
      return;
    }

    if (isReset) {
      forgetVerifyCode(buildForgetVerifyCodeRequest(phone, code), {
        onSuccess: () => {
          navigation.reset({
            index: 0,
            routes: [{ name: Routes.CREATE_NEW_PASSWORD, params: { phone, code } }],
          });
        },
        onError: error => {
          Alert.alert(t('common.error'), error.message || t('auth.otp.invalidCode'));
        },
      });
      return;
    }

    verifyCode(buildVerifyCodeRequest(phone, code), {
      onSuccess: () => {
        navigation.reset({
          index: 0,
          routes: [{ name: Routes.BUTTON_TAB }],
        });
      },
      onError: error => {
        Alert.alert(t('common.error'), error.message || t('auth.otp.invalidCode'));
      },
    });
  };

  return (
    <ScreenContainer>
      <OtpHeader phone={phone} />
      <OtpInput length={CODE_LENGTH} value={code} onChange={setCode} />
      <OtpTimer resetKey={resetKey} onResend={handleResend} />

      <View style={{ marginTop: hp(32) }}>
        <AppButton
          width="100%"
          title={t('auth.otp.confirm')}
          onPress={handleConfirm}
          loading={isPending}
        />
      </View>
    </ScreenContainer>
  );
};

export default Otp;
