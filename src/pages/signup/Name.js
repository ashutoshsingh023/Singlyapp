import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  TextInput,
} from 'react-native';
import {AppContext} from '../../appContext/Context';

const Name = ({navigation}) => {
  const [name, setName] = useState('');
  const {data, setData, IMG_BG} = useContext(AppContext);

  const handleContinue = () => {
    setData({...data, name: name});
    navigation.navigate('DateOfBirth');
  };

  return (
    <ImageBackground source={IMG_BG} style={styles.background} blurRadius={25}>
      <View style={styles.container}>
        <Text style={styles.title}>What's your name?</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          onChangeText={setName}
          value={name}
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

export default Name;
