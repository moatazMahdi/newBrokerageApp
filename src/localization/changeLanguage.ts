import { I18nManager } from 'react-native';
import RNRestart from 'react-native-restart-newarch';
import { storage } from '../storage/mmkv';
import i18n from './index';

export const changeLanguage = async () => {
  const currentLanguage =
    storage.getString('language') || 'en';

  const nextLanguage =
    currentLanguage === 'en' ? 'ar' : 'en';

  const isRTL = nextLanguage === 'ar';
  storage.set('language', nextLanguage);
  i18n.changeLanguage(nextLanguage);

  await I18nManager.allowRTL(isRTL);
  await I18nManager.forceRTL(isRTL);

  setTimeout(() => {
    RNRestart.restart();
  }, 150)
};