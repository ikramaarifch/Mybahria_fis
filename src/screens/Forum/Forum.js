import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import CategorySample from './CategorySample';
import {setForumCategoryList} from '../../redux/Actions/Forum.action';
// import {FORUM_CATEGORY} from '../../utils/URLS';
import {BoxShadow} from 'react-native-shadow';
import {APIS} from '../../utils/URLS/Urls';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {FORUM_CATEGORY} from '../../utils/URLS';
function Forum(props) {
  const states = useSelector(state => state.ConstantReducer);
  // const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [forumcate, setForumCate] = useState([]);

  const getForum = async () => {
    await fetch(FORUM_CATEGORY, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + states.user_token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
        setForumCate(response.forumCategories);
      })
      .catch(error => {
        return console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(async () => {
    // setLoading(true)
    await getForum();
  }, []);

  const renderItem = ({item}) => {
    console.log(item, 'ITEM');
    return (
      <CategorySample navigation={props.navigation} item={item} id={item.id} />
    );
  };
  console.log(forumcate);
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
        <FlatList data={forumcate} renderItem={renderItem} />
      )}
      {/* {console.log('props.getForumCategoryList', props.getForumCategoryList)} */}
    </View>
  );
}

const mapPropsToActions = dispatch => {
  return {
    setForumCategoryList: forumList =>
      dispatch(setForumCategoryList(forumList)),
  };
};
const mapPropsToState = state => {
  return {
    getForumCategoryList: state.forumReducer.forumCategoryList,
  };
};

export default connect(mapPropsToState, mapPropsToActions)(Forum);
