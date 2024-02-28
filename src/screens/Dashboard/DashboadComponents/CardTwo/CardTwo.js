import React from 'react';
import {Image, Text, SafeAreaView, TouchableOpacity, View} from 'react-native';
import CustomTitle from '../CustomTitle';

import styles from './styles';

function CardTwo(props) {
  const navigateTo = () => {
    props.navigation.navigate('dashboardComponents', {
      paramKey: 'c2',
      title: 'Directory',
    });
  };

  return (
    <View style={styles.body}>
      <CustomTitle title={'Featrued Section'} />

      <View style={styles.featuredImgStyle}>
        <TouchableOpacity
          onPress={navigateTo}
          //  style={{width: '50%'}} onPress={() => {}}
        >
          <Image
            style={{height: 80, width: 155, borderRadius: 5}}
            source={require('../../../../Drawables/construction.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {}}
          //   style={{flexDirection: 'row', width: 320, marginLeft: 5}}
        >
          <Image
            style={{height: 80, width: 155, borderRadius: 5}}
            source={require('../../../../Drawables/masjid-locator.jpg')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CardTwo;
