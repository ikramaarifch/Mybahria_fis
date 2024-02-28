import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  SafeAreaView,
  Animated,
} from 'react-native';
import CustomHeader from '../CustomHeader/CustomHeader';
import {TextInput} from 'react-native-paper';
import Collapsible from 'react-native-collapsible';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {cameraPickCover, requestPermission} from '../../utils/CameraUtil';
import {Picker} from '@react-native-picker/picker';
import CustomButton from '../../utils/CustomButton';
import OneTapCard from '../../utils/OneTapCard';
import DrawerItemSample from '../../utils/DrawerItemSample';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import CollapsibleComponents from '../OverlayScreens/CollapsibleComponents';
import {CardFour, CardTwo, CustomTitle} from '../Dashboard/DashboadComponents';
import NewsSlider_2 from '../../utils/NewsSlider_2';
import PropertiesSlider from '../../utils/PropertiesSlider';
// const d = {HEIGHT: 45, WIDTH: 45};
const newDimensions = {
  HEIHGT: 30,
  WIDTH: 50,
};

function AboutBahria(props) {
  const [on, setOn] = useState(false);
  const [seleteced, setSelected] = useState('Home');
  const offSetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeBtn = useRef(new Animated.Value(0)).current;

  const [image, setImage] = useState('');
  const [isCollapsed, setisCollapsed] = useState(true);
  const [CollapsibleButton, setCollapsibleButton] = useState('chevron-down');

  const playImage = require('../../Drawables/newIcons/play.png');
  const hammerImage = require('../../Drawables/newIcons/hammer.png');
  const servicesImage = require('../../Drawables/newIcons/services-icon.png');
  const plusImage = require('../../Drawables/newIcons/plus.png');

  const utensilsImage = require('../../Drawables/newIcons/utensils.png');
  const rulerImage = require('../../Drawables/newIcons/ruler.png');
  const gymImage = require('../../Drawables/newIcons/gym-dumble.png');
  const gamepadImage = require('../../Drawables/newIcons/metro-gamepad.png');

  const DEFAULT_IMAGE = require('../../Drawables/profile_pic.png');

  const constUplaodImage = async () => {
    const IMAGE = await cameraPickCover();
    console.log('clicked');
    setImage(IMAGE.path);
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
  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <CustomHeader title="About" navigation={props.navigation} /> */}
      {/* <Text>About</Text> */}

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

            source={image === '' ? DEFAULT_IMAGE : {uri: image}}
            // source={DEFAULT_IMAGE}
          />
          <TouchableOpacity
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
          </TouchableOpacity>
          <Text
            style={{
              color: '#fff',
              paddingVertical: 8,
              fontSize: 14,
              fontWeight: 'bold',
            }}>
            @username
          </Text>
        </View>

        <View style={{width: '50%', flexGrow: 1}}>
          <TouchableOpacity
            onPress={() => {
              setSelected('Home');
              setOn(false);
              PlayAnimation();
            }}>
            <DrawerItemSample name="home" lable="Home" selected={seleteced} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setSelected('Directory');
              setOn(false);
              PlayAnimation();
            }}>
            <DrawerItemSample
              name="cogs"
              lable="Directory"
              selected={seleteced}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelected('Jobs');
              setOn(false);
              PlayAnimation();
            }}>
            <DrawerItemSample
              name="briefcase"
              lable="Jobs"
              selected={seleteced}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setSelected('Gallery');
              setOn(false);
              PlayAnimation();
            }}>
            <DrawerItemSample
              name="photo-video"
              lable="Gallery"
              selected={seleteced}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelected('Blog');
              setOn(false);
              PlayAnimation();
            }}>
            <DrawerItemSample name="blog" lable="Blog" selected={seleteced} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelected('News');
              setOn(false);
              PlayAnimation();
            }}>
            <DrawerItemSample
              name="newspaper"
              lable="News"
              selected={seleteced}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelected('Contact');
              setOn(false);
              PlayAnimation();
            }}>
            <DrawerItemSample
              name="phone-alt"
              lable="Contact"
              selected={seleteced}
            />
          </TouchableOpacity>

          <View style={{marginVertical: 10}}>
            <Text style={{color: 'yellow', fontWeight: 'bold', fontSize: 16}}>
              My Account
            </Text>
            <TouchableOpacity
              onPress={() => {
                setSelected('Edit Profile');
                setOn(false);
                PlayAnimation();
              }}>
              <DrawerItemSample
                name="edit"
                lable="Edit Profile"
                selected={seleteced}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelected('Resgister Your Business');
                setOn(false);
                PlayAnimation();
              }}>
              <DrawerItemSample
                name="business-time"
                lable="Resgister Your Business"
                selected={seleteced}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelected('Manage Sell / Purchase');
                setOn(false);
                PlayAnimation();
              }}>
              <DrawerItemSample
                name="photo-video"
                lable="Manage Sell / Purchase"
                selected={seleteced}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{width: '50%'}}>
          <TouchableOpacity
            onPress={() => {
              // setSelected();
              setOn(false);
              PlayAnimation();
            }}>
            <DrawerItemSample name="sign-out-alt" lable="SignOut" />
          </TouchableOpacity>
        </View>
      </View>

      <Animated.View
        style={{
          // justifyContent: 'center',
          // alignItems: on ? 'flex-end' : 'flex-start',
          position: 'absolute',
          top: 0,
          paddingVertical: 7,
          borderRadius: on ? 15 : 0,
          elevation: 10,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#fff',
          transform: [
            {
              scale: scaleValue,
            },
            {translateX: offSetValue},
          ],
        }}>
        <View
          style={{
            flexDirection: 'row',
            height: 55,
            borderTopLeftRadius: on ? 15 : 0,

            backgroundColor: 'transparent',

            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
          }}>
          {console.log({on})}
          <Image
            style={{
              height: 42,
              width: 42,
              borderWidth: 2,
              borderRadius: 50,
              borderColor: 'firebrick',
            }}
            source={image === '' ? DEFAULT_IMAGE : {uri: image}}
          />
          <View style={{flex: 1, marginHorizontal: 8}}>
            <Text style={{fontWeight: 'bold'}}>792@username</Text>
            <Text style={{fontSize: 10}}>last login : 0912</Text>
          </View>
          <View
            style={{
              flex: 0.5,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity style={{marginHorizontal: 4}}>
              <Image
                style={{height: 25, width: 25}}
                source={require('../../Drawables/newIcons/emergency_icon.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={{height: 25, width: 25}}
                source={require('../../Drawables/newIcons/notification_icon.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (!on) {
                  setOn(true);
                  PlayAnimation();
                }
              }}>
              <Image
                style={{height: 32, width: 32}}
                source={require('../../Drawables/newIcons/menu.png')}
              />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView>
          <TouchableWithoutFeedback
            onPress={() => {
              if (on) {
                setOn(false);
                PlayAnimation();
              }
            }}>
            <View
              style={{
                borderBottomLeftRadius: on ? 15 : 0,
                flexGrow: 1,

                height: '100%',
              }}>
              <View
                style={{
                  marginVertical: 20,
                  // height: 120,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  // maxHeight: 350,
                  width: '95%',
                }}>
                <View
                  style={{
                    marginVertical: 8,
                    paddingTop: 8,
                    width: '95%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 4,
                    borderWidth: 0.5,
                    borderColor: '#fff',
                    backgroundColor: '#fff',
                    elevation: 10,
                  }}>
                  <View>
                    <View
                      style={{
                        paddingVertical: 8,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 8,
                        width: '100%',
                        justifyContent: 'space-evenly',
                      }}>
                      <OneTapCard
                        IMAGE={plusImage}
                        TITLE="Health Care"
                        bgColor="#cc0000"
                        imageDimensions={{HEIHGT: 22, WIDTH: 22}}
                      />
                      <OneTapCard
                        IMAGE={playImage}
                        TITLE="Entertainment"
                        bgColor="#cc0000"
                        imageDimensions={{HEIHGT: 22, WIDTH: 22}}
                      />

                      <OneTapCard
                        IMAGE={servicesImage}
                        TITLE="Services"
                        bgColor="#cc0000"
                        imageDimensions={{HEIHGT: 22, WIDTH: 22}}
                      />
                      <OneTapCard
                        IMAGE={hammerImage}
                        TITLE="Constructions"
                        bgColor="#cc0000"
                        imageDimensions={{HEIHGT: 22, WIDTH: 22}}
                      />
                    </View>
                    <View
                      style={{
                        paddingVertical: 8,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 8,
                        width: '100%',
                        justifyContent: 'space-evenly',
                      }}>
                      <OneTapCard
                        IMAGE={gymImage}
                        TITLE="Gym"
                        bgColor="#cc0000"
                        imageDimensions={{HEIHGT: 22, WIDTH: 22}}
                      />
                      <OneTapCard
                        IMAGE={utensilsImage}
                        TITLE="Catering"
                        bgColor="#cc0000"
                        imageDimensions={{HEIHGT: 22, WIDTH: 22}}
                      />

                      <OneTapCard
                        IMAGE={rulerImage}
                        TITLE="Wood Work"
                        bgColor="#cc0000"
                        imageDimensions={{HEIHGT: 22, WIDTH: 22}}
                      />
                      <OneTapCard
                        IMAGE={gamepadImage}
                        TITLE="Gaming Zone"
                        bgColor="#cc0000"
                        imageDimensions={{HEIHGT: 15, WIDTH: 22}}
                      />
                    </View>

                    <Collapsible collapsed={isCollapsed}>
                      <CollapsibleComponents />
                    </Collapsible>
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    bottom: -8,
                    elevation: 10,
                    backgroundColor: '#fff',
                    paddingTop: 12,
                    paddingBottom: 4,
                    paddingHorizontal: 8,
                    borderRadius: 50,
                    // borderColor: 'gray',
                    // borderBottomWidth: 1,

                    // borderLeftWidth: 1,
                    // borderTopWidth: 1,
                    // borderTopColor: '#fff',
                    // borderRightWidth: 1,
                  }}
                  onPress={() => {
                    setisCollapsed(!isCollapsed);
                    CollapsibleButton == 'chevron-down'
                      ? setCollapsibleButton('chevron-up')
                      : setCollapsibleButton('chevron-down');
                  }}>
                  <FontAwesome name={CollapsibleButton} color="red" size={18} />
                </TouchableOpacity>
              </View>

              {/* {Featured Section} */}
              {/* <CardTwo navigation={props.navigation} /> */}
              <View
                style={{
                  // height: 200,
                  // borderRadius: 8,

                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 8,
                  marginVertical: 8,
                  justifyContent: 'space-evenly',

                  width: '90%',
                  alignSelf: 'center',

                  // alignItems: 'center',
                  // justifyContent: 'center',
                }}>
                <View
                  style={{
                    flex: 1,
                    marginBottom: 10,
                    // paddingHorizontal: 50,
                    // backgroundColor: 'red',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <CustomTitle title="Latest News" />
                  <NewsSlider_2 />
                </View>

                <View style={{flex: 1}}>
                  <CustomTitle title="Property in Bahria" />
                  <PropertiesSlider />
                </View>

                {/* <NewsSlider /> */}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
export default AboutBahria;
