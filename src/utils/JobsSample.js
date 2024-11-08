import React, {useEffect, useState} from 'react';
import HTMLView from 'react-native-htmlview';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import RenderHTML from 'react-native-render-html';

function JobsSample(props) {
  const IMAGES_BASE_URL = 'https://mybahria.com.pk/public/assets/uploads/';
  const ITEM = props.item;
  console.log('props:', ITEM);
  const [modalVisibility, setModalVisibility] = useState(false);
  const MODAL_HANDLER = () => {
    setModalVisibility(!modalVisibility);
    console.log(modalVisibility);
  };

  const [data, setData] = useState(null);
  

  useEffect(() => {
    setData(ITEM);
  })
  return (
    <TouchableOpacity onPress={MODAL_HANDLER} style={styles.body}>
      <View style={styles.innerView}>
        <Text numberOfLines={2} style={styles.title}>
          {ITEM.title}
        </Text>
        <Text numberOfLines={2} style={styles.description}>
          {ITEM.company_name}
        </Text>
      </View>
      <Image
        style={{height: 80, width: 80}}
        source={{uri: `${IMAGES_BASE_URL}${ITEM.image}`}}
      />

      <MODAL_VIEW
        ITEM={ITEM}
        IMAGES_BASE_URL={IMAGES_BASE_URL}
        modalVisibility={modalVisibility}
        MODAL_HANDLER={MODAL_HANDLER}
      />
    </TouchableOpacity>
  );
}

function MODAL_VIEW(props) {
  const contentWidth = Dimensions.get('window').width;
  const ITEM = props.ITEM;
  return (
    <Modal
      // height={}
      onRequestClose={props.MODAL_HANDLER}
      transparent={true}
      //   backgroundColor="grey"
      animationType="slide"
      visible={props.modalVisibility}>
      <View style={styles.modal}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            alignItems: 'center',
            borderBottomWidth: 0.5,
            // elevation: 5,
            // backgroundColor: '#fff',
            borderColor: 'gray',
            paddingBottom: 8,
          }}>
          <Text style={styles.title}>{ITEM.title}</Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              // position: 'absolute',
              // top: 8,
              // right: 8,
              borderRadius: 100,
              borderColor: 'gray',
              // borderBottomLeftRadius: 24,
              width: 25,
              // paddingBottom: 12,
              height: 25,
              borderWidth: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
              // elevation: 10,
            }}
            onPress={props.MODAL_HANDLER}>
            <FontAwesome name="times" color="#cc0000" size={14} />
          </TouchableOpacity>
        </View>
        <Image
          style={{
            marginVertical: 16,
            height: 180,
            width: '95%',
            borderRadius: 4,
            alignSelf: 'center',
          }}
          source={{uri: `${props.IMAGES_BASE_URL}${ITEM.image}`}}
        />

        <View style={{paddingHorizontal: 16}}>
          <Text numberOfLines={2} style={styles.title}>
            {ITEM.company_name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 4,
              width: '100%',
            }}>
            <FontAwesome
              style={{alignSelf: 'flex-start'}}
              name="map-marker"
              color="#cc0000"
              size={12}
            />
            <Text
              // numberOfLines={2s}
              style={{...styles.description, marginTop: 0, color: '#000'}}>
              Locations : {ITEM.address}
            </Text>
          </View>
          {/* <Text
            numberOfLines={2}
            style={{...styles.title, color: '#000', marginTop: 8}}>
            Job Description
          </Text> */}

          {/* <Text
            style={{
              ...styles.description,
              color: '#000',
              marginLeft: 0,
              textAlign: 'justify',
              marginTop: 0,
            }}>
            {ITEM.job_description}
          </Text> */}
          <ScrollView>
            <View
              style={{
                marginTop: 16,
                width: '100%',
                flex: 1,
                // backgroundColor: '#dddddd50',
                paddingHorizontal: 12,
              }}>
              <RenderHTML
        contentWidth={contentWidth}
        source={{ html: ITEM.job_description }}
        baseStyle={{ color: 'black' }} // Change the color to your desired color
      />
            </View>
          </ScrollView>
          {/* <Text
            style={{
              ...styles.description,
              marginTop: 4,
              marginLeft: 0,
              fontWeight: 'bold',
              color: '#000',
            }}>
            Send Your Resume on:{' '}
            <Text
              style={{
                ...styles.description,
                marginTop: 0,

                color: '#cc0000',
              }}>
              {ITEM.Post_Email}
            </Text>
          </Text> */}
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
    marginVertical: 8,
    borderRadius: 4,
    maxHeight: 100,
    paddingVertical: 8,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    elevation: 5,
    backgroundColor: '#fff',
  },
  innerView: {
    flex: 1,

    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    color: '#cc0000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  description: {
    // marginTop: 4,
    // marginLeft: 4,
    paddingHorizontal: 4,
    // textAlign: 'justify',
    textAlignVertical: 'center',
    color: 'gray',
    // fontWeight: 'bold',
    fontSize: 10,
  },
  modal: {
    flex: 1,
    backgroundColor: '#fff',
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
    // maxHeight: 500,
    // marginHorizontal: 16,
    // height: 150,
    // backgroundColor: 'red',
    paddingVertical: 6,
    // paddingHorizontal: 10,
    borderRadius: 8,
    // marginTop: 120,
    elevation: 50,
  },
});

const webViewStyle = StyleSheet.create({
  p: {
    fontSize: 12,
    marginTop: 3,
    marginBottom: 3,
    textAlignVertical: 'center',
    textAlign: 'justify',
  },
  ul: {
    textAlign: 'justify',
    padding: 0,
    margin: 0,
  },
});

export default JobsSample;
