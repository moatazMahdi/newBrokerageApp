/**
 * @format
 */

import { AppRegistry } from 'react-native';

if (__DEV__) {
  require('./ReactotronConfig');
}

import './src/localization';
import App from './App';
import { name as appName } from './app.json';
import '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';


messaging().setBackgroundMessageHandler(
  async remoteMessage => {
    console.log(
      'Background',
      remoteMessage,
    );
  },
);

AppRegistry.registerComponent(appName, () => App);
