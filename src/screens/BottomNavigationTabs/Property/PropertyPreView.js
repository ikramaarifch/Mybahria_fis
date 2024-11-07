import {useNavigation} from '@react-navigation/core';
import React, {useState, useEffect} from 'react';
import ImageSlider from 'react-native-image-slider';
import {SliderBox} from 'react-native-image-slider-box';

import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  Text,
  View,
  Modal,
  Button,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Linking,
  Image,
  Dimensions,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import {APIS} from '../../../utils/URLS/Urls';
function PropertyPreView(props) {
  const [isLoading, setLoading] = useState(true);

  const navigation = useNavigation();
  const BASE_IMAGES_URL = APIS.image_base_url;

  const ITEM = props.route.params.ITEM;
  console.log(ITEM);

  // const Location = props.route.params.Location;
  // const IMG = props.route.params.IMG;
  // const Purpose = props.route.params.Purpose;
  // const Price = props.route.params.Price;
  // const Added = props.route.params.Added;
  // const Type = props.route.params.Type;
  // const House_Description = props.route.params.House_Description;
  // const IMAGES = props.route.params.IMAGES;
  // const auth_Details = props.route.params.auth_Details;

  // const ITEM = props.ITEM;

  const title = ITEM.title;
  const Location = ITEM.address;
  const Auth_location =
    ITEM['city_info'] === null || undefined ? null : ITEM['city_info'].name;

  const Purpose = ITEM.purpose;
  const Price = ITEM.price;
  const Added = ITEM.created_at;
  const Type = ITEM.property_type;
  const House_Description = ITEM.description;
  const IMAGES = ITEM.image_src;
  // .split(',')
  // .map(img => `${BASE_IMAGES_URL}${img}`);
  const auth_name = ITEM.owner_name;
  const auth_email = ITEM.email;
  const auth_phoneNumber = ITEM.phone_number;

  console.log('ITEM : ', ITEM);

  const [activeButton, setActiveButton] = useState('Description');

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
  

  const callUser = () => {
    Linking.openURL(`tel:${auth_phoneNumber}`);
  };

  // isLoading ? (
  //   <ActivityIndicator size="large" color="red" style={{marginVertical: 50}} />
  // ) : (
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          // marginBottom: 8,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'red',
            marginHorizontal: 16,
            fontWeight: 'bold',
            fontSize: 16,
          }}>
          {title}
        </Text>
        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
            borderBottomLeftRadius: 16,
            padding: 16,
            backgroundColor: '#cc0000',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="times" color="#fff" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{paddingHorizontal: 16, marginVertical: 20}}>
        <View
          style={{
            width: '100%',
            flex: 1,
            height: 200,
            alignSelf: 'center',
          }}>
          {/* <Image
            style={{
              width: Dimensions.get('window').width - 6,
              height: 150,
              resizeMode: 'contain',
            }}
            source={APIS.default_image}
          /> */}
          {/* {
            (console.log(ITEM.image_src === null ? '0' : '1'),
            console.log(ITEM.image_src))
          } */}

          {ITEM.image_src === null ? (
            <Image
              style={{
                width: Dimensions.get('window').width - 6,
                height: 150,
                resizeMode: 'contain',
              }}
              source={APIS.default_image}
            />
          ) : (
            <Image
              style={{
                width: Dimensions.get('window').width - 6,
                height: 150,
                resizeMode: 'cover',
              }}
              source={
                ITEM.image_src === ''
                  ? APIS.default_image
                  : {uri: `${APIS.image_base_url}${ITEM.image_src}`}
              }
            />
          )}

          {/* <SliderBox
            // parentWidth={'100%'}
            // style={{width: '100%'}}
            // resizeMode="cover"
            // autoPlayWithInterval={2500}
            dotColor="#CC0000"
            // resizeMode="contain"
            autoplay={true}
            resizeMethod={'resize'}
            resizeMode={'cover'}
            images={IMAGES}
          /> */}
        </View>
        <Text
          style={{
            marginTop: 16,
            fontWeight: 'bold',
            borderLeftColor: '#CC0000',
            borderLeftWidth: 2,
            paddingLeft: 8,
            color: 'red',
          }}>
          About Property
        </Text>
        <View
          style={{
            // marginVertical: 6,
            flexDirection: 'row',
            // backgroundColor: 'red',
            flexWrap: 'wrap',
            flex: 1,
            marginBottom: 8,
            // backgroundColor: '#ddd',
          }}>
          <View style={styles.iconBg}>
            <View style={styles.DirectionRow}>
              <Entypo name="home" color="#fff" size={20} />
            </View>
            <Text style={styles.titleStyle}>{Type}</Text>
          </View>

          <View style={styles.iconBg}>
            <View style={styles.DirectionRow}>
              <Entypo name="location-pin" color="#fff" size={20} />
            </View>
            <Text style={styles.titleStyle}>{Location}</Text>
          </View>

          {/* <View style={styles.DirectionRow}>
            <Text style={styles.titleStyle}>Location: </Text>
            <Text style={styles.normalText}>{Location}</Text>
          </View> */}

          <View style={styles.iconBg}>
            <View style={styles.DirectionRow}>
              <Entypo name="price-tag" color="#fff" size={20} />
            </View>
            <Text style={styles.titleStyle}>{Price}</Text>
          </View>

          {/* <View style={styles.DirectionRow}>
            <Text style={styles.titleStyle}>Price: </Text>
            <Text style={styles.normalText}>{Price}</Text>
          </View> */}

          <View style={styles.iconBg}>
            <View style={styles.DirectionRow}>
              <FontAwesome5 name="file-contract" color="#fff" size={20} />
            </View>
            <Text style={styles.titleStyle}>{Purpose}</Text>
          </View>

          {/* <View style={styles.DirectionRow}>
            <Text style={styles.titleStyle}>Purpose: </Text>
            <Text style={styles.normalText}>{Purpose}</Text>
          </View> */}

          <View style={styles.iconBg}>
            <View style={styles.DirectionRow}>
              <Entypo name="clock" color="#fff" size={20} />
            </View>
            <Text style={styles.titleStyle}>{Added}</Text>
          </View>

          {/* <View style={styles.DirectionRow}>
            <Text style={styles.titleStyle}>Added: </Text>
            <Text style={styles.normalText}>{Added}</Text>
          </View> */}
        </View>
        <Text
          style={{
            marginTop: 16,
            fontWeight: 'bold',
            borderLeftColor: '#CC0000',
            borderLeftWidth: 2,
            paddingLeft: 8,
            color: 'red',
          }}>
          About Seller
        </Text>
        <View
          style={{
            // backgroundColor: 'skyblue',s
            // marginVertical: 4,
            // borderRadius: 15,
            // flexDirection: 'row',
            // flexWrap: 'wrap',
            paddingHorizontal: 8,
            marginBottom: 8,
            // paddingVertical: 8,
          }}>
          <View
            style={{
              paddingVertical: 8,
              flexDirection: 'row',
              justifyContent: 'center',
              // backgroundColor: 'blue',
              alignItems: 'center',
            }}>
            <Entypo name="user" color="#cc0000" size={16} />
            <Text
              style={{
                flex: 1,
                fontSize: 12,
                color: 'red',
                // backgroundColor: 'red',
                textAlign: 'left',
                marginHorizontal: 8,
                textAlignVertical: 'bottom',
                // fontWeight: 'bold',
              }}>
              {auth_name}
            </Text>
          </View>

          {/* <View
            style={{
              paddingVertical: 8,
              flexDirection: 'row',
              justifyContent: 'center',
              // backgroundColor: 'blue',
              alignItems: 'center',
            }}>
            <Entypo name="mail" color="#cc0000" size={16} />
            <Text
              style={{
                flex: 1,
                fontSize: 12,
                // backgroundColor: 'red',
                textAlign: 'left',
                marginHorizontal: 8,
                textAlignVertical: 'bottom',
                // fontWeight: 'bold',
              }}>
              {auth_Details[1].email}
            </Text>
          </View> */}

          <View
            style={{
              paddingVertical: 8,
              flexDirection: 'row',
              justifyContent: 'center',
              // backgroundColor: 'blue',
              alignItems: 'center',
            }}>
            <Entypo name="location" color="#cc0000" size={16} />
            <Text
              style={{
                flex: 1,
                fontSize: 12,
                // backgroundColor: 'red',
                textAlign: 'left',
                color: 'red',
                marginHorizontal: 8,
                textAlignVertical: 'bottom',
                // fontWeight: 'bold',
              }}>
              {Auth_location}
            </Text>
          </View>
          {/* <View style={{flexDirection: 'row'}}>
            <Text style={{...styles.titleStyle, textAlign: 'left'}}>Name </Text>
            <Text style={styles.normalText}>{auth_Details[0].name}</Text>
          </View> */}

          {/* <View style={{flexDirection: 'row'}}>
            <Text style={{...styles.titleStyle, textAlign: 'left'}}>
              Email{' '}
            </Text>
            <Text style={styles.normalText}>{auth_Details[1].email}</Text>
          </View> */}

          {/* <View style={{flexDirection: 'row'}}>
            <Entypo name="mail" color="#cc0000" size={20} />
            <Text style={styles.titleStyle}>{auth_Details[1].email}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Entypo name="location" color="#cc0000" size={20} />
          </View>
          <Text style={styles.titleStyle}>{auth_Details[2].Auth_location}</Text> */}

          {/* <View style={{flexDirection: 'row'}}>
            <Text style={{...styles.titleStyle, textAlign: 'left'}}>
              Location{' '}
            </Text>
            <Text style={styles.normalText}>
              {auth_Details[2].Auth_location}
            </Text>
          </View> */}
        </View>

        <View style={{minHeight: 150, marginVertical: 8}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#ddd',
              // marginHorizontal: 8,
              borderWidth: 1,
              borderRadius: 4,
              marginBottom: 6,
              borderColor: '#cc0000',
            }}>
            <TouchableOpacity
              onPress={() => setActiveButton('Description')}
              style={{
                alignSelf: 'flex-end',
                flex: 1,

                padding: 8,
                backgroundColor:
                  activeButton === 'Description' ? '#cc0000' : '#ddd',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 4,
              }}>
              <Text
                style={{
                  color: activeButton === 'Description' ? '#fff' : '#000',
                  fontWeight: 'bold',
                }}>
                Description
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => setActiveButton('Map')}
              style={{
                alignSelf: 'flex-end',
                flex: 1,

                padding: 8,
                backgroundColor: activeButton === 'Map' ? '#cc0000' : '#ddd',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 4,
              }}>
              <Text
                style={{
                  color: activeButton === 'Map' ? '#fff' : '#000',
                  fontWeight: 'bold',
                }}>
                Location Map
              </Text>
            </TouchableOpacity> */}
          </View>
          {activeButton === 'Description' ? (
            <Text
            style={{color:'black'}}
            >{House_Description}</Text>
          ) : (
            <Text style={styles.titleStyle}>Map</Text>
          )}
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          minHeight: 50,
          backgroundColor: '#cc0000',
          elevation: 12,
          justifyContent: 'center',
          flexDirection: 'row',
          paddingHorizontal: 16,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={callUser}
          style={{
            flex: 1,
            paddingVertical: 8,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: '#cc0000',
            paddingHorizontal: 10,
            borderRadius: 8,
            flexDirection: 'row',
          }}>
          <FontAwesome name="phone" color="#fff" size={14} />
          <Text style={{color: '#fff', marginHorizontal: 8}}>Call Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleStyle: {
    // fontWeight: 'bold',
    color: '#000',
    fontSize: 10,
    flex: 1,
    fontSize: 10,
    textAlign: 'center',
  },
  normalText: {
    fontSize: 12,
    textAlign: 'left',
    flex: 2,
  },
  DirectionRow: {
    // flex: 1,
    // backgroundColor: 'red',
    marginVertical: 8,
    flexDirection: 'row',
    borderColor: '#cc0000',
    padding: 4,
    height: 50,
    width: 50,
    borderWidth: 0.5,
    // elevation: 10,
    backgroundColor: '#cc0000',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBg: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    // marginVertical: 8,
    paddingVertical: 4,
  },
  aboutSellerIconStyle: {
    backgroundColor: '#fff',

    borderWidth: 0,
    elevation: 5,
  },
});

export default PropertyPreView;
