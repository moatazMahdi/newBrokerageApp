import { I18nManager } from 'react-native';
import RNRestart from 'react-native-restart-newarch';
import { storage } from '../storage/mmkv';
import { STORAGE_KEYS } from '../config/storage';
import i18n from './index';

export const changeLanguage = async () => {
  const currentLanguage =
    storage.getString('language') || 'en';

  const nextLanguage =
    currentLanguage === 'en' ? 'ar' : 'en';

  const isRTL = nextLanguage === 'ar';
  storage.set('language', nextLanguage);
  i18n.changeLanguage(nextLanguage);

  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);

  setTimeout(() => {
    RNRestart.restart();
  }, 150);
};

export const setLanguage = (lang: 'ar' | 'en') => {
  const isRTL = lang === 'ar';
  storage.set('language', lang);
  storage.set(STORAGE_KEYS.HAS_SELECTED_LANGUAGE, 'true');
  i18n.changeLanguage(lang);

  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);

  setTimeout(() => {
    RNRestart.restart();
  }, 150);
};