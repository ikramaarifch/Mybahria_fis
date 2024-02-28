import React, {useState} from 'react';
import {
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import CustomTitle from '../CustomTitle';
import BlogsFlatlist from './BlogsFlatlist/BlogsFlatlist';

import styles from './styles';

function CardFive(props) {
  return (
    <View style={styles.body}>
      <View
        style={{
          ...styles.rows,
          justifyContent: 'space-between',
          width: '100%',
          marginVertical: 6,
        }}>
        <CustomTitle title={'Latest Blogs'} />
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('dashboardComponents', {
              paramKey: 'c5',
              title: 'Blogs',
            })
          }
          style={styles.btnSeeAll}>
          <Text style={styles.btnSeeAllTxt}>See All</Text>
        </TouchableOpacity>
      </View>

      <BlogsFlatlist style={styles.flatlist} />
    </View>
  );
}

export default CardFive;
