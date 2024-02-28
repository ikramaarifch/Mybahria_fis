import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainBody: {
    height: '100%',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  thumnailStyle: {
    resizeMode: 'contain',

    width: width * 0.35,
    height: height * 0.2,
    borderRadius: 2,
  },
  txt: {
    marginTop: height * 0.1,
    fontWeight: 'bold',
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default styles;
