import React, {useEffect, useState} from 'react';
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
  Share,
  Linking,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import ServicesItemSample from './ServicesItemSample';
import {SwipeListView} from 'react-native-swipe-list-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SearchBar} from 'react-native-elements';
import {openServiceFilterModal} from '../../../redux/tabs_handler/actions';
import {connect} from 'react-redux';
import {APIS} from '../../../utils/URLS/Urls';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {it} from 'jest-circus';
import {ToastAndroid} from 'react-native';

const {height, width} = Dimensions.get('window');

function DirectoryPreViewSample(props) {
  console.log(props.route.params.id, 'direcotypreview');
  const [FilterVisibility, setFilterVisibility] = useState(false);
  const [found, setNothingFound] = useState(false);
  const states = useSelector(state => state.ConstantReducer);
  const [Details, setDetails] = useState([]);
  const [oldDetails, setOldDetails] = useState([]);

  // const item = props.route.params.ITEM;
  // const title = item.title;

  const nav = useNavigation();
  // console.log(title);
  const [search, setSearch] = useState('');
  const updateSearch = search => {
    setSearch(search);

    // searchedData();
  };

  const [SeachedData, setSearchedData] = useState([]);
  const [Loading, setLoading] = useState(false);

  // const getServicesDetail = async id => {
  //   await fetch(APIS.post_service_detail, {
  //     method: 'POST',
  //     headers: {
  //       Authorization: 'Bearer ' + states.user_token,
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({category_name: id}),
  //   })
  //     .then(response => response.json())
  //     .then(({service_detail}) => {
  //       setDetails(service_detail);
  //       setOldDetails(service_detail);
  //     })
  //     .catch(error => {
  //       return console.error(error);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  const getServicesDetail = async (id) => {
    try {
      setLoading(true); // Ensure loading state is set before fetch begins
      const response = await fetch(APIS.post_service_detail, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + states.user_token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category_name: id }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch service details');
      }
  
      const data = await response.json(); // Get the response data
  
      console.log('Service Details Response:', data); // Log the response
  
      const { service_detail } = data;
  
      setDetails(service_detail);
      setOldDetails(service_detail);
    } catch (error) {
      console.error('Error fetching service details:', error);
    } finally {
      setLoading(false); // Ensure loading is stopped after fetch completes
    }
  };
  
  const searchAPI = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${states.user_token}`);
    var formdata = new FormData();
    formdata.append('search_key', search);
    console.log(formdata, 'LKJHGFD');
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    fetch('https://mybahria.com.pk/api/search-service', requestOptions)
      .then(response => response.json())
      .then(({details}) => {
        if (details.length != 0) {
          setDetails(details);
        } else {
          ToastAndroid.show('No Data Found', ToastAndroid.LONG);
          setDetails(oldDetails);
        }
      })
      .catch(error => console.log('error', error));
  };
  useEffect(async () => {
    setLoading(true);
    getServicesDetail(props.route.params.id);
  }, []);

  const randomData = [
    {
      id: 1,
      title: 'Dev5',
      parent_title: 'Services',
      image: require('../../../Drawables/gallery-1.png'),
      address:
        'Bahria Heights 1, Bahria Town Phase 1 Bahria Heights 1, Bahria Town Phase 1Bahria Heights 1, Bahria Town Phase 1Bahria Heights 1, Bahria Town Phase 1',
      phone_number: '+92 332 4767439',
      status: 'UnVerified',
      landline: '+92 (51) 2724268',
      latitude: '123123',
      longitude: '12312',
      facebook: 'https://www.facebook.com/',
      youtube: 'https://www.youtube.com/',
      twitter: 'https://www.twitter.com/',
      linkedin: 'https://www.linkedin.com/',
      email: 'info@vertient.com',
    },
    {
      id: 2,
      title: 'click computers',
      parent_title: 'Services',
      image: require('../../../Drawables/gallery-2.png'),
      address: 'Bahria Heights 1, Bahria Town Phase 1',
      phone_number: '+92 332 4767439',
      status: 'Verified',
      landline: '+92 (51) 2724268',
      latitude: '123123',
      longitude: '12312',
      facebook: 'https://www.facebook.com/',
      youtube: 'https://www.youtube.com/',
      twitter: 'https://www.twitter.com/',
      linkedin: 'https://www.linkedin.com/',
      email: 'info@vertient.com',
    },
    {
      id: 3,
      title: "Usama's Hideout",
      parent_title: 'Services',
      image: require('../../../Drawables/gallery-3.png'),
      address: 'Bahria Heights 1, Bahria Town Phase 1',
      phone_number: '+92 332 4767439',
      status: 'UnVerified',
      landline: '+92 (51) 2724268',
      latitude: '123123',
      longitude: '12312',
      facebook: 'https://www.facebook.com/',
      youtube: 'https://www.youtube.com/',
      twitter: 'https://www.twitter.com/',
      linkedin: 'https://www.linkedin.com/',
      email: 'info@vertient.com',
    },
    {
      id: 4,
      title: 'Ideofuzion',
      parent_title: 'Services',
      image: require('../../../Drawables/gallery-4.png'),
      address: 'Bahria Heights 1, Bahria Town Phase 1',
      phone_number: '+92 332 4767439',
      status: 'Verified',
      landline: '+92 (51) 2724268',
      latitude: '123123',
      longitude: '12312',
      facebook: 'https://www.facebook.com/',
      youtube: 'https://www.youtube.com/',
      twitter: 'https://www.twitter.com/',
      linkedin: 'https://www.linkedin.com/',
      email: 'info@vertient.com',
    },

    {
      id: 5,
      title: 'Xerosector Technologies',
      parent_title: 'Services',
      image: require('../../../Drawables/gallery-5.png'),
      address: 'Bahria Heights 1, Bahria Town Phase 1',
      phone_number: '+92 332 4767439',
      status: 'Verified',
      landline: '+92 (51) 2724268',
      latitude: '123123',
      longitude: '12312',
      facebook: 'https://www.facebook.com/',
      youtube: 'https://www.youtube.com/',
      twitter: 'https://www.twitter.com/',
      linkedin: 'https://www.linkedin.com/',
      email: 'info@vertient.com',
    },
  ];

  const cateringData = [
    {
      id: 1,
      title: 'Safari catering',
      parent_title: 'Services',
      image: require('../../../Drawables/gallery-5.png'),
      address: 'Bahria Heights 1, Bahria Town Phase 1',
      phone_number: '+92 332 4767439',
      status: 'Verified',
      landline: '+92 (51) 2724268',
      latitude: '123123',
      longitude: '12312',
      facebook: 'https://www.facebook.com/',
      youtube: 'https://www.youtube.com/',
      twitter: 'https://www.twitter.com/',
      linkedin: 'https://www.linkedin.com/',
      email: 'info@vertient.com',
    },

    {
      id: 2,
      title: 'Usmania Resturant & Catering Center',
      parent_title: 'Services',
      image: require('../../../Drawables/gallery-2.png'),
      address: 'Bahria Heights 1, Bahria Town Phase 1',
      phone_number: '+92 332 4767439',
      status: 'Verified',
      landline: '+92 (51) 2724268',
      latitude: '123123',
      longitude: '12312',
      facebook: 'https://www.facebook.com/',
      youtube: 'https://www.youtube.com/',
      twitter: 'https://www.twitter.com/',
      linkedin: 'https://www.linkedin.com/',
      email: 'info@vertient.com',
    },
  ];

  let render_item = ({item}) => {
    return <ServicesItemSample item={item} />;
  };

  // const searchedData = () => {
  //   var temproryArr = [...randomData];

  //   const newData = temproryArr.filter(item => {
  //     // console.log('search : ', item.title.startsWith(search));
  //     // console.log('search search : ', search);
  //     if (item.title.toLowerCase().startsWith(search.toLowerCase())) {
  //       return item;
  //     }
  //   });

  //   newData.length > 0
  //     ? (setSearchedData(newData), setNothingFound(false))
  //     : setSearchedData([]),
  //     setNothingFound(true);

  //   console.log('data : ', newData);
  // };

  const onShare = async item => {
    try {
      const result = await Share.share({
        message:
          'service Name : ' +
          item.title +
          ' Facebook : ' +
          item.facebook +
          ' Twitter : ' +
          item.twitter +
          'Email : ' +
          item.email,
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

  return (
    <View style={styles.body}>
      {found ? (
        <View
          style={{
            flex: 1,

            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#cc0000',
              fontSize: 14,
              fontStyle: 'italic',
              alignSelf: 'center',
            }}>
            NOTHING MATCH
          </Text>
        </View>
      ) : null}
      {Loading ? (
        <ActivityIndicator
          style={{alignSelf: 'center', marginTop: 150}}
          size="large"
          color="firebrick"
        />
      ) : (
        <SwipeListView
          data={Details}
          renderItem={item => render_item(item)}
          // keyExtractor={item => item.id}
          // renderHiddenItem={({item}, rowMap) => (
          //   <TouchableOpacity
          //     onPress={() => rowMap[item.id].closeRow()}
          //     style={{
          //       flex: 1,

          //       justifyContent: 'center',
          //       alignItems: 'flex-end',
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
          //         let url = scheme + `${item.latitude},${item.longitude}`;
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
          rightOpenValue={-75}
        />
      )}

      <Modal
        transparent={true}
        visible={props.FilterVisibility}
        animationType="slide">
        <TouchableOpacity
          onPress={() => {
            props.openServiceFilterModal(), setSearchedData(Details);
          }}
          style={{flex: 1, backgroundColor: 'transparent'}}
        />
        <View
          style={{
            elevation: 10,
            paddingHorizontal: 16,
            backgroundColor: '#fff',
            minHeight: 200,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            paddingVertical: 16,
            alignItems: 'center',
          }}>
          <Text
            style={{
              width: '100%',
              borderLeftColor: 'red',
              borderLeftWidth: 2,
              fontWeight: 'bold',
              paddingHorizontal: 8,
              color:'red'
            }}>
            Filter by
          </Text>
          <View
            style={{
              width: '100%',
              minHeight: 150,
              justifyContent: 'space-between',
            }}>
            <SearchBar
              containerStyle={{
                borderTopWidth: 0,
                paddingHorizontal: 0,
                marginVertical: 16,
                backgroundColor: '#fff',
              }}
              inputContainerStyle={{
                backgroundColor: '#fff',
                height: 30,
                paddingHorizontal: 0,
              }}
              inputStyle={{
                fontSize: 12,
                paddingHorizontal: 0,
              }}
              placeholder="Type Here..."
              onChangeText={search => updateSearch(search)}
              value={search}
            />
            <TouchableOpacity
              onPress={() => {
                console.log('PRESSED SEARCH'), searchAPI();
              }}
              style={{
                backgroundColor: '#cc0000',
                justifyContent: 'center',
                width: '80%',
                alignSelf: 'center',
                alignItems: 'center',
                marginVertical: 16,
                borderRadius: 4,
                elevation: 5,
                shadowColor: 'red',
                flexDirection: 'row',
                padding: 4,
              }}>
              <Text
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  fontSize: 14,
                  color: '#fff',
                  marginHorizontal: 8,
                }}>
                Search
              </Text>
              <FontAwesome5 name="search" color="#fff" size={18} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
});

const mapActionToProps = dispatch => {
  return {
    openServiceFilterModal: () => dispatch(openServiceFilterModal()),
  };
};
const mapStateToProps = state => {
  return {
    FilterVisibility: state.tab_reducer.ServiceFilterModalVisibility,
  };
};
export default connect(
  mapStateToProps,
  mapActionToProps,
)(DirectoryPreViewSample);
