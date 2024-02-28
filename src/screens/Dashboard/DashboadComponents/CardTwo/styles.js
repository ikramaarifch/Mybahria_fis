import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  body: {
    // flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    // height: height * 0.18,
    width: '100%',
    // alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    alignSelf: 'center',
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 12,

    shadowColor: 'grey',
    shadowOffset: {
      height: 15,
      width: 15,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },

  featuredImgStyle: {
    // flex: 1,
    // width: '100%',
    flexDirection: 'row',
    // backgroundColor: 'blue',
    paddingVertical: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  featuredImage: {
    width: '48%',
    borderRadius: 7,
    marginVertical: 10,
  },
  //   title: {
  //     fontSize: 10,
  //     fontWeight: 'bold',
  //     textAlign: 'center',
  //   },
  //   innerBody: {
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //   },
});

export default styles;
