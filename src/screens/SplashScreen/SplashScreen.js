import React, {Component, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import styles from './styles';
// import {} from 'native-base'
import {Thumbnail} from 'native-base';

function SplashScreen(props) {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.replace('startup_screen');
    }, 1500);
  });
  return (
    <SafeAreaView>
      <ImageBackground
        source={require('../../Drawables/splash1.png')}
        style={styles.mainBody}>
        <Image
          style={styles.thumnailStyle}
          source={require('../../Drawables/logo.png')}
        />

        <Text style={styles.txt}>It's all About Bahria</Text>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default SplashScreen;
