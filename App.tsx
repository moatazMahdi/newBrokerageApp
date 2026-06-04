import * as React from 'react';
import { RootNavigator } from './src/navigation';
import { I18nManager, Platform } from 'react-native';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import i18n from './src/localization';
import { storage } from './src/storage/mmkv';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { getFCMToken, requestNotificationPermission } from './src/utils/hellperFuncation';

const queryClient = new QueryClient();
const ANDROID_CHANNEL_ID = 'default';

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

  useEffect(() => {
    initNotifications();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Foreground message received:', remoteMessage);

      if (!remoteMessage) {
        return;
      }

      const title =
        typeof remoteMessage.notification?.title === 'string'
          ? remoteMessage.notification.title
          : typeof remoteMessage.data?.title === 'string'
          ? remoteMessage.data.title
          : undefined;

      const body =
        typeof remoteMessage.notification?.body === 'string'
          ? remoteMessage.notification.body
          : typeof remoteMessage.data?.body === 'string'
          ? remoteMessage.data.body
          : undefined;

      if (!title && !body) {
        return;
      }

      if (Platform.OS === 'android') {
        await createAndroidChannel();
      }

      await notifee.displayNotification({
        title,
        body,
        android: {
          channelId: ANDROID_CHANNEL_ID,
          pressAction: {
            id: 'default',
          },
        },
      });
    });

    return unsubscribe;
  }, []);

  const initNotifications = async () => {
    const hasPermission = await requestNotificationPermission();

    if (!hasPermission) {
      console.log('Permission denied');
      return;
    }

    const token = await getFCMToken();

    if (token) {
      console.log('getFCMToken', token);
    }
  };

  const createAndroidChannel = async () => {
    if (Platform.OS !== 'android') {
      return;
    }

    await notifee.createChannel({
      id: ANDROID_CHANNEL_ID,
      name: 'Default Notifications',
      importance: AndroidImportance.HIGH,
    });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigator />
    </QueryClientProvider>
  );
}
