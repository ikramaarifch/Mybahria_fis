import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SliderBox} from 'react-native-image-slider-box';
import {GALLERY_SUB_LIST} from '../../../utils/URLS';
import {APIS} from '../../../utils/URLS/Urls';
import {useDispatch, useSelector, useStore} from 'react-redux';

function PictureCardSample(props) {
  // console.log(props,'Ye Picture card sample k props');
  const states = useSelector(state => state.ConstantReducer);
  const item = props.ITEM;
  const IMAGES_BASE_URL = 'https://mybahria.com.pk/assets/uploads/';

  const [visibility, setVisibility] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [currentItem, setCurrentItem] = useState('');
  const [currentItemImages, setCurrentItemImages] = useState([]);
  console.log(item.image, 'item.image');

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
          console.log(gallerypictures, 'id');
          setCurrentItemImages(gallerypictures);
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
    getAlbum(item.id);

    // console.log(currentItemImages,'gallerypictures');
  }, []);

  const visibilityHandler = async item => {
    if (item) {
      setCurrentItem(item);
      console.log(item, 'ITEM');
      // console.log('CURRENT ITEM', currentItem);
      // console.log('id', items);
      const data = await getAlbum(item.id);
      // if (data.length > 0) {
      //   const newDATA = currentItemImages.map(ele => {
      //     return IMAGES_BASE_URL + ele.image;
      //   });
      // console.log('NEW data', data);
      // }
      setTimeout(() => {
        setCurrentItemImages(data);
        console.log(data, 'DATA');
        setLoading(false);
        // console.log('NEW DATA', newDATA);
      }, 2500);
    }

    setVisibility(!visibility);
  };

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => visibilityHandler(item)}>
        <Image
          style={{height: 120, width: '100%'}}
          source={
            !item.image
              ? APIS.default_image
              : {uri: `${IMAGES_BASE_URL}${item.image}`}
          }
        />
        <Text style={styles.title}>{props.title}</Text>
      </TouchableOpacity>

      <Modal
        onRequestClose={() => visibilityHandler('')}
        animationType="slide"
        visible={visibility}>
        <View style={styles.iconsView}>
          {/* modal header  */}
          <TouchableOpacity
            onPress={() => visibilityHandler('')}
            style={{marginHorizontal: 8, alignSelf: 'center'}}>
            <Ionicons name="arrow-back-sharp" color="#fff" size={26} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{currentItem?.title}</Text>
          {/* <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              padding: 2,
              borderRadius: 5,
              alignSelf: 'center',
            }}></TouchableOpacity> */}
        </View>
        {/* modal header end */}

        <Image
          style={{
            width: '100%',
            height: '40%',
            alignSelf: 'center',
            margin: 16,
            marginTop: 0,
          }}
          source={{uri: `${IMAGES_BASE_URL}${currentItem?.image}`}}
        />
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="red"
            style={{marginVertical: 50}}
          />
        ) : currentItemImages?.length > 0 ? (
          (console.log(currentItemImages[0].image, 'CURRENT IMAGE'),
          (
            <SliderBox
              alignSelf="center"
              // style={{
              //   width: '80%',
              //   alignSelf: 'center',
              //   marginTop: '20%',
              //   elevation: 5,
              // }}
              parentWidth={Dimensions.get('window').width * 0.5}
              sliderBoxHeight={200}
              // autoPlayWithInterval={2500}
              dotColor="#CC0000"
              // circleLoop={true}
              // resizeMode="contain"
              // autoplay={true}
              resizeMethod={'resize'}
              resizeMode={'cover'}
              images={currentItemImages}
            />
          ))
        ) : (
          <Text
            style={{
              textAlign: 'center',
              color: 'red',
              textAlignVertical: 'center',
              fontStyle: 'italic',
              fontSize: 12,
              margin: 50,
            }}>
            NO ALBUME FOUND
          </Text>
        )}

        {/* <ScrollView
          horizontal={true}
          // style={{flex: 1, backgroundColor: 'skyblue'}}
        > */}
        {/* <FlatList
            horizontal
            data={props.imagesAlbum}
            renderItem={img => (
              <TouchableOpacity style={{marginHorizontal: 16}}>
                <Image style={{height: 100, width: 100}} source={img.item} />
              </TouchableOpacity>
            )}
          /> */}
        {/* </ScrollView> */}

        {/* <CardView /> */}
      </Modal>
    </View>
  );
}

const CardView = props => {
  const [CurrentImage, setCurrentImage] = useState('');
  const [CurrentImageTitle, setCurrentImageTitle] = useState('');
  const [visibility, setVisibility] = useState(false);
  const visibilityHandler = (image, title) => {
    setVisibility(!visibility);

    setCurrentImage(image);
    setCurrentImageTitle(title);
  };
  // const [Data, setData] = useState([
  //   {
  //     title: 'gallery-1',
  //     image: require('../../../Drawables/gallery-1.png'),
  //   },

  //   {
  //     title: 'gallery-2',
  //     image: require('../../../Drawables/gallery-2.png'),
  //   },

  //   {
  //     title: 'gallery-3',
  //     image: require('../../../Drawables/gallery-3.png'),
  //   },
  //   {
  //     title: 'gallery-1',
  //     image: require('../../../Drawables/gallery-1.png'),
  //   },
  //   {
  //     title: 'gallery-4',
  //     image: require('../../../Drawables/gallery-4.png'),
  //   },
  //   {
  //     title: 'gallery-6,gallery-6,gallery-6,gallery-6',
  //     image: require('../../../Drawables/gallery-6.png'),
  //   },
  //   {
  //     title: 'gallery-7',
  //     image: require('../../../Drawables/gallery-7.png'),
  //   },
  // ]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => visibilityHandler(item.image, item.title)}
        style={{...styles.card, height: 150}}>
        <Image style={{height: '80%', width: '100%'}} source={item.image} />
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={Data}
        renderItem={item => renderItem(item)}
        numColumns={2}
      />

      <Modal animationType="fade" visible={visibility}>
        <TouchableOpacity
          onPress={visibilityHandler}
          style={{
            padding: 4,
            alignItems: 'flex-end',
            paddingTop: 24,
            paddingHorizontal: 24,
            width: '100%',
            backgroundColor: '#000',
          }}>
          <FontAwesome5 name="times" color="#fff" size={26} />
        </TouchableOpacity>
        {/* modal header end */}
        <View
          style={{
            flex: 1,
            height: '100%',
            paddingVertical: 16,
            backgroundColor: '#000',
          }}>
          <View style={{...styles.card, backgroundColor: '#000'}}>
            <Image
              style={{height: '90%', width: '100%'}}
              source={CurrentImage}
            />
            <Text style={{...styles.title, fontWeight: 'bold', color: '#fff'}}>
              {CurrentImageTitle}
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PictureCardSample;
