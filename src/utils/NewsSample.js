import React from 'react';

import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {APIS} from './URLS/Urls';

function NewsSample(props) {
  // const BASE_IMAGES_URL = props.image_path;
  const ITEM = props.ITEM;
  // console.log('ITEM', ITEM);
  const Title = ITEM.title;
  const onPress = props.OP;
  const IMG1 = ITEM.image;
  const indx = ITEM.news_date.indexOf(' ');
  const TIME_DATE = ITEM.news_date.trim();
  const TIME = TIME_DATE.split(' ');
  // const TIME = ITEM.news_date;
  // const AUTH = ITEM.author;
  const DETAILS = ITEM.description;

  // console.log('====================================');
  // console.log(ITEM);
  // console.log('====================================');
  return (
    // <View style={styles.body}>
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          marginVertical: 8,
          borderRadius: 8,
          flex: 1,
          elevation: 5,
          paddingVertical: 8,
          flexDirection: 'row',
          backgroundColor: '#fff',
          marginHorizontal: 16,
          paddingHorizontal: 8,
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <Image
          style={{
            height: 80,
            width: 65,
            marginEnd: 8,
            resizeMode: 'cover',
            borderRadius: 4,
          }}
          source={{uri: `${APIS.image_base_url}${IMG1}`}}
        />
        <View
          style={{
            flex: 1,
            minHeight: 60,
            // backgroundColor: 'red',
            justifyContent: 'space-between',
            // paddingHorizontal: 4,
            // alignItems: 'flex-start',
          }}>
          <Text numberOfLines={2} style={styles.title}>
            {Title}
          </Text>
          {/* <Text
              style={{...styles.time, marginHorizontal: 0, paddingVertical: 4}}>
              {DETAILS}
            </Text> */}
          <View
            style={{
              flex: 1,
              // marginTop: 3,
              // alignSelf: 'flex-end',
              // backgroundColor: 'skyblue',
              flexDirection: 'row',
              alignItems: 'flex-end',

              justifyContent: 'flex-end',
            }}>
            <MaterialCommunityIcons
              name="clock-time-nine-outline"
              size={14}
              color="gray"
            />
            <Text style={styles.time}>{ITEM?.news_date}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
    // </View>
  );
}
const styles = StyleSheet.create({
  body: {
    backgroundColor: 'red',
    elevation: 5,
    flex: 1,
    borderRadius: 8,
    padding: 8,

    alignSelf: 'center',
    marginVertical: 8,
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    // width: '100%',
    flex: 1,
    // backgroundColor: 'red',
    fontWeight: 'bold',
    fontSize: 12,
    color: '#000',
    // textAlign: 'justify',
  },
  innerBody: {
    justifyContent: 'center',
    justifyContent: 'center',
  },
  time: {
    // flex: 1,
    // alignSelf: 'flex-end',
    marginHorizontal: 4,
    color: 'gray',
    fontSize: 12,
  },
  author: {
    fontSize: 12,
    color: 'green',
    fontWeight: 'bold',
  },
});

export default NewsSample;
