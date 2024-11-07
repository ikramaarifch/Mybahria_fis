import React, {useEffect, useState} from 'react';

import CardOneComponentSample from '../../Dashboard/CardOneComponent/CardOneComponentSample/CardOneComponentSample';
import {Searchbar} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
// import ServicesItemSample from './ServicesItemSample';
import {SwipeListView} from 'react-native-swipe-list-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SearchBar} from 'react-native-elements';
import {APIS} from '../../../utils/URLS/Urls';
import {useDispatch, useSelector, useStore} from 'react-redux';
import styles from '../../Dashboard/CardOneComponent/CardOneComponentSample/styles';

import {
  View,
  Share,
  Linking,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Picker,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
function DirectoryPreView(props) {
  const states = useSelector(state => state.ConstantReducer);
  const {
    route: {
      params: {id},
    },
  } = props;
  console.log(id, 'line 36');

  useEffect(async () => {
    setLoading(true);
    // getHealth();
    getAllDirectoriesData();
    // getConstruction();
    props.navigation.setOptions({title: 'Directory'});
  }, []);

  const call = () => {
    console.log('contaced Successfully');
  };

  const locate = () => {
    console.log('Located Successfully');
  };

  const onShare = async item => {
    try {
      const result = await Share.share({
        message: 'bac',
        // 'service Name : ' +
        // item.title +
        // ' Facebook : ' +
        // item.facebook +
        // ' Twitter : ' +
        // item.twitter +
        // 'Email : ' +
        // item.email,
      });
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
  const [Loading, setLoading] = useState(false);
  // const [Health, setHealth] = useState([]);
  // const [construction, setConstruction] = useState([]);
  const [newUpdateData, setNewsUpdataData] = useState([]);

  // const getHealth=async()=>{
  //   await fetch(APIS.get_health_care,{
  //   method:'GET',
  //   headers:{
  //     Authorization:'Bearer ' + states.user_token,
  //       Accept:'application/json',
  //       'Content-Type':'application/json'
  //   }
  //   }).then(response => response.json())
  //   .then(({health_care})=>{
  //     setHealth(health_care)
  //     // console.log(health_care)
  //   }).catch(error=>{
  //     return console.error(error)
  //   })
  //   .finally(()=>{
  //     setLoading(false);
  //   })
  // }
  // const getConstruction=async()=>{
  //   await fetch(APIS.get_contructions,{
  //   method:'GET',
  //   headers:{
  //     Authorization:'Bearer ' + states.user_token,
  //       Accept:'application/json',
  //       'Content-Type':'application/json'
  //   }
  //   }).then(response => response.json())
  //   .then(({materials_detail})=>{
  //     setConstruction(materials_detail)
  //   }).catch(error=>{
  //     return console.error(error)
  //   })
  //   .finally(()=>{
  //     setLoading(false);
  //   })
  // }

  const getAllDirectoriesData = async () => {
    await fetch(`https://mybahria.com.pk/api/directory-listing/${id}`, {
      headers: {
        Authorization: 'Bearer ' + states.user_token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(({parents}) => {
        setNewsUpdataData(parents), console.log(parents, 'DATA');

        // console.log('line 156', newUpdateData),

        // return {properties};
      })
      .catch(error => {
        return console.error(error);
      })
      .finally(() => setLoading(false));

    // console.log('DATA', DATA);
    // return DATA;
  };

  const renderHeader = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
      }}>
      <Searchbar
        style={{flex: 2}}
        fontSize={14}
        iconColor="#e91e63"
        placeholderTextColor="#e91e63"
        color="#e91e63"
        // style={{height: 40}}
        placeholder="Search"
        // onChangeText={onChangeSearch}
        // value={searchQuery}
      />

      <Picker
        style={{flex: 1}}
        mode="dropdown"

        // selectedValue = {this.state.user}
        // onValueChange = {this.updateUser}
      >
        <Picker.Item label="search" value="0" />
        <Picker.Item label="Phase 1" value="1" />
        <Picker.Item label="Phase 2" value="2" />
        <Picker.Item label="Phase 3" value="3" />
      </Picker>
    </View>
  );

  const renderEmptyList = () => {
    return (
      <View>
        <Text>No Data Found</Text>
      </View>
    );
  };
  // console.log(shownData,'AGAYA HAI DATA ISME');
  const rendertem = ({item, index}) => {
    return (
      // <CardOneComponentSample
      //   IMAGE={item.img_src}
      //   Title={item.title}
      //   Description={item?.ptitle}
      //   Address={item?.address1}
      //   LandLineNumber={item?.landline}
      //   CellNumber={item?.phoneno}
      //   // Email={item.Email}
      //   // button1={item.btn1Action}
      //   // button2={item.btn2Action}
      // />
      <View style={styles.body}>
        <View style={styles.c1}>
          <Text style={styles.headerTitle}>{item?.title}</Text>
          <View style={styles.textWthIcon}>
            {item?.address1 === '' || item?.address1 === null ? null : (
              <>
                <Entypo
                  style={{alignSelf: 'flex-start'}}
                  name="location-pin"
                  color="firebrick"
                  size={14}
                />

                <Text style={styles.location}>{item?.address1}</Text>
              </>
            )}
          </View>

          <View style={styles.textWthIcon}>
            {item?.landline === '  ' ? null : (
              <>
                <Ionicons name="call" color="firebrick" size={14} />
                <Text style={styles.phoneNo}>{item?.landline}</Text>
              </>
            )}
          </View>
          <View style={styles.textWthIcon}>
            {item?.phoneno === ' ' ||
            item?.phoneno === '' ||
            item?.phoneno === null ? null : (
              <>
                <MaterialCommunityIcons
                  name="cellphone-iphone"
                  color="firebrick"
                  size={14}
                />
                <Text style={styles.phoneNo}>{item?.phoneno}</Text>
              </>
            )}
          </View>
        </View>

        <View style={styles.c2}>
          {item?.img_src === '' || item?.img_src === null ? (
            <Image
              style={{height: 100, width: 70, borderRadius: 4}}
              // require('../../../../Drawables/football.jpg')
              source={require('../../../Drawables/logo.png')}
              resizeMode="contain"
            />
          ) : (
            <Image
              style={{height: 100, width: 70, borderRadius: 4}}
              // require('../../../../Drawables/football.jpg')
              source={{uri: APIS.image_base_url + item?.img_src}}
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
  };

  // console.log(newUpdateData, 'newUpdateData');
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          width: '100%',
          backgroundColor: '#cc0000',
          height: 50,
          paddingLeft: 14,
          flexDirection: 'row',
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.goBack();
          }}>
          <Icon
            name="arrowleft"
            size={25}
            color="#fff"
            style={{alignSelf: 'center'}}
          />
        </TouchableWithoutFeedback>
        <Text
          style={{
            color: '#fff',
            paddingLeft: 10,
            alignSelf: 'center',
            fontSize: 16,
          }}>
          Directory
        </Text>
      </View>
      {/* <FlatList
        style={{width: '100%'}}
        data={shownData}
        renderItem={item => rendertem(item)}
        keyExtractor={item => {
          item.Title;
        }}
        ListHeaderComponent={renderHeader}
      /> */}
      {Loading ? (
        <ActivityIndicator
          style={{alignSelf: 'center', marginTop: 150}}
          size="large"
          color="firebrick"
        />
      ) : (
        <FlatList
          // renderHeader={renderHeader}
          data={newUpdateData}
          renderItem={(item, index) => rendertem(item, index)}
          keyExtractor={item => item.id}
          // renderHiddenItem={({item}, rowMap) => (
          //   <TouchableOpacity
          //     onPress={() => rowMap[item.id].closeRow()}
          //     style={{
          //       flex: 1,
          //       // paddingVertical: 16,

          //       justifyContent: 'center',
          //       // backgroundColor: 'skyblue',
          //       alignItems: 'flex-end',
          //       // marginHorizontal: 30,
          //       paddingHorizontal: 16,
          //       width: '90%',
          //       alignSelf: 'center',
          //     }}>
          //     <TouchableOpacity
          //       onPress={() => onShare(item)}
          //       style={{
          //         padding: 6,
          //       }}>
          //       <Ionicons color="#cc0000" name="arrow-redo-sharp" size={30} />
          //     </TouchableOpacity>
          //     <TouchableOpacity
          //       onPress={() => {
          //         Linking.openURL(`tel:${item.phone_number}`);
          //       }}
          //       style={{
          //         padding: 6,
          //       }}>
          //       <Ionicons color="green" name="call-sharp" size={30} />
          //     </TouchableOpacity>
          //     <TouchableOpacity
          //       onPress={() => {
          //         let scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
          //         let url =
          //           scheme +
          //           `${item.phonebooks.latitude},${item.phonebooks.longitude}`;
          //         console.log(url);
          //         Linking.openURL(url);
          //       }}
          //       style={{
          //         padding: 6,
          //       }}>
          //       <MaterialCommunityIcons
          //         color="green"
          //         name="google-maps"
          //         size={30}
          //       />
          //     </TouchableOpacity>
          //   </TouchableOpacity>
          // )}
          // leftOpenValue={75}
          ListEmptyComponent={renderEmptyList()}
          rightOpenValue={-75}
        />
      )}
    </View>
  );
}

export default DirectoryPreView;
