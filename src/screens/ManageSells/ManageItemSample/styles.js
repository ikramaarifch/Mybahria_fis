import {StyleSheet, Dimensions} from 'react-native';
const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 8,
    flex: 1,
  },
  ImagesStyles: {
    paddingVertical: 4,
    marginVertical: 18,
    justifyContent: 'space-evenly',

    flexDirection: 'row',
  },
  ImageBodyStyle: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 5,
    alignItems: 'center',
  },
  pickerStyle: {
    color: '#929294',
    fontSize: 11,
    height: 50,
    width: '100%',
  },
  inputStyle: {
    color: '#000',

    backgroundColor: 'transparent',
    // justifyContent: 'space-between',/

    fontSize: 14,
    height: 60,
    // borderColor: '#53607d',
    width: '100%',
    fontFamily: 'ldfcomicsans',
    paddingTop: 10,
  },
  pickerContainer: {
    marginBottom: 8,
    borderBottomColor: '#d8d6db',
    borderBottomWidth: 0.5,
    marginHorizontal: 0,
    paddingHorizontal: 0,
  },
  btnBg: {
    paddingVertical: 8,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    marginBottom: 18,
  },
  btnTitleStyle: {
    color: '#fff',
    fontSize: 18,
  },
});
export default styles;
