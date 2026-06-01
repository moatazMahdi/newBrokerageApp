import React from 'react';
import { Alert, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import AppButton from '../../../components/AppButton';
import SignupHeader from '../components/SignupHeader';
import SignupForm from '../components/SignupForm';
import TermsCheckbox from '../components/TermsCheckbox';
import GuestButton from '../components/GuestButton';
import { useSignup } from '../hooks/useSignup';
import { buildSignupRequest } from '../../../api/auth';
import { Routes } from '../../../navigation/routes';
import type { AppStackParamList } from '../../../navigation/types';

const Signup = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const [phone, setPhone] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [openPassword, setOpenPassword] = React.useState(false);
  const [openConfirmPassword, setOpenConfirmPassword] = React.useState(false);
  const [agreed, setAgreed] = React.useState(false);

  const { mutate: signup, isPending } = useSignup();

  const handleSignupPress = () => {
    if (
      !phone.trim() ||
      !username.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      Alert.alert('خطأ', 'الرجاء ملء جميع الحقول');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('خطأ', 'كلمتا المرور غير متطابقتين');
      return;
    }

    if (!agreed) {
      Alert.alert('خطأ', 'يجب الموافقة على الشروط والأحكام');
      return;
    }

    const payload = buildSignupRequest(
      username,
      phone,
      password,
      confirmPassword,
    );

    signup(payload, {
      onSuccess: () => {
        navigation.navigate(Routes.OTP, { phone });
      },
      onError: error => {
        Alert.alert('خطأ', error.message || 'فشل إنشاء الحساب');
      },
    });
  };

  return (
    <ScreenContainer>
      <SignupHeader />
      <SignupForm
        phone={phone}
        username={username}
        password={password}
        confirmPassword={confirmPassword}
        openPassword={openPassword}
        openConfirmPassword={openConfirmPassword}
        onPhoneChange={setPhone}
        onUsernameChange={setUsername}
        onPasswordChange={setPassword}
        onConfirmPasswordChange={setConfirmPassword}
        onTogglePassword={() => setOpenPassword(prev => !prev)}
        onToggleConfirmPassword={() => setOpenConfirmPassword(prev => !prev)}
      />
      <TermsCheckbox agreed={agreed} onChange={setAgreed} />

      <View style={{ flex: 1 }} />

      <AppButton
        width="100%"
        title="إنشاء حساب"
        onPress={handleSignupPress}
        loading={isPending}
      />
      <GuestButton />
    </ScreenContainer>
  );
};

export default Signup;
