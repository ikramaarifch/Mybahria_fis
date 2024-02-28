import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
const bgColor = '#BD1616';
const styles = StyleSheet.create({
  mainContainer: {
    height: height * 0.15,
    // backgroundColor: '#4C76BE',
    backgroundColor: bgColor,
    width: '100%',
    justifyContent: 'space-evenly',
    paddingHorizontal: 16,
    elevation: 12,
    borderBottomColor: 'firebrick',
    borderBottomWidth: 1,
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
  },
  iconsView: {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,

    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default styles;
