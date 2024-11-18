import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
  USER_DATA,
  USER_TOKEN,
  LOGOUT,
  setToken,
} from '../../redux/Constant/Constant.action';

import {
  profileImage,
  selectDrawerTab,
  setActiveTab,
} from '../../redux/tabs_handler/actions';
import {cameraPickCover} from '../../utils/CameraUtil';
import DrawerItemSample from '../../utils/DrawerItemSample';
import Home from '../Dashboard/Home';
import {APIS} from '../../utils/URLS/Urls';

function MainWindow(props) {
  const states = useSelector(state => state.ConstantReducer);
  // 'states'
  const [image, setImage] = useState('');
  const [on, setOn] = useState(false);
  const [showBottomTabs, setShowBottomTabs] = useState(true);
  const [activeTab, setActiveTab] = useState('Home');
  const dispatch = useDispatch();
  const [user, setuser] = useState([]);
  // 'animated Value'
  const offSetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;

  // 'default value'
  const DEFAULT_IMAGE = require('../../Drawables/profile_pic.png');
  // 'actions'
  const constUplaodImage = async () => {
    const IMAGE = await cameraPickCover();
    // console.log('clicked');
    props.profileImage(IMAGE.path);
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
        // console.log(emergency)
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
  const PlayAnimation = () => {
    // setOn(!on);
    Animated.timing(scaleValue, {
      toValue: on ? 1 : 0.9,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(offSetValue, {
      toValue: on ? 0 : 200,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeDrawer = () => {
    if (on) {
      setOn(false);
      PlayAnimation();
    }
  };

  const openDrawer = () => {
    if (!on) {
      setOn(true);
      PlayAnimation();
    }
  };

  const showBottomTabHandler = () => {
    setShowBottomTabs(!showBottomTabs);
  };
  useEffect(async () => {
    getUser();
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          backgroundColor: '#CC0000',
          flexGrow: 1,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}>
        <View
          style={{
            width: '50%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('editProfile')}>
            <Image
              style={{
                height: 80,
                width: 80,
                borderRadius: 50,
                borderWidth: 1,
                backgroundColor: '#212121',
                borderColor: '#fff',
              }}
              // {image === null ? ():()}
              // source={{uri: image}}

              source={!props.userImage ? DEFAULT_IMAGE : {uri: props.userImage}}
              // source={DEFAULT_IMAGE}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={{
              position: 'absolute',
              top: '50%',
              left: '60%',
              backgroundColor: '#fff',
              padding: 4,
              borderRadius: 50,
            }}
            onPress={constUplaodImage}>
            <FontAwesome5 name="camera" color="red" size={16} />
          </TouchableOpacity> */}
          <Text
            style={{
              color: '#fff',
              paddingVertical: 8,
              fontSize: 14,
              fontWeight: 'bold',
            }}>
            {/* {states?.user_data.name === undefined
              ? null
              : states?.user_data.name} */}
            {user?.name}
          </Text>
        </View>

        <View style={{width: '50%', flexGrow: 1}}>
          {/* <TouchableOpacity
            onPress={() => {
              // setSelected('Home');
              props.selectDrawerTab('home');
              props.setActiveTab('Home');
              // props.navigation.navigate('MainWindow');
              setShowBottomTabs(true);
              closeDrawer();
              // props.navigation.navigate('Home');
            }}>
            <DrawerItemSample
              name="home"
              lable="Home"
              selected={props.drawerActiveTab}
            />
          </TouchableOpacity> */}

<TouchableOpacity
            onPress={() => {
              // props.selectDrawerTab('Directory');
              props.navigation.navigate('Home', {
                cardTitle: 'Home',
              });
              // setShowBottomTabs(false);
              closeDrawer();
              // props.navigation.navigate('Directories');
            }}>
            <DrawerItemSample
              name="home"
              lable="Home"
              selected={props.drawerActiveTab}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              // props.selectDrawerTab('Directory');
              props.navigation.navigate('Directories', {
                cardTitle: 'Directory',
              });
              // setShowBottomTabs(false);
              closeDrawer();
              // props.navigation.navigate('Directories');
            }}>
            <DrawerItemSample
              name="cogs"
              lable="Directory"
              selected={props.drawerActiveTab}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // props.selectDrawerTab('Jobs');
              closeDrawer();
              props.navigation.navigate('Jobs');
              // setShowBottomTabs(false);
              // props.navigation.navigate('Directories');
            }}>
            <DrawerItemSample
              name="briefcase"
              lable="Jobs"
              selected={props.drawerActiveTab}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              // props.selectDrawerTab('Gallery');
              closeDrawer();
              props.navigation.navigate('Gallery');
              // setShowBottomTabs(false);
              // props.navigation.navigate('Gallery');
            }}>
            <DrawerItemSample
              name="photo-video"
              lable="Gallery"
              selected={props.drawerActiveTab}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // props.selectDrawerTab('Blog');
              props.navigation.navigate('Blog');
              closeDrawer();
              // setShowBottomTabs(false);
              // props.navigation.navigate('Blog');
            }}>
            <DrawerItemSample
              name="blog"
              lable="Blog"
              selected={props.drawerActiveTab}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // props.selectDrawerTab('News');
              closeDrawer();
              props.navigation.navigate('News');
              // setShowBottomTabs(false);
              // props.navigation.navigate('News');
            }}>
            <DrawerItemSample
              name="newspaper"
              lable="News"
              selected={props.drawerActiveTab}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // props.selectDrawerTab('Contact');
              closeDrawer();
              props.navigation.navigate('Contact');
              // setShowBottomTabs(false);
              // props.navigation.navigate('Contact');
            }}>
            <DrawerItemSample
              name="phone-alt"
              lable="Contact"
              selected={props.drawerActiveTab}
            />
          </TouchableOpacity>

          <View style={{marginVertical: 10}}>
            <Text style={{color: 'yellow', fontWeight: 'bold', fontSize: 16}}>
              My Account
            </Text>
            <TouchableOpacity
              onPress={() => {
                // props.selectDrawerTab('Edit Profile');
                closeDrawer();
                props.navigation.navigate('editProfile');
                // setShowBottomTabs(false);
                //   props.navigation.navigate('editProfile');
              }}>
              <DrawerItemSample
                name="edit"
                lable="Edit Profile"
                selected={props.drawerActiveTab}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // props.selectDrawerTab('Resgister Your Business');
                closeDrawer();
                props.navigation.navigate('registerBusiness');
                // setShowBottomTabs(false);
                //   props.navigation.navigate('registerBusiness');
              }}>
              <DrawerItemSample
                name="business-time"
                lable="Resgister Your Business"
                selected={props.drawerActiveTab}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // props.selectDrawerTab('Manage Sell / Purchase');
                closeDrawer();
                props.navigation.navigate('manageSells');
                // setShowBottomTabs(false);
                // props.navigation.navigate('manageSells');
              }}>
              <DrawerItemSample
                name="photo-video"
                lable="Sell / Purchase"
                selected={props.drawerActiveTab}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                // props.selectDrawerTab('Manage Sell / Purchase');
                closeDrawer();
                props.navigation.navigate('ManageProperties');
                // setShowBottomTabs(false);
                // props.navigation.navigate('manageSells');
              }}>
              <DrawerItemSample
                name="photo-video"
                lable="Manage Properties"
                // selected={props.drawerActiveTab}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{width: '50%'}}>
          <TouchableOpacity
            onPress={() => {
              // setSelected();
              // dispatch({type: USER_TOKEN, payload: null});
              // dispatch({type: USER_DATA, payload: null});
              console.log(props, 'workng');
              props.setToken(null);
              setTimeout(() => {
                props.navigation.navigate('SplashScreen');
                closeDrawer();
              }, 100);
              // dispatch({type: ACTION_PROFILE_IMAGE, payload:DEFAULT_IMAGE});
            }}>
            <DrawerItemSample name="sign-out-alt" lable="SignOut" />
          </TouchableOpacity>
        </View>

        {/* ended/ */}

        <Animated.View
          style={{
            // justifyContent: 'center',
            // alignItems: on ? 'flex-end' : 'flex-start',
            position: 'absolute',
            top: 0,
            // height: '100%',
            flex: 1,
            // paddingVertical: 7,
            // borderRadius: on ? 10 : 0,
            elevation: 10,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: on ? 8 : 0,
            backgroundColor: '#fff',
            transform: [
              {
                scale: scaleValue,
              },
              {translateX: offSetValue},
            ],
          }}>
          <Home
            closeDrawer={closeDrawer}
            openDrawer={openDrawer}
            navigation={props.navigation}
          />

          {/* <TouchableWithoutFeedback
            style={{
              flex: 1,
              backgroundColor: '#fff',
              borderBottomLeftRadius: 15,
              // backgroundColor: 'red',
            }}
            onPress={() => closeDrawer()}>
            <Home closeDrawer={closeDrawer} openDrawer={openDrawer} navigation={props.navigation} /> */}
          {/* <Home openDrawer={openDrawer} /> */}
          {/* {showBottomTabs ? (
              <View
                style={{
                  paddingTop: 6,
                  height: '100%',
                  // width: '100%',
                  borderBottomLeftRadius: 15,
                  // backgroundColor: 'red',
                  // paddingBottom: 60,
                }}> */}
          {/* screens */}
          {/* {props.activeTab === 'Home' ||
              props.drawerActiveTab === 'home' ? (
                <HomeStack />
              ) : null} */}
          {/* {props.drawerActiveTab === 'home' ? (
                  <Home openDrawer={openDrawer} navigation={props.navigation} />
                ) : null} */}
          {/* {props.activeTab === 'Property' ? (
                <Text>Property Tab</Text>
              ) : null}
              {props.activeTab === 'Services' ? <Services /> : null}
              {props.activeTab === 'Buy / Sell' ? (
                <Text>Buy / Sell Tab</Text>
              ) : null} */}
          {/* 
              <View
                style={{
                  width: '100%',

                  position: 'absolute',
                  bottom: 40,
                  alignSelf: 'center',
                }}>
                <CustomDTabBar />
              </View> */}
          {/* </View>
            ) : (
              <View style={{flex: 1, borderBottomLeftRadius: 15}}>
                {props.drawerActiveTab === 'Directory' ? <Directories /> : null}
                {props.drawerActiveTab === 'Jobs' ? (
                  <Text>Coming Soon, be patient</Text>
                ) : null}
                {props.drawerActiveTab === 'Gallery' ? <Gallery /> : null}
                {props.drawerActiveTab === 'Blog' ? <Blog /> : null}
                {props.drawerActiveTab === 'News' ? <News /> : null}
                {props.drawerActiveTab === 'Contact' ? <Contact /> : null}
                {props.drawerActiveTab === 'Edit Profile' ? (
                  <EditProfile />
                ) : null}
                {props.drawerActiveTab === 'Resgister Your Business' ? (
                  <RegisterBusiness />
                ) : null}
                {props.drawerActiveTab === 'Manage Sell / Purchase' ? (
                  <ManageSells />
                ) : null} */}
          {/* </View> */}
          {/* )} */}
          {/* </TouchableWithoutFeedback> */}
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = state => {
  return {
    activeTab: state.tab_reducer.activeTab,
    userImage: state.tab_reducer.userImage,
    drawerActiveTab: state.tab_reducer.drawerActiveTab,
  };
};

const mapActionsToProps = dispatch => {
  return {
    profileImage: image => dispatch(profileImage(image)),
    selectDrawerTab: tab => dispatch(selectDrawerTab(tab)),
    setActiveTab: tab => dispatch(setActiveTab(tab)),
    setToken: token => dispatch(setToken(token)),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(MainWindow);
