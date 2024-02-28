import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#F2F2F2',
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    alignItems: 'center',
  },
  codeBody: {
    marginHorizontal: 16,
    padding: 16,
    justifyContent: 'center',
  },
  root: {flex: 1, padding: 20},
  //   title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {padding: 10, marginTop: height * 0.01},
  cell: {
    elevation: 5,
    shadowColor: 'gray',
    shadowOffset: {
      height: 2,
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 25,
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    fontSize: 24,
    borderWidth: 1,
    paddingTop: 8,
    borderRadius: 3,
    color: 'red',
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
    textAlign: 'center',
  },

  btn: {
    borderRadius: 15,
  },

  outBody: {
    borderRadius: 30,
    elevation: 12,
    shadowColor: 'grey',
    shadowOffset: {
      height: 2,
      width: 2,
    },
    shadowRadius: 12,
    shadowOpacity: 0.5,

    marginVertical: 8,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.8,
    height: 50,
  },

  btnTitleStyle: {
    color: '#fff',
    fontWeight: 'bold',
    paddingVertical: 4,
    textAlign: 'center',
    fontSize: 18,
  },

  Title: {
    marginTop: height * 0.12,
    alignSelf: 'center',
    padding: 4,
    fontSize: 22,
    fontWeight: 'bold',
  },
  baseDescription: {
    marginTop: height * 0.1,

    alignSelf: 'center',
    padding: 4,
  },

  btnResendBody: {
    marginTop: height * 0.05,

    padding: 16,
  },
  btnResendTitle: {color: 'red', textAlign: 'center', alignSelf: 'center'},
});

export default styles;
