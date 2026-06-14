import type { SignupRequest } from 'src/api/auth';

export type AppStackParamList = {
  Home: undefined;
  onBoarding:undefined;
  Login:undefined;
  Signup:undefined;
  Otp:{
    phone: string;
    mode?: 'signup' | 'reset';
    otpSent?: boolean;
    signupPayload?: SignupRequest;
  };
  ForgotPassword:undefined;
  CreateNewPassword:{ phone: string; code: string };
  ConfirmSocialPhone:{
    tmpToken: string;
    provider: 'google' | 'facebook' | 'apple';
  };
  ConfirmSocialOtp:{
    tmpToken: string;
    phone: string;
    provider: 'google' | 'facebook' | 'apple';
  };
  ButtonTab:undefined;
};
