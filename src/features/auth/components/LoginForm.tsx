import React from 'react';
import { TouchableOpacity } from 'react-native';
import AppTextField from '../../../components/AppTextField/AppTextField';
import AppText from '../../../components/AppText/AppText';
import { hp } from '../../../utils/dimensions';
import { Assets } from '../../../assets';

type Props = {
  phone: string;
  password: string;
  openEye: boolean;
  onPhoneChange: (text: string) => void;
  onPasswordChange: (text: string) => void;
  onToggleEye: () => void;
  onForgotPassword?: () => void;
};

const LoginForm = ({
  phone,
  password,
  openEye,
  onPhoneChange,
  onPasswordChange,
  onToggleEye,
  onForgotPassword,
}: Props) => {
  const {
    images: {
      components: { phone: phoneIcon, eyeOn, eyeOff, lockPassword },
    },
  } = Assets;

  return (
    <>
      <AppTextField
        label="رقم الهاتف"
        value={phone}
        onChangeText={onPhoneChange}
        rightIcon={phoneIcon}
        keyboardType="phone-pad"
      />

      <AppTextField
        label="كلمة المرور"
        value={password}
        onChangeText={onPasswordChange}
        rightIcon={lockPassword}
        secureTextEntry={!openEye}
        leftIcon={openEye ? eyeOn : eyeOff}
        onLeftIconPress={onToggleEye}
      />

      <TouchableOpacity
        onPress={onForgotPassword}
        style={{ alignSelf: 'flex-end', marginTop: hp(8) }}
      >
        <AppText size={14} color="#18359E" weight="600">
          نسيت كلمة السر؟
        </AppText>
      </TouchableOpacity>
    </>
  );
};

export default LoginForm;
