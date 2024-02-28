import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import styles from './styles';
function ItemCardSample(props) {
  const Title = props.title;
  const onPress = props.OP;
  const IMG1 = props.IMG;
  //   const IMG = 'healthcare.png';
  return (
    <View style={[styles.body, props.style]}>
      <TouchableOpacity style={styles.innerBody} onPress={onPress}>
        <Image
          style={{height: 40, width: 40, margin: 8}}
          //   source={require('../../../../../Drawables/')}
          source={IMG1}
        />
        <Text style={styles.title}>{Title}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ItemCardSample;
