import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Carousel, {Pagination, ParallaxImage} from 'react-native-snap-carousel';
// import ItemSample from '../screens/Dashboard/DashboadComponents/CardOne/ItemSample/ItemSample';
const {width, height} = Dimensions.get('window');
import NewsSample from './NewsSample';

function NewsSlider_2(props) {
  // const BASE_IMAGES_URL = props.image_path;
  const [updateData, setUpdataData] = useState([]);
  const allNews = props?.allNews;
  const [isLoading, setLoading] = useState(true);

  // console.log('newsSlider', allNews);
  // const getAllNews = async () => {
  //   const DATA = await fetch(NEWS, {method: 'POST'})
  //     .then(response => response.json())
  //     // .then(res => res)
  //     .then(({allnews}) => setAllNews(allnews.data))
  //     // console.log(properties.data);

  //     .catch(error => {
  //       return console.error(error);
  //     });

  //   // console.log('DATA', DATA);
  //   // return DATA;
  // };

  useEffect(() => {
    // getAllNews();
    // const data = getAllProperties();
    const news_len = Math.ceil(allNews?.length / 2);
    // console.log(len);
    const newsHalfData = allNews.slice(0, news_len);
    setUpdataData(newsHalfData);
    setTimeout(() => {
      // setAllPropperties(data.data);
      setLoading(false);
      // console.log('getAllProperties', updateData);
      // allProperties.forEach(ele => {
      //   console.log(ele);
      // });
    }, 1500);
  }, []);

  const [data, setData] = useState([
    {
      title: 'Offices',
      image: require('../Drawables/latest-2.png'),
      time: '2 may 2021',
      author: 'khan',
      deatails: 'this is just a random text, hope you would like my design',
    },
    {
      title: 'Good news for Bahria Residents & employees!',
      image: require('../Drawables/latest-2.png'),
      time: '2 may 2021',
      author: 'myBharia',
      deatails: 'this is just a random text, hope you would like my design',
    },

    {
      title: 'bad news for Bahria Residents & employees!',
      image: require('../Drawables/latest-5.png'),
      time: '2 may 2021',
      author: 'myBharia',
      deatails: 'this is just a random text, hope you would like my design',
    },
    {
      title: 'Good news for Bahria Residents & employees!',
      image: require('../Drawables/latest-3.png'),
      time: '2 may 2021',
      author: 'myBharia',
      deatails: 'this is just a random text, hope you would like my design',
    },

    {
      title: 'bad news for Bahria Residents & employees!',
      image: require('../Drawables/latest-4.png'),
      time: '2 may 2021',
      author: 'myBharia',
      deatails: 'this is just a random text, hope you would like my design',
    },
  ]);

  const carousel = useRef(null);
  function handleClick() {
    carousel.current.focus();
  }
  const [activeDot, setActiveDot] = useState(0);
  const renderNewsItem = ({item, index}) => {
    return (
      <NewsSample
        // image_path={BASE_IMAGES_URL}
        ITEM={item}
        // title={item.title}
        // image={item.image}
        // time={item.time}
        // author={item.author}
        // deatails={item.deatails}
        OP={() => props.navigation.navigate('NewsPreView', {ITEM: item})}
      />
    );
  };

  // isLoading ? (
  //   <ActivityIndicator size="large" color="red" style={{marginVertical: 50}} />
  // ) :
  return (
    <View
      style={{
        flex: 1,

        // backgroundColor: 'gold',
        width: '100%',
        justifyContent: 'center',

        alignItems: 'center',
        // paddingHorizontal: 15,
      }}>
      <Carousel
        layout={'default'}
        // layoutCardOffset={`18`}
        // layout={'tinder'}
        // layoutCardOffset={`9`}
        // ref={carousel}
        data={allNews}
        sliderWidth={width}
        itemWidth={width}
        // sliderHeight={200}
        renderItem={item => renderNewsItem(item)}
        onSnapToItem={index => setActiveDot(index)}
        autoplay={true}
        loop={true}
        // snapToInterval={width}
        snapToAlignment="center"

        // lockScrollWhileSnapping={true  }
        // loopClonesPerSide={1}
        // autoplay={false}
        // autoplayInterval={2500}
        // enableMomentum={false}
      />
      <Pagination
        dotsLength={allNews?.length}
        activeDotIndex={activeDot}
        containerStyle={{paddingVertical: 4}}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 50,
          backgroundColor: '#00B106',
        }}
        inactiveDotStyle={{
          backgroundColor: '#AAA5A5',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
}

export default NewsSlider_2;
