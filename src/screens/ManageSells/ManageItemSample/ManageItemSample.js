import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
  ScrollView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';
import {TextInput} from 'react-native-paper';
import {cameraPickCover} from '../../../utils/CameraUtil';
import CustomButton from '../../../utils/CustomButton';
import {APIS} from '../../../utils/URLS/Urls';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {Header} from 'react-native/Libraries/NewAppScreen';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';
import {ToastAndroid} from 'react-native';
// import {useDispatch, useSelector, useStore} from 'react-redux';

function ManageItemSample(props) {
  // use for update item
  // const states = useSelector(state => state.ConstantReducer);
  const Title = props.item;
  const categoryprop = props.category;
  const price = props.rs;
  const description = props.des;
  // const CATEGORY = props.category;
  const AREA = props.selectArea;
  const LOCATION = props.location;

  const RS = props.rs;
  //
  const id = props.id;
  console.log(id);
  const ComingReq = props.sendReq;
  const [selectedCategory, setCategory] = useState('');
  // const [selectArea, setArea] = useState([]);
  const [selectlocation, setlocation] = useState('');

  const pickerLabelName = 'Choose Image';
  const [titleName, setTitleName] = useState(Title);
  const [Price, setPrice] = useState(price);
  const [Description, setDescription] = useState(description);
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image1Visibility, setImage1Visibility] = useState(false);
  const [image2Visibility, setImage2Visibility] = useState(false);
  const [image3Visibility, setImage3Visibility] = useState(false);

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

  const [selectedArea, setArea] = useState('key0');
  const [areaId, setareaId] = useState(0);
  const [categoryId, setcategoryId] = useState();
  const [selectedCity, setCity] = useState('key0');
  const [cityId, setcityId] = useState(0);
  const [Areas, setAreas] = useState([]);
  const [cities, setCities] = useState([0, 1]);

  const [category, setCategories] = useState([]);
  // const [addSell, setAddSell] = useState([]);
  const [selectcategory, setselectCategories] = useState('');

  const states = useSelector(state => state.ConstantReducer);
  const UpdateSell = () => {
    console.log('CALLING');

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${states?.user_token}`);
    var formdata = new FormData();
    formdata.append('id', id);
    formdata.append('title', titleName);
    formdata.append('rate', Price);
    formdata.append('description', Description);
    formdata.append('ispublish', '1');
    formdata.append('user_id', states?.user_data.id);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    fetch('https://mybahria.com.pk/api/save-edit-buy', requestOptions)
      .then(response => response.json())
      .then(({status}) => {
        if (status === 'success') {
          ToastAndroid.show('Updated Successfully', ToastAndroid.LONG);
        }
      })
      .catch(error => console.log('error', error));
  };
  const getCategories = () => {
    fetch('https://api-mybahria.com.pk/api/item-categories', {
      headers: {
        Authorization: 'Bearer ' + states.user_token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(({ItemCategories}) => {
        setCategories(ItemCategories);
      });
  };

  const setAreaIndex = (item, index) => {
    setArea(item);
    let ID = Areas[index - 1]['id'];
    setareaId(ID);
  };

  const setAreaHandler = (item, index) => {
    let ID = cities[index - 1]['id'];
    setCity(item);
    setcityId(ID);

    fetch(`${APIS.data_signup_area}?city_id=${ID}`, {
      method: 'POST',
      body: JSON.stringify({city: cityId, area: areaId}),
    })
      .then(res => res.json())
      .then(({area}) => {
        setAreas(area);
      });
  };
  const setCategoryHandler = (item, index) => {
    let ID = category[index - 1]['id'];
    setcategoryId(ID);
    setselectCategories(item);
  };

  const getCity_Categories = () => {
    fetch(APIS.data_signup_city)
      .then(res => res.json())
      .then((response, {bahriaCities}) => {
        console.log(response, 'Response');
        // setCategories(Category);
        setCities(bahriaCities);
      });
  };

  function postAddSell() {
    let addData = {
      image: image1,
      image1: image2,
      image3: image3,
      title: titleName,
      // unit: areaId,
      area: areaId,
      category: categoryId,
      // uploaded_by:14,
      rate: Price,
      description: Description,
      // ispublish:1,
    };
    fetch(APIS.post_add_Sell, {
      method: 'POST',
      headers: {
        Authorization: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addData),
    });
  }

  useEffect(() => {
    getCity_Categories();
    getCategories();
  }, []);

  // const getCities = async ()=>{
  //   await fetch(APIS.get_city,{
  //     method:'GET',
  //     headers:{ Authorization:'Bearer ' + states.user_token.data,
  //     Accept:'application/json',
  //     'Content-Type':'application/json'
  //      }
  //   }).then(response=>response.json())
  //   .then(({bahriaCities,Category})=>{
  //     setArea(bahriaCities);
  //     setCategory(Category);
  //     // console.log(selectArea,'aakakakka');
  //   }).catch(error=>{
  //     return console.error(error);
  //   })
  // }

  // useEffect(()=>{
  //     getCities();
  // },[])

  // const [category, setCategories] = useState([
  //   {
  //     id: '1',
  //     name: 'Coffee',
  //     value: 'Coffee',
  //   },
  //   {
  //     id: '2',
  //     name: 'Bakery',
  //     value: 'Bakery',
  //   },
  //   {
  //     id: '3',
  //     name: 'Shoe Stores',
  //     value: 'Shoe Stores',
  //   },
  // ]);

  // let AreaItems = selectArea.map(item => {
  //   return <Picker.Item key={item.id} value={item.value} label={item.name} />;
  // });

  // const [area, setAreas] = useState([
  //   {
  //     id: '1',
  //     name: 'Coffee',
  //     value: 'Coffee',
  //   },
  //   {
  //     id: '2',
  //     name: 'Bakery',
  //     value: 'Bakery',
  //   },
  //   {
  //     id: '3',
  //     name: 'Shoe Stores',
  //     value: 'Shoe Stores',
  //   },
  // ]);

  // let areaitems = selectArea.map(item => {
  //   return <Picker.Item key={item.id} value={item.value} label={item.name} />;
  // });

  // let cityItems = cities.map(item => {
  //   return <Picker.Item key={item.id} value={item.name} label={item.name} />;
  // });
  // let categoryItems = category.map(item => {
  //   return <Picker.Item key={item.id} value={item.title} label={item.title} />;
  // });
  // let AreaItems = Areas.map(item => {
  //   return <Picker.Item key={item.id} value={item.name} label={item.name} />;
  // });

  // const [location, setlocations] = useState([
  //   {
  //     id: '1',
  //     name: 'Coffee',
  //     value: 'Coffee',
  //   },
  //   {
  //     id: '2',
  //     name: 'Bakery',
  //     value: 'Bakery',
  //   },
  //   {
  //     id: '3',
  //     name: 'Shoe Stores',
  //     value: 'Shoe Stores',
  //   },
  // ]);

  // let Categories = selectedCategory.map(item => {
  //   return <Picker.Item key={item.id} value={item.value} label={item.name} />;
  // });

  const addImage1 = async () => {
    const data = await cameraPickCover();
    setImage1(data.path);
    image1VisibilityHandler();
  };
  const addImage2 = async () => {
    const data = await cameraPickCover();
    setImage2(data.path);
    image2VisibilityHandler();
  };
  const addImage3 = async () => {
    const data = await cameraPickCover();
    setImage3(data.path);
    image3VisibilityHandler();
  };

  return (
    <View style={{flex: 1}}>
      {(ComingReq === 'addnew') & !undefined ? (
        <View style={{flex: 1}}>
          <View style={styles.body}>
            <TextInput
              theme={{colors: {text: '#000', primary: 'red'}}}
              labelTextColor="#929294"
              style={styles.inputStyle}
              value={titleName}
              onChangeText={value => setTitleName(value)}
              label="Title"
            />
            {/* <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectcategory}
                onValueChange={(itemValue, itemIndex) =>
                  setCategoryHandler(itemValue, itemIndex)
                }
                mode="dropdown"
                // value={CATEGORY}
                style={styles.pickerStyle}>
                <Picker.Item
                  color="#a5a0a0"
                  label="Select Category"
                  value="key0"
                />
                {categoryItems}
              </Picker>
            </View> */}
            <View style={styles.pickerContainer}>
              {/* <Picker
                selectedValue={selectedCity}
                onValueChange={(item, index) => setAreaHandler(item, index)}
                mode="dropdown"
                // value={AREA}
                style={styles.pickerStyle}>
                <Picker.Item color="#a5a0a0" label="Select Area" value="key0" />
                {cityItems}
              </Picker> */}
            </View>
            <View style={styles.pickerContainer}>
              {/* <Picker
                selectedValue={selectedArea}
                onValueChange={(item, index) => setAreaIndex(item, index)}
                mode="dropdown"
                // value={LOCATION}
                style={styles.pickerStyle}>
                <Picker.Item
                  color="#a5a0a0"
                  label="Select Location"
                  value="key0"
                />
                {AreaItems}
              </Picker> */}
            </View>
            <TextInput
              keyboardType="number-pad"
              theme={{colors: {text: '#000', primary: 'red'}}}
              labelTextColor="#929294"
              style={styles.inputStyle}
              value={Price}
              onChangeText={value => setPrice(value)}
              label="Price"
            />

            <View style={{width: '100%'}}>
              <TextInput
                mode="outlined"
                multiline={true}
                numberOfLines={6}
                theme={{colors: {text: '#000', primary: 'red'}}}
                labelTextColor="#929294"
                style={{
                  backgroundColor: 'transparent',
                  maxHeight: 120,
                  textAlignVertical: 'top',
                }}
                value={Description}
                onChangeText={value => setDescription(value)}
                placeholder="Description"
              />
            </View>

            <Text
              style={{
                borderLeftColor: 'red',
                borderLeftWidth: 3,
                fontSize: 18,
                paddingHorizontal: 8,
                marginTop: 12,
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
            </View>
            <View
              style={{
                flex: 1,
                // backgroundColor: 'red',
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                paddingHorizontal: 16,
                justifyContent: 'flex-end',
              }}>
              <CustomButton
                OnPRESS={() => postAddSell()}
                title="Adds"
                bgColor="firebrick"
                style={styles.btnBg}
                btnTitleStyle={styles.btnTitleStyle}
              />
            </View>
          </View>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View style={styles.body}>
            <TextInput
              theme={{colors: {text: '#000', primary: 'red'}}}
              labelTextColor="#929294"
              style={styles.inputStyle}
              // value={name}
              onChangeText={value => setTitleName(value)}
              label="Title"
              value={titleName}
            />
            {/* <View style={styles.pickerContainer}>
              <Picker
                value={CATEGORY}
                selectedValue={selectedCategory}
                onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
                mode="dropdown"
                style={styles.pickerStyle}>
                <Picker.Item color="#a5a0a0" label="Select" value="key0" />
                {categoryItems}
              </Picker>
            </View> */}

            <TextInput
              value={Price}
              keyboardType="number-pad"
              theme={{colors: {text: '#000', primary: 'red'}}}
              labelTextColor="#929294"
              style={styles.inputStyle}
              // value={name}
              onChangeText={value => setPrice(value)}
              label="Price"
            />

            <View style={{width: '100%'}}>
              <TextInput
                value={Description}
                mode="outlined"
                multiline={true}
                numberOfLines={6}
                theme={{colors: {text: '#000', primary: 'red'}}}
                labelTextColor="#929294"
                style={{
                  backgroundColor: 'transparent',
                  maxHeight: 120,
                  textAlignVertical: 'top',
                }}
                // value={name}
                onChangeText={value => setDescription(value)}
                placeholder="Description"
              />
            </View>

            {/* <Text
              style={{
                borderLeftColor: 'red',
                borderLeftWidth: 3,
                fontSize: 18,
                paddingHorizontal: 8,
                marginTop: 12,
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
            <View
              style={{
                flex: 1,
                // backgroundColor: 'red',
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                paddingHorizontal: 16,
                justifyContent: 'flex-end',
              }}>
              <CustomButton
                OnPRESS={() => {
                  UpdateSell();
                }}
                title="Update"
                bgColor="firebrick"
                style={styles.btnBg}
                btnTitleStyle={styles.btnTitleStyle}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

export default ManageItemSample;
