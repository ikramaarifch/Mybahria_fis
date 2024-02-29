import {
  View,
  SafeAreaView,
  Image,
  Text,
  ToastAndroid,
  ActivityIndicator,
  Modal,
} from 'react-native';
import React, {Component, useState, useReducer, useEffect} from 'react';

// import {} from 'react-native-elements';
// import {TextInput} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';
import styles from './styles';
import {CheckBox} from 'react-native-elements/dist/checkbox/CheckBox';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../../utils/CustomButton';
import {APIS} from '../../utils/URLS/Urls';
import {
  ConstantReducer,
  constant_initialstate,
} from '../../redux/Reducers/Constant.reducer';
import {USER_DATA, USER_TOKEN} from '../../redux/Constant/Constant.action';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {store} from '../../redux/store';
import {ACTION_PROFILE_IMAGE} from '../../redux/tabs_handler/actionTypes';
// ACTION_PROFILE_IMAGE
function Login(props) {
  const [isOffline, setOfflineStatus] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [PasswordVisibility, setPasswordVisibility] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [user_email, setuser_email] = useState();
  const [user_password, setuser_password] = useState();
  const [isLoading, setisLoading] = useState(false);
  // const store = useStore();
  // console.log(store.getState());
  const dispatch = useDispatch();
  const states = useSelector(state => state.ConstantReducer);
  // console.log(user_token, 'login');
  // const [state, dispatch] = useReducer(ConstantReducer, constant_initialstate);
  // const user_token = state.user_token;
  // console.log('user token : ', user_token);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
      setModalVisible(offline);
    });
    return () => removeNetInfoSubscription();
  }, []);

  const loginSuccess = () => {
    user_email && user_password
      ? loginUser()
      : ToastAndroid.show(
          'One of the input field is empty',
          ToastAndroid.SHORT,
        );
  };

  // const getNetInfo = () => {
  //   // To get the network state once
  //   !netInfo
  //     ? ToastAndroid.show('please connect Internet', ToastAndroid.BOTTOM)
  //     : user_email && user_password
  //     ? loginUser()
  //     : ToastAndroid.show(
  //         'One of the input field is empty',
  //         ToastAndroid.SHORT,
  //       );
  // };

  function managePasswordVisibility() {
    setPasswordVisibility(!PasswordVisibility);
  }

  function rememberCheckHandler() {
    setIsChecked(!isChecked);
    // dispatch({type: USER_TOKEN, payload: 'tanveer'});
    // console.log('new state', state.user_token);
  }

  function verifyScreen() {
    props.navigation.navigate('verification');
  }

  const login = ({token, user}) => {
    console.log('User', user);
    dispatch({
      type: USER_DATA,
      payload: {token, user, ProfileImage: user?.avatar},
    });
    // dispatch({type: USER_DATA, payload: user});
    // dispatch({type: ACTION_PROFILE_IMAGE, payload: user.avatar});
    // console.log(states.user_token, 'login');
    // console.log(states.user_data, 'login');

    // props.navigation.navigate('HomeStack');
    console.log('sdsdsdsdsd', token);
    if (token) {
      ToastAndroid.show('Logged in Successfully', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Username and Password Invalid', ToastAndroid.SHORT);
    }
  };
  const loginUser = async () => {
    setisLoading(true);
    const params = {
      email: user_email,
      password: user_password,
    };
    const data = await fetch(APIS.login, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(res => console.log(res))
      .finally(() => {
        setisLoading(false);
      });
    data['message'] === 'invalid credentials'
      ? ToastAndroid.show('Username and Password Invalid', ToastAndroid.SHORT)
      : data['user']?.verified === 'Yes'
      ? await login(data)
      : ToastAndroid.show(
          'Your email is not verified. Please verify the email to access the portal.',
          ToastAndroid.SHORT,
        );
  };

  return (
    <SafeAreaView>
      {isLoading ? (
        <View
          style={{
            backgroundColor: '#00000099',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : null}
      <View style={styles.containerView}>
        {/* <Loader loading={this.state.loading} /> */}

        <View style={styles.logoView}>
          <Image
            style={styles.thumnailStyle}
            source={require('../../Drawables/logo.png')}
          />
        </View>

        <View style={{width: '90%'}}>
          <TextInput
            theme={{colors: {text: '#000', primary: 'red'}}}
            value={user_email}
            onChangeText={val => setuser_email(val)}
            keyboardType="email-address"
            placeholderTextColor="#929294"
            style={styles.inputStyle}
            label="Email"
          />

          <TextInput
            theme={{colors: {text: '#000', primary: 'red'}}}
            placeholderTextColor="#929294"
            style={styles.inputStyle}
            value={user_password}
            onChangeText={val => setuser_password(val)}
            label="Password "
            secureTextEntry={PasswordVisibility}
            right={
              <TextInput.Icon
                name={() => (
                  <FontAwesome
                    name={PasswordVisibility ? 'eye' : 'eye-slash'}
                    style={{color: 'black', fontSize: 18}}
                  />
                )}
                onPress={() => {
                  managePasswordVisibility();
                }}
              />
            }
          />
        </View>

        <View style={styles.checkboxContainer}>
          <CheckBox
            onPress={() => rememberCheckHandler()}
            checked={isChecked}
            checkedColor="red"
            style={styles.checkbox}
          />
          <Text style={styles.label}>Remember Me?</Text>
        </View>
        <View style={styles.forgotCont}>
          <Text
            style={styles.signUP}
            onPress={() => props.navigation.navigate('SignUp')}>
            Don't have account? Sign up
          </Text>
          <Text
            style={styles.forgotPassword}
            onPress={() => props.navigation.navigate('forgetPassword')}>
            Forgot password?
          </Text>
        </View>

        <CustomButton
          btnTitleStyle={styles.loginText}
          style={styles.loginBtn}
          title="Login"
          bgColor="#D10404"
          // OnPRESS={() => verifyScreen()}
          OnPRESS={loginSuccess}
        />

        {/* <Button medium style={styles.loginBtn} onPress={() => verifyScreen()}>
          <Text style={styles.loginText}>Login</Text>
        </Button> */}
        <Modal visible={modalVisible} animationInTiming={600} transparent>
          <View style={styles.modal}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Connection Error</Text>
              <Text style={styles.modalText}>
                Oops! Looks like your device is not connected to the Internet.
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

export default Login;
