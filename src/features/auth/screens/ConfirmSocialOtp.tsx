import React from 'react';
import { View } from 'react-native';
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
import { showToast } from 'src/components/Toast/toastService';

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

  const isCodeValid = /^\d{6}$/.test(code);

  const handleResend = () => {
    sendOtp(buildSendOtpRequest(fullPhone), {
      onSuccess: () => setResetKey(prev => prev + 1),
      onError: (error: any) => {
        const message =
          error.response?.data?.errors?.[0] ??
          error.response?.data?.message ??
            'Something went wrong';
    
        showToast({
          type: 'error',
          title: message,
        })
      }   
    });
  };

  const handleConfirm = (value: string = code) => {
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
        onError: (error: any) => {
          const message =
            error.response?.data?.errors?.[0] ??
            error.response?.data?.message ??
              'Something went wrong';

          showToast({
            type: 'error',
            title: message,
          })
        },
      },
    );
  };

  // useEffect(() => {
  //   if (code.length === CODE_LENGTH) {
  //     handleConfirm(code);
  //   }
  // }, [code, handleConfirm]);

  const goBack = () =>{
    navigation.goBack();
  }

  return (
    <ScreenContainer screenTitle={t('auth.otp.screenTitle')} onBackPress={goBack} scrollable>
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
          disabled={!isCodeValid || isPending}
        />
      </View>
    </ScreenContainer>
  );
};

export default ConfirmSocialOtp;
