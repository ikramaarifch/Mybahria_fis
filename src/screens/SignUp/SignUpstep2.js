import React, {Component, useEffect, useState} from 'react';

import styles from './styles';

import {Picker} from '@react-native-picker/picker';
import {CheckBox} from 'react-native-elements/dist/checkbox/CheckBox';

import {TextInput} from 'react-native-paper';

import {
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {cameraPickCover, requestPermission} from '../../utils/CameraUtil';
import CustomButton from '../../utils/CustomButton';
import {APIS} from '../../utils/URLS/Urls';
import {fetchInterceptor} from '../../FetchCall/GetInterceptor';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {USER_DATA, USER_TOKEN} from '../../redux/Constant/Constant.action';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SignUpstep2(props) {
  const dispatch = useDispatch();
  const states = useSelector(state => state.ConstantReducer);

  const [isAgentBoxChecked, setAgentBoxChecked] = useState(false);

  const [PasswordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setconfirmPasswordVisibility] =
    useState(false);
  const [selectedResident, setResident] = useState('');
  const [selectedCity, setCity] = useState('key0');
  const [selectedArea, setArea] = useState('key0');

  const [areaId, setareaId] = useState(0);
  // console.log(Areas, 'Areas');
  const [cityId, setcityId] = useState(0);

  const [selectedCategory, setCategory] = useState('key0');
  const [image, setImage] = useState('');

  const [isLoading, setisLoading] = useState(false);

  //form data
  const [user_name, setuser_name] = useState();
  const [user_mail, setuser_mail] = useState();
  const [user_no, setuser_no] = useState();
  const [user_pass, setuser_pass] = useState();
  const [user_conf_pass, setuser_conf_pass] = useState();
  //business states
  const [isRegisterChecked, setRegisterChecked] = useState(false);
  const [isTerm_Accepeted, setIsTermAccepted] = useState(false);
  const [categoryId, setcategoryId] = useState(0);
  const [company_name, setcompany_name] = useState();
  const [company_mail, setcompany_mail] = useState();
  const [company_phone_no, setcompany_phone_no] = useState();
  const [company_mob_no, setcompany_mob_no] = useState();
  const [company_address, setcompany_address] = useState();
  const [datas, setData] = useState('');
  // console.log(cities, 'Cities');
  const GetUserType = async () => {
    const value = await AsyncStorage.getItem('@user_Key');
    console.log(value, 'value get');

    setData(JSON.parse(value));
  };
  const storeData = async () => {
    console.log(datas);
    try {
      let Data = {
        user_name: datas?.name,
        resident_type: datas?.resident_type,
        area: datas?.area,
        city: datas?.city,
        user_no: user_no,
        user_mail: user_mail,
      };
      await AsyncStorage.setItem(
        '@user_Key_OtherDetails',
        JSON.stringify(Data),
        console.log(Data, 'Data Value'),
      );
    } catch (e) {
      console.log(e);
    }
  };
  const [cities, setCities] = useState([
    // {
    //   id: '1',
    //   name: 'Lahore',
    //   value: 'lhr',
    // },
    // {
    //   id: '2',
    //   name: 'karachi',
    //   value: 'kr',
    // },
    // {
    //   id: '3',
    //   name: 'Islamabad',
    //   value: 'isl',
    // },
    // {
    //   id: '4',
    //   name: 'Peshawar',
    //   value: 'pesh',
    // },
  ]);
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

  const setAreaIndex = (item, index) => {
    setArea(item);
    let ID = Areas[index - 1]['id'];
    setareaId(ID);
  };

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

  const getCity_Categories = () => {
    fetch(APIS.data_signup_city)
      .then(res => res.json())
      .then(({bahriaCities, Category}) => {
        setCategories(Category);
        setCities(bahriaCities);
      });
  };
  useEffect(() => {
    GetUserType();
  }, []);

  const ImportImage = async () => {
    //requestPermission();
    // if (requestPermission()) {
    //   setImage(() => cameraPickCover());
    // }

    const data = await cameraPickCover();
    // console.log('uri : ', data.path);
    setImage(data.path);
  };

  function RegisterBusinessCheckHandler() {
    setRegisterChecked(!isRegisterChecked);
  }
  function TermsCheckHandler() {
    setIsTermAccepted(!isTerm_Accepeted);
  }
  function AgentCheckHandler() {
    setAgentBoxChecked(!isAgentBoxChecked);
  }

  function handlePasswordVisibility() {
    setPasswordVisibility(!PasswordVisibility);
  }

  function handleConfirmPasswordVisibility() {
    setconfirmPasswordVisibility(!confirmPasswordVisibility);
  }

  let cityItems = cities.map(item => {
    return <Picker.Item key={item.id} value={item.name} label={item.name} />;
  });
  let categoryItems = category.map(item => {
    return <Picker.Item key={item.cid} value={item.title} label={item.title} />;
  });
  let AreaItems = Areas.map(item => {
    return <Picker.Item key={item.id} value={item.name} label={item.name} />;
  });

  const business_categoryIndex = (item, index) => {
    setCategory(item);
    let INDEX = category[index - 1]['cid'];
    setcategoryId(INDEX);
  };

  const login = (token, user) => {
    dispatch({type: USER_TOKEN, payload: token});
    dispatch({type: USER_DATA, payload: user});

    setTimeout(() => {
      props.navigation.navigate('HomeStack');
    }, 1000);
    ToastAndroid.show('Logged in Successfully', ToastAndroid.SHORT);
  };

  const loginUser = async (email, password) => {
    // setisLoading(true);
    console.log('login user');
    const params = {
      email: email,
      password: password,
    };
    const data = await fetch(APIS.login, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
      .then(res => res.json())
      .then(response => {
        response['token'] === null
          ? ToastAndroid.show('logged in Failed! try again', ToastAndroid.SHORT)
          : login(response['token'], response['user']);
      })
      .catch(res => console.log(res))
      .finally(() => {
        setisLoading(false);
      });

    // data['error'] === 'UnAuthorised'
    //   ? ToastAndroid.show('Invalid User', ToastAndroid.SHORT)
    //   : login(data);
  };

  const registerUser = async (params, status) => {
    // console.log('====================================');
    // console.log({params});
    // console.log('====================================');
    const response = await fetch(APIS.register, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
      .then(res => res.json())
      .then(res => {
        ToastAndroid.show(`${res.message}`, ToastAndroid.SHORT),
          loginUser(params.email, params.password);
        console.log(res, 'Resigter Response');
      })
      .catch(res => console.log(res))
      .finally(() => {
        setisLoading(false);
      });
  };

  const registerWithOutBusinessAccount = () => {
    setisLoading(true);
    const params = {
      name: user_name,
      email: user_mail,
      password: user_pass,
      resident_type: selectedResident,
      city: cityId,
      area: areaId,
      phone_no: user_no,
      accept: isTerm_Accepeted,
    };

    // 0 means register simple user , witout business

    isTerm_Accepeted
      ? registerUser(params, 0)
      : (ToastAndroid.show('Accept Terms & Conditions ', ToastAndroid.SHORT),
        setisLoading(false));
  };
  const registerWithBusinessAccount = () => {
    setisLoading(true);
    const params = {
      name: user_name,
      email: user_mail,
      password: user_pass,
      resident_type: selectedResident,
      city: cityId,
      area: cityId,
      phone_no: user_no,
      accept: isTerm_Accepeted,
      checkbox: isRegisterChecked,
      business_name: company_name,
      business_category: categoryId,
      business_email: company_mail,
      business_phone_no: company_phone_no,
      business_mobile_no: company_mob_no,
      business_address: company_address,
    };

    // 1 means register user with business account
    isTerm_Accepeted && isRegisterChecked
      ? registerUser(params, 1)
      : (ToastAndroid.show(
          'Accept Terms & Conditions or re check regsiter box',
          ToastAndroid.SHORT,
        ),
        setisLoading(false));
  };
  const RegistereUser = () => {
    //ToastAndroid.show('password not match', ToastAndroid.SHORT)
    // !user_name
    //   ? ToastAndroid.show('username invalid', ToastAndroid.SHORT)
    !user_mail
      ? ToastAndroid.show('user mail invalid', ToastAndroid.SHORT)
      : !user_no
      ? ToastAndroid.show('user phone number invalid', ToastAndroid.SHORT)
      : //   : !user_pass
      //   ? ToastAndroid.show('password invalid', ToastAndroid.SHORT)
      //   : !user_conf_pass
      //   ? ToastAndroid.show('user confirm password invalid', ToastAndroid.SHORT)
      //   : !(user_pass === user_conf_pass)
      //   ? ToastAndroid.show('Passwords not matched', ToastAndroid.SHORT)
      //   : selectedResident === ''
      //   ? ToastAndroid.show('Select resident type', ToastAndroid.SHORT)
      //   : selectedCity === 'key0'
      //   ? ToastAndroid.show('Select city', ToastAndroid.SHORT)
      // : selectedArea === 'key0'
      // ? ToastAndroid.show('Select area', ToastAndroid.SHORT)

      !isRegisterChecked
      ? (storeData(), props.navigation.navigate('Signup3'))
      : !company_name
      ? ToastAndroid.show('Company name is Invalid', ToastAndroid.SHORT)
      : selectedCategory === 'key0'
      ? ToastAndroid.show('Select Category', ToastAndroid.SHORT)
      : !company_mail
      ? ToastAndroid.show('Company email is Invalid', ToastAndroid.SHORT)
      : !company_phone_no
      ? ToastAndroid.show('Company phone number is Invalid', ToastAndroid.SHORT)
      : !company_mob_no
      ? ToastAndroid.show(
          'Company mobile number is Invalid',
          ToastAndroid.SHORT,
        )
      : !company_address
      ? ToastAndroid.show('Company address is Invalid', ToastAndroid.SHORT)
      : image === ''
      ? ToastAndroid.show('Add Company logo', ToastAndroid.SHORT)
      : registerWithBusinessAccount();
  };

  return (
    <SafeAreaView
      style={{width: '100%', height: '100%', backgroundColor: '#fff'}}>
      <Icon
        name="arrow-left"
        size={17}
        color="#D10404"
        onPress={() => {
          props.navigation.goBack();
        }}
        style={{top: 10, left: 10, zIndex: 7}}
      />
      {isLoading ? (
        <View
          style={{
            backgroundColor: '#00000099',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : null}
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.containerView}>
          <View style={styles.logoView}>
            <Image
              style={styles.thumnailStyle}
              source={require('../../Drawables/logo.png')}
              resizeMode="contain"
            />
          </View>

          <View style={{width: '90%'}}>
            {/* <TextInput
              theme={{colors: {text: '#000', primary: 'red'}}}
              labelTextColor="#929294"
              style={styles.inputStyle}
              value={user_name}
              onChangeText={val => setuser_name(val)}
              label="Name"
            /> */}

            <TextInput
              theme={{colors: {text: '#000', primary: 'red'}}}
              labelTextColor="#929294"
              style={styles.inputStyle}
              value={user_mail}
              keyboardType="email-address"
              onChangeText={val => setuser_mail(val)}
              label="Email"
            />

            <TextInput
              theme={{colors: {text: '#000', primary: 'red'}}}
              labelTextColor="#929294"
              style={styles.inputStyle}
              keyboardType="phone-pad"
              value={user_no}
              onChangeText={val => setuser_no(val)}
              label="Phone number"
            />

            {/* <TextInput
              theme={{colors: {text: '#000', primary: 'red'}}}
              labelTextColor="#929294"
              style={styles.inputStyle}
              value={user_pass}
              onChangeText={val => setuser_pass(val)}
              label="Password"
              secureTextEntry={PasswordVisibility}
              right={
                <TextInput.Icon
                  name={() => (
                    <FontAwesome
                      name={PasswordVisibility ? 'eye' : 'eye-slash'}
                      style={{color: 'black', fontSize: 18}}
                    />
                  )}
                  onPress={() => {
                    handlePasswordVisibility();
                  }}
                />
              }
            />  */}

            {/* <TextInput
              theme={{colors: {text: '#000', primary: 'red'}}}
              labelTextColor="#929294"
              style={styles.inputStyle}
              value={user_conf_pass}
              onChangeText={val => setuser_conf_pass(val)}
              label="Confirm Password"
              secureTextEntry={confirmPasswordVisibility}
              right={
                <TextInput.Icon
                  name={() => (
                    <FontAwesome
                      name={confirmPasswordVisibility ? 'eye' : 'eye-slash'}
                      style={{color: 'black', fontSize: 18}}
                    />
                  )}
                  onPress={() => {
                    handleConfirmPasswordVisibility();
                  }}
                />
              }
            /> */}
            {/* <TouchableOpacity
                onPress={() => handleConfirmPasswordVisibility()}>
                <FontAwesome
                  name={confirmPasswordVisibility ? 'eye' : 'eye-slash'}
                  style={{color: 'black', fontSize: 18}}
                />
              </TouchableOpacity> */}
            {/* 
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedResident}
                onValueChange={(itemValue, itemIndex) => setResident(itemValue)}
                mode="dropdown"
                style={styles.pickerStyle}>
                <Picker.Item
                  color="#a5a0a0"
                  label="Resident Type"
                  value="key0"
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
            </View> */}
            {/* <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedCity}
                onValueChange={(item, index) => setAreaHandler(item, index)}
                mode="dropdown"
                style={styles.pickerStyle}>
                <Picker.Item color="#a5a0a0" label="Select City" value="key0" />
                {cityItems}
              </Picker>
            </View>

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedArea}
                onValueChange={(item, index) => setAreaIndex(item, index)}
                mode="dropdown"
                style={styles.pickerStyle}>
                <Picker.Item color="#a5a0a0" label="Select Area" value="key0" />
                {AreaItems}
              </Picker>
            </View> */}
          </View>
          {/* <View style={styles.checkboxContainer}>
            <CheckBox
              onPress={() => RegisterBusinessCheckHandler()}
              checked={isRegisterChecked}
              checkedColor="red"
              style={styles.checkbox}
            />
            <Text style={styles.label}>Register Your Business</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              onPress={() => TermsCheckHandler()}
              checked={isTerm_Accepeted}
              checkedColor="red"
              style={styles.checkbox}
            />
            <Text style={styles.label}>Accept Terms & Conditions?</Text>
          </View> */}

          {isRegisterChecked ? (
            <View style={{width: '90%'}}>
              <TextInput
                theme={{colors: {text: '#000', primary: 'red'}}}
                labelTextColor="#929294"
                style={styles.inputStyle}
                value={company_name}
                onChangeText={val => setcompany_name(val)}
                label="Business Name"
              />

              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedCategory}
                  onValueChange={(item, index) =>
                    business_categoryIndex(item, index)
                  }
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

              <TextInput
                theme={{colors: {text: '#000', primary: 'red'}}}
                labelTextColor="#929294"
                style={styles.inputStyle}
                value={company_mail}
                keyboardType="email-address"
                onChangeText={val => setcompany_mail(val)}
                label="Email Address"
              />

              <TextInput
                theme={{colors: {text: '#000', primary: 'red'}}}
                labelTextColor="#929294"
                style={styles.inputStyle}
                value={company_phone_no}
                keyboardType="phone-pad"
                onChangeText={val => setcompany_phone_no(val)}
                label="Phone No"
              />

              <TextInput
                theme={{colors: {text: '#000', primary: 'red'}}}
                labelTextColor="#929294"
                style={styles.inputStyle}
                value={company_mob_no}
                keyboardType="phone-pad"
                onChangeText={val => setcompany_mob_no(val)}
                label="Mobile No"
              />

              <TextInput
                theme={{colors: {text: '#000', primary: 'red'}}}
                labelTextColor="#929294"
                style={styles.inputStyle}
                value={company_address}
                onChangeText={val => setcompany_address(val)}
                label="Address"
              />
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  padding: 5,
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flex: 1,

                    marginTop: 12,
                    justifyContent: 'space-around',
                    height: 70,
                  }}>
                  <Text style={{fontSize: 14, marginBottom: 8}}>
                    Upload logo
                  </Text>
                  <TouchableOpacity onPress={ImportImage}>
                    <View
                      style={{
                        width: '60%',
                        borderRadius: 6,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        backgroundColor: '#F0F0F0',
                        paddingHorizontal: 4,
                        paddingVertical: 6,
                      }}>
                      <FontAwesome name="photo" size={22} color="#929294" />
                      <Text style={{marginLeft: 6}}>Choose File</Text>
                    </View>
                  </TouchableOpacity>
                </View>

                {image === '' ? null : (
                  <View style={{backgroundColor: '#F0F0F0', paddingBottom: 8}}>
                    <TouchableOpacity onPress={() => setImage('')}>
                      <FontAwesome
                        style={{alignSelf: 'flex-end', paddingRight: 6}}
                        name="times"
                        color="red"
                        size={20}
                      />
                    </TouchableOpacity>
                    <Image
                      style={{width: 120, height: 100}}
                      resizeMode="contain"
                      source={{uri: image}}
                    />
                  </View>
                )}
              </View>
            </View>
          ) : null}
          {/* 
          <View style={styles.checkboxContainer}>
            <CheckBox
              onPress={() => AgentCheckHandler()}
              checked={isAgentBoxChecked}
              checkedColor="red"
              style={styles.checkbox}
            />
            <Text style={styles.label}>Register As Agent</Text>
          </View> */}

          <View style={styles.forgotCont}>
            <Text
              style={styles.alreadyReg}
              onPress={() => props.navigation.navigate('Login')}>
              Already Registered?
            </Text>
          </View>
          <View
            style={{
              width: '95%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomButton
              btnTitleStyle={styles.loginText}
              style={styles.loginBtn}
              title="Next"
              bgColor="#D10404"
              // OnPRESS={() => props.navigation.navigate('Login')}
              OnPRESS={() => RegistereUser()}
            />

            {/* <Button
              medium
              style={styles.loginBtn}
              // onPress={this.validate}
            >
              <Text style={styles.loginText}>Register</Text>
            </Button> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SignUpstep2;
