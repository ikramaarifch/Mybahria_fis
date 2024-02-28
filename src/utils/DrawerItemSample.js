import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
function DrawerItemSample(props) {
  const ImageName = props.name;
  let Lable = props.lable;
  let isSelected = props.selected === undefined ? '' : props.selected;

  return (
    <View
      style={{
        marginTop: 10,
        paddingVertical: 4,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: isSelected === Lable ? '#fff' : '#CC0000',
        borderRadius: 5,
      }}>
      <FontAwesome5
        style={{paddingHorizontal: 15}}
        name={ImageName}
        color={isSelected === Lable ? '#CC0000' : '#fff'}
        size={16}
      />
      <Text
        style={{
          flex: 1,
          fontSize: 12,
          color: isSelected === Lable ? '#CC0000' : '#fff',
          textAlignVertical: 'center',
        }}>
        {Lable}
        {/* {console.log('isSelected : ' + isSelected + 'Lable : ' + Lable)} */}
      </Text>
    </View>
  );
}

export default DrawerItemSample;
