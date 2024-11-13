import React, { useState, useEffect } from 'react';
import { View, Dimensions, ActivityIndicator, Text, TouchableOpacity, Image, StyleSheet, Modal, ScrollView, Linking, ToastAndroid } from 'react-native';
import { useSelector } from 'react-redux';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { APIS } from './URLS/Urls';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Picker } from '@react-native-picker/picker';
import { NavigationContainer } from '@react-navigation/native';

const { width } = Dimensions.get('window');

function Buy_sellSlider(props) {
  const [activeDot, setActiveDot] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [allBuy_Sell, setAllBuy_Sell] = useState([]);
  const [error, setError] = useState(null);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [modalVisibility1, setModalVisibility1] = useState(false);
  const [priceTagValue, setPriceTagValue] = useState([100, 10000]);
  const [selectedCategory, setSelectedCategory] = useState('key0');
  const [currentItem, setCurrentItem] = useState(null); 
  const user_token = useSelector(state => state.ConstantReducer.user_token);

  // Fetch Buy and Sell data
  const getBuyandSell = async () => {
    try {
      const response = await fetch(APIS.get_buy_Sell, {
        headers: {
          Authorization: `Bearer ${user_token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      const { bahria_sells } = data;

      if (!Array.isArray(bahria_sells)) {
        throw new Error('Invalid data format');
      }

      setAllBuy_Sell(bahria_sells);
    } catch (error) {
      setError('Failed to load Buy & Sell data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBuyandSell();
  }, []);

  const visibilityHandler = (item) => {
    setCurrentItem(item);
    setModalVisibility1(false);
    setModalVisibility(true); 
  };
  const closeFilterModal = () => {
    setModalVisibility1(false); 
    setModalVisibility(true); 
  };
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => visibilityHandler(item)} style={styles.itemContainer}>
        <Image
          style={styles.image}
          source={{
            uri: `${APIS.image_base_url}${item.image}`,
          }}
        />
        <View style={styles.textContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>Product Name: </Text>
            <Text numberOfLines={1} style={styles.value}>
              {item.title || 'Empty'}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Location: </Text>
            <Text style={styles.value}>{item.location || 'Empty'}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Price: </Text>
            <Text style={styles.value}>{item.price || 'Empty'}</Text>
          </View>

          <View style={{ ...styles.row, marginTop: 16 }}>
            <Text style={styles.postedDateLabel}>Posted Date: </Text>
            <Text style={styles.value}>{item.sells_date}</Text>

            <TouchableOpacity
              onPress={() => visibilityHandler(item)}
              style={styles.arrowButton}
            >
              <FontAwesome name="long-arrow-right" color="#fff" size={18} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const applyFilter = () => {
    // Apply filter logic here based on selectedCategory and priceTagValue
    console.log("Applying filter:", selectedCategory, priceTagValue);
    setModalVisibility1(false); // Close the filter modal
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="red" style={{ marginVertical: 50 }} />;
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, width: '100%', backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
      <Carousel
        layout="default"
        data={allBuy_Sell}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
        onSnapToItem={index => setActiveDot(index)}
        loop={true}
        autoplay={true}
        keyExtractor={(item, index) => index.toString()}
        snapToInterval={width}
      />
      <Pagination
        dotsLength={allBuy_Sell.length}
        activeDotIndex={activeDot}
        containerStyle={{ paddingVertical: 4 }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 50,
          backgroundColor: '#00B106',
        }}
        inactiveDotStyle={{
          backgroundColor: '#AAA5A5',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />

      {/* Item Detail Modal */}
      {currentItem !== null && (
  <Modal animationType="slide" visible={modalVisibility}>
    <View style={{ flex: 1 }}>
      {/* Header with Back Icon, Title, and Search Icon */}
      <View style={styles.modalHeader}>
        <TouchableOpacity onPress={() =>{ setModalVisibility(false)
         setModalVisibility1(false)}} style={styles.headerIcon}>
          <FontAwesome name="arrow-left" color="#fff" size={20} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <TouchableOpacity
          onPress={() => setModalVisibility1(true)} // This will trigger the filter modal
          style={styles.headerIcon}
        >
          {/* <FontAwesome name="search" color="#fff" size={20} /> */}
        </TouchableOpacity>
      </View>

      
      <View style={{flex: 1, backgroundColor: '#fff'}}>
                <ScrollView style={{paddingHorizontal: 16, marginVertical: 20}}>
                {currentItem.image && (
            <Image
              style={{ width: '100%', height: 200, borderRadius: 8 }}
              source={{ uri: `${APIS.image_base_url}${currentItem.image}` }}
            />
          )}
                  <Text
                    style={{
                      marginTop: 16,
                      fontWeight: 'bold',
                      borderLeftColor: '#CC0000',
                      borderLeftWidth: 2,
                      paddingLeft: 8,
                      color: 'red',
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
                        paddingLeft: 8,color:'black'
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
                          textAlignVertical: 'bottom',color:'black'
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
                          textAlignVertical: 'bottom',color:'black'
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

      {/* Call Now Button */}
    
    </View>
  </Modal>
)}

      
      {/* <View style={{ flex: 1, width: '100%', backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
      
      <Modal transparent={true} visible={modalVisibility1} animationType="slide">
  <TouchableOpacity onPress={closeFilterModal} style={{ flex: 1, backgroundColor: 'transparent' }} />
  <View style={styles.filterModal}>
    <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8, color: '#8B0000' }}>Filter</Text>
    
    
    <Text style={{ fontWeight: 'bold', marginTop: 16, color:'#8B0000' }}>Price Range</Text>
    <MultiSlider
      step={1}
      values={priceTagValue}
      min={100}
      max={10000}
      onValuesChange={setPriceTagValue}
      selectedStyle={{ backgroundColor: '#cc0000' }}
      markerStyle={{ backgroundColor: '#cc0000', height: 15, width: 15 }}
    />
    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#8B0000'}}>Rs: {priceTagValue[0]}</Text>
      <Text style={{ color: '#8B0000'}}> - </Text>
      <Text style={{ color: '#8B0000'}}>Rs: {priceTagValue[1]}</Text>
    </View>

    
    <Text style={{ fontWeight: 'bold', marginTop: 16, color: 'black'  }}>Select Category</Text>
    <Picker selectedValue={selectedCategory} onValueChange={setSelectedCategory}>
      <Picker.Item label="All Categories" value="key0" style={{ color: '#8B0000'}} />
      <Picker.Item label="Residential" value="key1" style={{ color: '#8B0000'}}/>
      <Picker.Item label="Commercial" value="key2" style={{ color: '#8B0000'}} />
      
    </Picker>

    <View style={{ marginTop: 16 }}>
      <TouchableOpacity onPress={applyFilter} style={{ backgroundColor: '#8B0000', padding: 10 }}>
        <Text style={{ color: '#fff', textAlign: 'center' }}>Apply Filter</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
    </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    marginVertical: 8,
    width: '95%',
    elevation: 5,
    backgroundColor: '#fff',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 4,
    height: 120,
  },
  image: {
    height: 120,
    width: 80,
    borderRadius: 4,
    margin: 8,
  },
  textContainer: {
    alignSelf: 'center',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'red',
  },
  value: {
    fontSize: 11,
    flex: 1,
    color: 'black',
  },
  postedDateLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'red',
  },
  arrowButton: {
    height: 30,
    width: 30,
    borderRadius: 111,
    backgroundColor: '#cc0000',
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  modalHeader: {
    backgroundColor: '#cc0000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headerIcon: {
    padding: 8,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  
  // Filter Modal
  filterModal: {
    paddingTop: 16,
    paddingHorizontal: 16,
    elevation: 11,
    backgroundColor: '#fff',
  },
  DirectionRow: {
    // flex: 1,
    // backgroundColor: 'red',
    marginVertical: 8,
    flexDirection: 'row',
    borderColor: '#cc0000',
    padding: 4,
    height: 50,
    width: 50,
    borderWidth: 0.5,
    // elevation: 10,
    backgroundColor: '#cc0000',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBg: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    // marginVertical: 8,
    paddingVertical: 4,
  },
  titleStyle: {
    // fontWeight: 'bold',
    color: '#000',
    fontSize: 10,
    flex: 1,
    fontSize: 10,
    textAlign: 'center',
  },
});

export default Buy_sellSlider;
