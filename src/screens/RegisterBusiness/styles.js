import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  form: {
    flex: 1,
    marginVertical: 16,
    borderRadius: 15,

    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  TextInput: {
    backgroundColor: 'transparent',
    height: 50,
    fontSize: 14,
    marginVertical: 8,
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
  btnBg: {
    marginVertical: 16,
    // alignSelf: 'flex-end',
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'firebrick',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  btnLabel: {
    color: '#fff',
    marginHorizontal: 8,
    fontWeight: 'bold',
  },
  SectionTitle: {
    marginVertical: 16,
    fontWeight: 'bold',
    color: '#000',
    // alignSelf: 'center',
    // paddingVertical: 4,
    textAlignVertical: 'center',
    fontSize: 18,
    borderColor: 'red',

    // borderBottomColor: 'firebrick',
    // borderBottomWidth: 2,
    borderLeftWidth: 2,
    // borderRightWidth: 4,
    paddingHorizontal: 12,
    // borderRadius: 50,
  },
});

export default styles;
