import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Modal,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import styles from './styles';
import styles2 from '../SignUp/styles';
import CustomHeader from '../CustomHeader/CustomHeader';
import SellItemSample from './SellItemSample/SellItemSample';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {cameraPickCover, requestPermission} from '../../utils/CameraUtil';

import {Picker} from '@react-native-picker/picker';
// import ManageItemSample from './ManageItemSample/ManageItemSample';
import {connect} from 'react-redux';
import {
  addNewItemSellPurchase,
  addNewItem,
} from '../../redux/tabs_handler/actions';
import {SwipeListView} from 'react-native-swipe-list-view';
import {alignSelf} from 'styled-system';
import {APIS} from '../../utils/URLS/Urls';
import {useDispatch, useSelector, useStore} from 'react-redux';
import CustomButton from '../../utils/CustomButton';
import {ToastAndroid} from 'react-native';

function ManageSells(props) {
  const {user_data, user_token} = useSelector(state => state.ConstantReducer);
  const [image1, setImage1] = useState('');

  const [image1Visibility, setImage1Visibility] = useState(false);
  const states = useSelector(state => state.ConstantReducer);
  const [House_Description, setHouse_Description] = useState();
  console.log(user_token, 'user_token');
  const [cityId, setcityId] = useState(0);
  const [selectedCity, setCity] = useState('key0');
  const [areaId, setareaId] = useState(0);
  const [selectedArea, setArea] = useState('key0');
  const [purchaseReq, setPurchaseReq] = useState([]);
  const [sellReq, setsellReq] = useState([]);
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState('');
  const [showItems, setShowItems] = useState('p_r');
  const [title, settitle] = useState('');
  const [categoryId, setcategoryId] = useState(0);
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState('');
  const [id, setId] = useState('');
  const [image2, setImage2] = useState('');

  const [image2Visibility, setImage2Visibility] = useState(false);
  const [selectedResident, setResident] = useState('key0');
  const [selectedCategory, setCategory] = useState('key0');
  const [category, setCategories] = useState([]);
  const image2VisibilityHandler = () => {
    setImage2Visibility(!image2Visibility);
  };
  const clearImage2 = () => {
    setImage2('');
    image2VisibilityHandler();
  };
  const addImage2 = async () => {
    const data = await cameraPickCover();
    setImage2(data);
    image2VisibilityHandler();
  };

  const RegisteredBuy = () => {
    //ssToastAndroid.show('password not match', ToastAndroid.SHORT);
    unit === ''
      ? ToastAndroid.show('Unit Field Empty', ToastAndroid.SHORT)
      : title === ''
      ? ToastAndroid.show('Title Field Empty', ToastAndroid.SHORT)
      : price === ''
      ? ToastAndroid.show('Price Field  Empty', ToastAndroid.SHORT)
      : selectedResident === 'key0'
      ? ToastAndroid.show('Select Published', ToastAndroid.SHORT)
      : selectedCategory === 'key0'
      ? ToastAndroid.show('Select Category', ToastAndroid.SHORT)
      : addbuy();
  };
  const addbuy = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${states.user_token}`);
    var formdata = new FormData();
    formdata.append('title', title);
    formdata.append('unit', unit);
    formdata.append('image', {
      uri: image2?.path,
      type: image2.mime,
      name: image2?.path,
    });
    formdata.append('category', selectedCategory);
    formdata.append('rate', price);
    formdata.append('description', House_Description);
    formdata.append('ispublish', selectedResident);
    formdata.append('add-save-page', '');
    formdata.append('user_id', states?.user_data?.id);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    fetch('https://mybahria.com.pk/api/buy-save-page', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.add_buy === 'buy Data added Succesfully') {
          props.openModall();
        } else {
          ToastAndroid.show('Some Thing Went Wrong', ToastAndroid.LONG);
        }
      })
      .catch(error => console.log('error', error));
  };

  const deleteSell = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${states?.user_token}`);
    var formdata = new FormData();
    formdata.append('id', id);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    fetch('https://mybahria.com.pk/api/delete-buy', requestOptions)
      .then(response => response.json())
      .then(({delete_buy}) => {
        if (delete_buy === 'Delete buy has been successfully') {
          ToastAndroid.show('Deleted Successfully', ToastAndroid.LONG);
          BuyandSell();
        } else {
          ToastAndroid.show('Some Thing Went Wrong', ToastAndroid.LONG);
        }
      })
      .catch(error => console.log('error', error));
  };

  const BuyandSell = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${states.user_token}`);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    fetch(
      `https://mybahria.com.pk/api/manage-sells/${states.user_data?.id}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(({buy}) => {
        console.log(buy), setsellReq(buy);
      })
      .catch(error => console.log('error', error));
  };
  const RegisteredSell = () => {
    //ssToastAndroid.show('password not match', ToastAndroid.SHORT);
    unit === ''
      ? ToastAndroid.show('Unit Field Empty', ToastAndroid.SHORT)
      : title === ''
      ? ToastAndroid.show('Title Field Empty', ToastAndroid.SHORT)
      : price === ''
      ? ToastAndroid.show('Price Field  Empty', ToastAndroid.SHORT)
      : selectedResident === 'key0'
      ? ToastAndroid.show('Select Published', ToastAndroid.SHORT)
      : selectedCategory === 'key0'
      ? ToastAndroid.show('Select Category', ToastAndroid.SHORT)
      : addSell();
  };
  const addSell = () => {
    if (image1 === '' && image1 === null) {
      ToastAndroid.show('Choose Image', ToastAndroid.LONG);
    } else {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${states.user_token}`);
      var formdata = new FormData();
      formdata.append('image', {
        uri: image1?.path,
        type: image1.mime,
        name: image1?.path,
      });
      formdata.append('title', title);
      formdata.append('unit', unit);
      // formdata.append("city", "rwp");
      // formdata.append("area", "04545454545");
      formdata.append('category', selectedCategory);
      formdata.append('rate', price);
      formdata.append('description', House_Description);
      formdata.append('ispublish', selectedResident);
      formdata.append('user_id', states?.user_data?.id);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };
      fetch('https://mybahria.com.pk/api/add-sells', requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.status === 'success') {
            props.openModall();
            getPurchaseRequest();
          } else {
            ToastAndroid.show('Some Thing Went Wrong', ToastAndroid.LONG);
          }
        })
        .catch(error => console.log('error', error));
    }
  };
  const [cities, setCities] = useState([
    {
      id: '1',
      name: 'Lahore',
      value: 'lhr',
    },
    {
      id: '2',
      name: 'karachi',
      value: 'kr',
    },
    {
      id: '3',
      name: 'Islamabad',
      value: 'isl',
    },
    {
      id: '4',
      name: 'Peshawar',
      value: 'pesh',
    },
  ]);
  const image1VisibilityHandler = () => {
    setImage1Visibility(!image1Visibility);
  };
  const addImage1 = async () => {
    const data = await cameraPickCover();

    setImage1(data);
    image1VisibilityHandler();
  };
  const clearImage1 = () => {
    setImage1('');
    image1VisibilityHandler();
  };
  let cityItems = cities.map(item => {
    return <Picker.Item key={item.id} value={item.name} label={item.name} />;
  });
  const [Areas, setAreas] = useState([
    {
      id: '1',
      name: 'BahriaEnclave',
      value: '1',
    },
    {
      id: '2',
      name: 'BahriaTown',
      value: '2',
    },
    // {
    //   id: '3',
    //   name: 'empty',
    //   value: 'empty',
    // },
    // {
    //   id: '4',
    //   name: 'empty',
    //   value: 'empty',
    // },s
  ]);
  const business_categoryIndex = (item, index) => {
    setCategory(item);
    console.log(item);
    let INDEX = category[index - 1]['id'];
    console.log(INDEX, category[index - 1]['title']);
    setcategoryId(INDEX);
  };
  let categoryItems = category.map(item => {
    return <Picker.Item key={item.id} value={item.id} label={item.title} />;
  });

  const citiesss = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${states?.user_token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'https://mybahria.com.pk/api/dropdown-sell-category',
      requestOptions,
    )
      .then(response => response.json())
      .then(({property_item_cat}) => setCategories(property_item_cat))
      .catch(error => console.log('error--->', error));
  };
  const deleteItem = () => {
    Alert.alert('Delete Item', 'Are you sure to delete this item?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'DELETE',
        onPress: () =>
          setTimeout(() => {
            deleteSell();
          }, 1000),
      },
    ]);
  };

  const getPurchaseRequest = async () => {
    await fetch(`${APIS.get_Purchase}UserId=${user_data.id}`, {
      headers: {
        Authorization: 'Bearer ' + user_token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(({PurchaseRequests}) => {
        console.log(PurchaseRequests, 'Purchase');
        setPurchaseReq(PurchaseRequests);
      })
      .catch(error => {
        console.error(error);
      });
  };
  const getSellRequest = async () => {
    await fetch(`${APIS.get_Sell}?UserId=${user_data.id}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + user_token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(({Sells}) => {
        setsellReq(Sells);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(async () => {
    //  getCity_Categories();
    getPurchaseRequest();
    BuyandSell();
    citiesss();
    //  getSellRequest();
  }, []);
  let AreaItems = Areas.map(item => {
    return <Picker.Item key={item.id} value={item.name} label={item.name} />;
  });
  const setAreaHandler = (item, index) => {
    let ID = cities[index - 1]['id'];

    setCity(item);
    setcityId(ID);

    fetch(`${APIS.data_signup_area}?city_id=${ID}`, {method: 'POST'})
      .then(res => res.json())
      .then(({area}) => {
        setAreas(area);
      });
  };
  const [data, setData] = useState([
    {
      id: 1,
      item: 'item 1',
      category: 'wood',
      rs: '255',
      statue: 'published',
    },

    {
      id: 2,
      item: 'item 2',
      category: 'Home Appliances',
      rs: '700',
      statue: 'draft',
    },

    {
      id: 3,
      item: 'item 3',
      category: 'cooking',
      rs: '450',
      statue: 'published',
    },
    {
      id: 4,
      item: 'item 3',
      category: 'cooking',
      rs: '450',
      statue: 'published',
    },
    {
      id: 5,
      item: 'item 3',
      category: 'cooking',
      rs: '450',
      statue: 'published',
    },
  ]);
  const renderItem = ({item}) => {
    return (
      <SellItemSample
        // onEditPress={visibilityHandler}
        item={item.title}
        image={item.uploaded_by}
        category={item.category}
        rs={item.rate}
        id={item.id}
        des={item.description}
        statue={item.ispublish === 1 ? 'Publish' : 'Not Publish'}
      />
    );
  };

  const visibilityHandler = () => {
    setVisible(!visible);
  };
  const pickerLabelName = 'Choose Image';
  // const buttonsData = [
  //   {
  //     label: 'Buy',
  //     icon: 'commenting',
  //     numberOfItems: !purchaseReq?.length ? '0' : purchaseReq?.length,
  //     onPress: () => setShowItems('buy'),
  //   },
  //   {
  //     label: 'Sell',
  //     icon: 'cart-arrow-down',
  //     numberOfItems: !sellReq?.length ? '0' : sellReq?.length,
  //     onPress: () => setShowItems('sell'),
  //   },
  // ];

  // const ItemCardSample = ({label, icon, numberOfItems, onPress}) => {
  //   return (
  //     <TouchableOpacity
  //       onPress={onPress}
  //       style={{
  //         // width: '95%',
  //         flex: 1,
  //         height: 50,
  //         flexDirection: 'row',
  //         justifyContent: 'space-between',
  //         paddingHorizontal: 16,
  //         alignItems: 'center',
  //         marginVertical: 20,
  //         borderRadius: 8,
  //         alignSelf: 'center',
  //         marginHorizontal: 16,
  //         backgroundColor: showItems === label.toLowerCase() ? '#ccc' : '#fff',
  //         // elevation: 10,
  //         // shadowColor: 'red',
  //       }}>
  //       <Text>{label}</Text>
  //       <Text
  //         style={{
  //           borderRadius: 50,
  //           backgroundColor: 'red',
  //           color: '#fff',
  //           height: 30,
  //           width: 30,
  //           textAlign: 'center',
  //           textAlignVertical: 'center',
  //           // borderWidth: 3,
  //           // borderColor: showItems === label ? '#ccc' : '#fff',
  //           fontSize: 12,
  //           fontWeight: '500',
  //         }}>
  //         {numberOfItems}
  //       </Text>
  //     </TouchableOpacity>
  //   );
  // };

  const PurchaseRequestSample = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          width: '95%',
          height: 60,
          backgroundColor: '#fff',
          elevation: 10,
          marginVertical: 8,
          alignSelf: 'center',
          borderRadius: 8,
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 8,
        }}>
        <Text style={{flex: 1}}>{item.title}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'baseline',
            flex: 1,
          }}>
          <FontAwesome name={'user'} color="firebrick" size={14} />
          <Text
            style={{
              flex: 1,
              fontSize: 12,
              paddingHorizontal: 4,
            }}>
            {!item?.residence_info?.name
              ? 'No Data in Api'
              : item?.residence_info?.name}
          </Text>
          <Fontisto name={'date'} color="firebrick" size={14} />
          <Text
            style={{
              flex: 1,
              fontSize: 12,
              paddingHorizontal: 8,
              // backgroundColor: 'red',
            }}>
            {item.purchases_date}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.body}>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View
          style={{
            backgroundColor: '#fff',
            height: 70,
            marginVertical: 8,
            flexDirection: 'row',
          }}>
          {/* {buttonsData?.map(item => ItemCardSample(item))} */}
        </View>

        {showItems === 'buy' ? (
          <View style={{backgroundColor: '#fff', flex: 1}}>
            <FlatList data={purchaseReq} renderItem={PurchaseRequestSample} />
          </View>
        ) : (
          <SwipeListView
            data={sellReq}
            renderItem={item => renderItem(item)}
            keyExtractor={item => item.id}
            renderHiddenItem={({item}, rowMap) => (
              <TouchableOpacity
                onPress={() => {
                  rowMap[item.id].closeRow();
                }}
                style={{
                  flex: 1,
                  backgroundColor: '#fff',
                  marginVertical: 16,
                  width: '80%',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  paddingHorizontal: 10,
                }}>
                <TouchableOpacity
                  onPress={() => (
                    setId(item?.id), deleteItem(), rowMap[item.id].closeRow()
                  )}>
                  <AntDesign name="delete" color="firebrick" size={18} />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
            // leftOpenValue={75}
            rightOpenValue={-75}
            // stopLeftSwipe={true}
          />
        )}
      </View>

      <Modal
        onRequestClose={() => props.openModal()}
        transparent={true}
        visible={props.addModalVisibility}
        animationType="slide">
        <TouchableOpacity
          onPress={() => props.openModal()}
          style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}
        />
        <View style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <View
            style={{
              minHeight: 150,
              backgroundColor: '#fff',
              paddingVertical: 16,
              paddingHorizontal: 8,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              elevation: 12,
            }}>
            <CustomButton
              style={styles.btnBg}
              OnPRESS={() => {
                setAction('addbuy'), props.openModall(props.openModal());
              }}
              bgColor="firebrick"
              title="Add Buy"
              btnTitleStyle={styles.btnLabel}
            />
            <CustomButton
              style={styles.btnBg}
              OnPRESS={() => {
                setAction('addsell');
                props.openModall(props.openModal());
              }}
              bgColor="firebrick"
              title="Add Sell"
              btnTitleStyle={styles.btnLabel}
            />
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" visible={props.modalVisibility}>
        <View style={styles.iconsView}>
          <TouchableOpacity
            onPress={() => props.openModall()}
            style={{padding: 4, alignSelf: 'center'}}>
            <Ionicons name="arrow-back" color="#fff" size={20} />
          </TouchableOpacity>
          <Text style={styles.title}>Add New Item</Text>
        </View>
        {action === 'addbuy' ? (
          <ScrollView style={{flex: 1, width: '100%'}}>
            <TextInput
              style={{
                width: '95%',
                alignSelf: 'center',
                fontSize: 12,
                backgroundColor: '#fff',
                // paddH,
              }}
              // mode="outlined"
              label="Unit"
              value={unit}
              keyboardType="numeric"
              onChangeText={text => setUnit(text)}
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
              label="Title"
              value={title}
              onChangeText={text => settitle(text)}
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
              label="Price"
              value={price}
              keyboardType="numeric"
              onChangeText={text => setPrice(text)}
              theme={{colors: {primary: 'red'}}}
            />
            {/* <View
              style={{
                marginBottom: 8,
                borderBottomColor: '#d8d6db',
                borderBottomWidth: 0.5,
                marginHorizontal: 0,
                paddingHorizontal: 0,
              }}>
              <Picker
                selectedValue={selectedCity}
                onValueChange={(item, index) => setAreaHandler(item, index)}
                mode="dropdown"
                style={{
                  color: '#929294',
                  fontSize: 11,
                  height: 50,
                  width: '100%',
                }}>
                <Picker.Item color="#a5a0a0" label="Select City" value="key0" />
                {cityItems}
              </Picker>
            </View> */}

            {/* <View
              style={{
                marginBottom: 8,
                borderBottomColor: '#d8d6db',
                borderBottomWidth: 0.5,
                marginHorizontal: 0,
                paddingHorizontal: 0,
              }}>
            
              <Picker
                selectedValue={selectedArea}
                onValueChange={(item, index) => setAreaIndex(item, index)}
                mode="dropdown"
                style={{
                  color: '#929294',
                  fontSize: 11,
                  height: 50,
                  width: '100%',
                }}>
                <Picker.Item color="#a5a0a0" label="Select Area" value="key0" />
                {AreaItems}
              </Picker>
            </View> */}
            <View
              style={{
                marginBottom: 8,
                borderBottomColor: '#d8d6db',
                borderBottomWidth: 0.5,
                marginHorizontal: 0,
                paddingHorizontal: 0,
              }}>
              <Picker
                selectedValue={selectedCategory}
                onValueChange={(item, index) =>
                  business_categoryIndex(item, index)
                }
                mode="dropdown"
                style={{
                  color: '#929294',
                  fontSize: 11,
                  height: 50,
                  width: '100%',
                }}>
                <Picker.Item
                  color="#a5a0a0"
                  label="Select Category"
                  value="key0"
                />
                {categoryItems}
              </Picker>
            </View>
            <View style={styles2.pickerContainer}>
           
              <Picker
                selectedValue={selectedResident}
                onValueChange={(itemValue, itemIndex) => setResident(itemValue)}
                mode="dropdown"
                style={styles2.pickerStyle}>
                <Picker.Item
                  color="#a5a0a0"
                  label="Select Published Type"
                  value="key0"
                  enabled={true}
                />
                <Picker.Item color="#a5a0a0" label="Publish" value="1" />
                <Picker.Item color="#a5a0a0" label="Not Publish" value="0" />
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
              label="Description"
              multiline={true}
              numberOfLines={6}
              value={House_Description}
              // keyboardType="number-pad"
              onChangeText={text => setHouse_Description(text)}
              theme={{colors: {primary: 'red'}}}
            />
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                borderRadius: 5,
                alignItems: 'center',
                marginTop: 20,
                marginHorizontal: 12,
                paddingVertical: image2Visibility ? 0 : 8,

                backgroundColor: image2Visibility ? 'transparent' : 'gray',
              }}>
              {image2Visibility & (!image2 == '') ? (
                <View style={{flex: 1, alignSelf: 'flex-start'}}>
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
                marginVertical: 20,
                width: '95%',
                alignSelf: 'center',
              }}>
              <Text style={{fontWeight: 'bold', color: '#fff'}}>Save</Text>
            </TouchableOpacity>
          </ScrollView>
        ) : action === 'addsell' ? (
          <ScrollView
            style={{flex: 1, width: '90%', alignSelf: 'center', marginTop: 20}}>
            <TextInput
              style={{
                width: '95%',
                alignSelf: 'center',
                fontSize: 12,
                backgroundColor: '#fff',
                // paddH,
              }}
              // mode="outlined"
              label="Unit"
              value={unit}
              keyboardType="numeric"
              onChangeText={text => setUnit(text)}
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
              label="Title"
              value={title}
              onChangeText={text => settitle(text)}
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
              label="Price"
              value={price}
              keyboardType="numeric"
              onChangeText={text => setPrice(text)}
              theme={{colors: {primary: 'red'}}}
            />
            {/* <View
              style={{
                marginBottom: 8,
                borderBottomColor: '#d8d6db',
                borderBottomWidth: 0.5,
                marginHorizontal: 0,
                paddingHorizontal: 0,
              }}>
              <Picker
                selectedValue={selectedCity}
                onValueChange={(item, index) => setAreaHandler(item, index)}
                mode="dropdown"
                style={{
                  color: '#929294',
                  fontSize: 11,
                  height: 50,
                  width: '100%',
                }}>
                <Picker.Item color="#a5a0a0" label="Select City" value="key0" />
                {cityItems}
              </Picker>
            </View> */}

            {/* <View
              style={{
                marginBottom: 8,
                borderBottomColor: '#d8d6db',
                borderBottomWidth: 0.5,
                marginHorizontal: 0,
                paddingHorizontal: 0,
              }}>
            
              <Picker
                selectedValue={selectedArea}
                onValueChange={(item, index) => setAreaIndex(item, index)}
                mode="dropdown"
                style={{
                  color: '#929294',
                  fontSize: 11,
                  height: 50,
                  width: '100%',
                }}>
                <Picker.Item color="#a5a0a0" label="Select Area" value="key0" />
                {AreaItems}
              </Picker>
            </View> */}
            <View
              style={{
                marginBottom: 8,
                borderBottomColor: '#d8d6db',
                borderBottomWidth: 0.5,
                marginHorizontal: 0,
                paddingHorizontal: 0,
              }}>
              <Picker
                selectedValue={selectedCategory}
                onValueChange={(item, index) =>
                  business_categoryIndex(item, index)
                }
                mode="dropdown"
                style={{
                  color: '#929294',
                  fontSize: 11,
                  height: 50,
                  width: '100%',
                }}>
                <Picker.Item
                  color="#a5a0a0"
                  label="Select Category"
                  value="key0"
                />
                {categoryItems}
              </Picker>
            </View>
            <View style={styles2.pickerContainer}>
              <Picker
                selectedValue={selectedResident}
                onValueChange={(itemValue, itemIndex) => setResident(itemValue)}
                mode="dropdown"
                style={styles2.pickerStyle}>
                <Picker.Item
                  color="#a5a0a0"
                  label="Select Published Type"
                  value="key0"
                  enabled={true}
                />
                <Picker.Item color="#a5a0a0" label="Publish" value="0" />
                <Picker.Item color="#a5a0a0" label="Not Publish" value="1" />
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
              label="Description"
              multiline={true}
              numberOfLines={6}
              value={House_Description}
              // keyboardType="number-pad"
              onChangeText={text => setHouse_Description(text)}
              theme={{colors: {primary: 'red'}}}
            />

            <View
              style={{
                paddingHorizontal: 8,

                flex: 1,
                marginTop: 20,
                width: '95%',
                marginHorizontal: 8,
                paddingVertical: image1Visibility ? 0 : 8,
                backgroundColor: image1Visibility ? 'transparent' : 'gray',
              }}>
              {(!image1 == '') & image1Visibility ? (
                <View>
                  <Image
                    source={{uri: image1?.path}}
                    style={{
                      height: 80,
                      width: 80,
                      borderRadius: 10,
                    }}
                  />
                  <TouchableOpacity
                    onPress={clearImage1}
                    style={{position: 'absolute', left: 55}}>
                    <FontAwesome name="times" color="firebrick" size={28} />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={addImage1}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#fff'}}>{pickerLabelName}</Text>
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity
              onPress={() => {
                RegisteredSell();
              }}
              style={{
                backgroundColor: '#cc0000',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 50,
                borderRadius: 4,
                elevation: 4,
                marginVertical: 20,
                width: '95%',
                alignSelf: 'center',
              }}>
              <Text style={{fontWeight: 'bold', color: '#fff'}}>Save</Text>
            </TouchableOpacity>
          </ScrollView>
        ) : null}
        {/* 
        <ManageItemSample sendReq="addnew" /> */}
      </Modal>
    </SafeAreaView>
  );
}

const mapStateToProps = state => {
  return {
    modalVisibility: state.tab_reducer.addNewItemSellPurchase,
    addModalVisibility: state.tab_reducer.addNewItem,
  };
};

const mapActionToProps = dispatch => {
  return {
    openModall: () => dispatch(addNewItemSellPurchase()),
    openModal: () => dispatch(addNewItem()),
  };
};

export default connect(mapStateToProps, mapActionToProps)(ManageSells);
