import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, ActivityIndicator} from 'react-native';
import {FORUM_CATEGORY_SUB_LIST} from '../../../utils/URLS';
import PostsSample from './PostsSample';
import {useDispatch, useSelector, useStore} from 'react-redux';

let python_len = 0;
let java_len = 0;
// export const _LENGHT = cate => {
//   if (cate == 'p') {
//     return java_len;
//   }
//   //   } else if (cate == 'j') {
//   //     return java_len;
//   //   }
// };
function CategoryItemSample(props) {
  const states = useSelector(state => state.ConstantReducer);
  const [isLoading, setLoading] = useState(true);
  // useEffect(() => {
  //   setTimeout(() => {
  //     java_len = Java.length;
  //     python_len = Python.length;
  //   }, 1);
  // });

  const [comingData, setComingData] = useState([]);
  const [itemTitle, setItemTitle] = useState('');
  //

  // const [comingData, setcomingData] = useState({Python});

  // console.log(`FROUM LIST in categoryitem : ${FORUM_CATEGORY_SUB_LIST}${id}`);
  // console.log(id);

  const getForumCList = async forumid => {
    await fetch(FORUM_CATEGORY_SUB_LIST, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + states.user_token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: forumid}),
    })
      .then(response => response.json())
      .then(({threads}) => {
        console.log(
          '🚀 ~ file: CategoryItemSample.js:48 ~ .then ~ threads:',
          threads,
        );

        setComingData(threads['data']);
      })
      .catch(error => {
        return console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(async () => {
    getForumCList(props.route.params.id);
    // setItemTitle(item.title);
    // console.log('id : ', item.id);
    // setTimeout(() => {
    //   props.navigation.setOptions({
    //     title:
    //       item.title === undefined || item.title == null
    //         ? 'Undefined'
    //         : item.title,
    //   });
    //   // setcomingData(item.title);
    // }, 1);
  }, []);

  const renderItem = ({item}) => {
    return <PostsSample navigation={props.navigation} item={item} />;
  };

  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.1)',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <FlatList data={comingData} renderItem={item => renderItem(item)} />
      )}
    </View>
  );
}

export default CategoryItemSample;
