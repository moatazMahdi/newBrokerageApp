import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useForm } from 'react-hook-form';

import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import AppButton from '../../../components/AppButton';
import ForgotPasswordHeader from '../components/ForgotPasswordHeader';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import { useForgetPassword } from '../hooks/useForgetPassword';
import { buildForgetPasswordRequest } from '../../../api/auth';
import { Routes } from '../../../navigation/routes';
import type { AppStackParamList } from '../../../navigation/types';

type FormData = {
  phone: string;
};

const ForgotPassword = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const { t } = useTranslation();

  const { mutate: forgetPassword, isPending } = useForgetPassword();

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

  const handleNext = ({ phone }: FormData) => {
    const phoneNumber = `+2${phone}`;

    forgetPassword(buildForgetPasswordRequest(phoneNumber), {
      onSuccess: () => {
        navigation.navigate(Routes.OTP, {
          phone: phoneNumber,
          mode: 'reset',
        });
      },
    });
  };

  const goBack = () =>{
    navigation.reset({
      index: 0,
      routes: [{name: Routes.LOGIN}]
    });
  }

  return (
    <ScreenContainer screenTitle={t('auth.forgotPassword.screenTitle')} onBackPress={goBack} scrollable>
      <ForgotPasswordHeader />

      <ForgotPasswordForm
        control={control}
        error={errors.phone?.message}
      />

      <AppButton
        variant="primary"
        size="full"
        title={t('auth.forgotPassword.next')}
        onPress={handleSubmit(handleNext)}
        loading={isPending}
        disabled={!isValid}
      />

      {/* <SignupButton /> */}
    </ScreenContainer>
  );
};

export default ForgotPassword;