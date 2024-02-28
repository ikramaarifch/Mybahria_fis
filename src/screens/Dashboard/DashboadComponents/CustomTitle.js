import React from 'react';
import {Text, StyleSheet} from 'react-native';

function CustomTitle(props) {
  const TITLE = props.title === undefined ? 'No Title' : props.title;
  return <Text style={[styles.title, props.style]}>{TITLE}</Text>;
}

const styles = StyleSheet.create({
  title: {
    marginVertical: 4,
    alignSelf: 'flex-start',
    borderLeftColor: 'red',
    // backgroundColor: 'red',
    paddingHorizontal: 8,
    // flex: 1,
    textAlignVertical: 'center',
    borderLeftWidth: 2.5,
    fontSize: 15,
    // fontWeight: 'bold',

    // marginHorizontal: 20,
  },
});
export default CustomTitle;
