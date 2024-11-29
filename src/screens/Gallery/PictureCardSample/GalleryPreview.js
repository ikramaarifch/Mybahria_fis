import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { useSelector } from 'react-redux';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/AntDesign';
import { APIS } from '../../../utils/URLS/Urls';

const { width } = Dimensions.get('window');

const GalleryPreview = ({ route, navigation }) => {
  const { itemId, title } = route.params || {};
  const states = useSelector(state => state.ConstantReducer);

  const [currentItem, setCurrentItem] = useState([]);
  const [activeDot, setActiveDot] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch album data
  const fetchAlbum = async id => {
    try {
      const response = await fetch(`${APIS.post_gallery_detail}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${states.user_token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      setCurrentItem(data.gallerypictures || []);
    } catch (error) {
      console.error('Error fetching album:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect with async function inside
  useEffect(() => {
    const loadAlbum = async () => {
      setIsLoading(true);
      await fetchAlbum(itemId);
    };

    loadAlbum();
  }, [itemId]);

  const renderNewsItem = ({ item }) => (
    <View
      style={{
        marginVertical: 8,
        borderRadius: 8,
        width: '90%',
        alignSelf: 'center',
        elevation: 5,
        backgroundColor: '#fff',
      }}
    >
      <Image
        style={{
          height: 200,
          width: width / 1.2,
          borderRadius: 4,
        }}
        source={{
          uri: item.image
            ? `${APIS.image_base_url}${item.image}`
            : APIS.default_image,
        }}
      />
      <Text
        style={{
          textAlign: 'center',
          color: '#fff',
          backgroundColor: '#cc0000',
          paddingVertical: 6,
          fontWeight: 'bold',
          position: 'absolute',
          bottom: 10,
          left: 0,
          right: 0,
        }}
      >
        {item.title || 'No Title Available'}
      </Text>
    </View>
  );
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',

        // paddingHorizontal: 15,
      }}>
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
            navigation.goBack();
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
          {title}
        </Text>
      </View>
      {currentItem.length > 0 ? (
        <>
          <Carousel
            layout={'default'}
            // ref={ref => (this.carousel = ref)}
            data={currentItem}
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
            dotsLength={currentItem?.length}
            activeDotIndex={activeDot}
            containerStyle={{paddingVertical: 4, top: '-120%'}}
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
        </>
      ) : (
        <Text style={{color: 'red', alignSelf: 'center'}}>No Album Found</Text>
      )}
    </View>
  );
};

export default GalleryPreview;
