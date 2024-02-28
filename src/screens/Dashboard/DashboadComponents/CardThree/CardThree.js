import React from 'react';
import {Image, Text, SafeAreaView, TouchableOpacity, View} from 'react-native';
import CustomTitle from '../CustomTitle';
import ItemCardSample from './ItemCardSample/ItemCardSample';

import styles from './styles';

function CardThree(props) {
  const images = {
    image_1: require('../../../../Drawables/property-ic.png'),
    image_2: require('../../../../Drawables/archi.png'),
    image_3: require('../../../../Drawables/construction-i.png'),
    image_4: require('../../../../Drawables/property-ic.png'),
    image_5: require('../../../../Drawables/golf.png'),
    image_6: require('../../../../Drawables/food.png'),
  };
  const Titles = {
    title_1: 'Businesses',
    title_2: 'Complaints Offices',
    title_3: 'Construction Materials',
    title_4: 'Property Portal',
    title_5: 'Sports',
    title_6: 'Food And Drinks',
  };
  return (
    <View style={styles.body}>
      <View
        style={{
          ...styles.rows,
          justifyContent: 'space-between',
          width: '100%',
          marginVertical: 4,
          // backgroundColor: 'blue',
        }}>
        <CustomTitle title={'Directory'} />
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('Directories', {paramKey: 'all'})
          }
          style={styles.btnSeeAll}>
          <Text style={styles.btnSeeAllTxt}>See All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rows}>
        <ItemCardSample
          title={Titles.title_1}
          IMG={images.image_1}
          OP={() =>
            props.navigation.navigate('Directories', {paramKey: 'Businesses'})
          }
        />
        <ItemCardSample
          title={Titles.title_2}
          IMG={images.image_2}
          OP={() => console.warn('clicked', Titles.title_2)}
        />
        <ItemCardSample
          title={Titles.title_3}
          IMG={images.image_3}
          OP={() => console.warn('clicked', Titles.title_3)}
        />
      </View>
      <View style={styles.rows}>
        <ItemCardSample
          title={Titles.title_4}
          IMG={images.image_4}
          OP={() => console.warn('clicked', Titles.title_4)}
        />
        <ItemCardSample
          title={Titles.title_5}
          IMG={images.image_5}
          OP={() => console.warn('clicked', Titles.title_5)}
        />
        <ItemCardSample
          title={Titles.title_6}
          IMG={images.image_6}
          OP={() => console.warn('clicked', Titles.title_6)}
        />
      </View>
    </View>
  );
}

export default CardThree;
