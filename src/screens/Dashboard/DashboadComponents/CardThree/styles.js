import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    // height: height * 0.38,
    paddingBottom: 8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 4,
    alignSelf: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    // paddingVertical: 8,
    // backgroundColor: 'red',
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
});

export default styles;
