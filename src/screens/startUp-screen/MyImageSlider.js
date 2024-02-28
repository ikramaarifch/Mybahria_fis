import React, { useState } from 'react';
import {
  Animated, Dimensions,

  StyleSheet, View
} from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';

let {height, width} = Dimensions.get('window');

let INDEX;

export default MyImageSlider = props => {
  const [Captions, setCaptions] = useState([
    'Find Latest News About Bahria',
    'Find Blogs From Professionals',
    'Business Directory',
    'Find Professionals',
    'Sell & Purchase Products',
  ]);
  const [INDEX, setINDEX] = useState(0);

  indexHandler = index => {
    setINDEX(index);
  };

  const IMAGES = [
    require('../../Drawables/slider-1.png'),
    require('../../Drawables/slider-2.jpg'),
    require('../../Drawables/slider-3.jpg'),
    require('../../Drawables/slider-4.png'),
    require('../../Drawables/slider-5.jpg'),
  ];
  return (
    <View style={styles.container}>
      <SliderBox
        style={{height: '100%', width: '100%'}}
        resizeMethod={'resize'}
        resizeMode={'cover'}
        // ImageComponent={FastImage}
        currentImageEmitter={index => {
          indexHandler(index);
        }}
        autoplay={true}
        circleLoop={true}
        inactiveDotColor="#90A4AE"
        dotColor="#FFF"
        sliderBoxHeight={'100%'}
        images={IMAGES}
        dotStyle={{
          width: 11,
          height: 11,
          borderRadius: 15,
        }}
        paginationBoxStyle={{
          position: 'absolute',

          top: height * 0.25,

          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
        }}
      />
      <Animated.Text style={[styles.captions]}>{Captions[INDEX]}</Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  customImage: {
    height: '100%',
    width: '100%',
  },
  text: {
    position: 'absolute',
    top: height * 0.55,
    left: width * 0.4,
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  captions: {
    backgroundColor: 'transparent',
    color: '#fff',
    textAlign: 'center',
    width: '100%',
    fontSize: 20,
    fontWeight: 'bold',
    bottom: height * 0.45,
    position: 'absolute',
  },
});
