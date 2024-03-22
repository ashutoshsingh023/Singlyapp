import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {AppContext} from '../../appContext/Context';

const Gender = ({navigation}) => {
  const {data, setData, IMG_BG} = useContext(AppContext);

  const [selectedOption, setSelectedOption] = useState({
    male: false,
    female: false,
    others: false,
  });

  const handleOptionSelect = option => {
    setSelectedOption({...selectedOption, [option]: !selectedOption[option]});
  };

  const handleSubmit = () => {
    // Find the selected gender
    const selectedGender = Object.keys(selectedOption).find(
      key => selectedOption[key],
    );
    if (!selectedGender) {
      alert('Please select a gender');
      return;
    } else {
      navigation.navigate('passion');
      setData({...data, gender: selectedGender});
    }

    // Perform POST request to submit selected gender
    // fetch('your-api-endpoint', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({gender: selectedGender}), // Include selected gender in the request body
    // })
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     // Handle response from the server
    //     console.log('Response:', data);
    //     // Navigate to the next screen

    //   })
    //   .catch(error => {
    //     console.error('Error:', error);
    //     // Handle error
    //     alert(
    //       'An error occurred while submitting your selected gender. Please try again.',
    //     );
    //   });
  };

  return (
    <ImageBackground source={IMG_BG} style={styles.background} blurRadius={25}>
      <View style={styles.container}>
        <Text style={styles.title}>Select Your Gender</Text>
        <View style={styles.optionsContainer}>
          {Object.keys(selectedOption).map(option => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionButton,
                selectedOption[option] && styles.selectedOption,
              ]}
              onPress={() => handleOptionSelect(option)}>
              <Text style={styles.optionButtonText}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 34,
    marginBottom: 10,
    marginTop: 50,
    marginBottom: 100,
    color: '#fff',
  },
  optionsContainer: {
    marginBottom: 250,
  },
  optionButton: {
    backgroundColor: 'transparent',
    borderColor: '#FF4F4F',
    borderWidth: 1,
    height: 50,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 25,
    marginBottom: 15,
    marginLeft: 14,
    width: '90%',
  },
  selectedOption: {
    backgroundColor: '#FF4F4F',
  },
  optionButtonText: {
    color: '#fff',
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 120,
  },
  buttonContainer: {
    marginTop: 25,
    marginLeft: 20,
    width: '90%',
  },
  button: {
    backgroundColor: '#FF4F4F',
    paddingVertical: 12,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default Gender;
