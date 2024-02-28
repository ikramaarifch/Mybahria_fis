import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    height: 190,
    width: '100%',
    alignItems: 'center',
    // justifyContent: 'space-around',
    borderRadius: 4,
    alignSelf: 'center',
    // backgroundColor: 'red',
    marginBottom: 16,
    elevation: 12,

    shadowColor: 'grey',
    shadowOffset: {
      height: 15,
      width: 15,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  rows: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  btnSeeAll: {
    padding: 4,
    backgroundColor: 'firebrick',
    borderRadius: 4,
  },
  btnSeeAllTxt: {
    color: '#fff',
    fontSize: 13,
    paddingHorizontal: 2,
  },
  flatlist: {height: height * 0.25},
});

export default styles;
