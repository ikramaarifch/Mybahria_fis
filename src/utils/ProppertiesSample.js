import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import {APIS} from './URLS/Urls';

function ProppertiesSample(props) {
  const BASE_IMAGES_URL = APIS.image_base_url;

  const [isLoading, setLoading] = useState(true);

  const ITEM = props.ITEM;
  const Auth_location =
  ITEM['city_info'] === null || undefined ? null : ITEM['city_info'].dayDifference;
  // const title = ITEM.title;
  // const Location = ITEM['location_info'].name;
  // const Auth_location = ITEM['city_info'].name;
  // const Purpose = ITEM.purpose;
  // const Price = ITEM.price;
  // const Added = ITEM.created_at;
  // const Type = ITEM.property_type.toUpperCase();
  // const House_Description = ITEM.description;
  // const IMAGES = ITEM.image_src.split(',');
  // const auth_name = ITEM.owner_name;
  // const auth_email = ITEM.email;
  // const auth_phoneNumber = ITEM.phone_number;

  // console.log('====================================');
  // console.log();
  // console.log('aaa : ', props.ITEM);
  // console.log('====================================');
  // console.log('aaa : ', IMAGES);

  useEffect(() => {
    // setTimeout(() => {
    //   setLoading(false);
    // }, 1500);
  }, []);
  //  isLoading ? (
  //   <ActivityIndicator size="large" color="red" style={{marginVertical: 50}} />
  // ) :

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        console.log(ITEM, 'Render Item');
        props.navigation.navigate('PropertyPreView', {
          ITEM: ITEM,
        });
      }}>
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
        <View>
          {ITEM.image === null ? (
            <Image
              style={{height: 90, width: 65, borderRadius: 4}}
              source={APIS.default_image}
            />
          ) : (
            <Image
              style={{height: 90, width: 65, borderRadius: 4}}
              source={{
                uri: `${APIS.image_base_url}${ITEM.image}`,
              }}
            />
          )}

          <Text
            style={{
              width: '100%',
              textAlign: 'center',
              // paddingVertical: 2,
              paddingVertical: 6,
              backgroundColor: '#cc0000',
              opacity: 0.8,
              position: 'absolute',
              bottom: 10,
              right: 0,
              left: 0,
              textAlignVertical: 'center',
              color: 'black',
              fontSize: 10,
              fontWeight: 'bold',
            }}>
            {ITEM.type}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            height: 100,
            paddingVertical: 4,
            paddingHorizontal: 8,
          }}>
          <Text
            numberOfLines={2}
            style={{fontWeight: 'bold', fontSize: 12, width: '85%',color:'black'}}>
            {ITEM.title}
          </Text>

          <Text style={{fontSize: 11, marginTop: 8,color:'black'}}>
            Location: {ITEM.address}
          </Text>

          <View
            style={{
              elevation: 4,
              height: 40,
              position: 'absolute',
              right: 0,
              width: 40,
              borderRadius: 50,
              backgroundColor: '#00B106',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 12, color: '#fff'}}>
              {ITEM.purpose}
            </Text>
          </View>

          <View style={{position: 'absolute', left: 8, bottom: 8}}>
            <Text style={{fontSize: 11, color: 'gray'}}>
              {/* Location: {Location} */}
            </Text>
            <Text style={{fontSize: 11, color: 'black'}}>
              Added: {ITEM.dayDifference} days ago
            </Text>
          </View>

          <View style={{position: 'absolute', right: 0, bottom: 8}}>
            <Text style={{fontWeight: 'bold', fontSize: 13, color: 'red'}}>
              Starting From
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 14, color: '#000'}}>
                Pkr |
              </Text>
              <Text
                style={{fontSize: 15, fontWeight: 'bold', color: '#00B106'}}>
                {ITEM.price}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default ProppertiesSample;
