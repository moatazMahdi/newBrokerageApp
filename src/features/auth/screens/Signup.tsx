import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import AppButton from '../../../components/AppButton';
import SignupHeader from '../components/SignupHeader';
import SignupForm from '../components/SignupForm';
import GuestButton from '../components/GuestButton';
import { useSignupValidation } from '../hooks/useSignupValidation';
import { useSendOtp } from '../hooks/useSendOtp';
import { buildSendOtpRequest, buildSignupRequest } from '../../../api/auth';
import { Routes } from '../../../navigation/routes';
import type { AppStackParamList } from '../../../navigation/types';
import { signupSchema, SignupValues } from '../validation/signupSchema';
import { hp } from '../../../utils/dimensions';
import PasswordRequirements from '../components/PasswordRequirements';
import { getAppVersion } from '../../../utils/helperFunctions';

const initialValues: SignupValues = {
  username: '',
  phone: '',
  password: '',
  confirmPassword: '',
};

const Signup = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const { t } = useTranslation();

  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = React.useState(false);

  const { mutate: validateSignup, isPending: isValidatingSignup } =
    useSignupValidation();
  const { mutate: sendOtp, isPending: isSendingOtp } = useSendOtp();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SignupValues>({
    mode: 'onChange',
    resolver: yupResolver(signupSchema(t)),
    defaultValues: initialValues,
  });

  const password = watch('password');
  
  const onSubmit = (values: SignupValues) => {
    const payload = {
      ...buildSignupRequest(
        values.username,
        values.phone,
        values.password,
        values.confirmPassword,
      ),
      appVersion: getAppVersion(),
    };

    validateSignup(payload, {
      onSuccess: () => {
        sendOtp(buildSendOtpRequest(payload.phone), {
          onSuccess: () => {
            navigation.navigate(Routes.OTP, {
              phone: payload.phone,
              mode: 'signup',
              otpSent: true,
              signupPayload: payload,
            });
          },
          onError: error => {
            Alert.alert(
              t('common.error'),
              error.message || t('auth.otp.resendFailed'),
            );
          },
        });
      },
      onError: error => {
        Alert.alert(t('common.error'), error.message || t('auth.signup.failed'));
      },
    });
  };

  const goBack = () =>{
    navigation.reset({
      index: 0,
      routes: [{ name: Routes.LOGIN }],
    });
  }

  const isSubmitting = isValidatingSignup || isSendingOtp;

  return (
    <ScreenContainer
      screenTitle={t('auth.signup.screenTitle')}
      onBackPress={goBack}
      scrollable
      showLanguage
    >
      <SignupHeader />
      <SignupForm
        control={control}
        errors={errors}
        isPasswordVisible={isPasswordVisible}
        isConfirmPasswordVisible={isConfirmPasswordVisible}
        password={password}
        onTogglePassword={() => setIsPasswordVisible(prev => !prev)}
        onToggleConfirmPassword={() =>
          setIsConfirmPasswordVisible(prev => !prev)
        }
      />
      <PasswordRequirements password={password} />

      <View style={styles.seperator} />

      <View style={styles.buttonContainer}>
        <AppButton
          variant='primary'
          size="full"
          title={t('auth.signup.createAccount')}
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
          disabled={!isValid || isSubmitting}
        />
        <GuestButton />
      </View>
    </ScreenContainer>
  );
};

export default Signup;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'column',
    gap: hp(16),
    marginVertical: hp(16),
    backgroundColor: "#FFFFFF",
    paddingVertical: hp(16),
    alignItems: 'center',
  },
  seperator: {
    flex: 1,
  },
})
