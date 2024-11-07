import React, {useState} from 'react';
import {View, SafeAreaView, Text, Image, ToastAndroid} from 'react-native';
import {TextInput} from 'react-native-paper';
import styles from './styles';
import CustomButton from '../../utils/CustomButton';
import {register} from 'fetch-intercept';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function PasswordChange({route, navigation}) {
  const {Email} = route.params;
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPassword, setNewPasswrod] = useState('');
  console.log(Email);
  const changePassword = () => {
    !confirmPassword
      ? ToastAndroid.show('password invalid', ToastAndroid.SHORT)
      : !newPassword
      ? ToastAndroid.show('user confirm password invalid', ToastAndroid.SHORT)
      : !(newPassword === confirmPassword)
      ? ToastAndroid.show('Passwords not matched', ToastAndroid.SHORT)
      : NewPasswrod();
  };
  const NewPasswrod = () => {
    var myHeaders = new Headers();

    var formdata = new FormData();
    formdata.append('email', Email);
    formdata.append('password', newPassword);
    formdata.append('confirm_password', confirmPassword);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    fetch('https://mybahria.com.pk/api/new-password', requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status) {
          ToastAndroid.show('Password Change Successfully', ToastAndroid.SHORT);
          navigation.navigate('Login');
        } else {
          ToastAndroid.show(`${result.message}`, ToastAndroid.SHORT);
        }
      })
      .catch(error => console.log('error', error));
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
        <Text style={styles.title}>Change Password</Text>
        <TextInput
          theme={{colors: {text: '#000', primary: 'red'}}}
          // value={this.state.email}
          // onChangeText={(value) => this.setState({email: value})}
          placeholderTextColor="#929294"
          style={styles.inputStyle}
          label="New Password"
          onChangeText={text => {
            setNewPasswrod(text);
          }}
        />
        <TextInput
          theme={{colors: {text: '#000', primary: 'red'}}}
          // value={this.state.email}
          // onChangeText={(value) => this.setState({email: value})}
          placeholderTextColor="#929294"
          style={styles.inputStyle}
          label="Confirm Password"
          onChangeText={text => {
            setConfirmPassword(text);
          }}
        />
        <CustomButton
          style={styles.buttonBg}
          btnTitleStyle={styles.btnTitleStyle}
          title="Proceed"
          bgColor="red"
          OnPRESS={() => {
            changePassword();
          }}
        />
      </View>
    </SafeAreaView>
  );
}

export default PasswordChange;
