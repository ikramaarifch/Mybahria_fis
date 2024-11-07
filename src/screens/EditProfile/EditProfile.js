import React, {Component, useState} from 'react';
import {TextInput} from 'react-native-paper';
import styles from './styles';
import {
  View,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
  Modal,
  ToastAndroid,
  Platform,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import CustomHeader from '../CustomHeader/CustomHeader';
// CustomHeader
import {Picker} from '@react-native-picker/picker';
import CustomButton from '../../utils/CustomButton';
import Properties from '../BottomNavigationTabs/Property/Properties';
import {profileImage} from '../../redux/tabs_handler/actions';
import {connect} from 'react-redux';
import {cameraImagesCover, cameraPickCover} from '../../utils/CameraUtil';
import {CheckBox} from 'react-native-elements/dist/checkbox/CheckBox';
import {USER_DATA, USER_TOKEN} from '../../redux/Constant/Constant.action';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {APIS} from '../../utils/URLS/Urls';
function EditProfile(props) {
  const states = useSelector(state => state.ConstantReducer);
  const dispatch = useDispatch();
  const DEFAULT_IMAGE = require('../../Drawables/profile_pic.png');
  const [image, setImage] = useState('');
  const [selectedResident, setResident] = useState(
    states?.user_data?.resident_type,
  );

  const [selectedCity, setCity] = useState(JSON.parse(states?.user_data?.city));
  const [selectedArea, setArea] = useState(JSON.parse(states?.user_data?.area));
  const [newpassword, setNewPasssword] = useState('');
  const [oldpassword, setOldPasssword] = useState('');
  const HeaderTitle = 'Dashboard';
  const [avatar, setAvatar] = useState(false);
  const [profileinfo, setProfileinfo] = useState(false);
  const [password, setPassword] = useState(false);

  const [isChangeEmailChecked, setChangeEmailChecked] = useState(false);
  const [isChangePasswordChecked, setChangePasswordChecked] = useState(false);
  const [firstname, setFirstname] = useState(states?.user_data.name);
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState(states?.user_data.email);
  const [phno, setPh_no] = useState(states?.user_data.phone_number);
  console.log(states?.user_data, 'USER DATA');
  function EmailChangeHandler() {
    setChangeEmailChecked(!isChangeEmailChecked);
  }
  function PasswordChangeHandler() {
    setChangePasswordChecked(!isChangePasswordChecked);
  }
  const [cities, setCities] = useState([]);
  const [Areas, setAreas] = useState([]);

  const validatePassword = () => {
    oldpassword === ''
      ? ToastAndroid.show('Old Password Field Empty', ToastAndroid.SHORT)
      : newpassword === ''
      ? ToastAndroid.show('New Password Field Empty', ToastAndroid.SHORT)
      : !(oldpassword === newpassword)
      ? ToastAndroid.show('Passwords not matched', ToastAndroid.SHORT)
      : updatePassword();
  };
  const updatePassword = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${states?.user_token}`);
    myHeaders.append(
      'Cookie',
      'XSRF-TOKEN=eyJpdiI6Ik9JNGgzRHpCWUZUNGlXNWxwNlVkdlE9PSIsInZhbHVlIjoib1l1eG5YZXNvMDBVMHhOYktUeVp0eHFHZVUxNk9RSjNWaHNVbmtyWlYvWGFOVFB3UkZmdjk5bGdhcWorT3NKRzkwVkE3cHRnT1VqTW1URG95R1VvejI0WUt2a1NBRituWTZTb3NDYTRiYUFGMzNxbm5lV1c3N1JFLy9yN29BcE8iLCJtYWMiOiI5NDZkMTdlOGJmNTRhZjBmNzY1ODBiZGU4MWU5OWU4MmJiYWU1NWE2ZGQwOTVjMjRhNTY3YTk0NmNkMTczZGMwIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IjF3V2JLUUFqSlVZS1ptb0NQb2hZd3c9PSIsInZhbHVlIjoiSnhhVFVTOXovUVp0NXBPZFEvNkh6RytHOHhrbjFtQnF1TkVRVTk0WWtVTU4yMS9kM1JWZkJBUmdEQW0zZEFDN3pDUWljdlR3T1V1aHJYS1NZUXlhT2V4UjRnRjY1NVZyaXc0aThHaEJxcmkyRWVGMGpobFd3OWcvdVIwTDN6YTEiLCJtYWMiOiI0NjM2MDdhYmI3ZmNkOWY5NjA3MjY4OGU1NzA5NTJmNzg0ZDk3Y2JiMjk2NzA0OGM2OTY3MDk1YzNjYWY3MDIyIiwidGFnIjoiIn0%3D',
    );
    var formdata = new FormData();
    formdata.append('id', states.user_data.id);
    formdata.append('password', oldpassword);
    formdata.append('new_password', newpassword);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    fetch('https://mybahria.com.pk/api/update-password', requestOptions)
      .then(response => response.json())
      .then(({current_user}) => {
        if (current_user === 'Old Password does not match') {
          ToastAndroid.show('Old Password does not match', ToastAndroid.LONG);
        } else if (current_user === 'Password Successfully updated') {
          setPassword(false);
          ToastAndroid.show('Password Successfully updated', ToastAndroid.LONG);
        }
      })
      .catch(error => console.log('error', error));
  };
  const Areadropdown = id => {
    var myHeaders = new Headers();
    // myHeaders.append('Authorization', `Bearer ${user_token}`);
    myHeaders.append(
      'Cookie',
      'XSRF-TOKEN=eyJpdiI6IlpqNXIzVDhuYitXOXcyencyNHhZZmc9PSIsInZhbHVlIjoiNWVqeW1Oam9hQjJnV0RCUndPNlZEOTFmeCtYaGhUL1FmNkh3L2ppVmRBMHdwMVcvWFdSQnpMam9yQkVQSS9vUnN1SzdiSDlGTkRNY0RmVHViZ1NzZTBiTDNxYXdLUjFUSXgzcWkwQlJmaDFKL0ZnMEhtTUlVanlsWlBYbU1kUksiLCJtYWMiOiIwNzY5YjQzMGZkYzBmNzgyOTU1ZGY0NmJjNThhMWUyNjY0YzM4ZDNkYzU4YjdjZmZkMjFkODYxM2RmMTFjMzExIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6ImFyTCtnNzJ2Sm95RTZNWk1EN3NadUE9PSIsInZhbHVlIjoidHFvd1NvTDYvT1hXMTd0RURQUHpvTE5VZHY2cmpxVVVsUVlCNWszZCtzT0xkZnd5R1BjOEkyVzZTZ0psaWpGZTNrUE1jNWVqazdLemRrYTlHNWQzTFNFbElrVFNlR0VLWSt3WkJBSEFGbU50Nkc1R2FUdDBneHp5NldsL3ZwME4iLCJtYWMiOiIwZjIxZmJlN2IyMzdkMWE2M2FkYTZiMDJjZWUyNTNjNzc5NWFmNzMzZWJjNTllMGU1Mjc0MGRhMTU1ZWRlYmI1IiwidGFnIjoiIn0%3D',
    );
    var formdata = new FormData();
    formdata.append('city_id', id);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    fetch('https://mybahria.com.pk/api/area', requestOptions)
      .then(response => response.json())
    
      .then(({area}) => setAreas(area))
      .catch(error => console.log('error', error));
  };
  let AreaItems = Areas.map(item => {
    return <Picker.Item key={item.id} value={item.id} label={item.name} />;
  });
  const getCity_Categories = () => {
    fetch(APIS.data_signup_city)
      .then(res => res.json())
      .then(({bahriaCities}) => {
        console.log(
          '🚀 ~ file: ManageProperties.js:164 ~ .then ~ bahriaCities:',
          bahriaCities,
        );

        // setCategories(Category);
        setCities(bahriaCities);
      });
  };
  let cityItems = cities.map(item => {
    return <Picker.Item key={item.id} value={item.id} label={item.name} />;
  });
  const login = (token, user) => {
    console.log('User', user);
    console.log(token, 'Token');
    dispatch({
      type: USER_DATA,
      payload: {token, user, ProfileImage: user?.avatar},
    });
    // dispatch({type: USER_DATA, payload: user});
    // dispatch({type: ACTION_PROFILE_IMAGE, payload: user.avatar});
    // console.log(states.user_token, 'login');
    // console.log(states.user_data, 'login');

    // props.navigation.navigate('HomeStack');
    if (token) {
      ToastAndroid.show('Logged in Successfully', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Username and Password Invalid', ToastAndroid.SHORT);
    }
  };
  const updateprofile = async () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${states?.user_token}`);
    var formdata = new FormData();
    formdata.append('id', states.user_data.id);
    formdata.append('name', firstname);
    formdata.append('resident_type', selectedResident);
    formdata.append('city', selectedCity);
    formdata.append('area', selectedArea);
    formdata.append('email', email);
    formdata.append('phone_no', phno);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    fetch(
      'https://mybahria.com.pk/api/save-profile-info',
      requestOptions,
    )
      .then(response => response.json())
      .then(res => {
        console.log(
          '🚀 ~ file: EditProfile.js:161 ~ updateprofile ~ res:',
          res,
        );

        res.status === 'success' && Platform.OS === 'android'
          ? (ToastAndroid.show('Updated Successfully', ToastAndroid.SHORT),
            login(states?.user_token, res.users),
            setProfileinfo(false))
          : alert('Updated Successfully');
      })
      .catch(error => console.log('error', error));
  };
  const AddImage = async () => {
    const IMAGE = await cameraPickCover();
    setImage(IMAGE);
    console.log(
      IMAGE?.path,
      'PATH',

      'FILENAME',
      IMAGE?.mime,
      'MIME',
    );
    //  setImage(IMAGE.path)
  };

  // const [EditProfile, setEditProfile] = useState([
  //   {
  //     id: '1',
  //     title: 'Update Avatar',
  //     icon: <FontAwesome name="user-circle-o" size={24} color='firebrick'/>,
  //   },
  //   {
  //     id: '2',
  //     title: 'Update Profile Info',
  //     icon: <FontAwesome name="list-alt" size={24} color='firebrick'/>
  //   },
  //   {
  //     id: '3',
  //     title: 'Change Password',
  //     icon: <FontAwesome name="lock" size={24} color='firebrick'/>,
  //   },
  // ]);

  // const renderItem = ({item}) => {
  //   return (
  //     <TouchableOpacity
  //       onPress={() => visibilityHandler(item)}
  //       style={{
  //         flexDirection: 'row',
  //         height: 60,
  //         backgroundColor: '#fff',
  //         paddingHorizontal: 16,
  //         justifyContent: 'space-between',
  //         borderRadius: 5,
  //         alignItems: 'center',
  //         marginVertical: 6,
  //         elevation: 12,
  //         marginHorizontal: 16,
  //       }}>
  //       <Text>{item.icon}</Text>
  //       <Text
  //         style={{
  //           fontWeight: 'bold',
  //           textAlign: 'left',
  //           flex: 1,
  //           marginHorizontal: 16,
  //         }}>
  //         {item.title}
  //       </Text>
  //     </TouchableOpacity>
  //   );
  // };
  const updateAvater = () => {
    console.log(image.mime);
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${states?.user_token}`);
    myHeaders.append(
      'Cookie',
      'XSRF-TOKEN=eyJpdiI6Ik9JNGgzRHpCWUZUNGlXNWxwNlVkdlE9PSIsInZhbHVlIjoib1l1eG5YZXNvMDBVMHhOYktUeVp0eHFHZVUxNk9RSjNWaHNVbmtyWlYvWGFOVFB3UkZmdjk5bGdhcWorT3NKRzkwVkE3cHRnT1VqTW1URG95R1VvejI0WUt2a1NBRituWTZTb3NDYTRiYUFGMzNxbm5lV1c3N1JFLy9yN29BcE8iLCJtYWMiOiI5NDZkMTdlOGJmNTRhZjBmNzY1ODBiZGU4MWU5OWU4MmJiYWU1NWE2ZGQwOTVjMjRhNTY3YTk0NmNkMTczZGMwIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IjF3V2JLUUFqSlVZS1ptb0NQb2hZd3c9PSIsInZhbHVlIjoiSnhhVFVTOXovUVp0NXBPZFEvNkh6RytHOHhrbjFtQnF1TkVRVTk0WWtVTU4yMS9kM1JWZkJBUmdEQW0zZEFDN3pDUWljdlR3T1V1aHJYS1NZUXlhT2V4UjRnRjY1NVZyaXc0aThHaEJxcmkyRWVGMGpobFd3OWcvdVIwTDN6YTEiLCJtYWMiOiI0NjM2MDdhYmI3ZmNkOWY5NjA3MjY4OGU1NzA5NTJmNzg0ZDk3Y2JiMjk2NzA0OGM2OTY3MDk1YzNjYWY3MDIyIiwidGFnIjoiIn0%3D',
    );
    var formdata = new FormData();
    formdata.append('id', states.user_data.id);
    formdata.append('avatar', {
      uri: image?.path,
      type: image.mime,
      name: image?.path,
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    fetch('https://mybahria.com.pk/api/update-avatar', requestOptions)
      .then(response => response.json())
      .then(({status}) => {
        if (status === 'success') {
          props.uplaodImage(image.path);
          ToastAndroid.show('Update Image', ToastAndroid.LONG);
        } else {
          ToastAndroid.show('SomeThing Went Wrong', ToastAndroid.LONG);
        }
      })
      .catch(error => console.log('error', error));
  };
  useEffect(async () => {
    await getCity_Categories();
  }, []);
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.body}>
          <TouchableOpacity
            onPress={() => setAvatar(!avatar)}
            style={{
              flexDirection: 'row',
              height: 60,
              backgroundColor: '#fff',
              paddingHorizontal: 16,
              justifyContent: 'space-between',
              borderRadius: 5,
              alignItems: 'center',
              marginVertical: 6,
              elevation: 12,
              marginHorizontal: 16,
            }}>
            <FontAwesome name="user-circle-o" size={24} color="firebrick" />
            <Text
              style={{
                fontWeight: 'bold',
                textAlign: 'left',
                flex: 1,
                marginHorizontal: 16,
                color: '#8B0000',
              }}>
              Update Avatar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setProfileinfo(!profileinfo)}
            style={{
              flexDirection: 'row',
              height: 60,
              backgroundColor: '#fff',
              paddingHorizontal: 16,
              justifyContent: 'space-between',
              borderRadius: 5,
              alignItems: 'center',
              marginVertical: 6,
              elevation: 12,
              marginHorizontal: 16,
            }}>
            <FontAwesome name="list-alt" size={24} color="firebrick" />
            <Text
              style={{
                fontWeight: 'bold',
                textAlign: 'left',
                flex: 1,
                marginHorizontal: 16,
                color: '#8B0000',
              }}>
              Update Profile Info
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setPassword(!password)}
            style={{
              flexDirection: 'row',
              height: 60,
              backgroundColor: '#fff',
              paddingHorizontal: 16,
              justifyContent: 'space-between',
              borderRadius: 5,
              alignItems: 'center',
              marginVertical: 6,
              elevation: 12,
              marginHorizontal: 16,
            }}>
            <FontAwesome name="lock" size={24} color="firebrick" />
            <Text
              style={{
                fontWeight: 'bold',
                textAlign: 'left',
                flex: 1,
                marginHorizontal: 16,
                color: '#8B0000',
              }}>
              Update Password
            </Text>
          </TouchableOpacity>

          <Modal
            onRequestClose={() => setAvatar(!avatar)}
            transparent={true}
            visible={avatar}
            animationType="slide">
            <TouchableOpacity
              onPress={() => setAvatar(!avatar)}
              style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}
            />
            <View style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
              <View
                style={{
                  minHeight: 200,
                  backgroundColor: '#fff',
                  paddingVertical: 16,
                  paddingHorizontal: 8,
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  elevation: 12,
                }}>
                {/* <TouchableOpacity
            onPress={() => {
              setemergencyModalVisibility(false);
            }}>
          </TouchableOpacity> */}
                <Text
                  style={{
                    borderLeftColor: 'red',
                    borderLeftWidth: 2,
                    paddingHorizontal: 8,
                    fontWeight: 'bold',
                  }}>
                  Update Avatar
                </Text>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 8,
                    width: '30%',
                    alignSelf: 'center',
                    // backgroundColor: 'red',
                  }}>
                  <Image
                    style={{
                      height: 80,
                      width: 80,
                      borderRadius: 100,
                      borderColor: 'firebrick',
                      borderWidth: 2,
                    }}
                    source={
                      props.userImage === ''
                        ? DEFAULT_IMAGE
                        : image != ''
                        ? {uri: image.path}
                        : {uri: props.userImage}
                    }
                  />
                  <TouchableOpacity
                    onPress={() => {
                      AddImage();
                    }}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 18,
                      padding: 4,
                    }}>
                    <FontAwesome name="camera" color="green" size={18} />
                  </TouchableOpacity>
                </View>
                <CustomButton
                  style={styles.btnBg}
                  OnPRESS={() => {
                    updateAvater();
                  }}
                  bgColor="firebrick"
                  title="Update"
                  btnTitleStyle={styles.btnLabel}
                />
              </View>
            </View>
          </Modal>

          <Modal
            onRequestClose={() => setProfileinfo(!profileinfo)}
            transparent={true}
            visible={profileinfo}
            animationType="slide">
            <TouchableOpacity
              onPress={() => setProfileinfo(!profileinfo)}
              style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}
            />
            <View style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
              <ScrollView>
                <View
                  style={{
                    backgroundColor: '#fff',
                    paddingVertical: 16,
                    paddingHorizontal: 8,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    elevation: 12,
                  }}>
                  {/* <TouchableOpacity
            onPress={() => {
              setemergencyModalVisibility(false);
            }}>
          </TouchableOpacity> */}
                  <Text
                    style={{
                      borderLeftColor: 'red',
                      borderLeftWidth: 2,
                      paddingHorizontal: 8,
                      fontWeight: 'bold',
                    }}>
                    Update Profile Info
                  </Text>
                  <View style={styles.form}>
                    <TextInput
                      selectionColor="firebrick"
                      theme={{colors: {text: '#000', primary: 'red'}}}
                      style={styles.TextInput}
                      label="First Name"
                      value={firstname}
                      onChangeText={text => {
                        setFirstname(text);
                      }}
                    />
                    {/* <TextInput
                      selectionColor="firebrick"
                      theme={{colors: {text: '#000', primary: 'red'}}}
                      style={styles.TextInput}
                      label="Last Name"
                      value={lastname}
                    /> */}

                    <TextInput
                      selectionColor="firebrick"
                      theme={{colors: {text: '#000', primary: 'red'}}}
                      style={styles.TextInput}
                      label="Email"
                      value={email}
                    />

                    <TextInput
                      selectionColor="firebrick"
                      theme={{colors: {text: '#000', primary: 'red'}}}
                      style={styles.TextInput}
                      label="Phone number"
                      value={phno}
                    />

                    <View style={styles.pickerContainer}>
                      <Picker
                        selectedValue={selectedResident}
                        onValueChange={(itemValue, itemIndex) =>
                          setResident(itemValue)
                        }
                        mode="dropdown"
                        style={styles.pickerStyle}>
                        <Picker.Item
                          color="#a5a0a0"
                          label={'Select Resident'}
                          value={'Key0'}
                          enabled={false}
                        />
                        <Picker.Item
                          color="#a5a0a0"
                          label="Resident"
                          value="Resident"
                        />
                        <Picker.Item
                          color="#a5a0a0"
                          label="Non Resident"
                          value="Non Resident"
                        />
                      </Picker>
                    </View>

                    <View style={styles.pickerContainer}>
                      <Picker
                        selectedValue={selectedCity}
                        onValueChange={(itemValue, itemIndex) => {
                          setCity(itemValue);
                          Areadropdown(itemValue);
                        }}
                        mode="dropdown"
                        style={styles.pickerStyle}>
                        <Picker.Item
                          color="#a5a0a0"
                          label={'Select City'}
                          value={'Key0'}
                          enabled={false}
                        />
                        {cityItems}
                      </Picker>
                    </View>

                    <View style={styles.pickerContainer}>
                      <Picker
                        selectedValue={selectedArea}
                        onValueChange={(itemValue, itemIndex) =>
                          setArea(itemValue)
                        }
                        mode="dropdown"
                        style={styles.pickerStyle}>
                        <Picker.Item
                          color="#a5a0a0"
                          label={'Select Area'}
                          value={'Key0'}
                          enabled={false}
                        />
                        {AreaItems}
                      </Picker>
                    </View>
                    <CustomButton
                      style={styles.btnBg}
                      OnPRESS={() => {
                        updateprofile();
                      }}
                      bgColor="firebrick"
                      title="Update"
                      btnTitleStyle={styles.btnLabel}
                    />
                  </View>
                </View>
              </ScrollView>
            </View>
          </Modal>

          <Modal
            onRequestClose={() => setPassword(!password)}
            transparent={true}
            visible={password}
            animationType="slide">
            <TouchableOpacity
              onPress={() => setPassword(!password)}
              style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}
            />
            <View style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
              <View
                style={{
                  minHeight: 250,
                  backgroundColor: '#fff',
                  paddingVertical: 16,
                  paddingHorizontal: 8,
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  elevation: 12,
                }}>
                {/* <TouchableOpacity
            onPress={() => {
              setemergencyModalVisibility(false);
            }}>
          </TouchableOpacity> */}
                <Text
                  style={{
                    borderLeftColor: 'red',
                    borderLeftWidth: 2,
                    paddingHorizontal: 8,
                    fontWeight: 'bold',
                  }}>
                  Update Password
                </Text>
                <View style={{marginVertical: 8}}>
                  <TextInput
                    selectionColor="firebrick"
                    theme={{colors: {text: '#000', primary: 'red'}}}
                    style={styles.TextInput}
                    label="Old Password"
                    onChangeText={old => setOldPasssword(old)}
                  />

                  <TextInput
                    selectionColor="firebrick"
                    theme={{colors: {text: '#000', primary: 'red'}}}
                    style={styles.TextInput}
                    label="New Password"
                    onChangeText={newpas => setNewPasssword(newpas)}
                  />
                </View>
                <CustomButton
                  style={styles.btnBg}
                  OnPRESS={() => {
                    validatePassword();
                  }}
                  bgColor="firebrick"
                  title="Update"
                  btnTitleStyle={styles.btnLabel}
                />
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const mapStateToProps = state => {
  return {
    userImage: state.tab_reducer.userImage,
  };
};

const mapActionToProps = dispatch => {
  return {
    uplaodImage: image => dispatch(profileImage(image)),
  };
};
export default connect(mapStateToProps, mapActionToProps)(EditProfile);
