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
import NewsFlatlist from './NewsFlatlist/NewsFlatlst';

import styles from './styles';
function CardFour(props) {
  const route = 'comp4';
  return (
    <View style={styles.body}>
      <CustomTitle title={'Latest News'} />

      <NewsFlatlist style={styles.flatlist} />
    </View>
  );
}

export default CardFour;
