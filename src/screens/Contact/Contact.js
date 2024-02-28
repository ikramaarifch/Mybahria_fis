import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import CustomHeader from '../CustomHeader/CustomHeader';

import styles from './styles';
import {TextInput} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import {ToastAndroid} from 'react-native';
function Contact(props) {
  const states = useSelector(state => state.ConstantReducer);
  console.log(states?.user_token, 'contact');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone_no, setPhoneno] = useState('');
  const [message, setMessage] = useState('');
  const ContactUS = () => {
    //ssToastAndroid.show('password not match', ToastAndroid.SHORT);
    name === ''
      ? ToastAndroid.show('Name Field Empty', ToastAndroid.SHORT)
      : email === ''
      ? ToastAndroid.show('Email Field Empty', ToastAndroid.SHORT)
      : phone_no === ''
      ? ToastAndroid.show('Phone Number Field  Empty', ToastAndroid.SHORT)
      : message === ''
      ? ToastAndroid.show('Message Field Empty', ToastAndroid.SHORT)
      : Contactus();
  };
  const Contactus = async () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${states?.user_token}`);
    myHeaders.append(
      'Cookie',
      'XSRF-TOKEN=eyJpdiI6Ik9JNGgzRHpCWUZUNGlXNWxwNlVkdlE9PSIsInZhbHVlIjoib1l1eG5YZXNvMDBVMHhOYktUeVp0eHFHZVUxNk9RSjNWaHNVbmtyWlYvWGFOVFB3UkZmdjk5bGdhcWorT3NKRzkwVkE3cHRnT1VqTW1URG95R1VvejI0WUt2a1NBRituWTZTb3NDYTRiYUFGMzNxbm5lV1c3N1JFLy9yN29BcE8iLCJtYWMiOiI5NDZkMTdlOGJmNTRhZjBmNzY1ODBiZGU4MWU5OWU4MmJiYWU1NWE2ZGQwOTVjMjRhNTY3YTk0NmNkMTczZGMwIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IjF3V2JLUUFqSlVZS1ptb0NQb2hZd3c9PSIsInZhbHVlIjoiSnhhVFVTOXovUVp0NXBPZFEvNkh6RytHOHhrbjFtQnF1TkVRVTk0WWtVTU4yMS9kM1JWZkJBUmdEQW0zZEFDN3pDUWljdlR3T1V1aHJYS1NZUXlhT2V4UjRnRjY1NVZyaXc0aThHaEJxcmkyRWVGMGpobFd3OWcvdVIwTDN6YTEiLCJtYWMiOiI0NjM2MDdhYmI3ZmNkOWY5NjA3MjY4OGU1NzA5NTJmNzg0ZDk3Y2JiMjk2NzA0OGM2OTY3MDk1YzNjYWY3MDIyIiwidGFnIjoiIn0%3D',
    );
    var formdata = new FormData();
    formdata.append('name', name);
    formdata.append('email', email);
    formdata.append('phone_no', phone_no);
    formdata.append('message', message);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    fetch('http://mybahria.assanhissab.com/api/contact-us', requestOptions)
      .then(response => response.json())
      .then(({message}) => {
        if (message === 'Your request submit successfully') {
          props.navigation.navigate('MainWindow');
          ToastAndroid.show('Form Submitted', ToastAndroid.SHORT);
        } else {
          ToastAndroid.show('Some Thing Went Wrong', ToastAndroid.SHORT);
        }
      })
      .catch(error => console.log('error', error));
  };
  return (
    <SafeAreaView style={styles.body}>
      {/* <CustomHeader title="Contact" navigation={props.navigation} /> */}

      <ScrollView>
        <View style={styles.form}>
          <TextInput
            autoFocus={false}
            onChangeText={name => {
              setName(name);
            }}
            style={styles.TextInput}
            label="Name"
            theme={{colors: {text: '#000', primary: 'firebrick'}}}
          />

          <TextInput
            onChangeText={email => setEmail(email)}
            textContentType="emailAddress"
            keyboardType="email-address"
            autoFocus={false}
            style={styles.TextInput}
            label="Email Address"
            theme={{colors: {text: '#000', primary: 'firebrick'}}}
          />

          <TextInput
            onChangeText={phno => setPhoneno(phno)}
            keyboardType="phone-pad"
            autoFocus={false}
            style={styles.TextInput}
            label="Phone Number"
            theme={{colors: {text: '#000', primary: 'firebrick'}}}
          />

          <TextInput
            onChangeText={message => setMessage(message)}
            selectionColor="firebrick"
            numberOfLines={15}
            multiline={true}
            autoFocus={false}
            style={{...styles.TextInput, height: '25%'}}
            label="Message"
            theme={{colors: {text: '#000', primary: 'firebrick'}}}
          />

          <TouchableOpacity style={styles.btnBg} onPress={ContactUS}>
            <Text style={styles.btnLabel}>Send</Text>
            <FontAwesome name="send" size={14} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Contact;
