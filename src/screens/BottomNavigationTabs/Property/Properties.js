import {Picker} from '@react-native-picker/picker';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  Text,
  View,
  Modal,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {ProppertiesSample} from '../..';
import {FilterModalState} from '../../../redux/tabs_handler/actions';
import {PROPERTIES} from '../../../utils/URLS';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {APIS} from '../../../utils/URLS/Urls';
import {ToastAndroid} from 'react-native';

function Properties(props) {
  const states = useSelector(state => state.ConstantReducer);
  const [isLoading, setLoading] = useState(true);
  const [allProperties, setAllPropperties] = useState([]);
  const [Areas, setAreas] = useState([]);

  const [Properties, setProperties] = useState([]);
  const [oldProperties, setOldProperties] = useState([]);
  const [Sizes, setSizes] = useState([]);
  const [maximumprice, setMaximum] = useState('key0');
  const [mainimumprice, setMinimum] = useState('key0');

  const [propetyid, setPropertyId] = useState('');
  const [selectedArea, setArea] = useState('key0');
  const [selectedproperty, setPropertyType] = useState('key0');
  const [selectedsize, setSize] = useState('key0');
  const [selectedCity1, setCity] = useState('key0');
  const [cities, setCities] = useState([]);
  const [selectedCategory, setCategory] = useState('key0');

  const [pickerData, setpickerData] = useState([
    'Lahore',
    'Karachi',
    'Islamabad',
    'Peshawar',
  ]);

  const [locationData, setlocationData] = useState(['Model Town']);

  const [PropertyTypeData, setPropertyTypeData] = useState(['Model Town']);

  const [minPrice, setMinPrice] = useState([
    'Min',
    '5,000',
    '10,000',
    '15,000',
    '20,000',
    '25,000',
    '30,000',
    '35,000',
    '40,000',
    '50,000',
    '60,000',
    '70,000',
    '80,000',
    '90,000',
    '1 Lacs',
    '2 Lacs',
    '3 Lacs',
    '4 Lacs',
    '<5 Lacs',
  ]);
  const [maxPrice, setMaxPrice] = useState([
    'Max',
    '5,000',
    '10,000',
    '15,000',
    '20,000',
    '25,000',
    '30,000',
    '35,000',
    '40,000',
    '50,000',
    '60,000',
    '70,000',
    '80,000',
    '90,000',
    '1 Lacs',
    '2 Lacs',
    '3 Lacs',
    '4 Lacs',
    '>5 Lacs',
  ]);

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
    fetch('http://mybahria.assanhissab.com/api/area', requestOptions)
      .then(response => response.json())
      .then(({area}) => setAreas(area))
      .catch(error => console.log('error', error));
  };

  const SearchProperty = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + states.user_token);
    var formdata = new FormData();
    formdata.append('type', checked);
    formdata.append('city', selectedCity1);
    formdata.append('location', selectedArea);
    formdata.append('property_type', selectedproperty);
    formdata.append('property_size', selectedsize);
    formdata.append('price_min', mainimumprice);
    formdata.append('price_max', maximumprice);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    fetch('http://mybahria.assanhissab.com/api/search-property', requestOptions)
      .then(response => response.json())
      .then(({details}) => {
        if (details.length != 0) {
          setAllPropperties(details);
          console.log(details, 'setAllProperties');
        } else {
          ToastAndroid.show('No Data Found', ToastAndroid.LONG);
          setAllPropperties(oldProperties);
        }
      })
      .catch(error => console.log('error', error));
  };
  const renderNewsItem = ({item}) => {
    return (
      <ProppertiesSample
        navigation={props.navigation}
        ITEM={item}
        title={item.title}
        Location={item.location}
        IMG={item.image_src}
        Purpose={item.purpose}
        Price={item.price}
        Added={item.created_at}
        Type={item.type}
        House_Description={item.description}
        IMAGES={item.IMAGES}
        authorDetails={item.owner_name}
      />
    );
  };
  const [checked, setChecked] = useState('Sale');
  const [selectedCity, setselectedCity] = useState('Key0');

  const getAllProperties = async () => {
    await fetch(APIS.get_hot_properties_list, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + states.user_token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(({properties}) => {
        console.log(properties, 'Properties');
        setAllPropperties(properties);
        setOldProperties(properties);
        // console.log(properties);
      })
      .catch(error => {
        return console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });

    // console.log('DATA', DATA);
    // return DATA;
  };
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
  const getPropertySize = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${states?.user_token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'http://mybahria.assanhissab.com/api/dropdown-property-size',
      requestOptions,
    )
      .then(response => response.json())
      .then(({property_size}) => {
        console.log(property_size, 'Properties size');
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
      'http://mybahria.assanhissab.com/api/dropdown-property-type',
      requestOptions,
    )
      .then(response => response.json())
      .then(({property_type}) => {
        setProperties(property_type);
      })
      .catch(error => console.log('error', error));
  };
  let cityItems = cities.map(item => {
    return <Picker.Item key={item.id} value={item.id} label={item.name} />;
  });
  let sizeItems = Sizes.map(item => {
    return <Picker.Item key={item.id} value={item.id} label={item.title} />;
  });
  let propertiesItems = Properties.map(item => {
    return <Picker.Item key={item.id} value={item.id} label={item.name} />;
  });
  let AreaItems = Areas.map(item => {
    return <Picker.Item key={item.id} value={item.id} label={item.name} />;
  });

  useEffect(() => {
    getAllProperties();
    getCity_Categories();
    getPropertySize();
    getProperType();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="red"
            style={{marginVertical: 50}}
          />
        ) : allProperties.length > 0 ? (
          <FlatList
            data={allProperties}
            renderItem={item => renderNewsItem(item)}
          />
        ) : null}
        <Modal
          onRequestClose={() => props.closeModal()}
          transparent={true}
          animationType="slide"
          style={{flex: 1}}
          visible={props.MODAL_VISIBILITY}>
          <TouchableOpacity
            onPress={() => props.closeModal()}
            style={{flex: 1, backgroundColor: 'transparent'}}
          />
          <View
            style={{
              // minHeight: 500,
              elevation: 12,
              // flex: 1,
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              paddingHorizontal: 8,
              backgroundColor: '#FFF',
              // justifyContent: 'center',
              paddingTop: 20,
              paddingHorizontal: 16,
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
            }}>
            <Text style={styles.searchTitleStyle}>Find Property</Text>

            <View style={styles.RadioButtonBg}>
              <TouchableOpacity
                onPress={() => setChecked('Sale')}
                style={{
                  ...styles.radionBtn,
                  backgroundColor: checked == 'Sale' ? 'green' : '#ddd',
                }}>
                <Text
                  style={{
                    ...styles.radionBtnTextStyles,
                    color: checked === 'Sale' ? '#fff' : '#000',
                  }}>
                  Sale
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setChecked('Rent')}
                style={{
                  ...styles.radionBtn,
                  backgroundColor: checked === 'Rent' ? 'green' : '#ddd',
                }}>
                <Text
                  style={{
                    ...styles.radionBtnTextStyles,
                    color: checked === 'Rent' ? '#fff' : '#000',
                  }}>
                  Rent
                </Text>
              </TouchableOpacity>
            </View>

            {/* body */}

            <View style={styles.innerBody}>
              <View style={styles.pickerBody}>
                <Text style={styles.pickerTitleStyle}>Select City: </Text>
                <Picker
                  style={{
                    height: 40,
                    width: '100%',
                    flex: 1,
                    backgroundColor: 'grey',
                  }}
                  selectedValue={selectedCity1}
                  onValueChange={item => {
                    setCity(item);
                    Areadropdown(item);
                  }}>
                  {cityItems}
                </Picker>
              </View>

              <View style={styles.pickerBody}>
                <Text style={styles.pickerTitleStyle}>Select Loction: </Text>
                <Picker
                  style={{
                    height: 40,
                    width: '100%',
                    flex: 1,
                    backgroundColor: 'grey',
                  }}
                  mode="dropdown"
                  selectedValue={selectedArea}
                  onValueChange={(item, index) => setArea(item)}>
                  {AreaItems}
                </Picker>
              </View>
              <View style={styles.pickerBody}>
                <Text style={styles.pickerTitleStyle}>Property Type : </Text>
                <Picker
                  style={{
                    height: 40,
                    width: '100%',
                    flex: 1,
                    backgroundColor: 'grey',
                  }}
                  mode="dropdown"
                  selectedValue={selectedproperty}
                  onValueChange={value => setPropertyType(value)}>
                  {propertiesItems}
                </Picker>
              </View>

              <View style={styles.pickerBody}>
                <Text style={styles.pickerTitleStyle}>Size: </Text>
                <Picker
                  style={{
                    height: 40,
                    width: '100%',
                    flex: 1,
                    backgroundColor: 'grey',
                  }}
                  mode="dropdown"
                  selectedValue={selectedsize}
                  onValueChange={(item, index) => {
                    setSize(item);
                  }}>
                  {sizeItems}
                </Picker>
              </View>

              <View style={styles.pickerBody}>
                <Text style={styles.pickerTitleStyle}>Min Price: </Text>
                <Picker
                  style={{
                    height: 40,
                    width: '100%',
                    flex: 1,
                    backgroundColor: 'grey',
                  }}
                  mode="dropdown"
                  selectedValue={mainimumprice}
                  onValueChange={value => setMinimum(value)}>
                  {minPrice.map(item => (
                    <Picker.Item key={item} label={item} value={item} />
                  ))}
                </Picker>
              </View>

              <View style={styles.pickerBody}>
                <Text style={styles.pickerTitleStyle}>Max Price : </Text>
                <Picker
                  style={{
                    height: 40,
                    width: '100%',
                    flex: 1,
                    backgroundColor: 'grey',
                  }}
                  mode="dropdown"
                  selectedValue={maximumprice}
                  onValueChange={value => setMaximum(value)}>
                  {maxPrice.map(item => (
                    <Picker.Item key={item} label={item} value={item} />
                  ))}
                </Picker>
              </View>
            </View>
            {/* bottom button */}
            <View
              style={{
                flexDirection: 'row',
                // position: 'absolute',
                // bottom: 20,
                // left: 20,
                // right: 20,
                marginBottom: 20,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setAllPropperties(oldProperties), props.closeModal();
                }}
                style={{
                  ...styles.submitBtn,
                  backgroundColor: '#ddd',
                  borderWidth: 0.5,
                  borderColor: 'gray',
                }}>
                <Text style={{marginHorizontal: 8}}>Cancel</Text>
                <FontAwesome name="times" color="#cc0000" size={18} />
              </TouchableOpacity>
              <View style={{width: 1.5, backgroundColor: 'gray'}} />
              <TouchableOpacity
                onPress={() => {
                  SearchProperty(), props.closeModal();
                }}
                style={styles.submitBtn}>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    marginHorizontal: 8,
                  }}>
                  Search
                </Text>
                <FontAwesome name="check" color="#fff" size={18} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  submitBtn: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 8,
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 16,
    // alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  searchTitleStyle: {
    fontSize: 25,
    color: '#cc0000',
    // fontWeight: 'bold',
  },
  RadioButtonBg: {
    minHeight: 30,
    borderWidth: 0.5,
    borderColor: '#fff',
    flexDirection: 'row',
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginVertical: 16,
  },
  radionBtn: {
    paddingVertical: 4,
    flex: 1,
    paddingHorizontal: 4,
    paddingHorizontal: 6,
    // marginHorizontal: 8,
    // backgroundColor: '#ddd',
    // borderTopLeftRadius: 12,
    // borderBottomLeftRadius: 12,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radionBtnTextStyles: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  innerBody: {
    flexGrow: 1,
  },
  pickerTitleStyle: {
    color: 'black',
    fontSize: 14,
    flex: 1,
    fontWeight: 'bold',
    // marginTop: 8,
  },
  pickerBody: {
    // height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    width: '100%',
    // backgroundColor: 'gray',
    // borderColor: 'grey',
    // borderWidth: 0.5,
    // borderRadius: 5,
    // borderBottomColor: 'gray',
    // borderBottomWidth: 0.5,
    padding: 4,
    marginBottom: 5,
  },
});

const mapPropsToActions = dispatch => {
  return {
    closeModal: () => dispatch(FilterModalState()),
  };
};
const mapPropsToState = state => {
  return {
    MODAL_VISIBILITY: state.tab_reducer.Filter_Modal_State,
  };
};

export default connect(mapPropsToState, mapPropsToActions)(Properties);
