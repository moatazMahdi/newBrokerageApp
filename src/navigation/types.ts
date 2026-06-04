export type AppStackParamList = {
  Home: undefined;
  onBoarding:undefined;
  Login:undefined;
  Signup:undefined;
  Otp:{ phone: string; mode?: 'signup' | 'reset' };
  ForgotPassword:undefined;
  CreateNewPassword:{ phone: string; code: string };
  ButtonTab:undefined;
};
