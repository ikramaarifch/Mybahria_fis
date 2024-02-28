import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Modal, View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {HomeStack} from '.';
import NetInfo from '@react-native-community/netinfo';
import ForgetPassword from '../screens/forgetPassword/ForgetPassword';
import {Home} from '../screens';
// import ForgetPassword from '../Screens/forgetPassword/ForgetPassword';
import Login from '../screens/Login/Login';
import SignUp from '../screens/SignUp/SignUp';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import StartUp_Screen from '../screens/startUp-screen/StartUp_Screen';
import Verification from '../screens/Verification/Verification';
import SignUpstep2 from '../screens/SignUp/SignUpstep2';
import SignUpstep3 from '../screens/SignUp/SignupStep3';
import PasswordChange from '../screens/forgetPassword/PasswordChange';
const Stack = createStackNavigator();
ForgetPassword;

function StartUp_stack(props) {
  const [count, setCount] = useState(0);
  const [isOffline, setOfflineStatus] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const loginSelector = useSelector(state => state.ConstantReducer);
  // console.log(loginSelector, 'loginSelector');

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
      setModalVisible(offline);
    });
    return () => removeNetInfoSubscription();
  }, []);
  return (
    <NavigationContainer>
      {!loginSelector.user_token ? (
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="startup_screen" component={StartUp_Screen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="verification" component={Verification} />
          <Stack.Screen name="forgetPassword" component={ForgetPassword} />
          <Stack.Screen name="Signup2" component={SignUpstep2} />
          <Stack.Screen name="Signup3" component={SignUpstep3} />
          <Stack.Screen name="HomeStack" component={HomeStack} />
          <Stack.Screen name="passwordchange" component={PasswordChange} />
          <Stack.Screen name="MAIN" component={Home} />
        </Stack.Navigator>
      ) : !isOffline ? (
        <Stack.Navigator
          initialRouteName="HomeStack"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="HomeStack" component={HomeStack} />
        </Stack.Navigator>
      ) : (
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
      )}
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
  },
  modalText: {
    fontSize: 18,
    color: '#555',
    marginTop: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
});
export default StartUp_stack;
