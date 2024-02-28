import React from 'react';
import styles from './styles';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function ItemSample(props) {
  const Title = props.title;
  const onPress = props.OP;
  const IMG1 = props.IMG;
  const TIME = props.time;
  const AUTH = props.author;
  const DETAILS = props.deatails;
  return (
    <View style={styles.body}>
      <TouchableOpacity style={styles.innerBody} onPress={onPress}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 6,
          }}>
          <Image
            style={{
              height: 110,
              width: 75,
              margin: 8,
              borderRadius: 10,
            }}
            //   source={require('../../../../../Drawables/')}
            source={IMG1}
          />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingHorizontal: 5,
              alignItems: 'flex-start',
            }}>
            <Text style={styles.title}>{Title}</Text>
            <Text
              style={{...styles.time, marginHorizontal: 0, paddingVertical: 4}}>
              {DETAILS}
            </Text>
            <View
              style={{
                marginTop: 3,
                alignSelf: 'flex-end',

                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <MaterialCommunityIcons
                name="clock-time-nine-outline"
                size={14}
                color="gray"
              />
              <Text style={styles.time}>{TIME}</Text>
              <Text style={styles.author}>{AUTH}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default ItemSample;
