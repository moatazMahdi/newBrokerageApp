import React from 'react';
import { Alert, View } from 'react-native';
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

  // Trigger sending the code automatically when the screen opens.
  React.useEffect(() => {
    if (isReset) {
      forgetPassword(buildForgetPasswordRequest(phone));
    } else {
      sendOtp(buildSendOtpRequest(phone));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleResend = () => {
    const onResult = {
      onSuccess: () => setResetKey(prev => prev + 1),
      onError: (error: Error) =>
        Alert.alert('خطأ', error.message || 'تعذر إعادة إرسال الكود'),
    };

    if (isReset) {
      forgetPassword(buildForgetPasswordRequest(phone), onResult);
    } else {
      sendOtp(buildSendOtpRequest(phone), onResult);
    }
  };

  const handleConfirm = () => {
    if (code.length < CODE_LENGTH) {
      Alert.alert('خطأ', 'الرجاء إدخال كود التحقق كاملاً');
      return;
    }

    if (isReset) {
      forgetVerifyCode(buildForgetVerifyCodeRequest(phone, code), {
        onSuccess: () => {
          navigation.navigate(Routes.CREATE_NEW_PASSWORD, { phone, code });
        },
        onError: error => {
          Alert.alert('خطأ', error.message || 'كود التحقق غير صحيح');
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
        Alert.alert('خطأ', error.message || 'كود التحقق غير صحيح');
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
          title="تأكيد"
          onPress={handleConfirm}
          loading={isPending}
        />
      </View>
    </ScreenContainer>
  );
};

export default Otp;
