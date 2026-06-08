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
import { useSocialLoginComplete } from '../hooks/useSocialLoginComplete';
import { buildSendOtpRequest } from '../../../api/auth';
import { Routes } from '../../../navigation/routes';
import type { AppStackParamList } from '../../../navigation/types';
import { hp } from '../../../utils/dimensions';
import {
  saveLoginProvider,
  saveToken,
  saveUserPhone,
  setGuest,
} from '../../../storage/mmkv';

const CODE_LENGTH = 6;

const ConfirmSocialOtp = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const { params } =
    useRoute<RouteProp<AppStackParamList, 'ConfirmSocialOtp'>>();
  const { t } = useTranslation();
  const { tmpToken, phone, provider } = params;
  const fullPhone = `+2${phone}`;

  const [code, setCode] = React.useState('');
  const [resetKey, setResetKey] = React.useState(0);

  const { mutate: sendOtp } = useSendOtp();
  const { mutate: completeLogin, isPending } = useSocialLoginComplete();

  const handleResend = () => {
    sendOtp(buildSendOtpRequest(fullPhone), {
      onSuccess: () => setResetKey(prev => prev + 1),
      onError: error =>
        Alert.alert(
          t('common.error'),
          error.message || t('auth.otp.resendFailed'),
        ),
    });
  };

  const handleConfirm = (value: string = code) => {
    if (value.length < CODE_LENGTH) {
      Alert.alert(t('common.error'), t('auth.otp.enterFullCode'));
      return;
    }

    completeLogin(
      { tmpToken, phone: fullPhone, code: value },
      {
        onSuccess: res => {
          const token = res?.data?.token ?? res?.token;
          if (token) {
            saveToken(token);
          }
          saveUserPhone(fullPhone);
          saveLoginProvider(provider);
          setGuest(false);
          navigation.reset({
            index: 0,
            routes: [{ name: Routes.BUTTON_TAB }],
          });
        },
        onError: error =>
          Alert.alert(
            t('common.error'),
            error.message || t('auth.otp.invalidCode'),
          ),
      },
    );
  };

  useEffect(() => {
    if (code.length === CODE_LENGTH) {
      handleConfirm(code);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return (
    <ScreenContainer>
      <OtpHeader phone={fullPhone} />
      <OtpInput length={CODE_LENGTH} value={code} onChange={setCode} />
      <OtpTimer resetKey={resetKey} onResend={handleResend} />

      <View style={{ marginTop: hp(32) }}>
        <AppButton
          variant="primary"
          size="full"
          title={t('auth.otp.confirm')}
          onPress={() => handleConfirm()}
          loading={isPending}
        />
      </View>
    </ScreenContainer>
  );
};

export default ConfirmSocialOtp;
