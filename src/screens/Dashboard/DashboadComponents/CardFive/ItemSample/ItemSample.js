import React, {useEffect, useState} from 'react';
import styles from './styles';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
  ScrollView,
  BackHandler,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/core';
import {onpenCloseModal} from '../../../../../redux/Actions/Blogs.action';
import {connect} from 'react-redux';
// const navigation = useNavigation();
const IMAGES_BASE_URL = 'https://mybahria.com.pk/storage/images/';

function ItemSample(props) {
  const ITEM = props.ITEM;
  console.log('ITEM', ITEM);
  const Title = props.title;

  // full objeect
  const item = props.item;

  const IMG1 = props.IMG;
  const TIME = props.time;
  const AUTH = props.author;

  return (
    <View style={styles.body}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          style={{
            height: 90,
            width: 70,
            margin: 8,
            borderRadius: 4,
          }}
          //   source={require('../../../../../Drawables/')}
          source={{uri: `https://mybahria.com.pk/public/assets/uploads/${ITEM.image}`}}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            paddingHorizontal: 5,
            alignItems: 'flex-start',
            // backgroundColor: 'red',
            // height: '90%',
          }}>
          <Text numberOfLines={2} style={styles.title}>
            {ITEM.title}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'flex-end',
              justifyContent: 'space-around',
            }}>
            <MaterialCommunityIcons
              name="clock-time-nine-outline"
              size={14}
              color="gray"
            />
            <Text style={styles.time}>{ITEM.blog_date}</Text>
            <Text style={styles.author}>{ITEM.author_name}</Text>
          </View>
        </View>
      </View>

      <Modal animationType="slide" visible={false}>
        <View
          style={{
            height: 50,
            backgroundColor: '#cc0000',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            // paddingHorizontal: 8,
          }}>
          <TouchableOpacity
            style={{marginHorizontal: 16}}
            onPress={() => {
              props.openCloseModal();
            }}>
            <Ionicons name="arrow-back-sharp" color={'#fff'} size={22} />
          </TouchableOpacity>
          <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
            Blog
          </Text>
        </View>

        {/* body section */}
        {/* title
        image
      time
      author */}
        <ScrollView>
          <View style={{flexGrow: 1}}>
            <Text
              style={{
                // marginVertical: 8,
                // paddingHorizontal: 8,
                // fontSize: 13,
                // textAlign: 'justify',
                // fontWeight: 'bold',
                // // color: '#cc000090',
                textAlign: 'center',
                fontSize: 16,
                backgroundColor: '#ddd',
                paddingVertical: 6,
                color: '#cc0000',
                marginVertical: 8,
                elevation: 10,
                shadowColor: '#fff',
                fontWeight: 'bold',
                marginHorizontal: 8,
              }}>
              {item.title}
            </Text>
            <Image
              style={{
                width: '95%',
                alignSelf: 'center',
                height: 150,
                borderRadius: 4,
              }}
              source={item.image}
            />
            <View
              style={{
                marginTop: 16,
                paddingHorizontal: 8,
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-end',
                justifyContent: 'space-around',
              }}>
              <Text style={styles.time}>Posted Date: </Text>
              <MaterialCommunityIcons
                name="clock-time-nine-outline"
                size={14}
                color="gray"
              />

              <Text style={styles.time}>{item.time}</Text>
            </View>

            <Text
              style={{
                fontSize: 12,
                textAlign: 'justify',
                paddingHorizontal: 8,
                marginVertical: 16,
              }}>
              {item.detailSection}
            </Text>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
}
const mapActionsToProps = dispatch => {
  return {
    openCloseModal: () => dispatch(onpenCloseModal()),
  };
};
const mapStateToProps = state => {
  return {
    detailModalVisibility: state.BlogsReducer.detailModalVisibility,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(ItemSample);
