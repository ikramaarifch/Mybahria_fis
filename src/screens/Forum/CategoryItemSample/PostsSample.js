import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function PostsSample(props) {
  // console.log("Ye props ni arahy : ",props)
  const item = props.item;
  const itemTitle = props.itemTitle;
  // console.log('ITEM PostsSample : ', props.item);
  // const NAVIGATION = props.navigation;

  const IMAGE_BASE_URL = 'http://mybahria.assanhissab.com/storage/avatar/';
  // const IMAGE = IMAGE_BASE_URL + props.item.image;

  return (
    <TouchableOpacity
      onPress={
        () => {
          console.log('props : ', props.item);
          props.navigation.navigate('Comments', {item: props.item});
        }
        // console.log(item)
        //   NAVIGATION.navigate('Commnets', {
        //   item: props.item,
        // })
      }
      style={styles.card}>
      {/* <Image
        style={styles.imageView}
        source={{uri: `${IMAGE_BASE_URL}${props.item.user_info.avatar}`}}
      /> */}
      {/* {console.log('props.item.image : ', props.item.image)} */}
      <View
        style={{
          justifyContent: 'space-around',
          flex: 1,
          marginLeft: 6,
        }}>
        <Text style={styles.Title_Text}>
          {!item.subject ? 'No Subject' : item.subject}
        </Text>

        <View style={styles.Container}>
          <FontAwesome
            style={{marginHorizontal: 4}}
            name="user"
            size={12}
            color="gray"
          />
          <Text style={styles.textStyle}>
            {!item?.user_info?.name ? 'No Name' : item?.user_info?.name}
          </Text>
          <FontAwesome
            style={{marginLeft: 4, marginRight: 2}}
            name="comments"
            size={12}
            color="gray"
          />
          <Text style={styles.textStyle}>
            {!item.count ? 'No Count' : item.count} Comments
          </Text>
          <FontAwesome
            style={{marginHorizontal: 4}}
            name="desktop"
            size={8}
            color="gray"
          />
          <Text style={styles.textStyle}> in </Text>
          <Text style={{...styles.textStyle, color: '#cc0000'}}>
            {!itemTitle ? 'No Title' : itemTitle}
          </Text>

          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'flex-end',
              flexDirection: 'row',
            }}>
            <FontAwesome
              style={{marginHorizontal: 4}}
              name="clock-o"
              size={10}
              color="gray"
            />
            <Text style={styles.textStyle}>
              {props.item.created_at.slice(props.item.created_at.indexOf(' '))}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 6,
    borderRadius: 4,
    elevation: 10,
    // maxHeight: 60,
    flexDirection: 'row',
    // flex: 1,

    justifyContent: 'space-between',

    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 10,
    width: '95%',
    alignSelf: 'center',
    marginVertical: 6,
  },
  Title_Text: {
    flex: 1,

    fontWeight: 'bold',
    color: '#CC0000',
  },

  Container: {
    flex: 1,
    // backgroundColor: 'blue',
    flexDirection: 'row',
    marginTop: 4,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageView: {
    height: 50,

    width: 50,
  },
  textStyle: {color: 'gray', fontSize: 10},
});

export default PostsSample;
