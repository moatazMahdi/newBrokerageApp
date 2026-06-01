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
