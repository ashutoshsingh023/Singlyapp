import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleContinue = () => {
    navigation.navigate('Name');

    // Trim whitespace from email, password, first name, and last name
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();

    // Check if email, password, first name, and last name fields are not empty
    if (
      !trimmedEmail ||
      !trimmedPassword ||
      !trimmedConfirmPassword ||
      !trimmedFirstName ||
      !trimmedLastName
    ) {
      alert('Please fill in all fields.');
      return;
    }

    // Check if email is in a valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Check if password meets minimum length requirement (example: minimum 6 characters)
    if (trimmedPassword.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    // Check if passwords match
    // if (trimmedPassword !== trimmedConfirmPassword) {
    //   alert('Passwords do not match.');
    //   return;
    // }

    // If all validations pass, send a POST request to the registration API
    fetch('https://synglys.arvtec.com/api/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: trimmedEmail,
        password: trimmedPassword,
        // first_name: trimmedFirstName,
        // last_name: trimmedLastName,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Handle response from the server
        console.log('Registration successful:', data);
        // Navigate to the next screen
        navigation.navigate('Name'); // Assuming the next screen is the name screen
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error
        alert('An error occurred while registering. Please try again.');
      });
  };

  return (
    <ImageBackground
      source={require('./img/bgsingly.jpg')}
      style={styles.background}
      blurRadius={25}>
      <View>
        <Text style={styles.title}>My Email and Password</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
          underlineColorAndroid="transparent"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          underlineColorAndroid="transparent"
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#ccc"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          underlineColorAndroid="transparent"
        />
        {/* <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="#ccc"
          value={firstName}
          onChangeText={setFirstName}
          underlineColorAndroid="transparent"
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor="#ccc"
          value={lastName}
          onChangeText={setLastName}
          underlineColorAndroid="transparent"
        /> */}
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
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
    marginTop: 160,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 20,
    marginTop: 80,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,
    height: 50,
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    color: '#000',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: 'red',
    paddingVertical: 12,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    marginLeft: 22,
    width: '90%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default SignIn;
