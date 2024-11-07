import React,{ useEffect, useState} from 'react';

import {View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {APIS} from '../../utils/URLS/Urls';
import RenderHTML from 'react-native-render-html';
function NewsPreView(props) {

  const [data, setData] = useState(null);
  const contentWidth = Dimensions.get('window').width;

  const ITEM = props.route.params.ITEM;
  const BASE_IMAGES_URL = 'https://mybahria.com.pk/storage/images/';

  const Title = ITEM.title === undefined ? '' : ITEM.title;
  // const onPress = props.OP;
  const IMG1 = ITEM.image;
  const indx = ITEM.news_date.indexOf(' ');
  const TIME_DATE = ITEM.news_date.trim();
  const TIME = TIME_DATE.split(' ');
  console.log({indx}, {TIME});
  const DETAILS = ITEM.description;

  useEffect(() => {
    setData(DETAILS);
  })

  return (
    <View style={styles.body}>
      {/* <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={styles.btnBG}>
        <AntDesign name="arrowleft" color="#cc0000" size={24} />
      </TouchableOpacity> */}
      <Text style={styles.title}>{Title}</Text>
      <Image
        style={styles.image}
        // source={{}}
        source={{uri: `${APIS.image_base_url}${IMG1}`}}
      />
      <View style={styles.rowView}>
        {/* <Text style={styles.descriptionTitle}>Description</Text> */}
        <View style={{...styles.rowView, marginTop: 0}}>
          <FontAwesome name="clock-o" color="gray" />
          <Text
            style={{
              ...styles.description,
              marginHorizontal: 4,
              marginTop: 0,
            }}>
            {ITEM?.news_date}
          </Text>
        </View>
      </View>
      {/* <Text style={{color:'black'}}> */}
      <ScrollView>
      <RenderHTML 
        contentWidth={contentWidth}
        source={{ html: data}}
        baseStyle={{ color: 'black' }}
      />
      </ScrollView>
      {/* </Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 16,
    flex: 1,
  },
  image: {
    height: 150,
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    backgroundColor: '#ddd',
    paddingVertical: 6,
    color: '#cc0000',
    marginVertical: 8,
    elevation: 10,
    shadowColor: '#fff',
    fontWeight: 'bold',
  },
  btnBG: {
    marginVertical: 16,
    // position: 'absolute',
    // bottom: 10,
    // alignSelf: 'center',
    // shadowColor: 'red',
    // paddingHorizontal: 16,
    // paddingVertical: 8,
    // justifyContent: 'center',
    // alignItems: 'center',
    // // backgroundColor: '#cc0000',
    // elevation: 10,
    // borderRadius: 100,
  },
  btnText: {
    color: '#fff',
  },
  descriptionTitle: {
    // marginTop: 16,
    paddingHorizontal: 6,
    borderLeftColor: '#cc0000',
    borderLeftWidth: 2,
    fontWeight: 'bold',
  },
  description: {
    // marginVertical: 16,
    marginTop: 4,
    fontSize: 12,
    color: 'gray',
  },
  rowView: {
    marginTop: 16,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default NewsPreView;
