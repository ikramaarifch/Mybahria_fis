import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingBottom: 70,
    justifyContent: 'space-between',
  },

  logoView: {
    flexDirection: 'row',
  },
  thumnailStyle: {
    marginTop: 80,
    marginBottom: 30,
    width: '30%',
    height: 130,
    borderRadius: 2,
    alignSelf: 'baseline',
  },
  loginBtn: {
    minHeight: 40,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#cc0000',
    borderRadius: 10,
    justifyContent: 'center',
    marginVertical: 30,
  },
  loginText: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    width: '100%',
    fontSize: 18,
    fontFamily: 'ldfcomicsans',
    textTransform: 'capitalize',
  },
  inputStyle: {
    color: '#000',

    backgroundColor: 'transparent',
    justifyContent: 'space-between',

    fontSize: 14,
    height: 60,
    // borderColor: '#53607d',
    width: '100%',
    fontFamily: 'ldfcomicsans',
    paddingTop: 10,
  },
  inputContainer: {
    width: '87%',
    margin: 5,
  },
  forgotCont: {
    alignSelf: 'flex-end',
    marginEnd: 16,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgotPassword: {
    color: '#4c76be',
    fontSize: 12,
    fontWeight: 'bold',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    textAlign: 'right',
    width: '44%',
  },
  login: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  signUP: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4c76be',
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    textAlign: 'left',
    width: '44%',
  },

  checkboxContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 4,
  },
  checkbox: {
    backgroundColor: '#fff',
    alignSelf: 'center',
    width: 20,
    height: 20,
  },
  label: {
    backgroundColor: '#fff',
    // color: 'red',
    marginLeft: -12,
    color: 'black',
  },
  pickerContainer: {
    marginBottom: 8,
    borderBottomColor: '#d8d6db',
    borderBottomWidth: 0.5,
    marginHorizontal: 0,
    paddingHorizontal: 0,
  },
  pickerStyle: {
    color: '#929294',
    fontSize: 11,
    height: 50,
    width: '100%',
  },
  alreadyReg: {
    marginTop: 4,
    color: '#4c76be',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default styles;
