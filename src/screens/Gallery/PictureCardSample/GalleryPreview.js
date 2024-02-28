import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {APIS} from '../../../utils/URLS/Urls';
import {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
const {width, height} = Dimensions.get('window');
import Carousel, {Pagination, ParallaxImage} from 'react-native-snap-carousel';
import {useDispatch, useSelector, useStore} from 'react-redux';
const GalleryPreview = ({route, navigation}) => {
  const states = useSelector(state => state.ConstantReducer);

  const [activeDot, setActiveDot] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [currentItem, setCurrentItem] = useState('');
  const {itemId, title} = route.params;

  const getAlbum = async id => {
    console.log(id);
    await fetch(`${APIS.post_gallery_detail}`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + states.user_token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then(res => res.json())
      .then(
        ({gallerypictures}) => {
          setCurrentItem(gallerypictures);
        },
        // gallerypictures.map(ele => {
        //   return IMAGES_BASE_URL + ele.image;
        // }),
      )
      .catch(error => {
        return console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(async () => {
    setLoading(true);
    getAlbum(itemId);

    // console.log(currentItemImages,'gallerypictures');
  }, []);
  const renderNewsItem = ({item, index}) => {
    return (
      <View
        style={{
          marginVertical: 8,
          borderRadius: 8,
          width: '90%',
          alignSelf: 'center',
          elevation: 5,
          paddingVertical: 8,
          flexDirection: 'row',
          backgroundColor: '#fff',
          marginHorizontal: 16,
          paddingHorizontal: 11,
        }}>
        <View>
          {item.image === null ? (
            <Image
              style={{height: 90, width: 65, borderRadius: 4}}
              source={APIS.default_image}
            />
          ) : (
            <Image
              style={{height: 200, width: width / 1.2, borderRadius: 4}}
              source={{
                uri: `${APIS.image_base_url}${item.image}`,
              }}
            />
          )}

          <Text
            style={{
              width: '100%',
              textAlign: 'center',
              // paddingVertical: 2,
              paddingVertical: 6,
              backgroundColor: '#cc0000',
              opacity: 0.8,
              position: 'absolute',
              bottom: 10,
              right: 0,
              left: 0,
              textAlignVertical: 'center',
              color: '#fff',
              fontSize: 10,
              fontWeight: 'bold',
            }}>
            {item.title}
          </Text>
        </View>
      </View>
    );
  };
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
