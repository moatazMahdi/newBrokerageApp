import React from 'react';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import LoginHeader from '../components/LoginHeader';
import LoginForm from '../components/LoginForm';
import LoginButton from '../components/loginButton';
import SocialLogin from '../components/SocialLogin';
import SignupButton from '../components/SignupButton';
import GuestButton from '../components/GuestButton';

const Login = () => {
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [openEye, setOpenEye] = React.useState(false);

  const handleLoginPress = () => {
  };

  const handleFingerprintPress = () => {
  };

  const handleToggleEye = () => {
    setOpenEye(prev => !prev);
  };

  const handleForgotPassword = () => {

  };

  return (
    <ScreenContainer>
      <LoginHeader />
      <LoginForm
        phone={phone}
        password={password}
        openEye={openEye}
        onPhoneChange={setPhone}
        onPasswordChange={setPassword}
        onToggleEye={handleToggleEye}
        onForgotPassword={handleForgotPassword}
      />
      <LoginButton
        onLoginPress={handleLoginPress}
        onFingerprintPress={handleFingerprintPress}
      />
      <SocialLogin />
      <SignupButton />
      <GuestButton />
    </ScreenContainer>
  );
};

export default Login;
