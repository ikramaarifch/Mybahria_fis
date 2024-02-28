import React, {useState} from 'react';
import {View, SafeAreaView, Text, Image} from 'react-native';
import {TextInput} from 'react-native-paper';
import styles from './styles';
import CustomButton from '../../utils/CustomButton';
import {ToastAndroid} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function ForgetPassword({navigation}) {
  const [email, setEmail] = useState('');
  console.log(navigation);
  const [otp, setOtp] = useState('');
  const forgetPassword = async () => {
    if (email != '') {
      var myHeaders = new Headers();

      var formdata = new FormData();
      formdata.append('email', email);
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };
      await fetch(
        'http://mybahria.assanhissab.com/api/forget-password-email',
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          console.log(result, 'resp');
          if (result.message === 'No email found') {
          } else if (result.otp) {
            setOtp(result.otp);
            navigation.navigate('verification', {
              otp: result.otp,
              email: email,
            });
          }
        })
        .catch(error => console.log('error', error));
    } else {
      ToastAndroid.show('Email Field Empty', ToastAndroid.SHORT);
    }
  };
  return (
    <SafeAreaView>
      <FontAwesome
        name="arrow-left"
        size={17}
        color="#D10404"
        onPress={() => {
          navigation.goBack();
        }}
        style={{top: 10, left: 10, zIndex: 7}}
      />
      <View style={styles.logoView}>
        <Image
          style={styles.thumnailStyle}
          source={require('../../Drawables/logo.png')}
          resizeMode="contain"
        />
      </View>

      <View style={styles.forgotBox}>
        <Text style={styles.title}>Forgot Password</Text>
        <TextInput
          theme={{colors: {text: '#000', primary: 'red'}}}
          // value={this.state.email}
          // onChangeText={(value) => this.setState({email: value})}
          placeholderTextColor="#929294"
          style={styles.inputStyle}
          label="Email"
          onChangeText={text => {
            setEmail(text);
          }}
        />
        <CustomButton
          style={styles.buttonBg}
          btnTitleStyle={styles.btnTitleStyle}
          title="Proceed"
          bgColor="red"
          OnPRESS={forgetPassword}
        />
      </View>
    </SafeAreaView>
  );
}

export default ForgetPassword;
