import { api } from './axios';
import i18n from '../localization';
import { forgetVerifyPassword, login, otpSend, passwordForget, passwordReset, signup, verifyOtp, socialLoginAll, socialLoginCompleted } from './authRequests';

export type LoginRequest = {
  identifier: string;
  password: string;
  firebaseToken: string;
  lang: 'en' | 'ar';
};

export type LoginResponse = {
  token: string;
  user?: {
    id: string;
    name?: string;
    email?: string;
  };
};

export const loginUser = async (
  payload: LoginRequest,
): Promise<LoginResponse> => {
  const response = await api.post(login, payload);
  return response.data;
};

export const buildLoginRequest = (
  identifier: string,
  password: string,
  firebaseToken: string,
): LoginRequest => ({
  identifier,
  password,
  firebaseToken,
  lang: (i18n.language === 'ar' ? 'ar' : 'en') as 'en' | 'ar',
});

const currentLang = (): 'en' | 'ar' =>
  (i18n.language === 'ar' ? 'ar' : 'en') as 'en' | 'ar';

export type SignupRequest = {
  name: string;
  phone: string;
  password: string;
  confirmPassword: string;
  lang: 'en' | 'ar';
};

export type SignupResponse = {
  message?: string;
};

export const signupUser = async (
  payload: SignupRequest,
): Promise<SignupResponse> => {
  const response = await api.post(signup, payload);
  return response.data;
};

export const buildSignupRequest = (
  name: string,
  phone: string,
  password: string,
  confirmPassword: string,
): SignupRequest => ({
  name,
  phone,
  password,
  confirmPassword,
  lang: currentLang(),
});

export type SendOtpRequest = {
  phone: string;
  lang: 'en' | 'ar';
};

export type SendOtpResponse = {
  message?: string;
};

export const sendOtp = async (
  payload: SendOtpRequest,
): Promise<SendOtpResponse> => {
  const response = await api.post(otpSend, payload);
  return response.data;
};

export const buildSendOtpRequest = (phone: string): SendOtpRequest => ({
  phone,
  lang: currentLang(),
});

export type VerifyCodeRequest = {
  phone: string;
  code: string;
  lang: 'en' | 'ar';
};

export type VerifyCodeResponse = {
  token?: string;
  message?: string;
};

export const verifyCode = async (
  payload: VerifyCodeRequest,
): Promise<VerifyCodeResponse> => {
  const response = await api.post(verifyOtp, payload);
  return response.data;
};

export const buildVerifyCodeRequest = (
  phone: string,
  code: string,
): VerifyCodeRequest => ({
  phone,
  code,
  lang: currentLang(),
});

export type ForgetPasswordRequest = {
  phone: string;
  lang: 'en' | 'ar';
};

export type ForgetPasswordResponse = {
  message?: string;
};

export const forgetPassword = async (
  payload: ForgetPasswordRequest,
): Promise<ForgetPasswordResponse> => {
  const response = await api.post(passwordForget, payload);
  return response.data;
};

export const buildForgetPasswordRequest = (
  phone: string,
): ForgetPasswordRequest => ({
  phone,
  lang: currentLang(),
});

export type ForgetVerifyCodeRequest = {
  phone: string;
  code: string;
  lang: 'en' | 'ar';
};

export type ForgetVerifyCodeResponse = {
  token?: string;
  message?: string;
};

export const forgetVerifyCode = async (
  payload: ForgetVerifyCodeRequest,
): Promise<ForgetVerifyCodeResponse> => {
  const response = await api.post(forgetVerifyPassword, payload);
  return response.data;
};

export const buildForgetVerifyCodeRequest = (
  phone: string,
  code: string,
): ForgetVerifyCodeRequest => ({
  phone,
  code,
  lang: currentLang(),
});

export type ResetPasswordRequest = {
  phone: string;
  code: string;
  password: string;
  confirmPassword: string;
  lang: 'en' | 'ar';
};

export type ResetPasswordResponse = {
  message?: string;
};

export const resetPassword = async (
  payload: ResetPasswordRequest,
): Promise<ResetPasswordResponse> => {
  const response = await api.post(passwordReset, payload);
  return response.data;
};

export const buildResetPasswordRequest = (
  phone: string,
  code: string,
  password: string,
  confirmPassword: string,
): ResetPasswordRequest => ({
  phone,
  code,
  password,
  confirmPassword,
  lang: currentLang(),
});

export type SocialProvider = 'google' | 'facebook' | 'apple';

export type SocialLoginStatus =
  | 'LOGGED_IN'
  | 'NEED_PHONE_VERIFICATION'
  | (string & {});

export type SocialLoginRequest = {
  provider: SocialProvider;
  token: string;
  phone?: string;
  appleUser?: string;
  lang: 'en' | 'ar';
};

export type SocialLoginResponse = {
  data?: {
    status?: SocialLoginStatus;
    token?: string;
    tmpToken?: string;
    [key: string]: unknown;
  };
  status?: SocialLoginStatus;
  token?: string;
  tmpToken?: string;
  message?: string;
};

export const socialLogin = async (
  payload: SocialLoginRequest,
): Promise<SocialLoginResponse> => {
  const response = await api.post(socialLoginAll, payload);
  return response.data;
};

export const buildSocialLoginRequest = (
  provider: SocialProvider,
  token: string,
  phone?: string,
  appleUser?: string,
): SocialLoginRequest => ({
  provider,
  token,
  phone,
  appleUser,
  lang: currentLang(),
});

export type SocialLoginCompleteRequest = {
  tmpToken: string;
  phone: string;
  code: string;
};

export const socialLoginComplete = async (
  payload: SocialLoginCompleteRequest,
): Promise<SocialLoginResponse> => {
  const response = await api.post(socialLoginCompleted, payload);
  return response.data;
};

export const buildSocialLoginCompleteRequest = (
  tmpToken: string,
  phone: string,
  code: string,
): SocialLoginCompleteRequest => ({
  tmpToken,
  phone,
  code,
});
