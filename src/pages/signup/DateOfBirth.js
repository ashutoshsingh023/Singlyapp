import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';
import {AppContext} from '../../appContext/Context';
import {DatePickerInput, DatePickerModal} from 'react-native-paper-dates';
import DatePicker from 'react-native-date-picker';


const DateOfBirth = ({navigation}) => {
  const [dob, setDob] = useState('');
  const {data, setData, IMG_BG} = useContext(AppContext);

  const [date, setDate] = React.useState(undefined);
  const [open, setOpen] = React.useState(false);

  console.log('====================================');
  console.log('dob', date);
  console.log('====================================');

  const handleContinue = () => {
    setData({...data, data: date});
    navigation.navigate('gender');
  };

  return (
    <ImageBackground source={IMG_BG} style={styles.background} blurRadius={25}>
      <View style={styles.container}>
        <Text style={styles.title}>What's your Date of Birth?</Text>
        {/* <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={dob}
          onChangeText={e => setDob(e.target.value)}
          keyboardType="numeric"
          maxLength={10}
          type="date"
        /> */}
        <Button onPress={() => setOpen(true)} title="Pick a date" />
        <DatePickerInput
          locale="en"
          label="Birthdate"
          value={date}
          onChange={d => setDate(d)}
          inputMode="start"
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
