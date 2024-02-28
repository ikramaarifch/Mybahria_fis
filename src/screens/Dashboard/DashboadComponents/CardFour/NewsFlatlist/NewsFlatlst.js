import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import {NewsSample} from '../../../../../utils';
import {NEWS} from '../../../../../utils/URLS';
import {APIS} from '../../../../../utils/URLS/Urls';
import ItemSample from '../ItemSample/ItemSample';
import {useDispatch, useSelector, useStore} from 'react-redux';

function NewsFlatlist(props) {
  const [allNews, setAllNews] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const states = useSelector(state => state.ConstantReducer);

  const getAllNews = async () => {
    await fetch(APIS.get_news_list, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + states.user_token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      // .then(res => res)
      .then(({allnews}) => {
        setAllNews(allnews);
      })
      .catch(error => {
        return console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(async () => {
    setLoading(true);
    getAllNews();
  }, []);
  const renderItem = ({item}) => {
    console.log('🚀 ~ file: NewsFlatlst.js:41 ~ renderItem ~ item:', item);

    return (
      <NewsSample
        ITEM={item}
        title={item.title}
        image={item.image}
        time={item.news_date}
        author={item.author}
        deatails={item.deatails}
        OP={() => props.navigation.navigate('NewsPreView', {ITEM: item})}
      />
    );
  };

  return isLoading ? (
    <ActivityIndicator size="large" color="red" style={{marginVertical: 50}} />
  ) : (
    <FlatList
      // numColumns={2}
      style={[styles.flatlist, props.style]}
      data={allNews}
      renderItem={item => renderItem(item)}
      keyExtractor={item => item.title}
    />
  );
}

const styles = StyleSheet.create({
  flatlist: {width: '95%', alignSelf: 'center'},
});
export default NewsFlatlist;
