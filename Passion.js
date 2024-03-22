import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import axios from 'axios';

const Passion = ({navigation}) => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [orientation, setOrientation] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://synglys.arvtec.com/api/passion',
      );
      setOrientation(response.data.data);
    } catch (error) {
      console.error('Error fetching orientation', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInterestSelect = interest => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(item => item !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const continueButtonPressed = async () => {
    if (selectedInterests.length < 3) {
      alert('Please select at least three interests.');
      return;
    }

    try {
      // Perform POST request to submit selected interests
      const response = await axios.post('your-api-endpoint', {
        interests: selectedInterests,
      });

      // Handle response from the server
      if (response.status === 200) {
        // Server response was successful
        console.log('Response:', response.data);
        // Optionally, you can navigate to the next screen here
        navigation.navigate('Ideal');
      } else {
        // Server response was not successful
        console.error('Error:', response.statusText);
        // Display an error alert
        alert(
          'An error occurred while submitting your selected interests. Please try again.',
        );
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error:', error);
      // Display an error alert
      alert(
        'An error occurred while submitting your selected interests. Please try again.',
      );
    }
  };

  return (
    <ImageBackground
      source={require('./img/bgsingly.jpg')}
      style={styles.backgroundImage}
      blurRadius={25}>
      <View style={styles.container}>
        <Text style={styles.title}>Your Passion and Interest</Text>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.orientationContainer}>
            {orientation.map(item => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.button,
                  selectedInterests.includes(item) && styles.selectedButton,
                ]}
                onPress={() => handleInterestSelect(item)}>
                <Text style={styles.buttonText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.Button} onPress={continueButtonPressed}>
        <Text style={styles.ButtonText}>Continue</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 20,
    color: '#ccc',
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  orientationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    height: 45,
    backgroundColor: 'transparent',
    borderColor: '#FF4F4F',
    borderWidth: 1,
    margin: 6,
    width: '45%',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  selectedButton: {
    backgroundColor: '#FF4F4F',
  },
  buttonText: {
    color: '#ccc',
    fontWeight: 'bold',
  },
  Button: {
    backgroundColor: '#FF4F4F',
    paddingVertical: 12,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    marginLeft: 18,
    width: '90%',
  },
  ButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Passion;
