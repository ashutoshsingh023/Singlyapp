import React, {useContext, useEffect} from 'react';
import {View, ImageBackground, Image, StyleSheet} from 'react-native';
import {AppContext} from '../appContext/Context';

const SplashScreen = ({navigation}) => {
  const {data, IMG_BG} = useContext(AppContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Navigate to the next screen after 5 seconds
      navigation.replace('SignUp'); // Replace 'NextScreen' with the name of your next screen
    }, 5000); // 5000 milliseconds = 5 seconds

    return () => clearTimeout(timer); // Clean up the timer
  }, [navigation]);
  return (
    <ImageBackground source={IMG_BG} style={styles.background} blurRadius={25}>
      <View style={styles.container}>
        <Image
          source={require('../assets/img/logo_new.png')}
          style={styles.logo}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default SplashScreen;
