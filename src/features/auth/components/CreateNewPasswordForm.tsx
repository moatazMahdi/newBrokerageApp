import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import AppTextField from '../../../components/AppTextField/AppTextField';
import AppText from '../../../components/AppText/AppText';
import { Assets } from '../../../assets';
import { hp } from '../../../utils/dimensions';

type Props = {
  password: string;
  confirmPassword: string;
  openPassword: boolean;
  openConfirmPassword: boolean;
  error?: string;
  onPasswordChange: (text: string) => void;
  onConfirmPasswordChange: (text: string) => void;
  onTogglePassword: () => void;
  onToggleConfirmPassword: () => void;
};

const CreateNewPasswordForm = ({
  password,
  confirmPassword,
  openPassword,
  openConfirmPassword,
  error,
  onPasswordChange,
  onConfirmPasswordChange,
  onTogglePassword,
  onToggleConfirmPassword,
}: Props) => {
  const { t } = useTranslation();
  const {
    images: {
      components: { lockPassword, eyeOn, eyeOff },
    },
  } = Assets;

  return (
    <View style={{ width: '100%' }}>
      <AppTextField
        label={t('auth.createNewPassword.password')}
        value={password}
        onChangeText={onPasswordChange}
        rightIcon={lockPassword}
        secureTextEntry={!openPassword}
        leftIcon={openPassword ? eyeOn : eyeOff}
        onLeftIconPress={onTogglePassword}
      />

      <AppTextField
        label={t('auth.createNewPassword.confirmPassword')}
        value={confirmPassword}
        onChangeText={onConfirmPasswordChange}
        rightIcon={lockPassword}
        secureTextEntry={!openConfirmPassword}
        leftIcon={openConfirmPassword ? eyeOn : eyeOff}
        onLeftIconPress={onToggleConfirmPassword}
      />

      {error ? (
        <AppText
          size={12}
          weight="500"
          color="#E11D48"
          style={{ marginTop: hp(-8) }}
        >
          {error}
        </AppText>
      ) : null}
    </View>
  );
};

export default CreateNewPasswordForm;
