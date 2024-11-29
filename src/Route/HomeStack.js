import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  Blog,
  Buy_Sells,
  Contact,
  Directories,
  EditProfile,
  Gallery,
  Home,
  MainWindow,
  ManageSells,
  News,
  Properties,
  RegisterBusiness,
  Services,
  Forum,
  CategoryItemSample,
  Comments,
  Jobs,
  ManageProperties,
  PropertyPreView,
  DirectoryPreViewSample,
  NewsPreView,
  CardOneComponent,
  UserSetting,
  ProppertiesSample,
} from '../screens';

import {DashboardStackComponent} from '../Screens/Dashboard';
// import {View} from 'react-native';
import {TouchableOpacity, View, Image, Text, Button} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import StackHeader from '../utils/StackHeader';
import {useNavigation} from '@react-navigation/core';
import {
  FilterModalState,
  ServiceFilterModalState,
  addNewItemSellPurchase,
  applyFilterToSellItems,
  addPropertyModalVisibilityAction,
  openServiceFilterModal,
  addNewItem,
} from '../redux/tabs_handler/actions';
import {connect} from 'react-redux';
import DirectoryDetails from '../DirectoryDetails/DirectoryDetails';
import GalleryPreview from '../screens/Gallery/PictureCardSample/GalleryPreview';
import DirectoryPreView from '../screens/BottomNavigationTabs/Directories/DirectoryPreView';

const Stack = createStackNavigator();

function HomeStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="MainWindow"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#CC0000',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          // fontWeight: 'bold',
          fontSize: 14,
        },
        headerRight: () => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* <TouchableOpacity
              style={{
                paddingTop: 4,
                marginRight: 12,
                justifyContent: 'center',
                alignItemsL: 'center',
              }}>
              <Image
                style={{
                  height: 25,
                  width: 25,
                  tintColor: '#fff',
                }}
                source={require('../Drawables/newIcons/notification_icon.png')}
              />
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => props.navigation.navigate('MainWindow')}
              style={{marginRight: 16}}>
              <FontAwesome5 name="home" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        ),
      }}
      // screenOptions={{
      //   headerTintColor: '#fff',
      //   headerTitleAlign: 'center',
      //   headerTitleStyle: {
      //     fontSize: 16,
      //     // fontWeight: 'bold',/
      //   },
      //   headerStyle: {
      //     // backgroundColor: '#5C5CFF',
      //     backgroundColor: 'firebrick',
      //   },
      //   headerRight: () => (
      //     <TouchableOpacity
      //       style={{
      //         backgroundColor: '#fff',
      //         padding: 2,
      //         marginRight: 16,
      //         borderRadius: 5,
      //         alignSelf: 'center',
      //       }}>
      //       <FontAwesome5 name="phone-alt" color="#e91e63" size={24} />
      //     </TouchableOpacity>
      //   ),
      // }}
    >
      <Stack.Screen
        name="MainWindow"
        component={MainWindow}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GalleryPreview"
        component={GalleryPreview}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SubCategoryPreview"
        component={DirectoryPreView}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="ProppertiesSample"
        component={ProppertiesSample}
        options={{headerShown: false}}
      />
      <Stack.Screen
        options={({navigation, route}) => ({
          headerShown: false,
          headerRight: () => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* <TouchableOpacity
              style={{
                paddingTop: 4,
                marginRight: 12,
                justifyContent: 'center',
                alignItemsL: 'center',
              }}>
              <Image
                style={{
                  height: 25,
                  width: 25,
                  tintColor: '#fff',
                }}
                source={require('../Drawables/newIcons/notification_icon.png')}
              />
            </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => props.openServicesModal()}
                style={{
                  paddingTop: 4,
                  marginRight: 16,
                  justifyContent: 'center',
                  alignItemsL: 'center',
                }}>
                <FontAwesome5 name="search" size={20} color="#fff" />
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={() => props.navigation.navigate('MainWindow')}
                style={{
                  marginRight: 16,
                  backgroundColor: '#fff',
                  borderRadius: 4,
                }}>
                <FontAwesome5 name="plus" size={20} color="#fff" />
                <Text
                  style={{
                    fontSize: 11,
                    color: 'green',
                    marginHorizontal: 4,
                    marginVertical: 6,
                    fontWeight: 'bold',
                  }}>
                  Register Srevice?
                </Text>
              </TouchableOpacity> */}
            </View>
          ),
        })}
        name="Services"
        component={Services}
      />
      <Stack.Screen
        name="Buy / Sell"
        component={Buy_Sells}
        options={({navigation, route}) => ({
          headerRight: () => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* <TouchableOpacity
              style={{
                paddingTop: 4,
                marginRight: 12,
                justifyContent: 'center',
                alignItemsL: 'center',
              }}>
              <Image
                style={{
                  height: 25,
                  width: 25,
                  tintColor: '#fff',
                }}
                source={require('../Drawables/newIcons/notification_icon.png')}
              />
            </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => props.openFilterModal()}
                style={{
                  paddingTop: 4,
                  marginRight: 16,
                  justifyContent: 'center',
                  alignItemsL: 'center',
                }}>
                <FontAwesome5 name="search" size={20} color="#fff" />
              </TouchableOpacity>
              {/* <TouchableOpacity
              onPress={() => props.navigation.navigate('MainWindow')}
              style={{marginRight: 16}}>
              <FontAwesome5 name="home" size={20} color="#fff" />
            </TouchableOpacity> */}
            </View>
          ),
        })}
      />
      <Stack.Screen name="CardOneComponent" component={CardOneComponent} />
      <Stack.Screen
        options={({navigation, route}) => ({
          headerRight: () => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* <TouchableOpacity
                style={{
                  paddingTop: 4,
                  marginRight: 12,
                  justifyContent: 'center',
                  alignItemsL: 'center',
                }}>
                <Image
                  style={{
                    height: 25,
                    width: 25,
                    tintColor: '#fff',
                  }}
                  source={require('../Drawables/newIcons/notification_icon.png')}
                />
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => props.openModal()}
                style={{
                  paddingTop: 4,
                  marginRight: 16,
                  justifyContent: 'center',
                  alignItemsL: 'center',
                }}>
                <FontAwesome5 name="search" size={20} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('MainWindow')}
                style={{marginRight: 16}}>
                <FontAwesome5 name="home" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          ),
        })}
        name="Properties"
        component={Properties}
      />

      <Stack.Screen
        options={{
          title: 'Forum',
        }}
        name="forum"
        component={Forum}
      />

      {/* previews */}

      <Stack.Screen
        options={{headerShown: false}}
        name="PropertyPreView"
        component={PropertyPreView}
      />

      <Stack.Screen
        options={{
          headerRight: () => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* <TouchableOpacity
              style={{
                paddingTop: 4,
                marginRight: 12,
                justifyContent: 'center',
                alignItemsL: 'center',
              }}>
              <Image
                style={{
                  height: 25,
                  width: 25,
                  tintColor: '#fff',
                }}
                source={require('../Drawables/newIcons/notification_icon.png')}
              />
            </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => props.openServiceFilterModal()}
                style={{
                  paddingTop: 4,
                  marginRight: 16,
                  justifyContent: 'center',
                  alignItemsL: 'center',
                }}>
                <FontAwesome5 name="search" size={20} color="#fff" />
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={() => props.navigation.navigate('MainWindow')}
                style={{marginRight: 16}}>
                <FontAwesome5 name="home" size={20} color="#fff" />
              </TouchableOpacity> */}
            </View>
          ),
          title: 'Services',
        }}
        name="DirectoryPreViewSample"
        component={DirectoryPreViewSample}
      />

      <Stack.Screen
        options={{
          title: 'News',
        }}
        name="NewsPreView"
        component={NewsPreView}
      />

      {/* forum tabs */}
      <Stack.Screen
        options={{title: ''}}
        name="CategoryItemSample"
        component={CategoryItemSample}
      />
      <Stack.Screen name="Comments" component={Comments} />

      {/* //drawersItems */}
      <Stack.Screen
        name="Jobs"
        component={Jobs}
        options={({navigation, route}) => ({
          headerRight: () => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* <TouchableOpacity
                style={{
                  paddingTop: 4,
                  marginRight: 12,
                  justifyContent: 'center',
                  alignItemsL: 'center',
                }}>
                <Image
                  style={{
                    height: 25,
                    width: 25,
                    tintColor: '#fff',
                  }}
                  source={require('../Drawables/newIcons/notification_icon.png')}
                />
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => props.openModal()}
                style={{
                  paddingTop: 4,
                  marginRight: 16,
                  justifyContent: 'center',
                  alignItemsL: 'center',
                }}>
                <FontAwesome5 name="search" size={20} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('MainWindow')}
                style={{marginRight: 16}}>
                <FontAwesome5 name="home" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="Directories"
        component={Directories}
        options={{title: 'Directory'}}
      />
      <Stack.Screen name="Directory" component={DirectoryDetails} />
      <Stack.Screen name="Gallery" component={Gallery} />
      <Stack.Screen name="Contact" component={Contact} />
      <Stack.Screen
        name="ManageProperties"
        component={ManageProperties}
        options={{
          title: 'Manage Properties',
          headerRight: () => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* <TouchableOpacity
              style={{
                paddingTop: 4,
                marginRight: 12,
                justifyContent: 'center',
                alignItemsL: 'center',
              }}>
              <Image
                style={{
                  height: 25,
                  width: 25,
                  tintColor: '#fff',
                }}
                source={require('../Drawables/newIcons/notification_icon.png')}
              />
            </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => props.addPropertyModalVisibilityAction()}
                style={{
                  paddingTop: 4,
                  marginRight: 16,
                  justifyContent: 'center',
                  alignItemsL: 'center',
                }}>
                <FontAwesome5 name="plus" size={20} color="#fff" />
              </TouchableOpacity>
              {/* <TouchableOpacity
              onPress={() => props.navigation.navigate('MainWindow')}
              style={{marginRight: 16}}>
              <FontAwesome5 name="home" size={20} color="#fff" />
            </TouchableOpacity> */}
            </View>
          ),
        }}
      />

      <Stack.Screen name="Blog" component={Blog} />
      <Stack.Screen
        options={{title: 'Settings'}}
        name="usersetting"
        component={UserSetting}
      />

      <Stack.Screen name="News" component={News} />

      <Stack.Screen
        options={{
          title: 'Edit Profile',
        }}
        name="editProfile"
        component={EditProfile}
      />

      <Stack.Screen
        options={{
          title: 'Register Your Business',
        }}
        name="registerBusiness"
        component={RegisterBusiness}
      />

      <Stack.Screen
        options={({navigation, route}) => ({
          headerRight: () => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* <TouchableOpacity
              style={{
                paddingTop: 4,
                marginRight: 12,
                justifyContent: 'center',
                alignItemsL: 'center',
              }}>
              <Image
                style={{
                  height: 25,
                  width: 25,
                  tintColor: '#fff',
                }}
                source={require('../Drawables/newIcons/notification_icon.png')}
              />
            </TouchableOpacity> */}
              {/* <TouchableOpacity
              onPress={() => props.openModal()}
              style={{
                paddingTop: 4,
                marginRight: 16,
                justifyContent: 'center',
                alignItemsL: 'center',
              }}>
              <FontAwesome5 name="search" size={20} color="#fff" />
            </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => props.openAddNewModal()}
                style={{marginRight: 16}}>
                <FontAwesome5 name="plus" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          ),
          title: 'Sell / Purchase',
        })}
        name="manageSells"
        component={ManageSells}
      />
    </Stack.Navigator>
  );
}

const mapPropsToActions = dispatch => {
  return {
    openModal: () => dispatch(FilterModalState()),
    openServicesModal: () => dispatch(ServiceFilterModalState()),
    openAddNewItemModal: () => dispatch(addNewItemSellPurchase()),

    openAddNewModal: () => dispatch(addNewItem()),

    openFilterModal: () => dispatch(applyFilterToSellItems()),
    addPropertyModalVisibilityAction: () =>
      dispatch(addPropertyModalVisibilityAction()),
    openServiceFilterModal: () => dispatch(openServiceFilterModal()),
  };
};
export default connect(null, mapPropsToActions)(HomeStack);
