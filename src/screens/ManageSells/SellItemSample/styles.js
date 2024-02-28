import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  body: {
    // flex: 1,
    width: '95%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 8,
    backgroundColor: '#fff',
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: 8,
    elevation: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    minHeight: 120,
  },
  ItemTitleStyle: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 14,
    textAlignVertical: 'center',
  },
  ItemCategoryStyle: {
    color: 'gray',
    fontSize: 12,

    textAlignVertical: 'center',
  },
  detailsSections: {
    paddingHorizontal: 10,
    justifyContent: 'space-evenly',

    flex: 1,
  },
  iconsView: {
    height: 50,
    backgroundColor: 'firebrick',
    paddingHorizontal: 16,
    alignItems: 'center',
    width: '100%',
    // justifyContent: 'center',
    flexDirection: 'row',
  },
  title: {
    marginHorizontal: 8,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default styles;
