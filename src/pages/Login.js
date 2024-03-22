import React, {useState} from 'react';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
// import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';
import axios from 'axios';

const LoginPage = ({navigation}) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'https://synglys.arvtec.com/api/login-user',
        {
          userId: userId,
          password: password,
        },
      );
      console.log('Login successful:', response.data);
      navigation.navigate('Dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      Alert.alert('Login Failed', 'Invalid credentials. Please try again.');
    }
  };

  // const handleFacebookLogin = async () => {
  //   try {
  //     const result = await LoginManager.logInWithPermissions([
  //       'public_profile',
  //       'email',
  //     ]);
  //     if (result.isCancelled) {
  //       console.log('Facebook login cancelled');
  //     } else {
  //       const data = await AccessToken.getCurrentAccessToken();
  //       if (data) {
  //         console.log('Facebook access token:', data.accessToken.toString());
  //         // here I  can use the access token to authenticate the user with our backend
  //       } else {
  //         console.log('Failed to get Facebook access token');
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Facebook login error:', error);
  //   }
  // };

  // const handleGoogleLogin = async () => {
  //   try {
  //     // Configure GoogleSignin
  //     await GoogleSignin.configure({
  //       webClientId: 'YOUR_WEB_CLIENT_ID', // Replace wi our web client id
  //     });

  //     // Sign in
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();

  //     console.log('Google user info:', userInfo);
  //     // I can use the user info to authenticate the user with our backend
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       console.log('Google sign-in cancelled');
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       console.log('Google sign-in in progress');
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       console.log('Google Play Services not available');
  //     } else {
  //       console.error('Google sign-in error:', error.message);
  //     }
  //   }
  // };
  return (
    <ImageBackground
      source={require('./img/bgsingly.jpg')}
      style={styles.background}
      blurRadius={15}>
      <View style={styles.container}>
        <Image source={require('./img/logo_new.png')} style={styles.logo} />
        <TextInput
          style={styles.input}
          placeholder="User ID"
          value={userId}
          onChangeText={setUserId}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.orContainer}>
          <View style={styles.line}></View>
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line}></View>
        </View>
        <TouchableOpacity
          style={styles.facebookButton}>
          <Text style={styles.buttonText}>Login with Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.googleButton}>
          <Text style={styles.buttonText}>Login with Google</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: 'white',
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#ff4f4f',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  facebookButton: {
    width: '100%',
    backgroundColor: '#ff4f4f',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  googleButton: {
    width: '100%',
    backgroundColor: '#ff4f4f',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'white',
  },
  orText: {
    paddingHorizontal: 10,
    color: 'white',
  },
});

export default LoginPage;
