import React, {useState} from 'react';
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  Text,
  View,
  Image,
  Modal,
  Button,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {IMAGES_BASAE_URL} from '../../../utils/URLS';
const {height, width} = Dimensions.get('window');

function ServicesItemSample(props) {
  const item = props.item;
  console.log('Image URL:', `https://mybahria.com.pk/public/assets/uploads/${item.img_src}`);

  return (
    <View
      style={{
        // flex: 1,
        // minHeight: 120,
        borderRadius: 4,
        elevation: 5,
        backgroundColor: '#fff',
        width: '92%',
        alignSelf: 'center',
        marginVertical: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        flexDirection: 'row',
        minHeight: 140,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          flex: 0.7,
          justifyContent: 'space-between',
          marginRight: 4,

          alignItems: 'flex-start',
          // backgroundColor: 'blue',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // backgroundColor: 'red',
            marginBottom: 12,
            justifyContent: 'flex-start',
          }}>
          <View>
            <Text
              style={{
                color: 'red',
                // marginHorizontal: 0,
                fontWeight: 'bold',
                fontSize: 14,
                // flex: 1,
              }}>
              {item.title}
            </Text>
            <Text
              style={{
                color: 'red',
                // marginHorizontal: 16,
                // fontWeight: 'bold',
                fontSize: 10,
              }}>
              {item.ispublish == 1 ? 'Verified' : 'Not Verified'}
            </Text>
          </View>
          <View
            style={{
              alignSelf: 'flex-start',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 100,
              height: 18,
              marginHorizontal: 6,
              width: 18,
              // marginRight: 8,
              backgroundColor: item.ispublish == 1 ? 'green' : 'red',
              // flex: 1,
              paddingHorizontal: 4,
            }}>
            <FontAwesome
              color="#fff"
              style={{alignSelf: 'center'}}
              name={item.ispublish == 1 ? 'check' : 'times'}
              size={11}
            />
            {/* <Text style={{paddingHorizontal: 2, color: '#fff', fontSize: 10}}>
              {item.status}
            </Text> */}
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',

            alignItems: 'center',
          }}>
          <Ionicons
            style={{alignSelf: 'flex-start'}}
            color="#cc0000"
            name="location-sharp"
          />
          <Text
            numberOfLines={1}
            style={{fontSize: 12, paddingHorizontal: 4, color: 'firebrick'}}>
            {item.address1}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',

            alignItems: 'center',
          }}>
          <Ionicons color="#cc0000" name="call-sharp" />
          <Text
            style={{fontSize: 12, paddingHorizontal: 4, color: 'firebrick'}}>
            {!item.phoneno ? 'No data in Api' : item.phoneno}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',

            alignItems: 'center',
          }}>
          <Entypo color="#cc0000" name="old-phone" />
          <Text
            style={{fontSize: 12, paddingHorizontal: 4, color: 'firebrick'}}>
            {!item.landline ? 'No data in Api' : item.landline}
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 0.3,

          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            flex: 2,
            marginVertical: 4,
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <Image
            style={{
              height: 100,
              width: '95%',
              alignSelf: 'center',
              borderRadius: 5,
            }}
            source={{
              uri: `https://mybahria.com.pk/public/assets/uploads/${item.img_src}`,
            }}
          />
        </View>
        {/* <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 2,
          }}>
          <TouchableOpacity
            style={{
              padding: 4,
              backgroundColor: '#cc0000',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 4,
              marginHorizontal: 2,
              flex: 1,
            }}>
            <Text style={{color: '#fff', fontSize: 8, fontWeight: 'bold'}}>
              Call
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 4,
              backgroundColor: '#cc0000',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 4,
              marginHorizontal: 2,
              flex: 1,
            }}>
            <Text style={{color: '#fff', fontSize: 8, fontWeight: 'bold'}}>
              Direction
            </Text>
          </TouchableOpacity>
        </View> */}
        {/* <TouchableOpacity
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            backgroundColor: '#fff',
            paddingHorizontal: 4,
          }}>
          <FontAwesome color="green" name="share-alt-square" size={18} />
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

export default ServicesItemSample;
