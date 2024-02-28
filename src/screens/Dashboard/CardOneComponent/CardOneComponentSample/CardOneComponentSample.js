import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Share,
  Linking,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import {APIS} from '../../../../utils/URLS/Urls';

function CardOneComponentSample(props) {
  const DefaultImage = require('../../../../Drawables/profile_pic.png');
  const IMAGE = (props.IMAGE === '') | '' ? DefaultImage : props.IMAGE;
  const Title = (props.Title === '') | '' ? 'null' : props.Title;
  const Description =
    (props.Description === '') | '' ? 'null' : props.Description;
  const Address = (props.Address === undefined) | '' ? 'null' : props.Address;
  const LandLineNumber =
    (props.LandLineNumber === undefined) | '' ? 'null' : props.LandLineNumber;
  const CellNumber =
    props.CellNumber === undefined || props.Address === ''
      ? 'null'
      : props.CellNumber;
  const Email = (props.Email === undefined) | '' ? 'null' : props.Email;
  const btn1Action =
    (props.button1 === undefined) | '' ? 'null' : props.button1;
  const btn2Action =
    (props.button2 === undefined) | '' ? 'null' : props.button2;

  return (
    <View style={styles.body}>
      <View style={styles.c1}>
        <Text style={styles.headerTitle}>{Title}</Text>
        <Text style={styles.headerDescription}>{Description}</Text>
        <View style={styles.textWthIcon}>
          <Entypo
            style={{alignSelf: 'flex-start'}}
            name="location-pin"
            color="firebrick"
            size={14}
          />

          <Text style={styles.location}>{Address}</Text>
        </View>
        {LandLineNumber === null || LandLineNumber === '' ? null : (
          <View style={styles.textWthIcon}>
            <Ionicons name="call" color="firebrick" size={14} />
            <Text style={styles.phoneNo}>{LandLineNumber}</Text>
          </View>
        )}
        <View style={styles.textWthIcon}>
          {props.CellNumber != '' ? (
            <Text>HY</Text>
          ) : (
            <>
              <MaterialCommunityIcons
                name="cellphone-iphone"
                color="firebrick"
                size={14}
              />
              <Text style={styles.phoneNo}>{props.CellNumber}</Text>
            </>
          )}
        </View>

        {Email === 'null' ? null : (
          <View style={styles.textWthIcon}>
            <Entypo name="mail" color="firebrick" size={14} />

            <Text style={styles.mail}>{Email}</Text>
          </View>
        )}
      </View>

      <View style={styles.c2}>
        {IMAGE === '' || IMAGE === null ? (
          <Image
            style={{height: 100, width: 70, borderRadius: 4}}
            // require('../../../../Drawables/football.jpg')
            source={require('../../../../Drawables/logo.png')}
            resizeMode="contain"
          />
        ) : (
          <Image
            style={{height: 100, width: 70, borderRadius: 4}}
            // require('../../../../Drawables/football.jpg')
            source={{uri: APIS.image_base_url + IMAGE}}
            resizeMode="contain"
          />
        )}

        {/* <View
          style={{
            // width: '80%',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity style={styles.btns} onPress={btn1Action}>
            <Text style={styles.btnsTitle}>Call Now</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btns} onPress={btn2Action}>
            <Text style={styles.btnsTitle}>Find Direction</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
}

export default CardOneComponentSample;
