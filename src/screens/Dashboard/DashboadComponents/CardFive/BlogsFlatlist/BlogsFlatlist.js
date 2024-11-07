import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  View,
  Image,
  Modal,
  ScrollView,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import HTMLView from 'react-native-htmlview';

// onpenCloseModal
import {connect} from 'react-redux';
import ItemSample from '../ItemSample/ItemSample';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {BLOGS_LIST} from '../../../'
// import {  } from "../../../";
import {BLOGS_LIST} from '../../../../../utils/URLS';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {onpenCloseModal} from '../../../../../redux/Actions/Blogs.action';
import {APIS} from '../../../../../utils/URLS/Urls';
import {useDispatch, useSelector, useStore} from 'react-redux';

function BlogsFlatlist(props) {
  const states = useSelector(state => state.ConstantReducer);
  const [blogsList, setBlogsList] = useState([]);
  const [currentItemVisibility, setCurrentItemVisibility] = useState(false);
  const [Loading, setLoading] = useState(false);

  const getAllBlogs = async () => {
    await fetch(APIS.get_all_blogs, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + states.user_token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(blogs => {
        setBlogsList(blogs.blogs), console.log(blogsList);
      })
      .catch(error => {
        return console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // console.log(BLOGS_LIST, 'in blogflatlis');
  // const [ITEMS, setITEMS] = useState([
  //   {
  //     title:
  //       'Businesses Businesses Businesses Businesses Businesses Businesses Businesses Businesses',
  //     image: require('../../../../../Drawables/latest-5.png'),
  //     time: '24 april 2021',
  //     author: 'tanveer',
  //     detailSection:
  //       'It is a unique survey number or plot number to allotted to any specific piece of land. A khasra number can have 8 kanals or one acre at maximum. However, for some cases, the khasra number can exceed one acre such as if the land is hilly or barren. If the piece of land holds any building the column will mention ‘Ghair Mumkin’, ‘Chai’ if it is irrigated by wells, ‘Nehri’ or ‘Aabi’ if it is by canals.',
  //   },
  //   {
  //     title: 'Complaints Offices',
  //     image: require('../../../../../Drawables/latest-2.png'),
  //     time: '2 may 2021',
  //     author: 'khan',
  //     detailSection:
  //       'It is a unique survey number or plot number to allotted to any specific piece of land. A khasra number can have 8 kanals or one acre at maximum. However, for some cases, the khasra number can exceed one acre such as if the land is hilly or barren. If the piece of land holds any building the column will mention ‘Ghair Mumkin’, ‘Chai’ if it is irrigated by wells, ‘Nehri’ or ‘Aabi’ if it is by canals.',
  //   },
  //   {
  //     title: 'Account',
  //     image: require('../../../../../Drawables/latest-5.png'),
  //     time: '24 april 2021',
  //     author: 'tanveer',
  //     detailSection:
  //       'It is a unique survey number or plot number to allotted to any specific piece of land. A khasra number can have 8 kanals or one acre at maximum. However, for some cases, the khasra number can exceed one acre such as if the land is hilly or barren. If the piece of land holds any building the column will mention ‘Ghair Mumkin’, ‘Chai’ if it is irrigated by wells, ‘Nehri’ or ‘Aabi’ if it is by canals.',
  //   },
  //   {
  //     title: ' Offices',
  //     image: require('../../../../../Drawables/latest-2.png'),
  //     time: '2 may 2021',
  //     author: 'khan',
  //     detailSection:
  //       'It is a unique survey number or plot number to allotted to any specific piece of land. A khasra number can have 8 kanals or one acre at maximum. However, for some cases, the khasra number can exceed one acre such as if the land is hilly or barren. If the piece of land holds any building the column will mention ‘Ghair Mumkin’, ‘Chai’ if it is irrigated by wells, ‘Nehri’ or ‘Aabi’ if it is by canals.It is a unique survey number or plot number to allotted to any specific piece of land. A khasra number can have 8 kanals or one acre at maximum. However, for some cases, the khasra number can exceed one acre such as if the land is hilly or barren. If the piece of land holds any building the column will mention ‘Ghair Mumkin’, ‘Chai’ if it is irrigated by wells, ‘Nehri’ or ‘Aabi’ if it is by canals.It is a unique survey number or plot number to allotted to any specific piece of land. A khasra number can have 8 kanals or one acre at maximum. However, for some cases, the khasra number can exceed one acre such as if the land is hilly or barren. If the piece of land holds any building the column will mention ‘Ghair Mumkin’, ‘Chai’ if it is irrigated by wells, ‘Nehri’ or ‘Aabi’ if it is by canals.',
  //   },
  // ]);

  const IMAGES_BASE_URL = 'https://mybahria.com.pk/storage/images/';
  const [currentItem, setCurrentItem] = useState([]);
  // const [isLoading, setLoading] = useState(true);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setCurrentItem(item),
            setCurrentItemVisibility(true),
            props.openCloseModal();
        }}>
        <ItemSample
          ITEM={item}
          // navigation={props.navigation}
          title={item.title}
          IMG={item.image}
          time={item.time}
          author={item.author}
          item={item}
        />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    setLoading(true);
    getAllBlogs();

    // setTimeout(() => {
    //   setLoading(false);
    // }, 1500);
  }, []);
  return (
    <View>
      {Loading ? (
        <ActivityIndicator
          style={{marginTop: '30%'}}
          color="red"
          size="large"
        />
      ) : (
        <View>
          <FlatList
            style={[styles.flatlist, props.style]}
            data={blogsList}
            renderItem={item => renderItem(item)}
            keyExtractor={item => item.title}
          />
          {currentItemVisibility ? (
            <Modal
              animationType="slide"
              visible={props.detailModalVisibility}
              hardwareAccelerated={true}
              onRequestClose={() => props.openCloseModal()}>
              <View
                style={{
                  height: 50,
                  backgroundColor: '#cc0000',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  // marginBottom: 50,
                  // paddingHorizontal: 8,
                }}>
                <TouchableOpacity
                  style={{marginHorizontal: 16}}
                  onPress={() => {
                    props.openCloseModal();
                  }}>
                  <Ionicons name="arrow-back-sharp" color={'#fff'} size={22} />
                </TouchableOpacity>
                <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                  Blog
                </Text>
              </View>

              {/* body section */}
              {/* title
        image
      time
      author */}
              <ScrollView style={{backgroundColor: '#fff'}}>
                <View style={{flexGrow: 1}}>
                  <Text
                    style={{
                      // marginVertical: 8,
                      // paddingHorizontal: 8,
                      // fontSize: 13,
                      // textAlign: 'justify',
                      // fontWeight: 'bold',
                      // // color: '#cc000090',
                      textAlign: 'center',
                      fontSize: 16,
                      backgroundColor: '#ddd',
                      paddingVertical: 6,
                      color: '#cc0000',
                      marginVertical: 8,
                      elevation: 10,
                      shadowColor: '#fff',
                      fontWeight: 'bold',
                      marginHorizontal: 8,
                    }}>
                    {currentItem.title}
                  </Text>
                  <Image
                    resizeMethod="scale"
                    style={{
                      width: '95%',
                      alignSelf: 'center',
                      height: 150,
                      borderRadius: 4,
                    }}
                    source={{
                      uri: `https://mybahria.com.pk/assets/uploads/${currentItem.image}`,
                    }}
                  />
                  <View
                    style={{
                      marginTop: 16,
                      paddingHorizontal: 8,
                      flexDirection: 'row',
                      alignItems: 'center',
                      alignSelf: 'flex-end',
                      justifyContent: 'space-around',
                    }}>
                    <Text style={styles.time}>Posted Date: </Text>
                    <MaterialCommunityIcons
                      name="clock-time-nine-outline"
                      size={14}
                      color="gray"
                    />

                    <Text style={styles.time}>{currentItem.blog_date}</Text>
                  </View>
                  <View style={{marginHorizontal: 12}}>
                    <HTMLView
                      bullet
                      stylesheet={webViewStyle}
                      // lineBreak={false}
                      // paragraphBreak
                      addLineBreaks={false}
                      paragraphBreak={false}
                      // value={ITEM.job_description}
                      value={
                        '<div>' +
                        currentItem.description.replace(
                          '/<br|\n|\rs*\\?>/g',
                          '',
                        ) +
                        '</div>'
                      }
                    />
                  </View>

                  {/* <Text
              style={{
                fontSize: 12,
                textAlign: 'justify',
                paddingHorizontal: 8,
                marginVertical: 16,
              }}>
              {currentItem.description}
            </Text> */}
                </View>
              </ScrollView>
            </Modal>
          ) : null}
        </View>
      )}
    </View>
  );
}

const webViewStyle = StyleSheet.create({
  p: {
    fontSize: 12,
    // marginTop: 3,
    // marginBottom: 3,
    textAlignVertical: 'center',
    textAlign: 'justify',
    // padding: 12,
    // backgroundColor: 'red',
    // width: '100%',
    // flex: 1,
  },
  ul: {
    textAlign: 'justify',
    padding: 0,

    margin: 0,
  },
});
const styles = StyleSheet.create({
  flatlist: {width: '100%'},
  title: {
    fontWeight: 'bold',
    fontSize: 12,

    textAlign: 'justify',
  },
  innerBody: {
    justifyContent: 'center',
    justifyContent: 'center',
  },
  time: {
    marginHorizontal: 4,
    color: 'gray',
    fontSize: 12,
  },
  author: {
    fontSize: 12,
    color: 'firebrick',
    fontWeight: 'bold',
  },
});

const mapActionsToProps = dispatch => {
  return {
    openCloseModal: () => dispatch(onpenCloseModal()),
  };
};
const mapStateToProps = state => {
  return {
    detailModalVisibility: state.BlogsReducer.detailModalVisibility,
  };
};
export default connect(mapStateToProps, mapActionsToProps)(BlogsFlatlist);
