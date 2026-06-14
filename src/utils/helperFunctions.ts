import {PermissionsAndroid, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';


export const requestNotificationPermission = async () => {
  try {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        return false;
      }
    }

    const authStatus = await messaging().requestPermission();

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    return enabled;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getFCMToken = async () => {
  try {
    await messaging().registerDeviceForRemoteMessages();

    const token = await messaging().getToken();
    
    console.log('FCM Token:', token);

    return token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getErrorMessage = (
  error: any,
  fallback = 'Something went wrong',
): string =>
  error?.response?.data?.errors?.[0] ??
  error?.response?.data?.message ??
  fallback;

export const getAppVersion = () => DeviceInfo.getVersion();

export const getDeviceInfo = async () => {
  return {
    platform: Platform.OS,
    is_tablet: DeviceInfo.isTablet(),
    system_version: DeviceInfo.getSystemVersion(),
    brand: DeviceInfo.getBrand(),
    model: DeviceInfo.getModel(),
    power_state: await DeviceInfo.getPowerState(),
    manufacturer: await DeviceInfo.getManufacturer(),
    carrier: await DeviceInfo.getCarrier(),
    total_capacity: await DeviceInfo.getTotalDiskCapacity(),
    free_storage: await DeviceInfo.getFreeDiskStorage(),
  };
};