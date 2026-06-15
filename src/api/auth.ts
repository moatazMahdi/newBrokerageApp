import { api } from './axios';
import { forgetVerifyPassword, login, otpSend, passwordForget, passwordReset, signup, signupValidate, verifyOtp, socialLoginAll, socialLoginCompleted } from './authRequests';

export type LoginRequest = {
  identifier: string;
  password: string;
  firebaseToken: string;

};

export type LoginData = {
  name: string;
  username: string;
  phone: string;
  token: string;
};

export type LoginResponse = {
  statusCode: number;
  data: LoginData;
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
});


export type SignupRequest = {
  name: string;
  username: string;
  phone: string;
  password: string;
  confirmPassword: string;

  appVersion?: string;
  firebaseNotificationToken?: string | null;
  location?: {
    time: string;
  };
  mobile_info?: Record<string, unknown>;
};

export type SignupResponse = {
  message?: string;
  data?: {
    token?: string;
  };
  token?: string;
};

export type SignupValidationResponse = {
  message?: string;
};

export const signupValidation = async (
  payload: SignupRequest,
): Promise<SignupValidationResponse> => {
  const response = await api.post(signupValidate, payload);
  return response.data;
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
  name: name.trim(),
  username: name.trim(),
  phone: `+2${phone}`,
  password,
  confirmPassword,
});

export type SendOtpRequest = {
  phone: string;

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
});

export type VerifyCodeRequest = {
  phone: string;
  code: string;

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

});

export type ForgetPasswordRequest = {
  phone: string;

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

});

export type ForgetVerifyCodeRequest = {
  phone: string;
  code: string;

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

});

export type ResetPasswordRequest = {
  phone: string;
  code: string;
  password: string;
  confirmPassword: string;

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
