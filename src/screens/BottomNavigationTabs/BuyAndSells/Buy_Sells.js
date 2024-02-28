import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Modal,
  Linking,
  ActivityIndicator,
} from 'react-native';

import ImageSlider from 'react-native-image-slider';
import {SliderBox} from 'react-native-image-slider-box';

import {SafeAreaView} from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CustomHeader from '../../CustomHeader/CustomHeader';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SearchBar} from 'react-native-elements';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {Picker} from '@react-native-picker/picker';
import styles from './styles';
import {applyFilterToSellItems} from '../../../redux/tabs_handler/actions';
import {connect} from 'react-redux';
import {APIS} from '../../../utils/URLS/Urls';
import StartUp_Screen from '../../startUp-screen/StartUp_Screen';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {ToastAndroid} from 'react-native';

function Buy_Sells(props) {
  const states = useSelector(state => state.ConstantReducer);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [filterModalVisibility, setfilterModalVisibility] = useState(false);
  const [category, setCategories] = useState([]);
  const [currentItem, setCurrentItem] = useState();

  const [categoryId, setcategoryId] = useState(0);

  const [selectedCategory, setCategory] = useState('key0');
  const [IMAGE, setIMAGE] = useState();
  const [ITEM, setITEM] = useState();
  const [RS, setRS] = useState();
  const [activeButton, setActiveButton] = useState('Description');
  const [search, setSearch] = useState('');
  const [priceTagValue, setPriceTagvalue] = useState([100, 10000]);

  const [isLoading, setLoading] = useState(false);
  const [buySell, setBuySell] = useState([]);

  const updateSearch = search => {
    setSearch(search);
  };

  const searchbuy = () => {
    var myHeaders = new Headers();

    const [value1, value2] = priceTagValue;
    console.log('Value 1:', value1);
    console.log('Value 2:', value2);

    myHeaders.append('Authorization', `Bearer ${states.user_token}`);
    var formdata = new FormData();
    formdata.append('search_key', search);
    formdata.append('price_min', value1);
    formdata.append('category', selectedCategory);
    formdata.append('price_max', value2);
    console.log(formdata);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    fetch('http://mybahria.assanhissab.com/api/search-buy', requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };
  const CategoriesFetch = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${states?.user_token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'http://mybahria.assanhissab.com/api/dropdown-sell-category',
      requestOptions,
    )
      .then(response => response.json())
      .then(({property_item_cat}) => setCategories(property_item_cat))
      .catch(error => console.log('error--->', error));
  };
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
  const getBuyandSell = async () => {
    setLoading(true);
    console.log(states.user_token);
    await fetch('http://mybahria.assanhissab.com/api/buy-and-sell', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + states.user_token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(({bahria_sells, bahria_buy}) => {
        console.log(
          '🚀 ~ file: Buy_Sells.js:152 ~ .then ~ bahria_sells:',
          bahria_buy,
        );

        setBuySell(bahria_sells);
      })
      .catch(error => {
        return console.error(error, 'Error');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(async () => {
    await getBuyandSell();
    await CategoriesFetch();
  }, []);

  const visibilityHandler = item => {
    // console.log(item.about_details.category,'line 252');
    setModalVisibility(!modalVisibility);
    setCurrentItem(item);
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          setTimeout(() => {
            visibilityHandler(item);
          }, 1000)
        }
        style={{
          flex: 1,
          marginVertical: 8,
          width: '95%',
          elevation: 5,
          backgroundColor: '#fff',
          // paddingBottom: 8,
          alignSelf: 'center',
          alignItems: 'center',
          // justifyContent: 'center',
          flexDirection: 'row',
          borderRadius: 4,
        }}>
        <Image
          style={{height: 120, width: 80, borderRadius: 4, margin: 8}}
          source={{
            uri: `${APIS.image_base_url}${item.image}`,
          }}
        />
        <View
          style={{
            // width: '95%',
            // width: '111%',
            // backgroundColor: 'skyblue',
            alignSelf: 'center',
            // marginTop: 8,
            flex: 1,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 11, fontWeight: 'bold'}}>
              Product Name :{' '}
            </Text>
            <Text numberOfLines={1} style={{fontSize: 11, flex: 1}}>
              {!item.title ? 'Empty' : item.title}
            </Text>
          </View>
          <View style={styles.itemContainerStyle}>
            <Text style={{fontSize: 11, fontWeight: 'bold'}}>Location : </Text>
            <Text style={{fontSize: 11}}>
              {!item.location ? 'Empty' : item.location}
            </Text>
          </View>
          <View style={styles.itemContainerStyle}>
            <Text style={{fontSize: 11, fontWeight: 'bold'}}>Price : </Text>
            <Text style={{fontSize: 11}}>
              {!item.price ? 'Empty' : item.price}
            </Text>
          </View>
          <View style={{...styles.itemContainerStyle, marginTop: 16}}>
            <Text style={{fontSize: 11, fontWeight: 'bold'}}>
              Posted Date :{' '}
            </Text>
            <Text style={{fontSize: 11, flex: 1}}>{item.sells_date}</Text>

            <TouchableOpacity
              onPress={() => {
                setCurrentItem(item);

                visibilityHandler();
              }}
              style={{
                height: 30,
                width: 30,
                borderRadius: 111,
                backgroundColor: '#cc0000',
                elevation: 5,
                // alignSelf: 'flex-end',
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 8,
              }}>
              <FontAwesome name="long-arrow-right" color="#fff" size={18} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <CustomHeader title="Buy / Sell" navigation={props.navigation} /> */}
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
        <FlatList data={buySell} renderItem={renderItem} />
      )}
      {/* modal */}

      {currentItem === undefined
        ? null
        : (console.log(currentItem, 'JASKJK'),
          (
            <Modal animationType="slide" visible={modalVisibility}>
              <View style={styles.iconsView}>
                <TouchableOpacity
                  onPress={visibilityHandler}
                  style={{padding: 4, alignSelf: 'center'}}>
                  <Ionicons name="arrow-back" color="#fff" size={20} />
                </TouchableOpacity>

                <Text style={styles.title}>
                  {currentItem?.about_details?.product_name}
                </Text>
              </View>
              {/* body */}

              <View style={{flex: 1, backgroundColor: '#fff'}}>
                <ScrollView style={{paddingHorizontal: 16, marginVertical: 20}}>
                  <Text
                    style={{
                      marginTop: 16,
                      fontWeight: 'bold',
                      borderLeftColor: '#CC0000',
                      borderLeftWidth: 2,
                      paddingLeft: 8,
                    }}>
                    About Product
                  </Text>
                  <View
                    style={{
                      // marginVertical: 6,
                      flexDirection: 'row',
                      // backgroundColor: 'red',
                      flexWrap: 'wrap',
                      flex: 1,
                      marginBottom: 8,
                      // backgroundColor: '#ddd',
                    }}>
                    <View style={styles.iconBg}>
                      <View style={styles.DirectionRow}>
                        <MaterialIcons name="category" color="#fff" size={20} />
                      </View>
                      <Text style={styles.titleStyle}>
                        {currentItem['category_item_info'] === null || undefined
                          ? null
                          : currentItem['category_item_info']?.title}
                      </Text>
                    </View>

                    <View style={styles.iconBg}>
                      <View style={styles.DirectionRow}>
                        <AntDesign name="tag" color="#fff" size={20} />
                      </View>
                      <Text style={styles.titleStyle}>{currentItem?.id}</Text>
                    </View>

                    {/* <View style={styles.DirectionRow}>
            <Text style={styles.titleStyle}>Location: </Text>
            <Text style={styles.normalText}>{Location}</Text>
          </View> */}

                    <View style={styles.iconBg}>
                      <View style={styles.DirectionRow}>
                        <FontAwesome5
                          name="money-bill-alt"
                          color="#fff"
                          size={20}
                        />
                      </View>
                      <Text style={styles.titleStyle}>{currentItem.price}</Text>
                    </View>

                    <View style={styles.iconBg}>
                      <View style={styles.DirectionRow}>
                        <Entypo name="clock" color="#fff" size={20} />
                      </View>
                      <Text style={styles.titleStyle}>
                        {currentItem.sells_date}
                      </Text>
                    </View>
                  </View>
                  {currentItem['get_person'] === null || undefined ? null : (
                    <Text
                      style={{
                        marginTop: 16,
                        fontWeight: 'bold',
                        borderLeftColor: '#CC0000',
                        borderLeftWidth: 2,
                        paddingLeft: 8,
                      }}>
                      About Seller
                    </Text>
                  )}

                  <View
                    style={{
                      paddingHorizontal: 8,
                      marginBottom: 8,
                      // paddingVertical: 8,
                    }}>
                    <View
                      style={{
                        paddingVertical: 8,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        // backgroundColor: 'blue',
                        alignItems: 'center',
                      }}>
                      {currentItem['get_person'] === null ||
                      undefined ? null : (
                        <Entypo name="user" color="#cc0000" size={16} />
                      )}

                      <Text
                        style={{
                          flex: 1,
                          fontSize: 11,
                          // backgroundColor: 'red',
                          textAlign: 'left',
                          marginHorizontal: 8,
                          textAlignVertical: 'bottom',
                          // fontWeight: 'bold',
                        }}>
                        {currentItem['get_person'] === null || undefined
                          ? null
                          : currentItem['get_person']?.name}
                      </Text>
                    </View>

                    <View
                      style={{
                        paddingVertical: 8,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        // backgroundColor: 'blue',
                        alignItems: 'center',
                      }}>
                      {currentItem['get_person'] === null ||
                      undefined ? null : (
                        <Entypo name="mail" color="#cc0000" size={16} />
                      )}

                      <Text
                        style={{
                          flex: 1,
                          fontSize: 11,
                          // backgroundColor: 'red',
                          textAlign: 'left',
                          marginHorizontal: 8,
                          textAlignVertical: 'bottom',
                          // fontWeight: 'bold',
                        }}>
                        {currentItem['get_person'] === null || undefined
                          ? null
                          : currentItem['get_person']?.email}
                      </Text>
                    </View>
                  </View>
                </ScrollView>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    minHeight: 50,
                    backgroundColor: '#cc0000',
                    elevation: 11,
                    justifyContent: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: 16,
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      currentItem['get_person'] === null || undefined
                        ? ToastAndroid.show(
                            'No Contact Found',
                            ToastAndroid.LONG,
                          )
                        : Linking.openURL(
                            `tel:${currentItem['get_person']?.phone_number}`,
                          );
                    }}
                    style={{
                      flex: 1,
                      paddingVertical: 8,
                      justifyContent: 'center',
                      alignItems: 'center',
                      // backgroundColor: '#cc0000',
                      paddingHorizontal: 11,
                      borderRadius: 8,
                      flexDirection: 'row',
                    }}>
                    <FontAwesome name="phone" color="#fff" size={14} />
                    <Text style={{color: '#fff', marginHorizontal: 8}}>
                      Call Now
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* body end */}
            </Modal>
          ))}
      <Modal
        transparent={true}
        visible={props.filterModalVisibility}
        animationType="slide">
        <TouchableOpacity
          onPress={() => props.closeFilterModal()}
          style={{flex: 1, backgroundColor: 'transparent'}}
        />

        <View
          style={{
            paddingTop: 16,
            paddingHorizontal: 16,
            elevation: 11,
            // minHeight: 350,
            // alignItems: 'center',
            justifyContent: 'center',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            backgroundColor: '#fff',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              marginBottom: 8,
              color: '#8B0000',
            }}>
            Filter
          </Text>
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
              fontSize: 11,
              paddingHorizontal: 0,
            }}
            placeholder="Type Here..."
            onChangeText={search => updateSearch(search)}
            value={search}
          />

          <Text style={styles.headingInModal}>Price range</Text>
          <View
            style={{
              width: '95%',
              alignSelf: 'center',
              // backgroundColor: 'red',
              // height: 40,
              // paddingVertical:
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MultiSlider
              step={1}
              // enabledTwo={true}
              values={priceTagValue}
              min={100}
              max={10000}
              onValuesChange={value => {
                setPriceTagvalue(value);
              }}
              // valuePrefix="Rs"
              // trackStyle={{backgroundColor: '#cc0000'}}
              selectedStyle={{backgroundColor: '#cc0000'}}
              // containerStyle={{backgroundColor: '#cc0000'}}
              markerStyle={{
                backgroundColor: '#cc0000',
                // borderColor: 'red',
                height: 15,
                width: 15,
              }}

              // markerContainer={{backgroundColor: 'blue', color: 'red'}}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: 'blue',
              }}>
              <Text style={{color: 'black'}}>Rs: {priceTagValue[0]}</Text>
              <View
                style={{
                  width: 11,
                  backgroundColor: 'red',
                  height: 2,
                  marginHorizontal: 8,
                }}
              />
              <Text>{priceTagValue[1]}</Text>
            </View>
          </View>
          <Text style={styles.headingInModal}>By Category</Text>
          <View
            style={{
              width: '95%',
              height: 50,
              alignSelf: 'center',
              // backgroundColor: 'red',
              // height: 40,
              // paddingVertical:
              justifyContent: 'center',
              marginBottom: 16,
              alignItems: 'center',
            }}>
            <Picker
              mode="dropdown"
              style={{width: '111%', height: 50, color: '#cc0000'}}
              selectedValue={selectedCategory}
              onValueChange={(itemValue, itemIndex) =>
                business_categoryIndex(itemValue, itemIndex)
              }>
              <Picker.Item
                color="#a5a0a0"
                label="Select Category"
                value="key0"
              />
              {categoryItems}
            </Picker>
          </View>
        </View>
        <View
          style={{
            // position: 'absolute',
            // bottom: 0,
            // left: 0,
            // right: 0,
            minHeight: 50,
            backgroundColor: '#cc0000',
            elevation: 11,
            justifyContent: 'center',
            flexDirection: 'row',
            // paddingHorizontal: 16,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              height: '111%',
              width: '95%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#ddd',

              paddingHorizontal: 11,
              // borderRadius: 8,
              flexDirection: 'row',
            }}>
            <FontAwesome name="rotate-left" color="#000" size={14} />
            <Text style={{color: '#000', marginHorizontal: 8}}>Reset</Text>
          </TouchableOpacity>
          {/* <View style={{backgroundColor: '#ddd', width: 1, height: '50%'}} /> */}
          <TouchableOpacity
            style={{
              flex: 1,
              paddingVertical: 8,
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: '#cc0000',
              paddingHorizontal: 11,
              borderRadius: 8,
              flexDirection: 'row',
            }}
            onPress={() => {
              searchbuy();
            }}>
            <FontAwesome5 name="filter" color="#fff" size={14} />
            <Text style={{color: '#fff', marginHorizontal: 8}}>
              Apply Filter
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const mapStateToProps = state => {
  return {
    filterModalVisibility: state.tab_reducer.applyFilterModalVisibility,
  };
};

const mapActionToProps = dispatch => {
  return {
    closeFilterModal: () => dispatch(applyFilterToSellItems()),
  };
};
export default connect(mapStateToProps, mapActionToProps)(Buy_Sells);
