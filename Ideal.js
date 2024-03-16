import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Alert,
  FlatList,
} from 'react-native';
import axios from 'axios';
import Photo from './Photo';

const Ideal = ({navigation}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [orientation, setOrientation] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://synglys.arvtec.com/api/show-sexual-orientation',
      );
      setOrientation(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error('Error fetching orientation:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOptionSelect = option => {
    setSelectedOption(option === selectedOption ? null : option);
  };

  const handleSubmit = () => {
    // Handle form submission here
    if (selectedOption) {
      navigation.navigate('Photo');
    } else {
      alert('Please select an Ideal You Have too Interested');
    }
  };

  console.log('orientation', orientation);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.optionButton,
          selectedOption === item && styles.selectedOption,
        ]}
        onPress={() => handleOptionSelect(item)}>
        <Text style={styles.optionButtonText}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      source={require('./img/bgsingly.jpg')}
      style={styles.background}
      blurRadius={25}>
      <View style={styles.container}>
        <Text style={styles.title}>Ideal For</Text>
        <View style={styles.optionsContainer}>
          <FlatList
            data={orientation}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.goBack(Photo)}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={handleSubmit}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
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
    marginBottom: 20,
    marginTop: 300,
    color: '#fff',
  },
  optionsContainer: {
    flexDirection: 'row',
    marginBottom: 280,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionButton: {
    background: 'Transparent',
    borderWidth: 1,
    borderColor: '#FF4F4F',
    paddingVertical: 13,
    paddingHorizontal: 22,
    borderRadius: 22,
    marginBottom: 10,
    margin: 5,
    width: '48%', // Adjust as needed to leave some space between buttons
  },
  selectedOption: {
    backgroundColor: '#FF4F4F',
  },
  optionButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    borderRadius: 22,
    width: '48%', // Adjust as needed to leave some space between buttons
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginBottom: 200,
  },
  primaryButton: {
    backgroundColor: '#FF4F4F',
  },
  secondaryButton: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default Ideal;
