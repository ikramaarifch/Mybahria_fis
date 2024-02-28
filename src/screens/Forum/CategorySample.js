import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {_LENGHT} from './CategoryItemSample/CategoryItemSample';

function CategorySample(props) {
  const NAVIGATION = props.navigation;
  console.log(props);
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate('CategoryItemSample', {
          id: props.id,
          item: props.item,
        });
        console.log('-------------------------------------------');
        console.log('CategoryItemSample : ', props.item);
        console.log('-------------------------------------------');
      }}
      style={{
        // flex: 1,
        borderWidth: 0.5,
        borderColor: '#fff',
        marginHorizontal: 16,
        elevaion: 15,
        // height: 6s0,
        paddingVertical: 12,
        borderRadius: 8,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        marginVertical: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <View style={{flex: 2}}>
        <Text numberOfLines={1} style={{color: '#CC0000', fontSize: 14}}>
          {props.item.title}
        </Text>
      </View>
      <View
        style={{
          marginHorizontal: 16,
          backgroundColor: '#00B106',
          paddingBottom: 2,
          borderRadius: 50,
          height: 25,
          width: 25,

          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: '#fff', fontSize: 12, fontWeight: 'bold'}}>
          {props.item.count}
        </Text>
      </View>

      <FontAwesome name="chevron-right" size={16} color="#CC0000" />
    </TouchableOpacity>
  );
}

export default CategorySample;
