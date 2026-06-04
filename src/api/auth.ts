import { api } from './axios';
import i18n from '../localization';

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
  const response = await api.post('/login', payload);
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

/* -------------------------------- Signup -------------------------------- */

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
  const response = await api.post('/api/auth/signup', payload);
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

/* -------------------------------- OTP ----------------------------------- */

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
  const response = await api.post('/api/auth/otp/send', payload);
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
  const response = await api.post('/api/auth/phone/verify', payload);
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

/* --------------------------- Forgot Password ---------------------------- */

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
  const response = await api.post('/api/auth/password/forget', payload);
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
  const response = await api.post('/api/auth/password/forget/verify', payload);
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
  const response = await api.post('/api/auth/password/reset', payload);
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
