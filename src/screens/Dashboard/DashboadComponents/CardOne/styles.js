import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    height: height * 0.3,
    width: '90%',

    borderRadius: 4,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 4,

    elevation: 12,

    shadowColor: 'grey',
    shadowOffset: {
      height: 15,
      width: 15,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  title: {
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',

    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderColor: 'grey',
    paddingVertical: 8,
  },
  itemsView: {
    flex: 1,

    marginBottom: 8,
    marginHorizontal: 6,
  },
  rows: {
    flex: 1,
    backgroundColor: '#fff',
    marginVertical: 2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  noBorder: {
    borderRightWidth: 0,
  },
});

export default styles;
