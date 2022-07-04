/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import notifee from '@notifee/react-native';

notifee.onBackgroundEvent(async ({ type, detail }) => {
  console.log('Background event: ', type, 'notif: ', detail.notification);
  return Promise.resolve();
});

notifee.registerForegroundService((notification) => {
  console.log('service: ', notification);
  // return new Promise((res) => {
  //   setTimeout(res, 7000);
  // });
});

AppRegistry.registerComponent(appName, () => App);
