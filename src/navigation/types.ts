export type AppStackParamList = {
  Home: undefined;
  onBoarding:undefined;
  Login:undefined;
  Signup:undefined;
  Otp:{ phone: string; mode?: 'signup' | 'reset' };
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
