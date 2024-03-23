import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import {AppContext} from '../../appContext/Context';

const Photo = ({navigation}) => {
  const {data, IMG_BG, SubmitHandler} = useContext(AppContext);

  const [photos, setPhotos] = useState([]);
  const [image, setImage] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    if (image && image !== undefined && image !== null) {
      setPhotos(photos => [...photos, image]);
      setImage();
    }
  }, [image]);

  const openImagePicker = () => {
    ImagePicker.openPicker({
      width: 500,
      height: 720,
      cropping: true,
    }).then(image => {
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
      setIsDropdownVisible(false);
    });
  };

  const handleCameraLaunch = async () => {
    ImagePicker.openCamera({
      width: 200,
      height: 300,
      cropping: true,
    }).then(image => {
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
      setIsDropdownVisible(false);
    });
  };

  const handleSubmit = async () => {
    if (photos.length === 0) {
      alert('Please select at least one photo.');
      return;
    } else {
      SubmitHandler();
      navigation.navigate('Location');
    }

    try {
      const formData = new FormData();
      photos.forEach((photo, index) => {
        formData.append(`photo${index}`, {
          uri: photo,
          type: 'image/jpeg',
          name: `photo${index}.jpg`,
        });
      });

      const response = await axios.post('your-api-endpoint', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error submitting photos:', error);
      alert(
        'An error occurred while submitting your photos. Please try again.',
      );
    }
  };

  return (
    <ImageBackground
      source={IMG_BG}
      style={styles.backgroundImage}
      blurRadius={25}>
      <Text style={styles.title}>Add Your Best Photos</Text>
      <View style={styles.container}>
        <View style={styles.photosContainer}>
          {photos.map((photo, index) => (
            <Image key={index} source={{uri: photo}} style={styles.photo} />
          ))}
          {photos.length !== 4 && (
            <TouchableOpacity onPress={() => setIsDropdownVisible(true)}>
              <View style={styles.addPhotoButton}>
                <Text style={styles.addPhotoButtonText}>+</Text>
              </View>
            </TouchableOpacity>
          )}
          <Modal
            visible={isDropdownVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setIsDropdownVisible(false)}>
            <View style={styles.dropdownContainer}>
              <TouchableOpacity
                onPress={() => setIsDropdownVisible(false)}
                style={{justifyContent: 'flex-end', width: '100%'}}>
                <Text>X</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={openImagePicker}>
                <Text style={styles.dropdownText}>GALLERY</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={handleCameraLaunch}>
                <Text style={styles.dropdownText}>CAMERA</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        // disabled={photos.length !== 4}
      >
        <Text style={styles.buttonText}>Continue</Text>
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
    width: '100%',
    height: '100%',
    // margin: 5,
  },
  addPhotoButton: {
    width: 130,
    height: 130,
    background: 'Transparent',
    borderWidth: 1,
    borderColor: '#ff4f4f',
    borderRadius: 10,
    justifyContent: 'center',
    // marginTop: 80,
    alignItems: 'center',
    margin: 13,
    overflow: 'hidden',
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
