import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV();

export const StorageKeys = {
  TOKEN: 'token',
  USER_PHONE: 'user_phone',
  LOGIN_PROVIDER: 'login_provider',
  IS_GUEST: 'is_guest',
  BIOMETRIC_ENABLED: 'biometric_enabled',
  BIOMETRIC_CREDENTIALS: 'biometric_credentials',
} as const;

export type BiometricCredentials = {
  phone: string;
  password: string;
};

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

export const setBiometricEnabled = (enabled: boolean) =>
  storage.set(StorageKeys.BIOMETRIC_ENABLED, enabled);

export const isBiometricEnabled = (): boolean =>
  storage.getBoolean(StorageKeys.BIOMETRIC_ENABLED) ?? false;

export const saveBiometricCredentials = (credentials: BiometricCredentials) =>
  storage.set(StorageKeys.BIOMETRIC_CREDENTIALS, JSON.stringify(credentials));

export const getBiometricCredentials = (): BiometricCredentials | null => {
  const raw = storage.getString(StorageKeys.BIOMETRIC_CREDENTIALS);
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw) as BiometricCredentials;
  } catch {
    return null;
  }
};

export const clearBiometricCredentials = () => {
  storage.remove(StorageKeys.BIOMETRIC_CREDENTIALS);
  storage.set(StorageKeys.BIOMETRIC_ENABLED, false);
};
