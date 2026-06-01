import React from 'react';
import AppTextField from '../../../components/AppTextField/AppTextField';
import { Assets } from '../../../assets';
import { View } from 'react-native';

type Props = {
  phone: string;
  username: string;
  password: string;
  confirmPassword: string;
  openPassword: boolean;
  openConfirmPassword: boolean;
  onPhoneChange: (text: string) => void;
  onUsernameChange: (text: string) => void;
  onPasswordChange: (text: string) => void;
  onConfirmPasswordChange: (text: string) => void;
  onTogglePassword: () => void;
  onToggleConfirmPassword: () => void;
};

const SignupForm = ({
  phone,
  username,
  password,
  confirmPassword,
  openPassword,
  openConfirmPassword,
  onPhoneChange,
  onUsernameChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onTogglePassword,
  onToggleConfirmPassword,
}: Props) => {
  const {
    images: {
      components: { phone: phoneIcon, User, lockPassword, eyeOn, eyeOff },
    },
  } = Assets;

  return (
    <View style={styles.signupFormContainer}>
      <AppTextField
        label="رقم الهاتف"
        value={phone}
        onChangeText={onPhoneChange}
        rightIcon={phoneIcon}
        keyboardType="phone-pad"
      />

      <AppTextField
        label="اسم المستخدم"
        value={username}
        onChangeText={onUsernameChange}
        rightIcon={User}
      />

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
    </View>
  );
};

export default SignupForm;


const styles = {
    signupFormContainer: {
        width: '100%',
        // gap: 16,
        // backgroundColor: "red"
    }
};