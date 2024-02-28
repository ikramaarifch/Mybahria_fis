import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  body: {
    flex: 1,
    // backgroundColor: 'red',
  },
  header: {
    marginVertical: 4,
    color: 'black',
    // alignSelf: 'flex-start',
    // borderLeftColor: 'red',
    // backgroundColor: 'red',
    paddingHorizontal: 16,
    // flex: 1,
    fontWeight: '600',
    textAlignVertical: 'center',
    borderLeftWidth: 0,
    fontSize: 15,
    // fontWeight: 'bold',
    // fontStyle: 'italic',
    color: '#cc0000',
    // marginHorizontal: 20,
  },
  modalMainView: {
    backgroundColor: 'white',
    flex: 1,
  },
  itemsStyle: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 6,
    // elevation: 12,
    marginHorizontal: 16,
  },
});

export default styles;
