import React from 'react';
import {View, Text} from 'react-native';
import CustomHeader from '../CustomHeader/CustomHeader';
import {NewsFlatlist} from '../Dashboard';

function News(props) {
  return (
    <View>
      {/* <CustomHeader title="News" navigation={props.navigation} /> */}

      <NewsFlatlist navigation={props.navigation} />
    </View>
  );
}

export default News;
