/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {name as appName} from './app.json';
import App from './App';
import SinglyProvider from './appContext/Context';

const AppWithNavigation = () => (
  <SinglyProvider>
    <NavigationContainer>
      <App />
    </NavigationContainer>
  </SinglyProvider>
);

AppRegistry.registerComponent(appName, () => AppWithNavigation);
