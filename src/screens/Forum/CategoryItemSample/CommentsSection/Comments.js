import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {FORUM_COMMENTS} from '../../../../utils/URLS';
import {useDispatch, useSelector, useStore} from 'react-redux';
import CustomButton from '../../../../utils/CustomButton';
import {ToastAndroid} from 'react-native';
import {APIS} from '../../../../utils/URLS/Urls';
function Comments(props) {
  const states = useSelector(state => state.ConstantReducer);
  const [more, setMore] = useState(4);
  const [moreButtonText, setMoreButtonText] = useState('more');
  const [reply, setReply] = useState(false);
  const [comments, setComments] = useState([]);
  const item = props.route.params.item;
  const title = item?.subject;
  const [feedback, setFeedback] = useState('');
  const getAllComments = async id => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer 300|whdIdnGDN50QWDaIf0GtoMR5DFh9YJirbDa91Hhh',
    );

    var formdata = new FormData();
    formdata.append('id', id);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch('http://mybahria.assanhissab.com/api/forum-detail', requestOptions)
      .then(response => response.json())
      .then(({discussionscomments}) => {
        console.log(
          '🚀 ~ file: Comments.js:47 ~ .then ~ discussionscomments:',
          discussionscomments?.data,
        );

        setComments(discussionscomments.data);
      })
      .catch(error => console.log('error', error));
    // const comments = fetch(`${FORUM_COMMENTS}${2}`, {method: 'POST'})
    //   .then(res_json => res_json.json())
    //   .then(res => {
    //     console.log(
    //       '🚀 ~ file: Comments.js:29 ~ .then ~ discussionscomments:',
    //       res,
    //     );

    //     //setComments(discussionscomments.data);
    //   });
  };
  useEffect(() => {
    getAllComments(item?.id);
    setTimeout(() => {
      props.navigation.setOptions({
        title: item?.subject,
      });
    }, 0.1);
  }, []);

  const CommentPost = () => {
    //ToastAndroid.show('password not match', ToastAndroid.SHORT)
    // !user_name
    //   ? ToastAndroid.show('username invalid', ToastAndroid.SHORT)
    //   : !user_mail
    //   ? ToastAndroid.show('user mail invalid', ToastAndroid.SHORT)
    //   : !user_no
    //   ? ToastAndroid.show('user phone number invalid', ToastAndroid.SHORT)
    states?.user_data?.approved != 'Yes'
      ? ToastAndroid.show(
          'You are Not Verified user.Pls contact with admin to verify your account',
          ToastAndroid.SHORT,
        )
      : feedback === ''
      ? ToastAndroid.show('Comment Field is empty', ToastAndroid.SHORT)
      : postComment();
  };
  const postComment = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${states?.user_token}`);
    myHeaders.append(
      'Cookie',
      'XSRF-TOKEN=eyJpdiI6ImYyMHRYOWYxQXhjTTc1dWw5eFVSMmc9PSIsInZhbHVlIjoiUE9Xa1ZGc2duaXcvZUQwcVFKYmlSSWZRUldBMElHQ0w5a0xxemVLT1RrK2Y0L3hCUk0wM212ZFlPK2JTeUZnUUlYbWtZWG9aQVVxUEI2ZWphTmxZNDl5akhPc1pVWEJDVUYwUC9RRk9DQldaNU15ejdEbVRUMHpkTFNNQVFVRXUiLCJtYWMiOiJkODhmNTA3ZDQzMWZkNDY5MDQ0NGFkYWZiNDQ0YmMyYzFiMzk4NjBiOGYxNmRmOGJmZTNmMDYzODljNTg0NTA2IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6Im9tVHBmSnV6WmNxc0ZaaWZ1ZUVkdGc9PSIsInZhbHVlIjoiaHBpcXA2b25YYlhxYjZxN1dOYWN4NHhJUUxTb2thdnJkMSswaUE3a3NRWVNyRk10eEZSeHN0YjFBWHdQckpwcStXSnFobWhGM2VxQndhZFRram9BWkNBZkdGc3ZTZHlrSzB6cXFWZmFSTVUyTis3UXlLbmx3aUJpWXRxSGhhNXoiLCJtYWMiOiIwZmM3MzA2N2YzODI3MmYzZjAzNDMyMzg2YjQ3MzJlMGM1NGEwMmEzNDVkNjg5MmFjMDg4YTM3OTk0NjVjYjk1IiwidGFnIjoiIn0%3D',
    );
    var formdata = new FormData();
    formdata.append('comment', feedback);
    formdata.append('comment_user_id', states?.user_data?.id);
    formdata.append('discussion_id', item?.id);
    formdata.append('discussion_user_id', states?.user_data?.id);
    formdata.append('create_comment', '');
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    fetch('http://mybahria.assanhissab.com/api/create-comment', requestOptions)
      .then(response => response.json())
      .then(({status}) => {
        if (status === 'Comment Added') {
          ToastAndroid.show('Comment Add', ToastAndroid.LONG);
          props.navigation.goBack();
        } else {
          ToastAndroid.show('Some Thing Went Wrong', ToastAndroid.LONG);
        }
      })
      .catch(error => console.log('error', error));
  };
  const IMAGE_BASE_URL = 'http://mybahria.assanhissab.com/storage/avatar/';
  const DEFAULT_IMAGE = require('../../../../Drawables/profile_pic.png');
  // const item = props.route.params.item;

  const renderComments = ({item}) => {
    return (
      <View
        style={{
          // maxHeight: 100,
          marginVertical: 8,
          flex: 1,
          elevation: 10,
          alignSelf: 'center',
          width: '95%',
          flexDirection: 'row',
          paddingVertical: 8,
          borderRadius: 5,
          paddingHorizontal: 4,
          backgroundColor: '#fff',
          alignItems: 'center',
        }}>
        {item['commentor_info']?.avatar === null ||
        item['commentor_info']?.avatar === '' ? (
          <Image
            style={{
              height: 60,
              width: 60,
              borderRadius: 4,
              alignSelf: 'flex-start',
            }}
            // source={{uri:`${IMAGE_BASE_URL}${item.image}`}}
            source={DEFAULT_IMAGE}
          />
        ) : (
          <Image
            style={{
              height: 60,
              width: 60,
              borderRadius: 4,
              alignSelf: 'flex-start',
            }}
            source={{
              uri: `${APIS.image_base_url}${item['commentor_info']?.avatar}`,
            }}
            // source={DEFAULT_IMAGE}
          />
        )}

        <View
          style={{
            flex: 1,
            paddingHorizontal: 10,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <View
            style={{
              flex: 1,

              flexDirection: 'row',

              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 4,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 6,
              }}>
              <FontAwesome
                style={{marginHorizontal: 4}}
                name="user"
                size={14}
                color="gray"
              />
              <Text
                style={{...styles.textStyle, color: '#cc0000', fontSize: 14}}>
                {item['commentor_info'] === null
                  ? null
                  : item['commentor_info']?.name}
              </Text>
            </View>

            <View
              style={{
                alignItems: 'center',
                justifyContent: 'flex-end',
                flexDirection: 'row',
              }}>
              <FontAwesome
                style={{marginHorizontal: 4}}
                name="clock-o"
                size={10}
                color="gray"
              />
              <Text style={styles.textStyle}>
                {item.comment_date.slice(item.comment_date.indexOf(' '))}
              </Text>
            </View>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={styles.textStyle}>{item.comment}</Text>
            {/* <TouchableOpacity
              onPress={() => {
                !reply ? setReply(true) : setReply(false);
              }}>
              <Text
                style={{
                  ...styles.textStyle,
                  color: '#cc0000',
                  marginTop: 8,
                }}>
                {item.numOfComments} Replies
              </Text>
            </TouchableOpacity> */}

            {/* {reply ? (
              <View style={{flex: 1}}>
                <View
                  style={{
                    backgroundColor: '#fff',
                    width: '95%',
                    alignSelf: 'center',
                    marginTop: 6,
                  }}>
                  <TextInput
                    numberOfLines={6}
                    multiline={true}
                    mode="outlined"
                    label="Type your comment"
                    style={{
                      fontSize: 12,
                      maxHeight: 120,
                      textAlignVertical: 'top',
                    }}
                    theme={{
                      colors: {
                        primary: 'green',
                        text: 'green',
                      },
                    }}
                  />
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'green',
                      paddingHorizontal: 8,
                      paddingVertical: 4,

                      padding: 5,
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      borderRadius: 4,
                      flexDirection: 'row',
                      marginVertical: 8,
                    }}>
                    <Text style={{color: '#fff', fontSize: 10, marginRight: 6}}>
                      Comment
                    </Text>
                    <FontAwesome name="check" color="#fff" size={10} />
                  </TouchableOpacity>
                </View>
              </View>
            ) : null} */}
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          // flex: 1,
          // backgroundColor: 'skyblue',
          alignItems: 'center',
          width: '100%',
          alignSelf: 'center',
          marginBottom: 8,
          paddingVertical: 8,
          elevation: 10,
        }}>
        <Text style={{color: '#cc0000', fontWeight: 'bold', fontSize: 16}}>
          Title: {title}
        </Text>
        {/* <Text
          numberOfLines={more}
          style={{
            ...styles.textStyle,
            fontSize: 13,
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'justify',
            paddingHorizontal: 16,
          }}>
          {item.thread}
        </Text> */}

        {/* <TouchableOpacity
          onPress={() => {
            {
              more == 4
                ? (setMore(16), setMoreButtonText('less'))
                : (setMore(4), setMoreButtonText('more'));
            }
          }}
          style={{
            alignSelf: 'flex-start',
            marginHorizontal: 16,
            marginVertical: 8,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#cc0000',
            borderRadius: 4,
            paddingHorizontal: 12,
            paddingVertical: 2,
          }}>
          <Text
            style={{
              ...styles.textStyle,
              color: '#FFF',

              fontSize: 13,
              textAlign: 'center',
            }}>
            {moreButtonText}
          </Text>
        </TouchableOpacity> */}
      </View>
      <TextInput
        multilines={'10'}
        style={{
          width: '95%',
          height: 60,
          backgroundColor: 'white',
          paddingStart: 10,
          alignSelf: 'center',
          borderRadius: 10,
          elevation: 3,
        }}
        placeholder="Comment Here"
        onChangeText={value => setFeedback(value)}
        multiline={true}
      />
      {feedback.length > 0 ? (
        <CustomButton
          title="Comment"
          btnTitleStyle={{
            color: '#fff',
            marginHorizontal: 8,
          }}
          bgColor="firebrick"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '50%',
            alignSelf: 'center',
            marginVertical: 10,
            padding: 15,
            borderRadius: 15,
          }}
          OnPRESS={() => {
            CommentPost();
          }}
        />
      ) : null}

      <FlatList
        // style={{height: '100%', paddingBottom: 50}}
        data={comments}
        renderItem={renderComments}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 6,
    borderRadius: 4,
    elevation: 10,
    // maxHeight: 60,
    flexDirection: 'row',
    // flex: 1,

    justifyContent: 'space-between',

    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 10,
    width: '95%',
    alignSelf: 'center',
    marginVertical: 6,
  },
  Title_Text: {
    flex: 1,

    fontWeight: 'bold',
    color: '#CC0000',
  },

  Container: {
    flex: 1,
    // backgroundColor: 'blue',
    flexDirection: 'row',
    marginTop: 4,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageView: {
    height: 50,

    width: 50,
  },
  textStyle: {color: 'gray', fontSize: 10, textAlign: 'justify'},
});
export default Comments;
