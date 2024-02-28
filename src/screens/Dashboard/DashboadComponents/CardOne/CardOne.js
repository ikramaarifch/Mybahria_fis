import React from 'react';
import {Image, Text, SafeAreaView, TouchableOpacity, View} from 'react-native';
import ItemSample from './ItemSample/ItemSample';
import styles from './styles';

function CardOne(props) {
  const images = {
    image_1: require('../../../../Drawables/healthcare.png'),
    image_2: require('../../../../Drawables/cinema.png'),
    image_3: require('../../../../Drawables/resturants.png'),
    image_4: require('../../../../Drawables/construction-i.png'),
    image_5: require('../../../../Drawables/gym1.png'),
    image_6: require('../../../../Drawables/catering.png'),
    image_7: require('../../../../Drawables/woodwork.png'),
    image_8: require('../../../../Drawables/football1.png'),
  };
  const Titles = {
    title_1: 'Health Care',
    title_2: 'Entertainment',
    title_3: 'Services',
    title_4: 'Constructions',
    title_5: 'Gym',
    title_6: 'Catering',
    title_7: 'Wood Work',
    title_8: 'Gaming Zone',
  };

  const navigateTo = () => {
    props.navigation.navigate('dashboardComponents', {
      paramKey: 'c1',
      title: 'Directory',
    });
  };

  return (
    <View style={styles.body}>
      <Text style={styles.title}>One Tap Launch</Text>
      <View style={styles.itemsView}>
        <View style={styles.rows}>
          <ItemSample
            title={Titles.title_1}
            IMG={images.image_1}
            OP={navigateTo}
          />
          <ItemSample
            title={Titles.title_2}
            IMG={images.image_2}
            OP={navigateTo}
          />
          <ItemSample
            title={Titles.title_3}
            IMG={images.image_3}
            OP={navigateTo}
          />
          <ItemSample
            title={Titles.title_4}
            IMG={images.image_4}
            style={styles.noBorder}
            OP={navigateTo}
          />
        </View>
        <View style={styles.rows}>
          <ItemSample
            title={Titles.title_5}
            IMG={images.image_5}
            OP={navigateTo}
          />
          <ItemSample
            title={Titles.title_6}
            IMG={images.image_6}
            OP={navigateTo}
          />
          <ItemSample
            title={Titles.title_7}
            IMG={images.image_7}
            OP={navigateTo}
          />
          <ItemSample
            title={Titles.title_8}
            IMG={images.image_8}
            style={styles.noBorder}
            OP={navigateTo}
          />
        </View>
      </View>
    </View>
  );
}

export default CardOne;
