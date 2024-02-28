import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  body: {
    flex: 1,
    height: '100%',
    // marginTop: 16,
    // paddingBottom: 70,
    // backgroundColor: 'red',
  },
  header: {
    fontSize: 20,
    color: 'blue',
  },

  itemsStyle: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 6,
    elevation: 12,
    marginHorizontal: 16,
  },
});

export default styles;
