import type { SignupRequest } from '../api/auth';

export type AppStackParamList = {
  Home: undefined;
  onBoarding:undefined;
  Login:undefined;
  Signup:undefined;
  Otp:{ phone: string; mode?: 'signup' | 'reset'; signupData?: SignupRequest };
  ForgotPassword:undefined;
  CreateNewPassword:{ phone: string; code: string };
  AccountCreated:undefined;
  ButtonTab:undefined;
};
