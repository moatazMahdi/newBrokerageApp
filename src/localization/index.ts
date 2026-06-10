import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';

import en from './en';
import ar from './ar';
import { storage } from '../storage/mmkv';

const savedLanguage = storage.getString('language') || 'en';
const isRTL = savedLanguage === 'ar';

I18nManager.allowRTL(isRTL);
I18nManager.forceRTL(isRTL);

i18n.use(initReactI18next).init({
  lng: savedLanguage,
  fallbackLng: 'en',

  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;