import React, {useState, useEffect, useRef, useReducer} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Animated,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import NewsSlider_2 from '../../utils/NewsSlider_2';
import PropertiesSlider from '../../utils/PropertiesSlider';
import CollapsibleComponents from '../OverlayScreens/CollapsibleComponents';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Collapsible from 'react-native-collapsible';

import {CustomTitle} from './DashboadComponents';

import styles from './styles';
import DrawerItemSample from '../../utils/DrawerItemSample';
import OneTapCard from '../../utils/OneTapCard';
import {cameraPickCover} from '../../utils/CameraUtil';
import CustomDTabBar from '../../utils/CustomDTabBar';
import StackHeader from '../../utils/StackHeader';
import {PROPERTIES} from '../../utils/URLS';
import {APIS, news_image_base_url} from '../../utils/URLS/Urls';
import {
  ConstantReducer,
  constant_initialstate,
} from '../../redux/Reducers/Constant.reducer';
import {store} from '../../redux/store';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {BackHandler} from 'react-native';
import {Alert} from 'react-native';
import Buy_sellSlider from '../../utils/Buy_sellSlider';
// import GenericTouchable from 'react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable';

const newDimensions = {
  HEIHGT: 30,
  WIDTH: 50,
};

function Home(props) {
  const NAVIGATIONS = props.navigation;

  // const [user_token] = useReducer(ConstantReducer);
  const dispatch = useDispatch();
  const {user_token} = useSelector(state => state.ConstantReducer);
  console.log('State in Constant reducers', user_token);

  const [Loading, setLoading] = useState(true);
  const [IMAGE_PATH, setIMAGE_PATH] = useState('');

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

  const [allNews, setAllNews] = useState([]);
  const [i, setI] = useState(0);
  const [allProperties, setAllPropperties] = useState([]);
  const [newUpdateData, setNewsUpdataData] = useState([]);
  const [propertyUpdateData, setPropertyUpdataData] = useState([]);
  const [allBuy_Sell, setAllBuy_Sell] = useState([]);


  const getAllNews = async () => {
    const DATA = await fetch(APIS.get_hot_news_list, {
      headers: {
        Authorization: 'Bearer ' + user_token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      // .then(res => res)
      .then(({hot_news}) => {
        return {hot_news};
      })
      .catch(error => {
        return console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });

    // console.log('DATA', DATA);
    return DATA;
  };
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Exit App', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Exit',
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);



  const getBuyandSell = async () => {
    const DATA = await fetch(APIS.get_buy_Sell, {
      headers: {
        Authorization: 'Bearer ' + user_token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(({ bahria_sells }) => {
        console.log('Fetched Buy & Sell data:', bahria_sells);
        setAllBuy_Sell(bahria_sells); // Setting state here
        return { bahria_sells };
      })
      .catch(error => {
        console.error('Error fetching buy/sell data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
    return DATA;
  };
  
  

  
  const getAllProperties = async () => {
    const DATA = await fetch(APIS.get_hot_properties_list, {
      headers: {
        Authorization: 'Bearer ' + user_token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      // .then(res => res)
      .then(({properties}) => {
        console.log(properties, 'homeproperties');
        return {properties};
      })
      .catch(error => {
        return console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });

    // console.log('DATA', DATA);
    return DATA;
  };

  // const updateStates = async () => {
  //   // just uncomment all

  //   // const news_len = Math.ceil(
  //   //   allNews.length === undefined ? 0 : allNews.length / 2,
  //   // );
  //   // const newsHalfData = allNews.slice(0, news_len);
  //   // setNewsUpdataData(newsHalfData);
  //   // setNewsUpdataData([]);

  //   // const pro_len = Math.ceil(
  //   //   allProperties.length === undefined ? 0 : allProperties.length / 2,
  //   // );
  //   // const propertyHalfData = allProperties.slice(0, pro_len);
  //   // setPropertyUpdataData(propertyHalfData);
  //   // setPropertyUpdataData([]);
  // };

  // useEffect(
    
  //   async () => {
  //   const {hot_news} = await getAllNews();
  //   const {properties} = await getAllProperties();

  //   setAllNews(hot_news);
  //   setAllPropperties(properties);

  //   setTimeout(() => {}, 500);
  // }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { hot_news } = await getAllNews();
        const { properties } = await getAllProperties();
        const { bahria_sells  } = await getBuyandSell();

  
        setAllNews(hot_news);
        setAllPropperties(properties);
        setAllBuy_Sell(bahria_sells );
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle the error appropriately, e.g., display an error message
      } finally {
        // If you want to add a delay before setting loading to false, you can use setTimeout
        setTimeout(() => {
          // setLoading(false);
        }, 500);
      }
    };
  
    fetchData();
  
    // Optionally, if you need cleanup logic, return a function from useEffect
    // return () => {
    //   // cleanup logic here
    // };
  }, []);
  
  return (
    <TouchableWithoutFeedback
      style={{zIndex: 1, backgroundColor: 'red', flex: 1, elevation: 10}}
      onPress={props.closeDrawer}>
      <SafeAreaView style={{flex: 1}}>
        <StackHeader
          openDrawer={props.openDrawer}
          navigation={props.navigation}
        />
        {Loading ? (
          <ActivityIndicator
            style={{alignSelf: 'center', marginTop: 150}}
            size="large"
            color="firebrick"
          />
        ) : (
          <ScrollView>
            <View
              style={{
                marginBottom: 100,
                // borderBottomLeftRadius: on ? 15 : 0,
                // flexGrow: 1,
                borderRadius: 4,
                // marginBottom: 100,
                backgroundColor: '#fff',
                // height: '100%',
              }}>
              <View
                style={{
                  // marginVertical: 20,
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
                  <View style={{flex: 1}}>
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
                        sendRequest="CardOneComponent"
                        navigation={props.navigation}
                        IMAGE={plusImage}
                        TITLE="Health Care"
                        bgColor="#CC0000"
                        imageDimensions={{HEIHGT: 22, WIDTH: 22}}
                      />
                      <OneTapCard
                        sendRequest="CardOneComponent"
                        navigation={props.navigation}
                        IMAGE={playImage}
                        TITLE="Entertainment"
                        bgColor="#CC0000"
                        imageDimensions={{HEIHGT: 22, WIDTH: 22}}
                      />

                      <OneTapCard
                        sendRequest="CardOneComponent"
                        navigation={props.navigation}
                        IMAGE={servicesImage}
                        TITLE="Services"
                        bgColor="#CC0000"
                        imageDimensions={{HEIHGT: 22, WIDTH: 22}}
                      />
                      <OneTapCard
                        sendRequest="CardOneComponent"
                        navigation={props.navigation}
                        IMAGE={hammerImage}
                        TITLE="Construction"
                        bgColor="#CC0000"
                        imageDimensions={{HEIHGT: 22, WIDTH: 22}}
                      />
                    </View>
                    {/* <View
                      style={{
                        paddingVertical: 8,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 8,
                        width: '100%',
                        justifyContent: 'space-evenly',
                      }}>
                      <OneTapCard
                        sendRequest="CardOneComponent"
                        navigation={props.navigation}
                        IMAGE={gymImage}
                        TITLE="Gym"
                        bgColor="#CC0000"
                        imageDimensions={{HEIHGT: 22, WIDTH: 22}}
                      />
                      <OneTapCard
                        sendRequest="CardOneComponent"
                        navigation={props.navigation}
                        IMAGE={utensilsImage}
                        TITLE="Catering"
                        bgColor="#CC0000"
                        imageDimensions={{HEIHGT: 22, WIDTH: 22}}
                      />

                      <OneTapCard
                        sendRequest="CardOneComponent"
                        navigation={props.navigation}
                        IMAGE={rulerImage}
                        TITLE="Wood Work"
                        bgColor="#CC0000"
                        imageDimensions={{HEIHGT: 22, WIDTH: 22}}
                      />
                      <OneTapCard
                        sendRequest="CardOneComponent"
                        navigation={props.navigation}
                        IMAGE={gamepadImage}
                        TITLE="Gaming Zone"
                        bgColor="#CC0000"
                        imageDimensions={{HEIHGT: 15, WIDTH: 22}}
                      />
                    </View> */}

                    <Collapsible collapsed={isCollapsed}>
                      <CollapsibleComponents navigation={props.navigation} />
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

                  justifyContent: 'space-evenly',

                  width: '90%',
                  alignSelf: 'center',

                  // alignItems: 'center',
                  // justifyContent: 'center',
                }}>
                <View
                  style={{
                    flex: 1,

                    // marginBottom: 5,

                    width: '100%',
                  }}>
                  <View>
                    <CustomTitle title="Latest News" />
                  </View>

                  <NewsSlider_2
                    allNews={allNews}
                    navigation={props.navigation}
                  />
                </View>

                <View
                  style={{
                    flex: 1,
                    // marginBottom: 5,
                    width: '100%',
                  }}>
                  <View>
                    <CustomTitle title="Property in Bahria" />
                  </View>
                  <PropertiesSlider
                    allProperties={allProperties}
                    navigation={props.navigation}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    // marginBottom: 20,
                    width: '100%',
                  }}>
                  <View>
                    <CustomTitle title="Buy & Sell" />
                  </View>
                  <Buy_sellSlider
                    allProperties={allBuy_Sell}
                    navigation={props.navigation}
                  />
                </View>

                {/* <NewsSlider /> */}
              </View>
            </View>
          </ScrollView>
        )}
        <View
          style={{
            width: '100%',
            backgroundColor: 'firebrick',
            // borderBottomLeftRadius: 15,
            // borderBottomLeftRadius: 15,St
            position: 'absolute',
            bottom: 0,
            // alignSelf: 'center',
          }}>
          <CustomDTabBar PROPS={NAVIGATIONS} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default Home;
