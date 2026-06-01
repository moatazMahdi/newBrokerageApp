import * as React from 'react';
import { RootNavigator } from './src/navigation';
import { I18nManager } from 'react-native';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import i18n from './src/localization';
import { storage } from './src/storage/mmkv';

const queryClient = new QueryClient();

export default function App() {
  useEffect(() => {
    const savedLanguage = storage.getString('language');
    const rtlConstants = I18nManager.getConstants?.();

    console.log('APP STARTUP LANGUAGE STATUS');
    console.log('  savedLanguage:', savedLanguage);
    console.log('  i18n.language:', i18n.language);
    console.log('  I18nManager.isRTL:', I18nManager.isRTL);
    console.log('  I18nManager constants:', rtlConstants);
    console.log('  localeIdentifier:', rtlConstants?.localeIdentifier);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigator />
    </QueryClientProvider>
  );
}
