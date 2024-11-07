import React, {Component, useState, useEffect} from 'react';
import styles from './styles';
import {TextInput} from 'react-native-paper';

import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ToastAndroid,
} from 'react-native';
import {useDispatch, useSelector, useStore} from 'react-redux';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomHeader from '../CustomHeader/CustomHeader';
// CustomHeader
import {Picker} from '@react-native-picker/picker';
import CustomButton from '../../utils/CustomButton';
import {CustomTitle} from '../Dashboard/DashboadComponents';
import {useSafeArea} from 'native-base';

function RegisterBusiness(props) {
  const {user_data, user_token} = useSelector(state => state.ConstantReducer);
  const [selectedCity, setCity] = useState('');
  const [selectedArea, setArea] = useState('');
  const [selectedCategory, setCategory] = useState('');
  const [subbategory, setSubCategories] = useState([]);
  const [selectedsubcategory, setSubCategory] = useState('');
  const [categoryId, setcategoryId] = useState(0);
  const [cities, setCities] = useState([]);
  const [title, setTitle] = useState('');
  const [Longitude, setLongitude] = useState('');
  const [Latitude, setLatitude] = useState('');
  const [fb, setFb] = useState('');
  const [address, setAddress] = useState('');
  const [landlineno, setLandLineno] = useState('');
  const [email, setEmail] = useState('');
  const [utube, setUtube] = useState('');
  const [twitter, setTwitter] = useState('');
  const [Linkedin, setLinkedin] = useState('');
  const [phno, setPhno] = useState('');
  const [Areas, setAreas] = useState([
    // {
    //   id: '1',
    //   name: 'empty',
    //   value: 'empty',
    // },
    // {
    //   id: '2',
    //   name: 'empty',
    //   value: 'empty',
    // },
    // {
    //   id: '3',
    //   name: 'empty',
    //   value: 'empty',
    // },
    // {
    //   id: '4',
    //   name: 'empty',
    //   value: 'empty',
    // },
  ]);

  const [category, setCategories] = useState([
    // {
    //   id: '1',
    //   name: 'Coffee',
    //   value: 'Coffee',
    // },
    // {
    //   id: '2',
    //   name: 'Bakery',
    //   value: 'Bakery',
    // },
    // {
    //   id: '3',
    //   name: 'Shoe Stores',
    //   value: 'Shoe Stores',
    // },
  ]);
  const Areadropdown = id => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${user_token}`);
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
  const business_categoryIndex = (item, index) => {
    setCategory(item);
    console.log(item);
    let INDEX = category[index - 1]['id'];
    setcategoryId(INDEX);
  };

  const CiteGet = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${user_token}`);
    myHeaders.append(
      'Cookie',
      'XSRF-TOKEN=eyJpdiI6IlplZ0hUQ281WC93VUlwa29ha1dMOFE9PSIsInZhbHVlIjoiNUJXWHdDL3BJQWYwZkd2TUNxZnpJUkh5RGlLMjRQNXFVcW5jbGNNUmVyVmI3Z0s0RFdPVUtaWFJ3aE1QTG9nUGlVOUljR09VakIrM0dHaGN3RG9vNVh6czZwdVM2Z0lyUkl3azczVnJwL0JpVm1iOER3ZnJqWCtMelUyWW5wWGUiLCJtYWMiOiIwYWQyY2U3M2EzZmJjODE3YzcxNDA2MDhlYzA3ZWNkM2ZlOGQxMjc0OGU0OTdlMDZiNDExZTJkOTdkZWY5NzRjIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IkFKM0prK0R5Uzh1a2xhdE56TytQNnc9PSIsInZhbHVlIjoibGkvUWYwaU81ei96dlk2NXRxaTM4clZFYlRKZ3ZmY3B4Y01CYUl6emw1YjhQaGlES0xFWnU1ekNPUkk5R0dOVjdWZUFveE96TFM3Mk1DbktpOU1vQUVUVmh0YmI4SFlVVDg3Wlk1QkkzRTNteVI3dnFlU1BMYzd5dks1d3J1UVEiLCJtYWMiOiIwNzM3M2RhM2I4N2UwZjdkNTg0Nzg4YmNiOWYyYWI5Y2JhMGFiODIxOTQwMjNmYzA3YTMzZWJkN2JjNWQ3M2M4IiwidGFnIjoiIn0%3D',
    );

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch('https://mybahria.com.pk/api/city', requestOptions)
      .then(response => response.json())
      .then(res => {
        console.log(res.bahriaCities, 'BAHRIA');
        setCities(res.bahriaCities);
      })
      .catch(error => console.log('error', error));
  };

  const subCategorydropdown = id => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${user_token}`);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,

      redirect: 'follow',
    };
    fetch(
      `https://mybahria.com.pk/api/service_category/get/${id}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(({sub_categories}) => {
        setSubCategories(sub_categories), console.log(sub_categories, 'SUB');
      })
      .catch(error => console.log('error', error));
  };
  const RegisteredBuiseness = () => {
    //ssToastAndroid.show('password not match', ToastAndroid.SHORT);
    user_data.verified != 'Yes'
      ? ToastAndroid.show('You are Not Verified', ToastAndroid.SHORT)
      : title === ''
      ? ToastAndroid.show('Title Field Empty', ToastAndroid.SHORT)
      : selectedArea === ''
      ? ToastAndroid.show('Select Area', ToastAndroid.SHORT)
      : selectedCity === ''
      ? ToastAndroid.show('Select City', ToastAndroid.SHORT)
      : landlineno === ''
      ? ToastAndroid.show('Landline No Field Empty', ToastAndroid.SHORT)
      : phno === ''
      ? ToastAndroid.show('Phone No Field Empty', ToastAndroid.SHORT)
      : Longitude === ''
      ? ToastAndroid.show('Longitude Field Empty', ToastAndroid.SHORT)
      : Latitude === ''
      ? ToastAndroid.show('Latitude Field Empty', ToastAndroid.SHORT)
      : selectedCategory === ''
      ? ToastAndroid.show('Select Category', ToastAndroid.SHORT)
      : selectedsubcategory === ''
      ? ToastAndroid.show('Select SubCategory', ToastAndroid.SHORT)
      : email === ''
      ? ToastAndroid.show('Email Field Empty', ToastAndroid.SHORT)
      : address === ''
      ? ToastAndroid.show('Address Field Empty', ToastAndroid.SHORT)
      : AddBuisness();
  };
  const AddBuisness = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${user_token}`);
    var formdata = new FormData();
    // formdata.append("image", fileInput.files[0], "[PROXY]");
    formdata.append('title', title);
    formdata.append('city', selectedCity);
    formdata.append('area', selectedArea);
    formdata.append('landline', landlineno);
    formdata.append('mobile', phno);
    // formdata.append(
    //   'address1',
    //   '77 Plaza, Linear Commercial Park, Bahria Safari Valley Phase 7 Bahria Town, Rawalpindi, Punjab, Pakistan',
    // );
    // formdata.append(
    //   'address2',
    //   '77 Plaza, Linear Commercial Park, Bahria Safari Valley Phase 7 Bahria Town, Rawalpindi, Punjab, Pakistan',
    // );
    formdata.append('email', email);
    formdata.append('longitude', Longitude);
    formdata.append('latitude', Latitude);
    formdata.append('facebook', fb);
    formdata.append('youtube', utube);
    formdata.append('twitter', twitter);
    formdata.append('address1', address);
    formdata.append('address2', '');
    formdata.append('linkedin', Linkedin);
    formdata.append('category_name', selectedCategory);
    formdata.append('sub_category', selectedsubcategory);
    formdata.append('save_add_service', '');
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    fetch('https://mybahria.com.pk/api/add-service', requestOptions)
      .then(response => response.json())
      .then(({status}) => {
        console.log(status);
        if (status === 'success') {
          props.navigation.navigate('MainWindow');
        } else {
        }
      })
      .catch(error => console.log('error', error));
  };
  let cityItems = cities.map(item => {
    return <Picker.Item key={item.id} value={item.id} label={item.name} />;
  });
  const citiesss = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${user_token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'https://mybahria.com.pk/api/main_service_category/get',
      requestOptions,
    )
      .then(response => response.json())
      .then(({parent_categories}) => {
        setCategories(parent_categories);
        console.log(parent_categories);
      })
      .catch(error => console.log('error', error));
  };

  let categoryItems = Object.keys(category).map(key => (
    <Picker.Item key={key} label={category[key]} value={key} />
  ));

  let subcategoryItems = Object.keys(subbategory).map(key => (
    <Picker.Item key={key} label={subbategory[key]} value={key} />
  ));

  const HeaderTitle = 'Dashboard';
  useEffect(async () => {
    //  getCity_Categories();
    CiteGet();
    citiesss();

    //  getSellRequest();
  }, []);
  return (
    <SafeAreaView style={styles.body}>
      {/* <CustomHeader
        title="Register Your Business"
        navigation={props.navigation}
      /> */}
      <ScrollView>
        <View style={styles.form}>
          <TextInput
            selectionColor="firebrick"
            theme={{colors: {text: '#000', primary: 'red'}}}
            style={styles.TextInput}
            label="Title"
            onChangeText={text => {
              setTitle(text);
            }}
          />

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedCategory}
              onValueChange={(item, index) => {
                setCategory(item);
                subCategorydropdown(item);
              }}
              mode="dropdown"
              style={styles.pickerStyle}>
              <Picker.Item
                color="#a5a0a0"
                label="Select Category"
                value="key0"
              />
              {categoryItems}
            </Picker>
          </View>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedsubcategory}
              onValueChange={(itemValue, itemIndex) =>
                setSubCategory(itemValue)
              }
              mode="dropdown"
              style={styles.pickerStyle}>
              <Picker.Item
                color="#a5a0a0"
                label="Select Sub Category"
                value="key0"
              />
              {subcategoryItems}
            </Picker>
          </View>
          {/* <CustomTitle title="Contact Information" /> */}
          <Text style={styles.SectionTitle}>Contact Information</Text>
          <TextInput
            keyboardType="phone-pad"
            selectionColor="firebrick"
            theme={{colors: {text: '#000', primary: 'red'}}}
            style={styles.TextInput}
            label="Lanline number"
            onChangeText={text => {
              setLandLineno(text);
            }}
          />
          <TextInput
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            selectionColor="firebrick"
            theme={{colors: {text: '#000', primary: 'red'}}}
            style={styles.TextInput}
            label="Phone number"
            onChangeText={text => {
              setPhno(text);
            }}
          />
          <TextInput
            keyboardType="email-address"
            textContentType="emailAddress"
            selectionColor="firebrick"
            theme={{colors: {text: '#000', primary: 'red'}}}
            style={styles.TextInput}
            label="Email"
            onChangeText={text => {
              setEmail(text);
            }}
          />
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedCity}
              onValueChange={(itemValue, itemIndex) => {
                setCity(itemValue), Areadropdown(itemValue);
              }}
              mode="dropdown"
              style={styles.pickerStyle}>
              <Picker.Item color="#a5a0a0" label="Select City" value="key0" />
              {cityItems}
            </Picker>
          </View>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedArea}
              onValueChange={(itemValue, itemIndex) => setArea(itemValue)}
              mode="dropdown"
              style={styles.pickerStyle}>
              <Picker.Item color="#a5a0a0" label="Select Area" value="key0" />
              {AreaItems}
            </Picker>
          </View>
          <TextInput
            textContentType="addressCityAndState"
            selectionColor="firebrick"
            theme={{colors: {text: '#000', primary: 'red'}}}
            style={styles.TextInput}
            label="Address"
            onChangeText={text => {
              setAddress(text);
            }}
          />
          <Text style={styles.SectionTitle}>Map Location</Text>
          <TextInput
            keyboardType="numbers-and-punctuation"
            selectionColor="firebrick"
            theme={{colors: {text: '#000', primary: 'red'}}}
            style={styles.TextInput}
            label="Latitude"
            onChangeText={text => {
              setLatitude(text);
            }}
          />
          <TextInput
            keyboardType="numbers-and-punctuation"
            selectionColor="firebrick"
            theme={{colors: {text: '#000', primary: 'red'}}}
            style={styles.TextInput}
            label="Longitude"
            onChangeText={text => {
              setLongitude(text);
            }}
          />
          <Text style={styles.SectionTitle}>Social Media</Text>
          <TextInput
            keyboardType="url"
            selectionColor="firebrick"
            theme={{colors: {text: '#000', primary: 'red'}}}
            style={styles.TextInput}
            label="Facebook"
            onChangeText={text => {
              setFb(text);
            }}
          />
          <TextInput
            keyboardType="url"
            selectionColor="firebrick"
            theme={{colors: {text: '#000', primary: 'red'}}}
            style={styles.TextInput}
            label="Youtube"
            onChangeText={text => {
              setUtube(text);
            }}
          />
          <TextInput
            keyboardType="twitter"
            selectionColor="firebrick"
            theme={{colors: {text: '#000', primary: 'red'}}}
            style={styles.TextInput}
            label="Twitter"
            onChangeText={text => {
              setTwitter(text);
            }}
          />
          <TextInput
            keyboardType="url"
            selectionColor="firebrick"
            theme={{colors: {text: '#000', primary: 'red'}}}
            style={styles.TextInput}
            label="Linkedin"
            onChangeText={text => {
              setLinkedin(text);
            }}
          />
          <CustomButton
            style={styles.btnBg}
            OnPRESS={() => {
              RegisteredBuiseness();
            }}
            bgColor="firebrick"
            title="Register"
            btnTitleStyle={styles.btnLabel}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default RegisterBusiness;
