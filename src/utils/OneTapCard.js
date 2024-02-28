import React from 'react';
import {Text, TouchableOpacity, View, Image, Dimensions} from 'react-native';

const abc = Dimensions.get('window');

function OneTapCard(props) {
  const Default_Dimensions = {
    HEIHGT: 30,
    WIDTH: 30,
  };

  const {HEIHGT, WIDTH} =
    props.imageDimensions === undefined || null
      ? Default_Dimensions
      : props.imageDimensions;

  const IMAGE =
    props.IMAGE === undefined
      ? require('../Drawables/newIcons/play.png')
      : props.IMAGE;

  const TITLE = props.TITLE === undefined ? 'Define Title' : props.TITLE;

  const backgroundColor =
    props.bgColor === undefined ? 'transparent' : props.bgColor;
  const comingRequest = props.sendRequest;
  return (
    <TouchableOpacity
      onPress={() => {
        comingRequest === 'CardOneComponent'
          ? props.TITLE === 'Services'
            ? props.navigation.navigate('Services')
            : props.navigation.navigate('CardOneComponent', {item: props.TITLE})
          : props.navigation.navigate('Directories', {cardTitle: TITLE});
      }}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          height: 42,
          width: 42,
          borderRadius: 5,
          backgroundColor: backgroundColor,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image style={{height: HEIHGT, width: WIDTH}} source={IMAGE} />
      </View>

      <Text style={{fontSize: 11, color: '#000', paddingVertical: 6}}>
        {TITLE}
      </Text>
    </TouchableOpacity>
  );
}

export default OneTapCard;
