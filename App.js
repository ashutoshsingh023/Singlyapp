import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './src/pages/SplashScreen';
import SignUp from './src/pages/SignUp';
import SignIn from './src/pages/SignIn';
import Name from './src/pages/signup/Name';
import DateOfBirth from './src/pages/signup/DateOfBirth';
import Gender from './src/pages/signup/Gender';
import Passion from './src/pages/signup/Passion';
import Ideal from './src/pages/signup/Ideal';
import Photo from './src/pages/signup/Photo';
import Login from './src/pages/Login';
import Dashboard from './src/pages/Dashboard';
import Location from './src/pages/signup/Location';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    // <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="/" component={SplashScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Name" component={Name} />
      <Stack.Screen name="DateOfBirth" component={DateOfBirth} />
      <Stack.Screen name="Gender" component={Gender} />
      <Stack.Screen name="Passion" component={Passion} />
      <Stack.Screen name="Ideal" component={Ideal} />
      <Stack.Screen name="Photo" component={Photo} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Location" component={Location} />
    </Stack.Navigator>
    // {/* </NavigationContainer> */}
  );
};

export default App;
