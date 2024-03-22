import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  Platform,
  PermissionsAndroid,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import {AppContext} from '../../appContext/Context';

const Location = () => {
  const {data, IMG_BG} = useContext(AppContext);

  const [locationEnabled, setLocationEnabled] = useState(false);

  useEffect(() => {
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      Geolocation.setRNConfiguration({authorizationLevel: 'whenInUse'});
      if (!(await Geolocation.getAuthorization())) {
        showAlert(
          'Location Services Disabled',
          'Please enable location services for this app in Settings.',
        );
      } else {
        setLocationEnabled(true);
      }
    } else if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'This app needs access to your location to function properly.',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          async position => {
            console.log('Current location:', position);
            setLocationEnabled(true);
            // Send location data to your API
            try {
              const {latitude, longitude} = position.coords;
              await sendLocationData(latitude, longitude);
            } catch (error) {
              console.error('Error sending location data:', error);
            }
          },
          error => console.error(error),
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
      } else {
        showAlert(
          'Location Permission Denied',
          'Please enable location permission in app settings.',
        );
      }
    }
  };

  const showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
  };

  const sendLocationData = async (latitude, longitude) => {
    try {
      const response = await axios.post('your-api-endpoint', {
        lat: latitude,
        long: longitude,
        version: '1.0', // Example version
        ip: '192.168.1.1', // Example IP address
      });
      console.log('Location data sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending location data:', error);
    }
  };

  return (
    <ImageBackground source={IMG_BG} style={styles.backgroundImage}>
      <View style={styles.container}>
        {locationEnabled ? (
          <Text style={styles.text}>Location Enabled!</Text>
        ) : (
          <>
            <Text style={styles.text}>Location Services Disabled</Text>
            <Button
              title="Enable Location Services"
              onPress={enableLocationServices}
            />
          </>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: 'white', // Change text color to white
  },
});

export default Location;
