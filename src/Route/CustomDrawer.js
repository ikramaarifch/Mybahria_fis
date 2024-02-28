import 'react-native-gesture-handler';

import * as React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

import {
  BahriaInfo,
  News,
  Blog,
  Contact,
  Gallery,
  AboutBahria,
  EditProfile,
  ManageSells,
  RegisterBusiness,
  CustomDrawerSidebarMenu,
} from '../Screens';
import {BottomNavigation} from '.';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      // drawerPosition="right"
      // overlayColor="#fff"
      drawerType="slide"
      // drawerContent={props => <CustomDrawerSidebarMenu {...props} />}
    >
      {/* <Drawer.Screen name="BottomNavigation" component={BottomNavigation} />
      <Drawer.Screen name="AboutMyBahria" component={AboutBahria} />

      <Drawer.Screen name="BahriaInfoDisk" component={BahriaInfo} />

      <Drawer.Screen name="Blog" component={Blog} />

      <Drawer.Screen name="News" component={News} />

      <Drawer.Screen name="Contact" component={Contact} />

      <Drawer.Screen name="Gallery" component={Gallery} />

      <Drawer.Screen name="editProfile" component={EditProfile} />

      <Drawer.Screen name="registerBusiness" component={RegisterBusiness} />

      <Drawer.Screen name="manageSells" component={ManageSells} />
      <Drawer.Screen name="BottomNavigation" component={BottomNavigation} /> */}
    </Drawer.Navigator>
  );
}

export default MyDrawer;
