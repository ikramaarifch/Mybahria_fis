import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  topSection: {
    width: '100%',
    paddingHorizontal: 16,
    marginVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topSectionLable: {
    color: 'firebrick',
    fontSize: 24,
    fontWeight: 'bold',
  },
  btnBg: {
    // alignSelf: 'flex-end',
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'firebrick',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical:8
  },
  btnLabel: {
    color: '#fff',
    marginHorizontal: 8,
  },

  iconsView: {
    height: 50,
    backgroundColor: 'firebrick',
    paddingHorizontal: 16,
    alignItems: 'center',
    width: '100%',
    // justifyContent: 'space-between',
    flexDirection: 'row',
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    marginHorizontal: 8,
    fontWeight: 'bold',
  },
  pickerContainer: {
    marginBottom: 8,
    borderBottomColor: '#d8d6db',
    borderBottomWidth: 0.5,
    marginHorizontal: 0,
    paddingHorizontal: 0,
  },
  pickerStyle: {
    color: '#929294',
    fontSize: 11,
    height: 50,
    width: '100%',
  },
  inputStyle: {
    color: '#000',

    backgroundColor: 'transparent',
    // justifyContent: 'space-between',/

    fontSize: 14,
    height: 60,
    // borderColor: '#53607d',
    width: '100%',
    fontFamily: 'ldfcomicsans',
    paddingTop: 10,
  },
});

export default styles;
