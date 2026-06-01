import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';

import en from './en';
import ar from './ar';
import { storage } from '../storage/mmkv';

const savedLanguage = storage.getString('language');
const isRTL = savedLanguage === 'ar';

console.log('I18N RTL INIT', {
  savedLanguage,
  isRTLBefore: I18nManager.isRTL,
  rtlConstantsBefore: I18nManager.getConstants?.(),
});

I18nManager.allowRTL(isRTL);
I18nManager.forceRTL(isRTL);

console.log('I18N RTL AFTER FORCE', {
  savedLanguage,
  isRTLAfter: I18nManager.isRTL,
  rtlConstantsAfter: I18nManager.getConstants?.(),
});

i18n.use(initReactI18next).init({
  lng: savedLanguage || 'en',
  fallbackLng: 'en',

  resources: {
    en: {
      translation: en,
    },
    ar: {
      translation: ar,
    },
  },

  interpolation: {
    escapeValue: false,
  },
});

console.log('I18N INIT', {
  savedLanguage,
  initializedLanguage: i18n.language,
  isRTL: I18nManager.isRTL,
  rtlConstants: I18nManager.getConstants?.(),
});

export default i18n;