import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
    elevation: 10,
    marginTop: 8,
    alignSelf: 'center',
    width: '95%',
    borderRadius: 8,
    // borderColor: 'gray',
    // borderBottomWidth: 0.5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#000',
    textAlign: 'justify',
  },
  innerBody: {
    justifyContent: 'center',
    justifyContent: 'center',
  },
  time: {
    marginHorizontal: 4,
    color: 'gray',
    fontSize: 12,
  },
  author: {
    fontSize: 12,
    color: 'green',
    fontWeight: 'bold',
  },
});
export default styles;
