import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  form: {
    flex: 1,
    marginHorizontal: 16,
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
  btnBg: {
    marginVertical: 16,
    alignSelf: 'flex-end',
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'firebrick',
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  btnLabel: {
    color: '#fff',
    marginHorizontal: 8,
    fontWeight: 'bold',
  },
});

export default styles;
