import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width: '100%',
  },
  logoView: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  thumnailStyle: {
    marginTop: height * 0.25,

    width: '30%',
    height: 130,
    borderRadius: 2,
    alignSelf: 'baseline',
  },
  title: {
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  inputStyle: {
    color: '#000',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',

    fontSize: 14,
    borderColor: '#53607d',
    width: '100%',
    fontFamily: 'ldfcomicsans',
    paddingTop: 10,
  },
  btnTitleStyle: {
    color: '#fff',
    textAlign: 'center',
  },
  buttonBg: {
    marginTop: height * 0.07,
    borderRadius: 15,
    elevation: 12,

    marginVertical: 8,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.8,
    height: 50,
  },
  forgotBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 8,
    alignSelf: 'center',
    height: '50%',
  },
});

export default styles;
