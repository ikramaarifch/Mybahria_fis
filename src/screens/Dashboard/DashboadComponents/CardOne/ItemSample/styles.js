import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  body: {
    flex: 1,
    marginVertical: 12,
    marginHorizontal: 4,
    justifyContent: 'center',
    // backgroundColor: '#000',
    alignItems: 'center',
    borderRightColor: 'gray',
    borderRightWidth: 0.5,
  },
  title: {
    fontSize: 10,
    paddingHorizontal: 4,
    width: '100%',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  innerBody: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
