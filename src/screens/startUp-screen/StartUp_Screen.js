import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import MyImageSlider from './MyImageSlider';
import CustomButton from '../../utils/CustomButton';

let {height, width} = Dimensions.get('window');

function StartUp_Screen(props) {
  return (
    <View style={{height: '100%', width: '100%'}}>
      <MyImageSlider />
      <View style={styles.btns}>
        <Image
          style={styles.thumnailStyle}
          source={require('../../Drawables/logo.png')}
        />
        <CustomButton
          btnTitleStyle={styles.btnTitleStyle}
          style={styles.outBody}
          title="Get Started"
          bgColor="#095ED6"
          OnPRESS={() => props.navigation.navigate('SignUp')}
        />
        <CustomButton
          btnTitleStyle={styles.btnTitleStyle}
          style={styles.outBody}
          title="Login"
          bgColor="#D10404"
          OnPRESS={() => props.navigation.navigate('Login')}
        />
        <Text style={styles.txt}>Presented by Mybahria</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btns: {
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',

    alignSelf: 'center',
    bottom: height * 0.15,
  },
  txt: {
    color: '#FFF',
  },
  thumnailStyle: {
    alignSelf: 'center',
    resizeMode: 'contain',
    marginBottom: height * 0.18,
    width: width * 0.3,
    height: 130,
    borderRadius: 2,
  },
  outBody: {
    borderRadius: 2,
    elevation: 12,

    marginVertical: 8,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.8,
    height: 50,
  },
  btnTitleStyle: {
    color: '#fff',

    paddingVertical: 4,
    textAlign: 'center',
    fontSize: 18,
  },
});

export default StartUp_Screen;
