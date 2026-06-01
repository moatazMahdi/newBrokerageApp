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

AppRegistry.registerComponent(appName, () => App);
