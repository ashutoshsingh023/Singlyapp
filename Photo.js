import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {launchCamera} from 'react-native-image-picker';

const Photo = ({navigation}) => {
  const [photos, setPhotos] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); 

  const handlePhotoPress = async () => {
    const {status} = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access camera roll is required!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });

    if (!result.cancelled) {
      setPhotos([...photos, {uri: result.uri}]);
    }
  };

  const handleContinuePress = ({Photo}) => {

     
  };
  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    });
  };
   const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
        console.log(imageUri);
      }
    });
  };
  return (
    <ImageBackground
      source={require('./img/bgsingly.jpg')}
      style={styles.backgroundImage}
      blurRadius={25}>
      <Text style={styles.title}>Add Your Best Photos</Text>
      <View style={styles.container}>
        <View style={styles.photosContainer}>
          {photos.map((photo, index) => (
            <Image key={index} source={photo} style={styles.photo} />
          ))}
          {[...Array(4 - photos.length)].map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setIsDropdownVisible(true)}>
              <View style={styles.addPhotoButton}>
                <Text style={styles.addPhotoButtonText}>+</Text>
              </View>
            </TouchableOpacity>
          ))}
          <Modal
            visible={isDropdownVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setIsDropdownVisible(false)}>
            <View style={styles.dropdownContainer}>
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={openImagePicker}>
                <Text style={styles.dropdownText}>GALLERY</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => setIsDropdownVisible(false)}>
                <Text style={styles.dropdownText}>CAMERA</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </View>
      <View style={styles.button}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Location')}
          disabled={photos.length !== 4}
          color={photos.length === 4}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
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
    padding: 40,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    // marginBottom: 60,
    marginTop: 30,
    padding: 20,
    color: 'white',
  },
  photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // marginTop:  10,
    marginBottom: 70,
    // padding: 10,
  },
  photo: {
    width: 100,
    height: 100,
    // margin: 5,
  },
  addPhotoButton: {
    width: 130,
    height: 130,
    background: 'Transparent',
    borderWidth: 3,
    borderColor: '#ff4f4f',
    borderRadius: 10,
    justifyContent: 'center',
    // marginTop: 80,
    alignItems: 'center',
    margin: 13,
  },
  addPhotoButtonText: {
    fontSize: 30,
    color: '#FF4F4F',
  },
  button: {
    backgroundColor: '#FF4F4F',
    paddingVertical: 12,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    marginLeft: 18,
    width: '90%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  dropdownContainer: {
    marginTop: 370,
    backgroundColor: '#CCC',
    borderRadius: 16,
    // borderWidth: ,
    width: 290,
    marginLeft: 53,
    borderColor: '#ccc',
    padding: 5,
  },
  dropdownItem: {
    paddingVertical: 6,
    paddingHorizontal: 15,
  },
  dropdownText: {
    fontSize: 20,
    color: '#000000',
    marginLeft: 80,
  },
});

export default Photo;