import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import AppTextField from '../../../components/AppTextField/AppTextField';
import { Assets } from '../../../assets';
import type { SignupValues } from '../validation/signupSchema';

type Props = {
  control: Control<SignupValues>;
  errors: FieldErrors<SignupValues>;
  isPasswordVisible: boolean;
  isConfirmPasswordVisible: boolean;
  onTogglePassword: () => void;
  onToggleConfirmPassword: () => void;
};

const SignupForm = ({
  control,
  errors,
  isPasswordVisible,
  isConfirmPasswordVisible,
  onTogglePassword,
  onToggleConfirmPassword,
}: Props) => {
  const { t } = useTranslation();
  const {
    images: {
      components: { phone: phoneIcon, User, lockPassword, eyeOn, eyeOff },
    },
  } = Assets;

  return (
    <View style={styles.signupFormContainer}>
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, onBlur, value } }) => (
          <AppTextField
            label={t('auth.signup.phone')}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            rightIcon={phoneIcon}
            keyboardType="phone-pad"
            error={errors.phone?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, onBlur, value } }) => (
          <AppTextField
            label={t('auth.signup.username')}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            rightIcon={User}
            error={errors.username?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <AppTextField
            label={t('auth.signup.password')}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            rightIcon={lockPassword}
            secureTextEntry={!isPasswordVisible}
            leftIcon={isPasswordVisible ? eyeOn : eyeOff}
            onLeftIconPress={onTogglePassword}
            error={errors.password?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <AppTextField
            label={t('auth.signup.confirmPassword')}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            rightIcon={lockPassword}
            secureTextEntry={!isConfirmPasswordVisible}
            leftIcon={isConfirmPasswordVisible ? eyeOn : eyeOff}
            onLeftIconPress={onToggleConfirmPassword}
            error={errors.confirmPassword?.message}
          />
        )}
      />
    </View>
  );
};

export default SignupForm;

const styles = StyleSheet.create({
  signupFormContainer: {
    width: '100%',
  },
});
