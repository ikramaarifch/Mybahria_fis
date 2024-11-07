import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  Text,
  View,
  Dimensions,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

import Carousel, {Pagination, ParallaxImage} from 'react-native-snap-carousel';
import ProppertiesSample from './ProppertiesSample';
import {PROPERTIES} from './URLS';
import {APIS} from './URLS/Urls';
const {width, height} = Dimensions.get('window');

function PropertiesSlider(props) {
  const BASE_IMAGES_URL = APIS.image_base_url;
  const [activeDot, setActiveDot] = useState(0);

  // const allProperties = props.allProperties;
  const allProperties = props?.allProperties;
  const [isLoading, setLoading] = useState(true);
  const [updateData, setUpdataData] = useState([]);
  const [allProp, setAllProperties] = useState([]);
  const states = useSelector(state => state.ConstantReducer);
  const getAllProperties = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${states?.user_token}`);

      const response = await fetch(PROPERTIES, {
        headers: myHeaders,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      const {properties} = data;
      console.log('newzzzzzzzzzzzzzz', properties);
      setAllProperties(properties);
      setLoading(false);
      console.log('API ssdsdResponse:', properties);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  useEffect(() => {
    getAllProperties();

   /// console.log('updated', allProp);
  }, []);
 // console.log('allprop', allProp);
  const [data, setData] = useState([
    {
      title: 'Double Storley ',
      Location: 'Bahria Enclave',
      IMG: require('../Drawables/latest-2.png'),
      Purpose: 'Sale',
      Price: '10 Lac',
      Added: '6 days ago',
      Type: 'House',
      authorDetails: [
        {name: 'khan'},
        {email: '792tanveer@gmail.com'},
        {Auth_location: 'Karachi'},
      ],
      IMAGES: [
        require('../Drawables/gallery-1.png'),
        require('../Drawables/gallery-2.png'),
        require('../Drawables/gallery-3.png'),
        require('../Drawables/gallery-4.png'),
      ],
      House_Description:
        '15 Marla Brand New Double Unit House For Rent 5 Bedroom With Attached Washroom 2 Kitchen',
    },
    {
      title: 'Satelite 1 Canal building',
      Location: 'Phase 5',
      IMG: require('../Drawables/latest-2.png'),
      Purpose: 'Rent',
      Price: '1 Lac',
      Added: '6 days ago',
      Type: 'Appartment',
      authorDetails: [
        {name: 'khan'},
        {email: '792tanveer@gmail.com'},
        {Auth_location: 'Karachi'},
      ],
      IMAGES: [
        require('../Drawables/gallery-1.png'),
        require('../Drawables/gallery-2.png'),
        require('../Drawables/gallery-3.png'),
        require('../Drawables/gallery-4.png'),
      ],
      House_Description:
        '15 Marla Brand New Double Unit House For Rent 5 Bedroom With Attached Washroom 2 Kitchen',
    },

    {
      title: 'Double Storley Askari Villlas',
      Location: 'Bahria Enclave',
      IMG: require('../Drawables/latest-2.png'),
      Purpose: 'Sale',
      Price: '10 Lac',
      Added: '6 days ago',
      Type: 'House',
      authorDetails: [
        {name: 'khan'},
        {email: '792tanveer@gmail.com'},
        {Auth_location: 'Karachi'},
      ],
      IMAGES: [
        require('../Drawables/gallery-1.png'),
        require('../Drawables/gallery-2.png'),
        require('../Drawables/gallery-3.png'),
        require('../Drawables/gallery-4.png'),
      ],
      House_Description:
        '15 Marla Brand New Double Unit House For Rent 5 Bedroom With Attached Washroom 2 Kitchen',
    },
  ]);
  const renderNewsItem = ({item, index}) => {
    return (
      <ProppertiesSample
        ITEM={item}
        navigation={props.navigation}
        // title={item.title}
        // Location={item.Location}
        // IMG={item.IMG}
        // Purpose={item.Purpose}
        // Price={item.Price}
        // Added={item.Added}
        // Type={item.Type}
        // House_Description={item.House_Description}
        // IMAGES={item.IMAGES}
        // authorDetails={item.authorDetails}
      />
    );
  };

  // isLoading ? (
  //   <ActivityIndicator size="large" color="red" style={{marginVertical: 50}} />
  // ) :
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',

        justifyContent: 'center',

        alignItems: 'center',
        // paddingHorizontal: 15,
      }}>
      <Carousel
        layout={'default'}
        // ref={ref => (this.carousel = ref)}
        data={allProp}
        sliderWidth={width}
        itemWidth={width}
        // sliderHeight={200}
        renderItem={item => renderNewsItem(item)}
        onSnapToItem={index => setActiveDot(index)}
        loop={true}
        autoplay={true}
        // autoplayInterval={1000}
        keyExtractor={(item, index) => index.toString()}
        // snapToAlignment="center"
        snapToInterval={width}
        // enableMomentum={false}
      />
      <Pagination
        dotsLength={allProperties?.length}
        activeDotIndex={activeDot}
        containerStyle={{paddingVertical: 4}}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 50,
          backgroundColor: '#00B106',
        }}
        inactiveDotStyle={{
          backgroundColor: '#AAA5A5',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
}

export default PropertiesSlider;
