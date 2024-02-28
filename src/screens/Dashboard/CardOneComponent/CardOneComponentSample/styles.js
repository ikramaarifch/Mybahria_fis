import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  body: {
    marginVertical: 8,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 4,

    paddingHorizontal: 8,
    backgroundColor: '#fff',
    // flex: 1,
    paddingVertical: 4,

    flexDirection: 'row',
    elevation: 5,
    // backgroundColor: 'skyblue',
  },
  c1: {
    flex: 1,
    paddingVertical: 4,
    // backgroundColor: 'gold',
    paddingHorizontal: 8,
    justifyContent: 'space-evenly',
  },
  c2: {
    flex: 1,
    alignItems: 'flex-end',
    paddingHorizontal: 8,
    // backgroundColor: 'yellow',
    justifyContent: 'space-evenly',
  },
  textWthIcon: {
    marginVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  headerDescription: {
    color: 'gray',
    fontSize: 12,
  },

  location: {marginHorizontal: 4, fontSize: 10},
  phoneNo: {marginHorizontal: 4, fontSize: 10},
  mail: {marginHorizontal: 4, fontSize: 10},

  btns: {
    marginHorizontal: 2,
    borderRadius: 5,
    padding: 6,
    backgroundColor: 'firebrick',
  },
  btnsTitle: {
    color: '#fff',
    fontSize: 10,
  },
});

export default styles;
