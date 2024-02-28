import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';

import {GALLERY_LIST} from '../../utils/URLS';
import {APIS} from '../../utils/URLS/Urls';
import CustomHeader from '../CustomHeader/CustomHeader';
import PictureCardSample from './PictureCardSample/PictureCardSample';
import styles from './styles';
import {useDispatch, useSelector, useStore} from 'react-redux';

const IMAGES_BASE_URL = 'http://mybahria.assanhissab.com/assets/uploads/';
function Gallery({navigation}) {
  const states = useSelector(state => state.ConstantReducer);
  const [imagesList, setImagesList] = useState([]);
  const [Loading, setLoading] = useState(false);
  const getAllAlbums = async () => {
    await fetch(APIS.get_gallery_list, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + states.user_token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(({all_albums}) => {
        setImagesList(all_albums);
      })
      .catch(error => {
        return console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(async () => {
    setLoading(true);
    await getAllAlbums();
  }, []);

  const renderItem = ({item}) => {
    return (
      // <PictureCardSample
      //   ITEM={item}
      //   title={!item.title ? 'Undefined Title' : item.title}
      //   image={item.image}
      //   // imagesAlbum={!item.imagesAlbum ? APIS.default_image : item.imagesAlbum}
      // />
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={{
            flex: 1,
            marginVertical: 8,
            marginHorizontal: 8,
            backgroundColor: '#fff',
            elevation: 12,
            borderRadius: 4,
          }}
          onPress={() => {
            navigation.navigate('GalleryPreview', {
              itemId: item.id,
              title: item.title,
            });
          }}>
          <Image
            style={{height: 120, width: '100%'}}
            source={
              !item.image
                ? APIS.default_image
                : {uri: `${IMAGES_BASE_URL}${item.image}`}
            }
          />
          <Text
            style={{
              paddingHorizontal: 4,
              paddingVertical: 8,
              textAlign: 'center',
              fontSize: 12,
              // fontWeight: 'bold',
            }}>
            {item.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.body}>
      {/* <CustomHeader title="Albums" navigation={props.navigation} /> */}
      {Loading ? (
        <ActivityIndicator
          style={{alignSelf: 'center', marginTop: 150}}
          size="large"
          color="firebrick"
        />
      ) : (
        <FlatList
          data={imagesList}
          renderItem={item => renderItem(item)}
          numColumns={2}
        />
      )}
    </View>
  );
}

export default Gallery;
