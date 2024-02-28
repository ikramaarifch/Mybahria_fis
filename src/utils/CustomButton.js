import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

function CustomButton(props) {
  let BackgroundColor = props.bgColor;
  let Title = props.title;

  let OnPress = props.OnPRESS;
  return (
    <TouchableOpacity
      onPress={OnPress}
      style={[
        props.style,
        {
          backgroundColor:
            BackgroundColor === undefined ? 'blue' : BackgroundColor,
        },
      ]}>
      <Text style={props.btnTitleStyle}>{Title}</Text>
    </TouchableOpacity>
  );
}

export default CustomButton;
