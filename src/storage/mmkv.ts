import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV();

export const StorageKeys = {
  TOKEN: 'token',
  USER_PHONE: 'user_phone',
  LOGIN_PROVIDER: 'login_provider',
  IS_GUEST: 'is_guest',
} as const;

export const saveToken = (token: string) => storage.set(StorageKeys.TOKEN, token);

export const getToken = (): string | undefined =>
  storage.getString(StorageKeys.TOKEN);

export const clearToken = () => storage.remove(StorageKeys.TOKEN);

export const saveUserPhone = (phone: string) =>
  storage.set(StorageKeys.USER_PHONE, phone);

export const getUserPhone = (): string =>
  storage.getString(StorageKeys.USER_PHONE) ?? '';

export const saveLoginProvider = (provider: string) =>
  storage.set(StorageKeys.LOGIN_PROVIDER, provider);

export const setGuest = (isGuest: boolean) =>
  storage.set(StorageKeys.IS_GUEST, isGuest);
