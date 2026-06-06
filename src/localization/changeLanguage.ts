import { I18nManager } from 'react-native';
import RNRestart from 'react-native-restart';
import { storage } from '../storage/mmkv';
import i18n from './index';

export const changeLanguage = () => {
  const currentLanguage =
    storage.getString('language') || 'en';

  const nextLanguage =
    currentLanguage === 'en' ? 'ar' : 'en';

  const isRTL = nextLanguage === 'ar';

  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);
  storage.set('language', nextLanguage);
  i18n.changeLanguage(nextLanguage);

  // A restart is required for the native RTL/LTR layout change to take effect.
  RNRestart.Restart();
};