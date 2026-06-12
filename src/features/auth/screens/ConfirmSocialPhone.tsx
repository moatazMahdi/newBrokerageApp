import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Controller, useForm } from 'react-hook-form';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import AppButton from '../../../components/AppButton';
import AppText from '../../../components/AppText/AppText';
import AppTextField from '../../../components/AppTextField/AppTextField';
import { useSendOtp } from '../hooks/useSendOtp';
import { buildSendOtpRequest } from '../../../api/auth';
import { Routes } from '../../../navigation/routes';
import type { AppStackParamList } from '../../../navigation/types';
import { Assets } from '../../../assets';
import { hp } from '../../../utils/dimensions';
import { showToast } from 'src/components/Toast/toastService';

type FormData = {
  phone: string;
};

const ConfirmSocialPhone = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const { params } =
    useRoute<RouteProp<AppStackParamList, 'ConfirmSocialPhone'>>();
  const { t } = useTranslation();
  const { tmpToken, provider } = params;

  const {
    images: {
      components: { phone: phoneIcon },
    },
  } = Assets;

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      phone: '',
    },
  });

  const { mutate: sendOtp, isPending } = useSendOtp();

  const validateEgyptPhone = (value: string) => {
  if (!value) {
    return t('auth.socialPhone.enterPhone');
  }

  if (!value.startsWith('01')) {
    return t('auth.socialPhone.invalidPhone');
  }

  if (value.length !== 11) {
    return t('auth.socialPhone.phoneDigits');
  }

  return true;
};

  const handleContinue = ({ phone }: FormData) => {
    sendOtp(buildSendOtpRequest(`+2${phone}`), {
      onSuccess: () => {
        navigation.navigate(Routes.CONFIRM_SOCIAL_OTP, {
          tmpToken,
          phone,
          provider,
        });
      },
      onError: (error: any) => {
        const message =
          error.response?.data?.errors?.[0] ??
          error.response?.data?.message ??
            'Something went wrong';
    
        showToast({
          type: 'error',
          message: message,
          dismissible: false
        })
      }
    });
  };
  const goBack = () =>{
    navigation.goBack();
  }

  return (
    <ScreenContainer screenTitle={t('auth.socialPhone.screenTitle')} onBackPress={goBack} scrollable>
      <View style={styles.headerText}>
        <AppText size={22} weight="700" color="#1A1A1A">
          {t('auth.socialPhone.title')}
        </AppText>
      </View>

      <Controller
        control={control}
        name="phone"
        rules={{
          required: t('auth.socialPhone.enterPhone'),
          validate: validateEgyptPhone,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <AppTextField
            label={t('auth.socialPhone.phone')}
            value={value}
            onChangeText={text => onChange(text.replace(/\D/g, ''))}
            onBlur={onBlur}
            rightIcon={phoneIcon}
            keyboardType="phone-pad"
            maxLength={11}
            error={errors.phone?.message}
          />
        )}
      />

      <View style={styles.buttonStyle}>
        <AppButton
          variant="primary"
          size="full"
          title={t('auth.otp.confirm')}
          onPress={handleSubmit(handleContinue)}
          loading={isPending}
          disabled={!isValid}
        />
      </View>
    </ScreenContainer>
  );
};

export default ConfirmSocialPhone;

const styles = StyleSheet.create({
  headerText: {
    marginBottom: hp(24)
  },
  buttonStyle: {
    marginTop: hp(32)
  },
})
