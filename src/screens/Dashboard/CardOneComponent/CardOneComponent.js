import React, {useEffect, useState} from 'react';

import CardOneComponentSample from './CardOneComponentSample/CardOneComponentSample';
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

import {
  View,
  Share,
  Linking,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Picker,
} from 'react-native';
function CardOneComponent(props) {
  const states = useSelector(state => state.ConstantReducer);
  const {
    route: {
      params: {item},
    },
  } = props;
  console.log(item, 'line 36');

  // useEffect(async () => {
  //   setLoading(true);
  //   // getHealth();
  //   getAllDirectoriesData();
  //   // getConstruction();
  //   props.navigation.setOptions({title: 'Directory'});
  // }, []);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      // await getHealth();
      await getAllDirectoriesData();
      // await getConstruction();
      props.navigation.setOptions({ title: 'Directory' });
      setLoading(false); // Assuming setLoading(false) is called when data fetching is done
    }
    
    fetchData();
  
    // Optionally, if you need cleanup logic, return a function from useEffect
    // return () => {
    //   // cleanup logic here
    // };
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




  // const getAllDirectoriesData = async () => {
  //   await fetch('http://mybahria.assanhissab.com/api/new-directory', {
  //     headers: {
  //       Authorization: 'Bearer ' + states.user_token,
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   console
  //     .log('tokenstatus', states.user_token)
  //     .then(response => response.json())
  //     .then(({parents}) => {
  //       let TITLE = '';

  //       switch (item) {
  //         case 'Health Care':
  //           console.log('Health Care SWITCH');
  //           TITLE = 'Health & Fitness';
  //           break;
  //         case 'Entertainment':
  //           console.log('Enter Care SWITCH');
  //           TITLE = 'Entertainment';
  //           break;
  //         case 'Constructions':
  //           TITLE = 'Constructions';
  //           break;
  //         case 'Construction':
  //           TITLE = 'Construction';
  //           break;
  //         case 'Services':
  //           TITLE = 'services';
  //           break;
  //         case 'Business':
  //           TITLE = 'Businesses';
  //           break;
  //         case 'Property Portal':
  //           TITLE = 'Property Portal  ';
  //           break;
  //         case 'Sports':
  //           TITLE = 'Sports';
  //           break;
  //         case 'Constructions':
  //           TITLE = 'Constructions';

  //           break;
  //         case 'Food & Drinks':
  //           TITLE = 'Food And Drinks';
  //           break;

  //         default:
  //           TITLE = 'Sports';
  //           break;
  //       }

  //       TITLE != 'No Data Found' &&
  //         parents.map(
  //           i =>
  //             i.title === TITLE
  //               ? (setNewsUpdataData(i.data), console.log(i.data, 'DATA'))
  //               : null,

  //           // console.log('line 156', newUpdateData),
  //         );
  //       // return {properties};
  //     })
  //     .catch(error => {
  //       return console.error(error);
  //     })
  //     .finally(() => setLoading(false));

  //   // console.log('DATA', DATA);
  //   // return DATA;
  // };

  const getAllDirectoriesData = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://mybahria.com.pk/api/new-directory', {
        headers: {
          Authorization: 'Bearer ' + states.user_token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      console.log('usertoken', states.user_token)
  
      if (!response.ok) {
        throw new Error('Failed to fetch data okok');
      }
  
      const { parents } = await response.json();
  
      let TITLE = '';
  
      switch (item) {
        case 'Health Care':
          TITLE = 'Health & Fitness';
          break;
        case 'Entertainment':
          TITLE = 'Entertainment';
          break;
        case 'Constructions':
        case 'Construction':
          TITLE = 'Construction';
          break;
        case 'Services':
          TITLE = 'services';
          break;
        case 'Business':
          TITLE = 'Businesses';
          break;
        case 'Property Portal':
          TITLE = 'Property Portal  ';
          break;
        case 'Sports':
          TITLE = 'Sports';
          break;
        case 'Food & Drinks':
          TITLE = 'Food And Drinks';
          break;
        default:
          TITLE = 'Sports';
          break;
      }
  
      if (TITLE !== 'No Data Found') {
        const dataToUpdate = parents.find(parent => parent.title === TITLE);
        if (dataToUpdate) {
          setNewsUpdataData(dataToUpdate.data);
          console.log(dataToUpdate.data, 'DATA');
        }
      }
    } catch (error) {
      console.error('Error fetching directory data:', error);
      // Handle the error appropriately, e.g., display an error message
    } finally {
      setLoading(false);
    }
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
      //   IMAGE={!item.image ? APIS.default_image : item.image}
      //   Title={item.title}
      //   Description={item.phonebooks.title}
      //   Address={item.phonebooks.address1}
      //   LandLineNumber={item.LandLineNumber}
      //   CellNumber={item.CellNumber}
      //   Email={item.Email}
      //   button1={item.btn1Action}
      //   button2={item.btn2Action}
      // />
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('SubCategoryPreview', {
            id: item?.cid,
          });
        }}
        style={{
          flexDirection: 'row',
          height: 60,
          backgroundColor: '#fff',
          paddingHorizontal: 16,
          justifyContent: 'space-between',
          borderRadius: 5,
          alignItems: 'center',
          marginVertical: 6,
          elevation: 12,
          marginHorizontal: 16,
        }}>
        <MaterialIcons name={'category'} size={28} color="firebrick" />
        <Text
          style={{
            fontWeight: 'bold',
            textAlign: 'left',
            // backgroundColor: '#ddd',
            color:'black',
            flex: 1,
            marginHorizontal: 16,
          }}>
          {item.title}
        </Text>
        <Ionicons name="chevron-forward-sharp" size={28} color="firebrick" />
      </TouchableOpacity>
    );
  };

  // console.log(newUpdateData, 'newUpdateData');
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
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
        <SwipeListView
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

export default CardOneComponent;
