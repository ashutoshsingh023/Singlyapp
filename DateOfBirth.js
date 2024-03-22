import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  TextInput,
} from 'react-native';
import {AppContext} from './appContext/Context';

const DateOfBirth = ({navigation}) => {
  const [dob, setDob] = useState('');
  const {data} = useContext(AppContext);
  
  console.log('====================================');
  console.log('data', data);
  console.log('====================================');

  const handleContinue = () => {
    // Validate date of birth input
    if (dob.trim() === '') {
      alert('Please enter your date of birth.');
      return;
    }

    // Perform POST request to submit registration data
    fetch('your-api-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({dob}), // Include date of birth in the request body
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Handle response from the server
        console.log('Response:', data);
        // Navigate to the next screen
        navigation.navigate('Gender');
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error
        alert(
          'An error occurred while submitting your date of birth. Please try again.',
        );
      });
  };

  return (
    <ImageBackground
      source={require('./img/bgsingly.jpg')}
      style={styles.background}
      blurRadius={25}>
      <View style={styles.container}>
        <Text style={styles.title}>What's your Date of Birth?</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={dob}
          onChangeText={e => setDob(e.target.value)}
          keyboardType="numeric"
          maxLength={10}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    padding: 10,
  },
  title: {
    fontSize: 34,
    marginBottom: 20,
    marginTop: 100,
    color: '#fff',
  },
  input: {
    width: '100%',
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    color: '#fff',
    fontSize: 18,
  },
  button: {
    backgroundColor: 'red',
    paddingVertical: 12,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 370,
    marginLeft: 22,
    width: '90%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default DateOfBirth;
