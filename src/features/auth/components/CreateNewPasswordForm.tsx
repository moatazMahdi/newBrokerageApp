import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import AppTextField from '../../../components/AppTextField/AppTextField';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import { Assets } from '../../../assets';

type Props = {
  password: string;
  confirmPassword: string;
  isPasswordVisible: boolean;
  isConfirmPasswordVisible: boolean;
  error?: string;
  onPasswordChange: (text: string) => void;
  onConfirmPasswordChange: (text: string) => void;
  onTogglePassword: () => void;
  onToggleConfirmPassword: () => void;
};
const { lockPassword, eyeOn, eyeOff } = Assets.images.components;

const CreateNewPasswordForm = ({
  password,
  confirmPassword,
  isPasswordVisible,
  isConfirmPasswordVisible,
  error,
  onPasswordChange,
  onConfirmPasswordChange,
  onTogglePassword,
  onToggleConfirmPassword,
}: Props) => {
  const { t } = useTranslation();
  

  return (
    <View style={styles.conatainer}>
      <AppTextField
        label={t('auth.createNewPassword.password')}
        value={password}
        onChangeText={onPasswordChange}
        rightIcon={lockPassword}
        secureTextEntry={!isPasswordVisible}
        leftIcon={isPasswordVisible ? eyeOn : eyeOff}
        onLeftIconPress={onTogglePassword}
      />

      <PasswordStrengthMeter password={password} />

      <AppTextField
        label={t('auth.createNewPassword.confirmPassword')}
        value={confirmPassword}
        onChangeText={onConfirmPasswordChange}
        rightIcon={lockPassword}
        secureTextEntry={!isConfirmPasswordVisible}
        leftIcon={isConfirmPasswordVisible ? eyeOn : eyeOff}
        onLeftIconPress={onToggleConfirmPassword}
        error={error}
      />
    </View>
  );
};

export default CreateNewPasswordForm;

const styles = StyleSheet.create({
  conatainer: {
    width: "100%"
  }
})