import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import AppTextField from '../../../components/AppTextField/AppTextField';
import { Assets } from '../../../assets';
import type { SignupValues } from '../validation/signupSchema';

type Props = {
  form: FormikProps<SignupValues>;
  openPassword: boolean;
  openConfirmPassword: boolean;
  onTogglePassword: () => void;
  onToggleConfirmPassword: () => void;
};

const SignupForm = ({
  form,
  openPassword,
  openConfirmPassword,
  onTogglePassword,
  onToggleConfirmPassword,
}: Props) => {
  const { t } = useTranslation();
  const {
    images: {
      components: { phone: phoneIcon, User, lockPassword, eyeOn, eyeOff },
    },
  } = Assets;

  const { values, errors, touched, handleChange, handleBlur } = form;

  // Only surface an error once the field has been touched.
  const errorFor = (field: keyof SignupValues) =>
    touched[field] ? errors[field] : undefined;

  return (
    <View style={styles.signupFormContainer}>
      <AppTextField
        label={t('auth.signup.phone')}
        value={values.phone}
        onChangeText={handleChange('phone')}
        onBlur={handleBlur('phone')}
        rightIcon={phoneIcon}
        keyboardType="phone-pad"
        error={errorFor('phone')}
      />

      <AppTextField
        label={t('auth.signup.username')}
        value={values.fullName}
        onChangeText={handleChange('fullName')}
        onBlur={handleBlur('fullName')}
        rightIcon={User}
        error={errorFor('fullName')}
      />

      <AppTextField
        label={t('auth.signup.password')}
        value={values.password}
        onChangeText={handleChange('password')}
        onBlur={handleBlur('password')}
        rightIcon={lockPassword}
        secureTextEntry={!openPassword}
        leftIcon={openPassword ? eyeOn : eyeOff}
        onLeftIconPress={onTogglePassword}
        error={errorFor('password')}
      />

      <AppTextField
        label={t('auth.signup.confirmPassword')}
        value={values.confirmPassword}
        onChangeText={handleChange('confirmPassword')}
        onBlur={handleBlur('confirmPassword')}
        rightIcon={lockPassword}
        secureTextEntry={!openConfirmPassword}
        leftIcon={openConfirmPassword ? eyeOn : eyeOff}
        onLeftIconPress={onToggleConfirmPassword}
        error={errorFor('confirmPassword')}
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
