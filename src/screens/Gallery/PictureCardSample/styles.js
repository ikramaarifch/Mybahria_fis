import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginVertical: 8,
    marginHorizontal: 8,
    backgroundColor: '#fff',
    elevation: 12,
    borderRadius: 4,
  },
  title: {
    paddingHorizontal: 4,
    paddingVertical: 8,
    textAlign: 'center',
    fontSize: 12,
    // fontWeight: 'bold',
  },
  iconsView: {
    height: 50,
    backgroundColor: '#cc0000',
    paddingHorizontal: 16,
    alignItems: 'center',
    width: '100%',
    // justifyContent: 'center',
    flexDirection: 'row',
  },
  headerTitle: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default styles;
