import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
const HomeIcon = require('../Drawables/newIcons/tab_home.png');
const PropertyIcon = require('../Drawables/newIcons/tab_property.png');
const ServicesIcon = require('../Drawables/newIcons/tab_services.png');
const BuySellIcon = require('../Drawables/newIcons/tab_buysell.png');
const ForumIcon = require('../Drawables/newIcons/tab_forum.png');
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {setActiveTab} from '../redux/tabs_handler/actions';
import {connect} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
function CustomDTabBar(props) {
  const NAVIGATION = props.PROPS;
  // const [activeTab, setActiveTab] = useState('Home');

  // const dipsatch = useDispatch();
  // const active_Tab = useSelector(state => state.tab_reducer.activeTab);
  return (
    <View style={{backgroundColor: '#CC0000', borderBottomLeftRadius: 8}}>
      <View
        style={{
          backgroundColor: '#CC0000',
          flexDirection: 'row',
          height: 70,
          borderBottomLeftRadius: 15,
          alignItems: 'center',
          justifyContent: 'space-between',
          // paddingHorizontal: 6,
        }}>
        <View
          style={{
            // marginHorizontal: 8,
            // paddingHorizontal: 16,
            // backgroundColor: 'skyblue',
            flex: 1,
            // justifyContent: 'space-around',
            // paddingLeft: 10,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => {
              NAVIGATION.navigate('Directories', {cardTitle: 'Directory'});
              // navigation.navigate('Home');
              // setActiveTab('Home');
              props.setActiveTab('Home');
            }}
            style={{
              // marginTop: props.activeTab === 'Home' ? 0 : 12,
              flex: 1,
              // backgroundColor: 'gold',
              paddingVertical: 4,
              paddingHorizontal: 6,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* <Image style={{width: 35, height: 35}} source={HomeIcon} /> */}
            <MaterialIcons
              style={{marginHorizontal: 4}}
              name="store-mall-directory"
              size={props.activeTab === 'Home' ? 35 : 26}
              color="#fff"
            />
            <Text style={{color: '#fff', fontSize: 10}}>Directory</Text>

            {/* 
            {props.activeTab !== 'Home' ? (
              <Text style={{color: '#fff', fontSize: 10}}>Home</Text>
            ) : null} */}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              NAVIGATION.navigate('Properties');
              // props.setActiveTab('Property');
            }}
            style={{
              flex: 2,
              // marginTop: props.activeTab === 'Property' ? 0 : 12,
              paddingVertical: 4,
              paddingLeft: 20,
              justifyContent: 'center',
              // backgroundColor: 'skyblue',
              alignItems: 'flex-start',
            }}>
            <FontAwesome5
              style={{marginHorizontal: 4}}
              name="laptop-house"
              size={props.activeTab === 'Property' ? 35 : 26}
              color="#fff"
            />
            {/* <Image
              style={{
                width: 35,
                height: 35,
                tintColor: '#fff',
              }}
              source={PropertyIcon}
            /> */}
            <Text style={{color: '#fff', fontSize: 10}}>Property</Text>

            {/* {props.activeTab !== 'Property' ? (
              <Text style={{color: '#fff', fontSize: 10}}>Property</Text>
            ) : null} */}
          </TouchableOpacity>
        </View>

        <View
          style={{
            // marginHorizontal: 8,
            // paddingHorizontal: 16,
            // backgroundColor: 'skyblue',
            flex: 1,
            // justifyContent: 'space-around',
            // paddingLeft: 10,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => {
              // navigation.navigate('Services');
              // props.setActiveTab('Services');
              NAVIGATION.navigate('Services');
            }}
            style={{
              // marginTop: props.activeTab === 'Services' ? 0 : 12,
              flex: 2,
              paddingVertical: 4,
              // paddingHorizontal: 14,
              paddingRight: 20,
              justifyContent: 'center',
              alignItems: 'flex-end',
              // paddingRight: 6,
            }}>
            <FontAwesome
              style={{marginHorizontal: 4}}
              name="cogs"
              size={props.activeTab === 'Services' ? 35 : 26}
              color="#fff"
            />
            {/* <Image
              style={{
                width: 35,
                height: 35,
                tintColor: '#fff',
              }}
              source={ServicesIcon}
            /> */}
            <Text
              style={{
                color: '#fff',
                fontSize: 10,
                textAlign: 'center',
                // backgroundColor: '#fff',
              }}>
              Services
            </Text>
            {/* {props.activeTab !== 'Services' ? (
              <Text
                style={{
                  color: '#fff',
                  fontSize: 10,
                  textAlign: 'center',
                  // backgroundColor: '#fff',
                }}>
                Services
              </Text>
            ) : null} */}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              NAVIGATION.navigate('Buy / Sell');
              // props.setActiveTab('Buy / Sell');
            }}
            style={{
              // marginTop: props.activeTab === 'Buy / Sell' ? 0 : 12,
              // backgroundColor: '#fff',
              flex: 1,
              // backgroundColor: 'gold',
              paddingVertical: 4,
              paddingHorizontal: 6,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FontAwesome5
              style={{marginHorizontal: 4}}
              name="hands-helping"
              size={props.activeTab === 'Buy / Sell' ? 35 : 26}
              color="#fff"
            />
            {/* <Image
              style={{
                width: 28,
                height: 28,
                tintColor: '#fff',
              }}
              source={BuySellIcon}
            /> */}
            {props.activeTab !== 'Buy / Sell' ? (
              <Text style={{color: '#fff', fontSize: 10}}>Buy / Sell</Text>
            ) : null}
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          height: 15,
          width: '100%',
          backgroundColor: '#fff',
          position: 'absolute',
          left: 0,

          borderBottomRightRadius: 60,
          borderBottomLeftRadius: 60,
          top: -5,
        }}
      />
      <TouchableOpacity
        onPress={() => {
          NAVIGATION.navigate('forum');
          // props.setActiveTab('Buy / Sell');
        }}
        style={{
          position: 'absolute',
          top: -35,

          height: 85,
          width: 85,
          // borderTopColor: 'transparent',
          alignSelf: 'center',
          borderWidth: 10,
          backgroundColor: '#CC0000',
          borderRadius: 50,
          borderColor: '#fff',
          //   paddingVertical: 4,
          //   paddingHorizontal: 6,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <MaterialCommunityIcons name="forum" size={40} color="#fff" />
        {/* <Image style={{width: 40, height: 40}} source={ForumIcon} /> */}
      </TouchableOpacity>
    </View>
  );
}

const mapStateToProps = state => {
  return {
    activeTab: state.tab_reducer.activeTab,
  };
};

const mapActionsToProps = dispatch => {
  return {
    setActiveTab: tab => dispatch(setActiveTab(tab)),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(CustomDTabBar);
