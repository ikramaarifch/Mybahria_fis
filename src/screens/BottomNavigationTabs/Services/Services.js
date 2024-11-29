import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import CustomHeader from '../../CustomHeader/CustomHeader';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import {ServiceFilterModalState} from '../../../redux/tabs_handler/actions';
import {CheckBox, SearchBar} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import {TextInput} from 'react-native-paper';
import {setForumCategoryList} from '../../../redux/Actions/Services.action';
import {APIS} from '../../../utils/URLS/Urls';
// import StartUp_Screen from '../../StartUp-screen/StartUp_Screen';
import {useDispatch, useSelector, useStore} from 'react-redux';

function Services(props) {
  const [search, setSearch] = useState('');
  const [RegisterService, setRegisterService] = useState(false);
  const [selectedCategory, setselectedCategory] = useState();
  const states = useSelector(state => state.ConstantReducer);
  const [services, setServices] = useState([]);

  const [serviceName, setserviceName] = useState();
  const [isVerfied, setisVerfied] = useState(false);
  const [location, setlocation] = useState();
  const [phoneNumber, setphoneNumber] = useState();
  const [landLineNumber, setlandLineNumber] = useState();
  const [Loading, setLoading] = useState(false);

  const getService = async () => {
    await fetch(APIS.get_service, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + states.user_token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      // .then(res => res)
      .then(({service}) => {
        console.log(service, 'service');
        setServices(service);
      })
      .catch(error => {
        return console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });

    // console.log('DATA', DATA);
  };

  // useEffect(async () => {
  //   setLoading(true);
  //   getService();
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await getService();
      } catch (error) {
        console.error('Error fetching service data:', error);
        // Handle the error appropriately, e.g., display an error message
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  // useEffect(async () => {
  //   setLoading(true);
  //   getService();
  // }, []);

  const updateSearch = search => {
    setSearch({search});
  };

  const DATA = [
    {
      icon: 'computer',
    },
    {
      icon: 'local-airport',
    },
    {
      icon: 'hotel',
    },
    {
      icon: 'dry-cleaning',
    },
    {
      icon: 'contact-mail',
    },
    {
      icon: 'contact-mail',
    },
    {
      icon: 'contact-mail',
    },
  ];
  const renderItem = (item, index) => (
    
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate('DirectoryPreViewSample', {
          id: item.cid,
          
        });
      }}
      style={styles.itemsStyle}>
      {/* <MaterialIcons name={DATA[index].icon} size={28} color="firebrick" /> */}

      <Text
        style={{
          fontWeight: 'bold',
          textAlign: 'left',
          // backgroundColor: '#ddd',
          flex: 1,
          marginHorizontal: 16,
          color: '#8B0000',
        }}>
        {item.title}
      </Text>
      <Ionicons name="chevron-forward-sharp" size={28} color="firebrick" />
    </TouchableOpacity>
  );
  return (
    <View style={styles.body}>
      <View
        style={{
          width: '100%',
          backgroundColor: '#cc0000',
          height: 50,
          paddingLeft: 14,
          flexDirection: 'row',
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.goBack();
          }}>
          <Icon
            name="arrowleft"
            size={25}
            color="#fff"
            style={{alignSelf: 'center'}}
          />
        </TouchableWithoutFeedback>
        <Text
          style={{
            color: '#fff',
            paddingLeft: 10,
            alignSelf: 'center',
            fontSize: 16,
          }}>
          {'Services'}
        </Text>
      </View>
      {/* <CustomHeader title="Services" navigation={props.navigation} /> */}

      <FlatList
        data={services}
        renderItem={({item, index}) => renderItem(item, index)}
      />
      {/* 
      <TouchableOpacity
        onPress={() => setRegisterService(!RegisterService)}
        style={{
          position: 'absolute',
          right: 16,
          bottom: 16,
          // backgroundColor: 'skyblsue',
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
     
        <View
          style={{
            backgroundColor: '#cc0000',
            // padding: 16,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            width: 50,
          }}>
          <FontAwesome5 name={'plus'} size={18} color="#fff" />
        </View>
      </TouchableOpacity> */}

      <Modal
        transparent={true}
        visible={props.modalVisibility}
        animationType="slide">
        <TouchableOpacity
          onPress={() => props.openServicesModal()}
          style={{flex: 1, backgroundColor: 'transparent'}}
        />
        <View
          style={{
            // flex: 1,
            elevation: 10,
            paddingHorizontal: 16,
            backgroundColor: '#fff',
            minHeight: 200,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            // justifyContent: 'center',
            paddingVertical: 16,
            alignItems: 'center',
          }}>
          {/* <TouchableOpacity onPress={() => props.openServicesModal()}>
            <Text>CLOISE</Text>
          </TouchableOpacity> */}
          <Text
            style={{
              width: '100%',
              borderLeftColor: 'red',
              borderLeftWidth: 2,
              fontWeight: 'bold',
              paddingHorizontal: 8,
            }}>
            Filter by
          </Text>
          <View
            style={{
              width: '100%',
              justifyContent: 'flex-start',
              // paddingHorizontal: 16,
            }}>
            <SearchBar
              containerStyle={{
                // borderWidth: 0,
                // borderTopColor: 'red',
                borderTopWidth: 0,
                paddingHorizontal: 0,

                backgroundColor: '#fff',
              }}
              inputContainerStyle={{
                backgroundColor: '#fff',
                height: 30,
                paddingHorizontal: 0,
                // borderWidth: 0,
              }}
              inputStyle={{
                fontSize: 12,
                paddingHorizontal: 0,
              }}
              placeholder="Type Here..."
              onChangeText={search => updateSearch(search)}
              value={search}
            />
            <TouchableOpacity onPress={() => {}}>
              <Text>Search</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={RegisterService}
        animationType="slide"
        // backgroundColor;'red'
        transparent={true}
        // style
        // background={'fcba03'}
        // background="#5C5CFF"
        // backgroundColo="red"
        // style={{backgroundColor: '#000'}}
        // backgroundColor="#ddd"
      >
        <TouchableOpacity
          onPress={() => setRegisterService(!RegisterService)}
          style={{flex: 1, backgroundColor: '#00000090'}}
        />
        {/* <TouchableOpacity
          onPress={() => setRegisterService(!RegisterService)}
          style={{
            // backgroundColor: 'skyblsue',
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'flex-end',
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}>
          <Text
            style={{
              backgroundColor: '#cc0000',
              borderRadius: 4,
              padding: 4,
              marginRight: 8,
              color: '#fff',
            }}>
            Cancel
          </Text>

          <View
            style={{
              backgroundColor: '#cc0000',
              // padding: 16,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
              width: 50,
            }}>
            <FontAwesome5 name={'times'} size={18} color="#fff" />
          </View>
        </TouchableOpacity> */}
        <View
          style={{
            // flexGrow: 1,
            paddingTop: 8,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            elevation: 12,
            backgroundColor: '#fff',
            // marginTop: 16,
            // justifyContent: 'center',
            // paddingTop: 16,
            // alignItems: 'center',
            paddingHorizontal: 16,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text
              style={{
                flex: 1,
                fontSize: 18,
                borderLeftColor: 'red',
                borderLeftWidth: 2,
                paddingHorizontal: 8,
                marginVertical: 16,
                fontWeight: 'bold',
              }}>
              Register Your Service
            </Text>
            <TouchableOpacity
              onPress={() => setRegisterService(!RegisterService)}
              style={{
                backgroundColor: '#cc0000',
                // padding: 16,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                width: 50,
              }}>
              {/* <Text
            style={{
              backgroundColor: '#cc0000',
              borderRadius: 4,
              padding: 4,
              marginRight: 8,
              color: '#fff',
            }}>
            Cancel
          </Text> */}

              <FontAwesome5 name={'times'} size={18} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text>Choose Category</Text>
          <View
            style={{
              width: '100%',
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Picker
              mode="dropdown"
              style={{width: '95%', height: 40}}
              selectedValue={selectedCategory}
              onValueChange={(itemValue, itemIndex) =>
                setselectedCategory(itemValue)
              }>
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
          </View>

          <TextInput
            style={{
              width: '95%',
              alignSelf: 'center',
              fontSize: 12,
              backgroundColor: '#fff',
              // paddH,
            }}
            // mode="outlined"
            label="Service Name"
            value={serviceName}
            onChangeText={text => setserviceName(text)}
            theme={{colors: {primary: 'red'}}}
          />
          <TextInput
            style={{
              width: '95%',
              alignSelf: 'center',
              fontSize: 12,
              backgroundColor: '#fff',
              // paddH,
            }}
            // mode="outlined"
            label="location"
            value={location}
            onChangeText={text => setlocation(text)}
            theme={{colors: {primary: 'red'}}}
          />
          <TextInput
            style={{
              width: '95%',
              alignSelf: 'center',
              fontSize: 12,
              backgroundColor: '#fff',
              // paddH,
            }}
            // mode="outlined"
            label="phoneNumber"
            value={phoneNumber}
            onChangeText={text => setphoneNumber(text)}
            theme={{colors: {primary: 'red'}}}
          />
          <TextInput
            style={{
              width: '95%',
              alignSelf: 'center',
              fontSize: 12,
              backgroundColor: '#fff',
              // paddH,
            }}
            // mode="outlined"
            label="landLineNumber"
            value={landLineNumber}
            onChangeText={text => landLineNumber(text)}
            theme={{colors: {primary: 'red'}}}
          />

          <CheckBox
            title="Verified ?"
            checked={isVerfied}
            checkedColor="red"
            size={18}
            containerStyle={{
              backgroundColor: 'transparent',
              borderWidth: 0,
              paddingHorizontal: 0,
              // color: 'red',
            }}
            textStyle={{color: isVerfied ? 'red' : 'gray'}}
            onPress={() => setisVerfied(!isVerfied)}
          />

          <TouchableOpacity
            style={{
              backgroundColor: '#cc0000',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 50,
              borderRadius: 4,
              elevation: 4,
              marginVertical: 8,
            }}>
            <Text style={{fontWeight: 'bold', color: '#fff'}}>Register</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

// const mapPropsToState = state => {
//   return {
//     modalVisibility: state.tab,
//   };
// };

// const mapPropsToActions = dispatch => {
//   return {
//     // openModal: () => dispatch(FilterModalState()),
//     openServicesModal: () => dispatch(ServiceFilterModalState()),
//   };
// };

const mapPropsToActions = dispatch => {
  return {
    openServicesModal: () => dispatch(ServiceFilterModalState()),
  };
};
const mapPropsToState = state => {
  return {
    modalVisibility: state.tab_reducer.ServicesModal,
  };
};

export default connect(mapPropsToState, mapPropsToActions)(Services);
