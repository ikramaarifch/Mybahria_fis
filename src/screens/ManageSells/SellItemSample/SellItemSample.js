import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';

import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ManageItemSample from '../ManageItemSample/ManageItemSample';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {APIS} from '../../../utils/URLS/Urls';

function SellItemSample(props) {
  const item = props.item;
  const category = props.category;
  const id = props.id;
  const rs = props.rs;
  const des = props.des;
  const statue = props.statue;
  const image = props.image;
  // const onEditPress = props.onEditPress;

  const [visible, setVisible] = useState(false);

  const visibilityHandler = () => {
    setVisible(!visible);
  };

  const deleteItem = () => {
    Alert.alert('Delete Item', 'Are you sure to delete this item?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'DELETE', onPress: () => console.log('Item DELETED Successfully')},
    ]);
  };
  return (
    <View style={styles.body}>
      {image === null ? (
        <Image
          style={{height: 100, width: 75, borderRadius: 5}}
          source={require('../../../Drawables/gallery-1.png')}
        />
      ) : (
        <Image
          style={{height: 100, width: 75, borderRadius: 5}}
          source={{uri: APIS.image_base_url + image}}
        />
      )}

      <View style={styles.detailsSections}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
          }}>
          <Text style={styles.ItemTitleStyle}>{item}</Text>
          <Text style={{...styles.ItemTitleStyle, paddingHorizontal: 4}}>
            -
          </Text>
          <Text style={{...styles.ItemCategoryStyle, fontWeight: 'bold'}}>
            {category}
          </Text>
        </View>
        <Text
          style={{
            ...styles.ItemCategoryStyle,
            color:
              statue === 'draft' || statue === 'Draft' ? '#cc0000' : 'green',
            fontWeight:
              statue === 'draft' || statue === 'Draft' ? null : 'bold',
          }}>
          {statue}
        </Text>
        <Text style={{...styles.ItemCategoryStyle, paddingVertical: 6}}>
          Rs. {rs}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            width: 50,

            justifyContent: 'space-between',
            // alignSelf: 'flex-start',
            alignItems: 'center',
            paddingVertical: 4,
            marginVertical: 4,
          }}>
          <TouchableOpacity onPress={visibilityHandler}>
            <FontAwesome name="edit" color="firebrick" size={18} />
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={deleteItem}>
            <AntDesign name="delete" color="firebrick" size={18} />
          </TouchableOpacity> */}
        </View>
      </View>

      <Modal animationType="slide" visible={visible}>
        <View style={styles.iconsView}>
          <TouchableOpacity
            onPress={visibilityHandler}
            style={{padding: 4, alignSelf: 'center'}}>
            <Ionicons name="arrow-back" color="#fff" size={20} />
          </TouchableOpacity>
          <Text style={styles.title}>Update Item</Text>
        </View>

        <ManageItemSample
          item={item}
          category={category}
          rs={rs}
          id={id}
          des={des}
          sendReq="update"
        />
      </Modal>
    </View>
  );
}

export default SellItemSample;
