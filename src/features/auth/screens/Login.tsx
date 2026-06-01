import { View, Text } from 'react-native';
import React from 'react';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import AppTextField from '../../../components/AppTextField/AppTextField';
import { Assets } from '../../../assets';
import AppText from '../../../components/AppText/AppText';
import { hp } from '../../../utils/dimensions';
import LoginButton from '../components/loginButton';
import SocialLogin from '../components/SocialLogin';
import SignupButton from '../components/SignupButton';
import GuestButton from '../components/GuestButton';

const Login = () => {
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [openEye, setOpenEye] = React.useState(false);
  const {
    images: {
      components: {
        phone: phoneIcon,
        eyeOn,
        eyeOff,
        lockPassword,
      },
    },
  } = Assets;
  return (
      <ScreenContainer>
        <AppText size={18} weight="600">
          مرحبا بعودتك 👋
        </AppText>
        <AppText size={14} style={{ marginTop: hp(8), marginBottom: hp(24) }}>
          ادخل رقم الهاتف وكلمة المرور للدخول الي حسابك.
        </AppText>
        <AppTextField
          label="رقم الهاتف"
          value={phone}
          onChangeText={setPhone}
          rightIcon={phoneIcon}
          keyboardType="phone-pad"
        />
        <AppTextField
          label="كلمة المرور"
          value={password}
          onChangeText={setPassword}
          rightIcon={lockPassword}
          keyboardType="phone-pad"
          secureTextEntry={!openEye}
          leftIcon={openEye ? eyeOn : eyeOff}
          onLeftIconPress={() => {
            setOpenEye(!openEye);
          }}
        />
        <AppText size={14} color="#18359E" style={{ alignSelf: 'flex-end',}} weight="600">
          نسيت كلمة السر؟
        </AppText>
          <LoginButton onLoginPress={() => {}} onFingerprintPress={() => {}} />
            <SocialLogin />
            <SignupButton />
            <GuestButton/>
      </ScreenContainer>
  );
};

export default Login;
