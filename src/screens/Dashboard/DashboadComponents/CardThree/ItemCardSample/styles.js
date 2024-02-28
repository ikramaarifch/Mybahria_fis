import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  body: {
    flex: 1,

    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 15,
    height: height * 0.14,
    marginVertical: 2,
    marginHorizontal: 5,
    borderRadius: 5,

    shadowColor: '#000',
    shadowOffset: {
      height: 15,
      width: 15,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  title: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  innerBody: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
