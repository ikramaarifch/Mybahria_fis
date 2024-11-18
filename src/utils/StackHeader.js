import {Link} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';

import Foundation from 'react-native-vector-icons/Foundation';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Linking,
  ActivityIndicator,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import {APIS} from './URLS/Urls';
import MaterialCommunityIcons from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {useDispatch, useSelector, useStore} from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {StyleSheet} from 'react-native';
import {List} from 'react-native-paper';
import AccordionItem from '../utils/AccordianItem';
function StackHeader(props) {
  const states = useSelector(state => state.ConstantReducer);

  const [Loading, setLoading] = useState(false);
  const [emergency, setemergency] = useState([]);
  const [noticeborad, setNoticeborad] = useState([]);
  const [user, setuser] = useState([]);

  const DEFAULT_IMAGE = require('../Drawables/profile_pic.png');
  const openDrawer = props.openDrawer;
  const [emergencyModalVisibility, setemergencyModalVisibility] =
    useState(false);
  const [noticeBoardModalVisibility, setNoticeBoardModalVisibility] =
    useState(false);

  const maryamHospitalNumber = '+92-51-5733858-9';
  const fireBrigade = '0515647654';
  const hospital = '0515647654';

  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);
  const getEmergency = async () => {
    await fetch(APIS.get_emergency, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + states.user_token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      // .then(res => res)
      .then(({emergency}) => {
        console.log(emergency,"eme");
        setemergency(emergency);
      })
      .catch(error => {
        return console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });

    // console.log('DATA', DATA);
  };
  const NoticeBoardAPI = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${states?.user_token}`);
    myHeaders.append(
      'Cookie',
      'XSRF-TOKEN=eyJpdiI6IjBZMlZueGhKellvZkhmVlNtZkZWV1E9PSIsInZhbHVlIjoicE9GQkpTcEZza3dETUVMSlJOUGZ3TTRDTHlSODBDemhTdUdwVDNZQml2aEZsN3VnSWw4bXVDYUJKazdtd3IzbGk2ckpCTVMxaFFJWWVBdEIyQUx1WnJkUnNsSS9GeTdZMVcvZ29GZWJobm51dFlDMVVwMmlPQ2svaWFWaXRpMVAiLCJtYWMiOiI4NjkwNDNkYWVlYWUyOTY3NzU2OWUwY2ZhNjI3NDE5ZjA4NGYyNTY0ZWU5ZmU2ZTBhYTk1YzFlNjNjOGMzMDY4IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IjBPWmdYdHJ0Zjk0eWhnakZ6S0drcUE9PSIsInZhbHVlIjoienhuUVNUWWZHMDJmOFcvN1ZrMTE1VWRDN3luM0U5azRnYm1wYjdldGxDRVZzNGszdUl6S0lDSHkxZGI2WFFwN0c3SHF1NnZTOFB3V05seHBUUVVxWDNZRWRnNTVZMG5qZ1pENWxPc1Rsc1FPTGhWbW8zNG1Vd0ZHWXV5K2dHc2kiLCJtYWMiOiI5YTg3NGRkM2Q1NDdkYTE5ZTIzNGIwNTE4N2YyZDA4MDlmNzEyMTBmZDMwMDk5ZDRlN2FhZWNhNjM0ODE5MTYyIiwidGFnIjoiIn0%3D',
    );
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    fetch('https://mybahria.com.pk/api/notice-board', requestOptions)
      .then(response => response.json())
      .then(({notice_boards}) => setNoticeborad(notice_boards))
      .catch(error => console.log('error', error));
  };
  const getUser = async () => {
    await fetch(APIS.get_user_detail, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + states.user_token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      // .then(res => res)
      .then(({user}) => {
         console.log(emergency,'emergecy')
        setuser(user);
      })
      .catch(error => {
        return console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });

    // console.log('DATA', DATA);
  };
  // useEffect(async () => {
  //   setLoading(true);
  //   getEmergency();
  //   getUser();
  //   NoticeBoardAPI();
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await getEmergency();
        await getUser();
        await NoticeBoardAPI();
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle the error appropriately, e.g., display an error message
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  
    // Optionally, if you need cleanup logic, return a function from useEffect
    // return () => {
    //   // cleanup logic here
    // };
  }, []);
  

  // console.log(emergency)
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 50,
        // borderTopLeftRadius: on ? 15 : 0,

        backgroundColor: '#fff',
        borderTopLeftRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
      }}>
      {Loading ? (
        <ActivityIndicator
          style={{alignSelf: 'center', marginTop: 150}}
          size="large"
          color="firebrick"
        />
      ) : (
        <>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('editProfile')}>
            <Image
              style={{
                height: 42,
                width: 42,
                borderWidth: 2,
                borderRadius: 50,
                borderColor: 'firebrick',
              }}
              source={!props.userImage ? DEFAULT_IMAGE : {uri: props.userImage}}
            />
          </TouchableOpacity>

          <View style={{flex: 1, marginHorizontal: 8}}>
            <Text style={{fontWeight: 'bold', color: 'firebrick'}}>
              {user?.name}
            </Text>
            <Text style={{fontSize: 10, color: 'firebrick'}}>
              {user?.created_at}
            </Text>
          </View>
          <View
            style={{
              flex: 0.5,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => setemergencyModalVisibility(true)}
              style={{marginHorizontal: 4}}>
              <Image
                style={{height: 25, width: 25}}
                source={require('../Drawables/newIcons/emergency_icon.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setNoticeBoardModalVisibility(true)}>
              <Foundation name="clipboard-notes" size={25} color="firebrick" />
            </TouchableOpacity>
            <TouchableOpacity onPress={openDrawer}>
              <Image
                style={{height: 32, width: 32}}
                source={require('../Drawables/newIcons/menu.png')}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
      <Modal
        onRequestClose={() => setNoticeBoardModalVisibility(false)}
        transparent={true}
        visible={noticeBoardModalVisibility}
        animationType="slide">
        <TouchableOpacity
          onPress={() => setNoticeBoardModalVisibility(false)}
          style={{flex: 1, backgroundColor: 'transparent'}}
        />
        
        <View
          style={{
            minHeight: 250,
            backgroundColor: '#fff',
            paddingVertical: 16,
            paddingHorizontal: 8,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            elevation: 12,
          }}>
          {/* <TouchableOpacity
            onPress={() => {
              
            }}>
            <MaterialCommunityIcons name="cross" />
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => setNoticeBoardModalVisibility(false)}
            style={{
              backgroundColor: '#cc0000',
              // padding: 16,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
              height: 30,
              width: 30,
              left: Dimensions.get('window').width - 50,
              marginBottom: 10,
            }}>
            <FontAwesome5 name={'times'} size={18} color="#fff" />
          </TouchableOpacity>
          <ScrollView>
          
            {noticeborad.length === 0 || noticeborad === undefined ? (
              <Text style={{color: 'firebrick'}}>No Data Found</Text>
            ) : (
              noticeborad.map((notice, index) => (
                console.log(notice),
                <AccordionItem
                  key={index.toString()}
                  title={notice.title}
                  date={notice?.created_At}
                  description={notice.description}
                />
              ))
            )}
          </ScrollView>
          {/* <Text
            style={{
              borderLeftColor: 'red',
              borderLeftWidth: 2,
              paddingHorizontal: 8,
              fontWeight: 'bold',
            }}>
            Notice Board
          </Text>
          <View style={styles.RowContainer}>
            <Text style={styles.Title}>Title 1</Text>
            <Text style={styles.Rowdate}>JUL 12 2012</Text>
          </View>
          <View style={styles.RowContainer}>
            <Text style={styles.Title}>Title 2</Text>
            <Text style={styles.Rowdate}>JUL 12 2012</Text>
          </View>
          <View style={styles.RowContainer}>
            <Text style={styles.Title}>
              LOREM IPSUM IS SIMPLY DUMMY TEXT OF THE{' '}
            </Text>
            <Text style={styles.Rowdate}>JUL 12, 2023</Text>
          </View>
          <View style={styles.RowContainer}>
            <Text style={styles.Title}>DUMMY TEXT OF THE PRINTIN </Text>
            <Text style={styles.Rowdate}>JUL 12, 2023</Text>
          </View>
          <View style={styles.RowContainer}>
            <Text style={styles.Title}>EXT EVER SINCE THE 1500S, </Text>
            <Text style={styles.Rowdate}>JJUL 12, 2023</Text>
          </View> */}
        </View>
      </Modal>

      <Modal
        onRequestClose={() => setemergencyModalVisibility(false)}
        transparent={true}
        visible={emergencyModalVisibility}
        animationType="slide">
        <TouchableOpacity
          onPress={() => setemergencyModalVisibility(false)}
          style={{flex: 1, backgroundColor: 'transparent'}}
        />
        <View
          style={{
            minHeight: 250,
            backgroundColor: '#fff',
            paddingVertical: 16,
            paddingHorizontal: 8,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            elevation: 12,
          }}>
          {/* <TouchableOpacity
            onPress={() => {
              
            }}>
            <MaterialCommunityIcons name="cross" />
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => setemergencyModalVisibility(false)}
            style={{
              backgroundColor: '#cc0000',
              // padding: 16,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
              width: 50,
              left: Dimensions.get('window').width - 80,
            }}>
            <FontAwesome5 name={'times'} size={18} color="#fff" />
          </TouchableOpacity>
          <Text
            style={{
              borderLeftColor: 'red',
              borderLeftWidth: 2,
              paddingHorizontal: 8,
              fontWeight: 'bold',
            }}>
            Emergency
          </Text>

          <FlatList
          style={{
            marginBottom: 50
          }}
            data={emergency}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
              console.log(item);
              return (
                <View
                  style={{borderBottomColor: 'silver', borderBottomWidth: 2, height:'9%' }}>
                  <View
                    style={{
                      marginTop: 8,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      // backgroundColor: '#ddd',
                      // paddingVertical: 8,
                      paddingHorizontal: 16,
                      height:75,
                    }}>
                    <MaterialCommunityIcons
                      name={item.icon}
                      color="#cc0000"
                      size={20}
                    />
                    <Text
                      style={{
                        textAlign: 'left',
                        flex: 1,
                        marginHorizontal: 4,
                        color: 'black',
                        // fontWeight: 'bold',
                        // height:30,
                      }}>
                      {item?.title}
                    </Text>

                    <View>
  {item.phone.split('/').map((phoneNumber, index) => {
    const trimmedNumber = phoneNumber.trim();  // Remove any extra spaces
    if (trimmedNumber) {  // Check if the number is not empty
      return (
        <TouchableOpacity
          key={index}
          onPress={() => {
            Linking.openURL(`tel:${trimmedNumber}`);
          }}
        >
          <Text style={{ color: '#cc0000', width: 110, textAlign:'right' }}>{trimmedNumber}</Text>
        </TouchableOpacity>
      );
    }
  })}
</View>

                  </View>
                  {/* <View
                    style={{
                      marginTop: 4,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      // backgroundColor: '#ddd',
                      paddingVertical: 8,
                      paddingHorizontal: 16,
                    }}>
                    <MaterialCommunityIcons
                      name="hospital-building"
                      color="#cc0000"
                      size={20}
                    />
                    
                    <TouchableOpacity
                      onPress={() => {
                        Linking.openURL(`tel:${item.title}`);
                      }}>
                      <Text style={{color: '#cc0000'}}>{item.title}</Text>
                    </TouchableOpacity>
                  </View> */}
                  {/* <View
                    style={{
                      // marginTop: 4,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      // backgroundColor: '#ddd',
                      paddingVertical: 4,
                      // marginLeft: 16,
                      paddingHorizontal: 16,
                    }}>
                    <Text
                      style={{
                        textAlign: 'left',
                        flex: 1,
                        // fontSize: 12,
                        // marginHorizontal: 8,
                        // fontWeight: 'bold',
                      }}></Text>
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(`tel:${maryamHospitalNumber}`)
                      }>
                      <Text style={{color: '#cc0000'}}>
                        {maryamHospitalNumber}
                      </Text>
                    </TouchableOpacity>
                  </View> */}
                </View>
              );
            }}
            ListEmptyComponent={() => <Text>Nothing </Text>}
          />
        </View>
      </Modal>
    </View>
  );
}
const mapStateToProps = state => {
  return {
    activeTab: state.tab_reducer.activeTab,
    userImage: state.tab_reducer.userImage,
    drawerActiveTab: state.tab_reducer.drawerActiveTab,
  };
};

export default connect(mapStateToProps)(StackHeader);
const styles = StyleSheet.create({
  RowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    flexWrap: 'wrap',
  },
  Title: {
    paddingHorizontal: 8,
    fontWeight: 'bold',
  },
  Rowdate: {
    fontWeight: 'bold',
    fontSize: 11,
    color: 'firebrick',
  },
});
