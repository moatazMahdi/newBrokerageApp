import React from 'react';
import { View } from 'react-native';
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
  const {
    images: {
      components: { lockPassword, eyeOn, eyeOff },
    },
  } = Assets;

  return (
    <View style={{ width: '100%' }}>
      <AppTextField
        label="كلمة المرور"
        value={password}
        onChangeText={onPasswordChange}
        rightIcon={lockPassword}
        secureTextEntry={!openPassword}
        leftIcon={openPassword ? eyeOn : eyeOff}
        onLeftIconPress={onTogglePassword}
      />

      <AppTextField
        label="تأكيد كلمة المرور"
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
          style={{ marginTop: hp(4), textAlign: 'flex-start' }}
        >
          {error}
        </AppText>
      ) : null}
    </View>
  );
};

export default CreateNewPasswordForm;
