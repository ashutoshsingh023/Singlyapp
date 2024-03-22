import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  Modal
} from "react-native";

const SignUp = ({navigation} ) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); 
  const handleSignUp = ({ navigation }) => {
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
    // use the signup logic
  };
  return (
    <><><View style={styles.container}>
      {/* First Part */}
      <View style={styles.firstPart}>
        <Image source={require('./img/singlys_splash_image.png')} style={styles.logo} />
        <View style={styles.divider}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() =>navigation.navigate('Login')} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
            
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>


          <View style={styles.border}>
          <View style={styles.languageContainer}>
            <Text style={styles.languageText}>Language</Text>
            <TouchableOpacity style={styles.languageButton}  onPress={() => setIsDropdownVisible(true)}>
              <Text style={styles.languageButtonText}>English</Text>
              </TouchableOpacity>
              </View>
              <Modal
        visible={isDropdownVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsDropdownVisible(false)}
      >
        <View style={styles.dropdownContainer}>
          <TouchableOpacity style={styles.dropdownItem} onPress={() => setIsDropdownVisible(false)}>
            <Text style={styles.dropdownText}>German</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownItem} onPress={() => setIsDropdownVisible(false)}>
            <Text style={styles.dropdownText}>Hungarian</Text>
          </TouchableOpacity>
        </View>
      </Modal>
          </View>
          </View>
        </View> 
      </View>

      {/* Second Part */}
      <View style={styles.secondPart}>
     
      </View>
    </View></>
    

  <ImageBackground
    source={require('./img/bgsingly.jpg')}
    style={styles.imgbackground}>
  </ImageBackground>
      </>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#F08678',
    padding: 10,
    height: '200%',
    width: '100%',
    // position: "relative",
    zIndex: 1,
    overflow: 'hidden',
    borderRadius: 10,
  },
  firstPart: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F08678',
    marginTop: 100,
  },
  imgbackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 66,
  },
  buttonContainer: {
    flexDirection: 'coloumn',
    alignItems: 'center',
    // justifyContent: "space-around",
    // backgroundColor: "F4BFBB",
    marginTop: 20,
    width: '80%',
  },
  button: {
    backgroundColor: '#F4BFBB',
    paddingVertical: 15,
    paddingHorizontal: 25,
    padding: 1,
    borderRadius: 20,
    marginVertical: 10,
    width: 300,
    ...Platform.select({
      ios: {
        shadowColor: 'clck',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 1.5,
        shadowRadius: 5,
      },
      android: {
        elevation: 15,
      },
    }),
  },
  buttonText: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 16,
  },
  secondPart: {
    flex: 2,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    color: '#000000',
    fontSize: 24,
    fontWeight: 'bold',
  },
  border: {
    padding: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'White',
    backgroundColor: '#fff',
    borderRadius: 30,
    // marginVertical: 10,
    width: 300,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: 'clck',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 1.5,
        shadowRadius: 5,
      },
      android: {
        elevation: 15,
      },
    }),
  },
  divider: {},
  linearGradient: {
    flex: 1,
  },

  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 3,
    marginBottom: 1,
  },
  languageText: {
    fontSize: 16,
    color: '#000000',
    marginRight: 50,
    marginBottom: 7,
    marginLeft: 30,
  },
  languageButton: {
    backgroundColor: '#000000',
    backgroundColor: '#F4BFBB',
    paddingVertical: 11,
    paddingHorizontal: 45,
    borderRadius: 20,
    // marginLeft: 5,
  },
  languageButtonText: {
    color: '#000000',
    fontSize: 16,
  },
  dropdownContainer: {
    marginTop: 370,
    backgroundColor: '#F4BFBB',
    borderRadius: 20,
    // borderWidth: ,
    width: 135,
    marginLeft: 205,
    borderColor: '#ccc',
    padding: 5,
  },
  dropdownItem: {
    paddingVertical: 6,
    paddingHorizontal: 15,
  },
  dropdownText: {
    fontSize: 16,
    color: '#000000',
  },
});

export default SignUp;