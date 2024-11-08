import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
  Modal,
  Alert,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Button} from 'react-native-elements';
import MultiSelect from 'react-native-multiple-select';
import {TextInput} from 'react-native-paper';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SwipeListView} from 'react-native-swipe-list-view';
import {ProppertiesSample} from '..';
import {addPropertyModalVisibilityAction} from '../../redux/tabs_handler/actions';
import {connect} from 'react-redux';
import {Picker} from '@react-native-picker/picker';
import {cameraPickCover} from '../../utils/CameraUtil';
import {PROPERTIES} from '../../utils/URLS';
import {APIS} from '../../utils/URLS/Urls';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {ToastAndroid} from 'react-native';
import {ScrollView} from 'react-native';

const {height, width} = Dimensions.get('window');
// const Tab = createBottomTabNavigator();

// note user details will get on auto when he/ she register
function ManageProperties(props) {
  const [allProperties, setAllPropperties] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState(false);
  // const getAllProperties = async () => {
  //   const DATA = await fetch(PROPERTIES)
  //     .then(response => response.json())
  //     .then(({properties}) => setAllPropperties(properties.data))
  //     // console.log(properties.data);

  //     .catch(error => {
  //       return console.error(error);
  //     });

  //   // console.log('DATA', DATA);
  //   // return DATA;
  // };
  const [id, setid] = useState('');
  const [title, settitle] = useState('');
  const [shortnote, setShortNote] = useState('');
  const [Location, setLocation] = useState('');
  const [IMG, setIMG] = useState('');
  const [Purpose, setPurpose] = useState('Sale');
  const [Price, setPrice] = useState('');
  const [updateprice, setUpdateprice] = useState('');
  const [updateLocation, setupdateLocation] = useState('');
  const [updatedtitle, setupdateTitle] = useState('');
  const [updatenote, setupdateNote] = useState('');
  const [updatepurpose, setupdatePurpose] = useState('');
  const [updatehousedescription, setupdatehousedescription] = useState('');
  const [Auth_location, setAuth_location] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image1Visibility, setImage1Visibility] = useState(false);
  const [image2Visibility, setImage2Visibility] = useState(false);
  const [image3Visibility, setImage3Visibility] = useState(false);
  const [House_Description, setHouse_Description] = useState('');
  const [editModalVisibility, seteditModalVisibility] = useState(false);
  const [propetyid, setPropertyId] = useState('');
  const [selectedCity, setCity] = useState('key0');
  const [selectedArea, setArea] = useState('key0');
  const [selectedproperty, setPropertyType] = useState('key0');
  const [selectedsize, setSize] = useState('key0');
  const [updateselectedCity, setupdateCity] = useState('key0');
  const [updateselectedArea, setupdateArea] = useState('key0');
  const [updateselectedproperty, setupdatePropertyType] = useState('key0');
  const [updateselectedsize, setupdateSize] = useState('key0');
  const [cities, setCities] = useState([]);
  const states = useSelector(state => state.ConstantReducer);
  const [Areas, setAreas] = useState([]);

  const [Properties, setProperties] = useState([]);
  const [Sizes, setSizes] = useState([]);

  const Areadropdown = id => {
    var myHeaders = new Headers();
    // myHeaders.append('Authorization', `Bearer ${user_token}`);
    myHeaders.append("Authorization",
      'Cookie',
      'XSRF-TOKEN=eyJpdiI6IlpqNXIzVDhuYitXOXcyencyNHhZZmc9PSIsInZhbHVlIjoiNWVqeW1Oam9hQjJnV0RCUndPNlZEOTFmeCtYaGhUL1FmNkh3L2ppVmRBMHdwMVcvWFdSQnpMam9yQkVQSS9vUnN1SzdiSDlGTkRNY0RmVHViZ1NzZTBiTDNxYXdLUjFUSXgzcWkwQlJmaDFKL0ZnMEhtTUlVanlsWlBYbU1kUksiLCJtYWMiOiIwNzY5YjQzMGZkYzBmNzgyOTU1ZGY0NmJjNThhMWUyNjY0YzM4ZDNkYzU4YjdjZmZkMjFkODYxM2RmMTFjMzExIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6ImFyTCtnNzJ2Sm95RTZNWk1EN3NadUE9PSIsInZhbHVlIjoidHFvd1NvTDYvT1hXMTd0RURQUHpvTE5VZHY2cmpxVVVsUVlCNWszZCtzT0xkZnd5R1BjOEkyVzZTZ0psaWpGZTNrUE1jNWVqazdLemRrYTlHNWQzTFNFbElrVFNlR0VLWSt3WkJBSEFGbU50Nkc1R2FUdDBneHp5NldsL3ZwME4iLCJtYWMiOiIwZjIxZmJlN2IyMzdkMWE2M2FkYTZiMDJjZWUyNTNjNzc5NWFmNzMzZWJjNTllMGU1Mjc0MGRhMTU1ZWRlYmI1IiwidGFnIjoiIn0%3D',
    );
   
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
     
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
  const RegisteredBuy = () => {
    //ssToastAndroid.show('password not match', ToastAndroid.
    title === ''
      ? ToastAndroid.show('Title Field Empty', ToastAndroid.SHORT)
      : Location === ''
      ? ToastAndroid.show('Location Field  Empty', ToastAndroid.SHORT)
      : selectedArea === 'key0'
      ? ToastAndroid.show('Select Area', ToastAndroid.SHORT)
      : selectedCity === 'key0'
      ? ToastAndroid.show('Select City', ToastAndroid.SHORT)
      : selectedsize === 'key0'
      ? ToastAndroid.show('Select Size', ToastAndroid.SHORT)
      : selectedproperty === 'key0'
      ? ToastAndroid.show('Select Property Type', ToastAndroid.SHORT)
      : Price === ''
      ? ToastAndroid.show('Price Field Empty', ToastAndroid.SHORT)
      : addProperty();
  };
  const addProperty = async () => {
    if (image1 != '' || image2 != '' || image3 != '') {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${states?.user_token}`);

      myHeaders.append(
        'Cookie',
        'XSRF-TOKEN=eyJpdiI6IlpqNXIzVDhuYitXOXcyencyNHhZZmc9PSIsInZhbHVlIjoiNWVqeW1Oam9hQjJnV0RCUndPNlZEOTFmeCtYaGhUL1FmNkh3L2ppVmRBMHdwMVcvWFdSQnpMam9yQkVQSS9vUnN1SzdiSDlGTkRNY0RmVHViZ1NzZTBiTDNxYXdLUjFUSXgzcWkwQlJmaDFKL0ZnMEhtTUlVanlsWlBYbU1kUksiLCJtYWMiOiIwNzY5YjQzMGZkYzBmNzgyOTU1ZGY0NmJjNThhMWUyNjY0YzM4ZDNkYzU4YjdjZmZkMjFkODYxM2RmMTFjMzExIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6ImFyTCtnNzJ2Sm95RTZNWk1EN3NadUE9PSIsInZhbHVlIjoidHFvd1NvTDYvT1hXMTd0RURQUHpvTE5VZHY2cmpxVVVsUVlCNWszZCtzT0xkZnd5R1BjOEkyVzZTZ0psaWpGZTNrUE1jNWVqazdLemRrYTlHNWQzTFNFbElrVFNlR0VLWSt3WkJBSEFGbU50Nkc1R2FUdDBneHp5NldsL3ZwME4iLCJtYWMiOiIwZjIxZmJlN2IyMzdkMWE2M2FkYTZiMDJjZWUyNTNjNzc5NWFmNzMzZWJjNTllMGU1Mjc0MGRhMTU1ZWRlYmI1IiwidGFnIjoiIn0%3D',
      );
      var formdata = new FormData();

      formdata.append('title', title);
      formdata.append('purpose', Purpose);
      formdata.append('location', selectedArea);
      formdata.append('price', Price);
      // formdata.append('images', fileInput.files[0], '[PROXY]');
      formdata.append('image', {
        uri: image1?.path,
        type: image1.mime,
        name: image1?.path,
      });
      formdata.append('image1', {
        uri: image2?.path,
        type: image2.mime,
        name: image2?.path,
      });
      formdata.append('image2', {
        uri: image3?.path,
        type: image3.mime,
        name: image3?.path,
      });
      formdata.append('description', House_Description);

      formdata.append('user_id', states?.user_data?.id);
      formdata.append('save_add_property', '');

      formdata.append('owner_name', states?.user_data?.name);
      formdata.append('beds', '');
      formdata.append('baths', '');
      formdata.append('email', '');
      formdata.append('phone_number', '');
      formdata.append('mobile_number', '');
      formdata.append('city', selectedCity);
      formdata.append('property_type', selectedproperty);
      formdata.append('property_size', selectedsize);
      formdata.append('area', selectedArea);
      formdata.append('address', Location);
      formdata.append('ispublish', '1');
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };
      await fetch(
        'https://mybahria.com.pk/api/add-property',
        requestOptions,
      )
        .then(response => response.json())
        .then(({status}) => {
          if (status === 'success') {
            props.addPropertyModalVisibilityAction();
            getManageProperty();
            ToastAndroid.show('Added Successfully', ToastAndroid.LONG);
          } else {
            ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
          }
        })
        .catch(error => console.log('error', error));
    } else {
      ToastAndroid.show('Select All Images', ToastAndroid.LONG);
    }
  };

  // const addProperty = async () => {
  //   var myHeaders = new Headers();
  //   myHeaders.append('Authorization', `Bearer ${states?.user_token}`);
  //   var formdata = new FormData();
  //   formdata.append('title', title);
  //   formdata.append('purpose', Purpose);
  //   formdata.append('location', Location);
  //   formdata.append('price', Price);
  //   // formdata.append('images', fileInput.files[0], '[PROXY]');
  //   formdata.append('description', House_Description);

  //   formdata.append('user_id', states?.user_data?.id);

  //   var requestOptions = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     body: formdata,
  //     redirect: 'follow',
  //   };
  //   await fetch(
  //     'http://mybahria.assanhissab.com/api/add-property',
  //     requestOptions,
  //   )
  //     .then(response => response.json())
  //     .then(({status}) => {
  //       if (status === 'success') {
  //         props.addPropertyModalVisibilityAction();
  //       }
  //     })
  //     .catch(error => console.log('error', error));
  // };
  const getCity_Categories = () => {
    fetch(APIS.data_signup_city)
      .then(res => res.json())
      .then(({bahriaCities}) => {
        // setCategories(Category);
        setCities(bahriaCities);
      });
  };
  const getPropertySize = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${states?.user_token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'https://mybahria.com.pk/api/dropdown-property-size',
      requestOptions,
    )
      .then(response => response.json())
      .then(({property_size}) => {
        setSizes(property_size);
      })
      .catch(error => console.log('error', error));
  };

  const getProperType = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${states?.user_token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'https://mybahria.com.pk/api/dropdown-property-type',
      requestOptions,
    )
      .then(response => response.json())
      .then(({property_type}) => {
        setProperties(property_type);
      })
      .catch(error => console.log('error', error));
  };
  const updateproperty = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${states?.user_token}`);
    var formdata = new FormData();

    formdata.append('title', updatedtitle);
    formdata.append('purpose', updatepurpose);
    formdata.append('location', updateLocation);
    formdata.append('price', updateprice);
    formdata.append('ispublish', '1');
    // formdata.append('images', fileInput.files[0], '[PROXY]');
    formdata.append('description', updatehousedescription);
    formdata.append('user_id', states?.user_data?.id);
    formdata.append('id', propetyid);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    fetch(
      'https://mybahria.com.pk/api/save-edit-property',
      requestOptions,
    )
      .then(response => response.json())
      .then(({add_property}) => {
        if (add_property === 'Property Updated Successfully') {
          ToastAndroid.show('Updated Successfully', ToastAndroid.SHORT);
          getManageProperty();
          seteditModalVisibility(false);
        } else {
          ToastAndroid.show('Some Thing Went Wrong', ToastAndroid.SHORT);
        }
      })
      .catch(error => console.log('error', error));
  };
  const pickerLabelName = 'Choose Image';
  const image1VisibilityHandler = () => {
    setImage1Visibility(!image1Visibility);
  };

  const image2VisibilityHandler = () => {
    setImage2Visibility(!image2Visibility);
  };

  const image3VisibilityHandler = () => {
    setImage3Visibility(!image3Visibility);
  };
  const clearImage1 = () => {
    setImage1('');
    image1VisibilityHandler();
  };

  const clearImage2 = () => {
    setImage2('');
    image2VisibilityHandler();
  };

  const clearImage3 = () => {
    setImage3('');
    image3VisibilityHandler();
  };

  const addImage1 = async () => {
    const data = await cameraPickCover();
    setImage1(data);
    image1VisibilityHandler();
  };
  const addImage2 = async () => {
    const data = await cameraPickCover();
    setImage2(data);
    image2VisibilityHandler();
  };
  const addImage3 = async () => {
    const data = await cameraPickCover();
    setImage3(data);
    image3VisibilityHandler();
  };

  const getManageProperty = async () => {
    await fetch(`${APIS.get_manage_property}${states?.user_data?.id}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + states.user_token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(({properties}) => {
        setAllPropperties(properties);
      })
      .catch(error => {
        return console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // const [data, setData] = useState([
  //   {
  //     id: 1,
  //     title: 'Double Storley Askari Villlas',
  //     Location: 'Bahria Enclave',
  //     IMG: require('../../Drawables/latest-2.png'),
  //     Purpose: 'Sale',
  //     Price: '10 Lac',
  //     Added: '6 days ago',
  //     Type: 'House',

  //     authorDetails: [
  //       {name: 'khan'},
  //       {email: '792tanveer@gmail.com'},
  //       {Auth_location: 'Karachi'},
  //     ],
  //     IMAGES: [
  //       require('../../Drawables/gallery-1.png'),
  //       require('../../Drawables/gallery-2.png'),
  //       require('../../Drawables/gallery-3.png'),
  //       require('../../Drawables/gallery-4.png'),
  //     ],
  //     House_Description:
  //       '15 Marla Brand New Double Unit House For Rent 5 Bedroom With Attached Washroom 2 Kitchen',
  //   },
  //   {
  //     id: 2,
  //     title: 'Satelite 1 Canal building',
  //     Location: 'Phase 5',
  //     IMG: require('../../Drawables/latest-2.png'),
  //     Purpose: 'Rent',
  //     Price: '1 Lac',
  //     Added: '6 days ago',
  //     Type: 'Appartment',
  //     authorDetails: [
  //       {name: 'Tanveer ahmed khan'},
  //       {email: '792tanveer@gmail.com'},
  //       {Auth_location: 'Karachi'},
  //     ],
  //     IMAGES: [
  //       require('../../Drawables/gallery-1.png'),
  //       require('../../Drawables/gallery-2.png'),
  //       require('../../Drawables/gallery-3.png'),
  //       require('../../Drawables/gallery-4.png'),
  //     ],
  //     House_Description:
  //       '15 Marla Brand New Double Unit House For Rent 5 Bedroom With Attached Washroom 2 Kitchen',
  //   },

  //   {
  //     id: 3,
  //     title: 'Double Storley Askari Villlas',
  //     Location: 'Bahria Enclave',
  //     IMG: require('../../Drawables/latest-2.png'),
  //     Purpose: 'Sale',
  //     Price: '10 Lac',
  //     Added: '6 days ago',
  //     Type: 'House',
  //     authorDetails: [
  //       {name: 'khan'},
  //       {email: '792tanveer@gmail.com'},
  //       {Auth_location: 'Karachi'},
  //     ],
  //     IMAGES: [
  //       require('../../Drawables/gallery-1.png'),
  //       require('../../Drawables/gallery-2.png'),
  //       require('../../Drawables/gallery-3.png'),
  //       require('../../Drawables/gallery-4.png'),
  //     ],
  //     House_Description:
  //       '15 Marla Brand New Double Unit House For Rent 5 Bedroom With Attached Washroom 2 Kitchen',
  //   },
  //   {
  //     id: 4,
  //     title: 'Double Storley Askari Villlas ',
  //     Location: 'Bahria Enclave',
  //     IMG: require('../../Drawables/latest-2.png'),
  //     Purpose: 'Sale',
  //     Price: '10 Lac',
  //     Added: '6 days ago',
  //     Type: 'House',
  //     authorDetails: [
  //       {name: 'khan'},
  //       {email: '792tanveer@gmail.com'},
  //       {Auth_location: 'Karachi'},
  //     ],
  //     IMAGES: [
  //       require('../../Drawables/gallery-1.png'),
  //       require('../../Drawables/gallery-2.png'),
  //       require('../../Drawables/gallery-3.png'),
  //       require('../../Drawables/gallery-4.png'),
  //     ],
  //     House_Description:
  //       '15 Marla Brand New Double Unit House For Rent 5 Bedroom With Attached Washroom 2 Kitchen',
  //   },
  // ]);

  const showAlert = () =>
    Alert.alert(
      'Delete!',
      'Are you sure to delete?',
      [
        {
          text: 'Yes',
          onPress: () => delete_Property(),
          style: 'yes',
        },
        {
          text: 'Cancel',
          // onPress: () => Alert.alert('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {
        // cancelable: true,
        // onDismiss: () =>
        //   Alert.alert(
        //     'This alert was dismissed by tapping outside of the alert dialog.',
        //   ),
      },
    );
  const renderNewsItem = ({item}) => {
    return (
      <ProppertiesSample
        navigation={props.navigation}
        ITEM={item}
        title={item.title}
        Location={item?.address}
        IMG={item.IMG}
        Purpose={item.Purpose}
        Price={item.Price}
        Added={item.Added}
        Type={item.Type}
        House_Description={item.House_Description}
        IMAGES={item.IMAGES}
        authorDetails={item.authorDetails}
      />
    );
  };
  // const [pickerData, setpickerData] = useState(['Rent', 'Sale']);

  const [currentItem, setcurrentItem] = useState([]);

  const handlerEditModal = item => {
    setcurrentItem(item);
    setTimeout(() => {
      console.log('currentItem', currentItem);

      setActiveModal(true);
      seteditModalVisibility(!editModalVisibility);
    }, 1000);
    // setTimeout(() => {}, 1500);
  };
  const delete_Property = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${states.user_token}`);
    myHeaders.append(
      'Cookie',
      'XSRF-TOKEN=eyJpdiI6Inp3UjE1M3cxblQzZjJCZ3VJZ3RmQkE9PSIsInZhbHVlIjoicUNUdnpsbFdRZzRFMW9EeDMrWFZOZGZ4WTRtTkFrWVhSZWovZmp2T0dvWjNSUllXWUxEeXY4RDgrVW0xUmc3K3pZTnNxUHB0cnI5dE1qdFR6ejJsL3NCQUtuNHNxYTRXaWpEaUpCRzFRc2JlY2ZhaEZ3Q05HRGhORDJQYTREcW8iLCJtYWMiOiI2ZjQ5NzliZTBiOGQ2MjQyM2ZiZjdlZDdkNjQ1ZTA3ZjIyM2VhYTY2MzAyNDJmZTFmODM0NjllZDI1NTc4OTdlIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6InJEVmhBOFBrVjMvMW4zbXFCYXRDYWc9PSIsInZhbHVlIjoiQ3VRQ1QyczU3eWltR3Z3bEhHZFd3eGV3YVY1OGtRWmNxcDhuUWhsZGVrdXhKMXhnRmNwTG5vM2htWEQzbCtsMFprTWJlcGd0QmNMVStRb09PT2FsYm00d2xZSVVHbCtJN20wdzdtUWhYR1A5N3p5UHkwMkJoWUE2VFN3ckFFUjgiLCJtYWMiOiIwMWE5NmY4M2MzYzkxMDRlOWMyY2ZiNzdjOGYyNDE1ZWJlZjUxMzJkMDhiMmYyMDY2Yjk5ODRiYmQ4Mjk1MTU0IiwidGFnIjoiIn0%3D',
    );
    var formdata = new FormData();
    formdata.append('id', propetyid);
    console.log(propetyid);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    fetch('https://mybahria.com.pk/api/delete-property', requestOptions)
      .then(response => response.json())
      .then(res => {
        if (res.delete_property === 'Property Deleted Successfully') {
          ToastAndroid.show('Deleted Successfully', ToastAndroid.LONG);
          getManageProperty();
        } else {
          ToastAndroid.show('Some Thing Went Wrong', ToastAndroid.LONG);
        }
      })
      .catch(error => console.log('error', error));
  };
  useEffect(() => {
    setLoading(true);
    // getAllProperties();
    getManageProperty();
    getCity_Categories();
    getPropertySize();
    getProperType();
  }, []);
  let cityItems = cities.map(item => {
    return <Picker.Item key={item.id} value={item.id} label={item.name} />;
  });
  let sizeItems = Sizes.map(item => {
    return <Picker.Item key={item.id} value={item.id} label={item.title} />;
  });
  let propertiesItems = Properties.map(item => {
    return <Picker.Item key={item.id} value={item.id} label={item.name} />;
  });




  return isLoading ? (
    <ActivityIndicator size="large" color="red" style={{marginVertical: 50}} />
  ) : (
    <View style={{flex: 1}}>
      <SwipeListView
        data={allProperties}
        renderItem={item => renderNewsItem(item)}
        keyExtractor={(item, index) => index}
        renderHiddenItem={({item}, rowMap) => (
          <TouchableOpacity
            onPress={() => rowMap[item.propertylisting_id].closeRow()}
            style={{
              flex: 1,
              // paddingVertical: 16,

              justifyContent: 'center',
              // backgroundColor: 'skyblue',
              alignItems: 'flex-end',
              // marginHorizontal: 30,
              paddingHorizontal: 16,
              width: '90%',
              alignSelf: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                console.log(item, 'ITEM');
                setPropertyId(item?.propertylisting_id),
                  setupdateNote(item?.title);
                setUpdateprice(item?.price);
                setupdatePurpose(item?.purpose);
                // setupdateSize(item?.property_size)
                // setupdatePropertyType(JSON.parse(item?.property_type));
                setupdatehousedescription(item?.description);
                setupdateTitle(item.title);
                setupdateLocation(
                  item['location_info'] === null || undefined
                    ? null
                    : item['location_info']?.name,
                );
                handlerEditModal(item);
              }}
              style={{marginVertical: 8}}>
              {/* <FontAwesome name="edit" rsize={26} color="#cc0000" /> */}
              <MaterialCommunityIcons
                name="file-edit"
                size={26}
                color="#cc0000"
              />
              {/* <MaterialCommunityIcons name="delete" size={26} color="#cc0000" /> */}
              {/* <FontAwesome name="edit" size={26} color="#cc0000" /> */}
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginVertical: 8}}
              onPress={() => {
                setPropertyId(item?.propertylisting_id);
                showAlert();
              }}>
              <MaterialCommunityIcons name="delete" size={26} color="#cc0000" />
              {/* <FontAwesome name="edit" size={26} color="#cc0000" /> */}
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        rightOpenValue={-75}
      />

      <Modal
        onRequestClose={() => props.addPropertyModalVisibilityAction()}
        animationType="slide"
        transparent={true}
        visible={props.addPropertyModalVisibility}>
        {/* <TouchableOpacity
          onPress={() => props.addPropertyModalVisibilityAction()}
          style={{flex: 1}}
        /> */}

        <ScrollView>
          <View
            style={{
              flexGrow: 1,
              backgroundColor: '#fff',
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              paddingVertical: 6,
              paddingHorizontal: 8,
              elevation: 10,
              shadowColor: 'red',
            }}>
            {/* inner form */}
            <View
              style={{
                width: '95%',
                alignSelf: 'center',
                paddingHorizontal: 8,
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
                    color:'black'
                  }}>
                  Add Property For {Purpose}
                </Text>
                <TouchableOpacity
                  onPress={() => props.addPropertyModalVisibilityAction()}
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
                </TouchableOpacity>
              </View>

              <TextInput
                style={{
                  width: '95%',
                  alignSelf: 'center',
                  fontSize: 12,
                  backgroundColor: '#fff',
                  color:'black'
                  // paddH,
                }}
                // mode="outlined"
                label="Title"
                value={title}
                onChangeText={text => settitle(text)}
                theme={{colors: {primary: 'red'}}}
              />
              {/* <TextInput
                style={{
                  width: '95%',
                  alignSelf: 'center',
                  fontSize: 12,
                  backgroundColor: '#fff',
                  // paddH,
                }}
                // mode="outlined"
                label="Short Note about Your Propety"
                value={shortnote}
                onChangeText={value => setShortNote(value)}
                theme={{colors: {primary: 'red'}}}
              /> */}

              <TextInput
                style={{
                  width: '95%',
                  alignSelf: 'center',
                  fontSize: 12,
                  backgroundColor: '#fff',
                  // paddH,
                }}
                // mode="outlined"
                label="Location of Property"
                value={Location}
                onChangeText={text => setLocation(text)}
                theme={{colors: {primary: 'red'}}}
              />
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedCity}
                  onValueChange={(item, index) => {
                    setCity(item);
                    Areadropdown(item);
                  }}
                  mode="dropdown"
                  style={styles.pickerStyle}>
                  <Picker.Item
                    color="#a5a0a0"
                    label="Select City"
                    value="key0"
                  />
                  {cityItems}
                </Picker>
              </View>

              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedArea}
                  onValueChange={(item, index) => setArea(item)}
                  mode="dropdown"
                  style={styles.pickerStyle}>
                  <Picker.Item
                    color="#a5a0a0"
                    label="Select Area"
                    value="key0"
                  />
                  {AreaItems}
                </Picker>
              </View>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedsize}
                  onValueChange={(item, index) => {
                    setSize(item);
                  }}
                  mode="dropdown"
                  style={styles.pickerStyle}>
                  <Picker.Item
                    color="#a5a0a0"
                    label="Select Size"
                    value="key0"
                  />
                  {sizeItems}
                </Picker>
              </View>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedproperty}
                  onValueChange={(item, index) => {
                    setPropertyType(item);
                  }}
                  mode="dropdown"
                  style={styles.pickerStyle}>
                  <Picker.Item
                    color="#a5a0a0"
                    label="Select Property Type"
                    value="key0"
                  />
                  {propertiesItems}
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
                label="Price"
                value={Price}
                keyboardType="number-pad"
                onChangeText={text => setPrice(text)}
                theme={{colors: {primary: 'red'}}}
              />
              <Text
                style={{marginTop: 16, marginBottom: 8, fontWeight: 'bold',color:'black'}}>
                Sale / Rent
              </Text>
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
                  selectedValue={Purpose}
                  // selectedValue={'Sale'}
                  onValueChange={(itemValue, itemIndex) =>
                    setPurpose(itemValue)
                  }>
                  <Picker.Item label="Sale" value="Sale" />
                  <Picker.Item label="Rent" value="Rent" />
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
                mode="outlined"
                label="About Propety"
                multiline={true}
                numberOfLines={6}
                value={House_Description}
                // keyboardType="number-pad"
                onChangeText={text => setHouse_Description(text)}
                theme={{colors: {primary: 'red'}}}
              />

              {/* <CheckBox
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
          /> */}

              <Text
                style={{
                  borderLeftColor: 'red',
                  borderLeftWidth: 3,
                  fontSize: 18,
                  paddingHorizontal: 8,
                  marginTop: 16,
                  fontWeight: 'bold',
                  color:'black'
                }}>
                Pick 3 Images
              </Text>

              <View style={styles.ImagesStyles}>
                <View
                  style={{
                    ...styles.ImageBodyStyle,
                    paddingVertical: image1Visibility ? 0 : 8,
                    backgroundColor: image1Visibility ? 'transparent' : 'gray',
                  }}>
                  {(!image1 == '') & image1Visibility ? (
                    <View>
                      <Image
                        source={{uri: image1.path}}
                        style={{
                          height: 80,
                          width: 80,
                          borderRadius: 10,
                        }}
                      />
                      <TouchableOpacity
                        onPress={clearImage1}
                        style={{position: 'absolute', top: 0, right: 0}}>
                        <FontAwesome name="times" color="firebrick" size={28} />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity onPress={addImage1}>
                      <Text style={{color: '#fff'}}>{pickerLabelName}</Text>
                    </TouchableOpacity>
                  )}
                </View>

                <View
                  style={{
                    ...styles.ImageBodyStyle,
                    marginHorizontal: 12,
                    paddingVertical: image2Visibility ? 0 : 8,

                    backgroundColor: image2Visibility ? 'transparent' : 'gray',
                  }}>
                  {image2Visibility & (!image2 == '') ? (
                    <View style={{flex: 1, alignSelf: 'center'}}>
                      <Image
                        source={{uri: image2.path}}
                        style={{
                          height: 80,
                          width: 80,
                          borderRadius: 10,
                        }}
                      />
                      <TouchableOpacity
                        onPress={clearImage2}
                        style={{position: 'absolute', top: 0, right: 0}}>
                        <FontAwesome name="times" color="firebrick" size={28} />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity onPress={addImage2}>
                      <Text style={{color: '#fff'}}>{pickerLabelName}</Text>
                    </TouchableOpacity>
                  )}
                </View>

                <View
                  style={{
                    ...styles.ImageBodyStyle,
                    paddingVertical: image3Visibility ? 0 : 8,

                    backgroundColor: image3Visibility ? 'transparent' : 'gray',
                  }}>
                  {(!image3 == '') & image3Visibility ? (
                    <View>
                      <Image
                        source={{uri: image3.path}}
                        style={{
                          height: 80,
                          width: 80,
                          borderRadius: 10,
                        }}
                      />
                      <TouchableOpacity
                        onPress={clearImage3}
                        style={{position: 'absolute', top: 0, right: 0}}>
                        <FontAwesome name="times" color="firebrick" size={28} />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity onPress={addImage3}>
                      <Text style={{color: '#fff'}}>{pickerLabelName}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              <TouchableOpacity
                onPress={() => {
                  RegisteredBuy();
                }}
                style={{
                  backgroundColor: '#cc0000',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: 50,
                  borderRadius: 4,
                  elevation: 4,
                  marginVertical: 8,
                }}>
                <Text style={{fontWeight: 'bold', color: '#fff'}}>
                  Add Property for {Purpose}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Modal>

      {activeModal ? (
        <Modal
          onRequestClose={() => seteditModalVisibility(!editModalVisibility)}
          visible={editModalVisibility}
          animationType="slide">
          <View
            style={{
              flexGrow: 1,
              backgroundColor: '#fff',
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              paddingVertical: 6,
              paddingHorizontal: 8,
              elevation: 10,
              shadowColor: 'red',
            }}>
            {/* inner form */}
            <View
              style={{
                width: '95%',
                alignSelf: 'center',
                paddingHorizontal: 8,
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
                    color:'black'
            
                  }}>
                  Edit
                </Text>
                <TouchableOpacity
                  onPress={() => seteditModalVisibility(!editModalVisibility)}
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
                </TouchableOpacity>
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
                label="Title"
                value={updatedtitle}
                onChangeText={text => setupdateTitle(text)}
                theme={{colors: {primary: 'red'}}}
              />
              {/* <TextInput
                style={{
                  width: '95%',
                  alignSelf: 'center',
                  fontSize: 12,
                  backgroundColor: '#fff',
                  // paddH,
                }}
                // mode="outlined"
                label="Short Note about Your Propety"
                value={updatenote}
                onChangeText={text => setupdateNote(text)}
                theme={{colors: {primary: 'red'}}}
              /> */}
              <TextInput
                style={{
                  width: '95%',
                  alignSelf: 'center',
                  fontSize: 12,
                  backgroundColor: '#fff',
                  // paddH,
                }}
                // mode="outlined"
                label="Location of Property"
                value={updateLocation}
                onChangeText={text => setupdateLocation(text)}
                theme={{colors: {primary: 'red'}}}
              />
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={updateselectedCity}
                  onValueChange={(item, index) => {
                    setupdateCity(item);
                    Areadropdown(item);
                  }}
                  mode="dropdown"
                  style={styles.pickerStyle}>
                  <Picker.Item
                    color="#a5a0a0"
                    label="Select City"
                    value="key0"
                  />
                  {cityItems}
                </Picker>
              </View>

              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={updateselectedArea}
                  onValueChange={(item, index) => setupdateArea(item)}
                  mode="dropdown"
                  style={styles.pickerStyle}>
                  <Picker.Item
                    color="#a5a0a0"
                    label="Select Area"
                    value="key0"
                  />
                  {AreaItems}
                </Picker>
              </View>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={updateselectedsize}
                  onValueChange={(item, index) => {
                    setupdateSize(item);
                  }}
                  mode="dropdown"
                  style={styles.pickerStyle}>
                  <Picker.Item
                    color="#a5a0a0"
                    label="Select Size"
                    value="key0"
                  />
                  {sizeItems}
                </Picker>
              </View>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={updateselectedproperty}
                  onValueChange={(item, index) => {
                    setupdatePropertyType(item);
                  }}
                  mode="dropdown"
                  style={styles.pickerStyle}>
                  <Picker.Item
                    color="#a5a0a0"
                    label="Select Property Type"
                    value="key0"
                  />
                  {propertiesItems}
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
                label="Price"
                value={updateprice}
                keyboardType="number-pad"
                onChangeText={text => setUpdateprice(text)}
                theme={{colors: {primary: 'red'}}}
              />
              <Text
                style={{marginTop: 16, marginBottom: 8, fontWeight: 'bold',color:'black'}}>
                Sale / Rent
              </Text>
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
                  // selectedValue={
                  //   currentItem.purpose.toLowerCase() == 'sale'
                  //     ? 'Sale'
                  //     : 'Rent'
                  // }
                  // selectedValue={'Sale'}
                  onValueChange={(itemValue, itemIndex) =>
                    setupdatePurpose(itemValue)
                  }>
                  <Picker.Item label="Sale" value="Sale" />
                  <Picker.Item label="Rent" value="Rent" />
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
                mode="outlined"
                label="About Propety"
                multiline={true}
                numberOfLines={6}
                value={updatehousedescription}
                // keyboardType="number-pad"
                onChangeText={text => setupdatehousedescription(text)}
                theme={{colors: {primary: 'red'}}}
              />

              {/* <CheckBox
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
          /> */}

              {/* <Text
                style={{
                  borderLeftColor: 'red',
                  borderLeftWidth: 3,
                  fontSize: 18,
                  paddingHorizontal: 8,
                  marginTop: 16,
                  fontWeight: 'bold',
                }}>
                Pick 3 Images
              </Text>

              <View style={styles.ImagesStyles}>
                <View
                  style={{
                    ...styles.ImageBodyStyle,
                    paddingVertical: image1Visibility ? 0 : 8,
                    backgroundColor: image1Visibility ? 'transparent' : 'gray',
                  }}>
                  {(!image1 == '') & image1Visibility ? (
                    <View>
                      <Image
                        source={{uri: image1}}
                        style={{
                          height: 80,
                          width: 80,
                          borderRadius: 10,
                        }}
                      />
                      <TouchableOpacity
                        onPress={clearImage1}
                        style={{position: 'absolute', top: 0, right: 0}}>
                        <FontAwesome name="times" color="firebrick" size={28} />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity onPress={addImage1}>
                      <Text style={{color: '#fff'}}>{pickerLabelName}</Text>
                    </TouchableOpacity>
                  )}
                </View>

                <View
                  style={{
                    ...styles.ImageBodyStyle,
                    marginHorizontal: 12,
                    paddingVertical: image2Visibility ? 0 : 8,

                    backgroundColor: image2Visibility ? 'transparent' : 'gray',
                  }}>
                  {image2Visibility & (!image2 == '') ? (
                    <View style={{flex: 1, alignSelf: 'center'}}>
                      <Image
                        source={{uri: image2}}
                        style={{
                          height: 80,
                          width: 80,
                          borderRadius: 10,
                        }}
                      />
                      <TouchableOpacity
                        onPress={clearImage2}
                        style={{position: 'absolute', top: 0, right: 0}}>
                        <FontAwesome name="times" color="firebrick" size={28} />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity onPress={addImage2}>
                      <Text style={{color: '#fff'}}>{pickerLabelName}</Text>
                    </TouchableOpacity>
                  )}
                </View>

                <View
                  style={{
                    ...styles.ImageBodyStyle,
                    paddingVertical: image3Visibility ? 0 : 8,

                    backgroundColor: image3Visibility ? 'transparent' : 'gray',
                  }}>
                  {(!image3 == '') & image3Visibility ? (
                    <View>
                      <Image
                        source={{uri: image3}}
                        style={{
                          height: 80,
                          width: 80,
                          borderRadius: 10,
                        }}
                      />
                      <TouchableOpacity
                        onPress={clearImage3}
                        style={{position: 'absolute', top: 0, right: 0}}>
                        <FontAwesome name="times" color="firebrick" size={28} />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity onPress={addImage3}>
                      <Text style={{color: '#fff'}}>{pickerLabelName}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View> */}

              <TouchableOpacity
                onPress={() => {
                  updateproperty();
                }}
                style={{
                  backgroundColor: '#cc0000',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: 50,
                  borderRadius: 4,
                  elevation: 4,
                  marginVertical: 8,
                }}>
                <Text style={{fontWeight: 'bold', color: '#fff'}}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 8,
    flex: 1,
  },
  ImagesStyles: {
    paddingVertical: 4,
    marginVertical: 18,
    justifyContent: 'space-evenly',

    flexDirection: 'row',
  },
  ImageBodyStyle: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 5,
    alignItems: 'center',
  },
  pickerStyle: {
    color: '#929294',
    fontSize: 11,
    height: 50,
    width: '100%',
  },
  inputStyle: {
    color: '#000',

    backgroundColor: 'transparent',
    // justifyContent: 'space-between',/

    fontSize: 14,
    height: 60,
    // borderColor: '#53607d',
    width: '100%',
    fontFamily: 'ldfcomicsans',
    paddingTop: 10,
  },
  pickerContainer: {
    marginBottom: 8,
    borderBottomColor: '#d8d6db',
    borderBottomWidth: 0.5,
    marginHorizontal: 0,
    paddingHorizontal: 0,
  },
  btnBg: {
    paddingVertical: 8,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    marginBottom: 18,
  },
  btnTitleStyle: {
    color: '#fff',
    fontSize: 18,
  },
});

const mapStateToProps = state => {
  return {
    addPropertyModalVisibility: state.tab_reducer.addPropertyModalVisibility,
  };
};
const mapActionToProps = dispatch => {
  return {
    addPropertyModalVisibilityAction: () =>
      dispatch(addPropertyModalVisibilityAction()),
  };
};

export default connect(mapStateToProps, mapActionToProps)(ManageProperties);
