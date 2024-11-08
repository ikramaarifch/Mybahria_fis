import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  body: {
    flex: 1,
    // borderColor: 'gray',
    // borderBottomWidth: 0.5,
    elevation: 5,
    width: '95%',
    alignSelf: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 4,
    marginVertical: 8,
    minHeight: 100,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 12,
    marginVertical: 16,
    color:'black',
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
    color: 'firebrick',
    fontWeight: 'bold',
  },
});
export default styles;
