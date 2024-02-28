import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Share,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {APIS} from '../utils/URLS/Urls';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DirectoryDetails = props => {
  const {
    route: {
      params: {
        item: {phonebooks},
      },
    },
  } = props;
  console.log(phonebooks);
  const onShare = async item => {
    try {
      const result = await Share.share({message: 'bac'});
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          elevation: 10,
          margin: 10,
          paddingHorizontal: 10,
          paddingVertical: 15,
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={{uri: item.image}}
          style={{height: 100, width: 100, borderRadius: 12}}
        />
        <View style={{paddingHorizontal: 10, flex: 1, marginLeft: 10}}>
          <Text style={{color: 'firebrick', fontWeight: 'bold', fontSize: 16}}>
            {item.title}
          </Text>
          <Text style={{fontSize: 14, fontWeight: '600', color: 'firebrick'}}>
            {item.parent_category}
          </Text>
          <Text style={{fontSize: 14, fontWeight: '600', color: 'firebrick'}}>
            {item.city}
          </Text>
          <Text style={{fontSize: 14, fontWeight: '600', color: 'firebrick'}}>
            {item.landline}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View>
      <SwipeListView
        data={phonebooks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        renderHiddenItem={({item}, rowMap) => (
          <View
            style={{
              // height:'100%',
              // marginTop:20,
              // paddingVertical: 16,
              // backgroundColor: 'skyblue',
              alignItems: 'flex-end',
              // marginHorizontal: 30,
              paddingHorizontal: 10,
              width: '90%',
              alignSelf: 'center',
            }}>
            <TouchableOpacity
              onPress={() => onShare(item)}
              style={{
                marginTop: 5,
                padding: 4,
              }}>
              <Ionicons color="#cc0000" name="arrow-redo-sharp" size={30} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${item.phone_number}`);
              }}
              style={{
                padding: 4,
              }}>
              <Ionicons color="green" name="call-sharp" size={30} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                let scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
                let url = scheme + `${item.latitude},${item.longitude}`;
                Linking.openURL(url);
              }}
              style={{
                padding: 4,
              }}>
              <MaterialCommunityIcons
                color="green"
                name="google-maps"
                size={30}
              />
            </TouchableOpacity>
          </View>
        )}
        rightOpenValue={-75}
        closeOnRowOpen={true}
      />
    </View>
  );
};

export default DirectoryDetails;
