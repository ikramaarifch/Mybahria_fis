import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Zocial from 'react-native-vector-icons/Zocial';
import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  BahriaInfo,
  News,
  Blog,
  Contact,
  Gallery,
  Home,
  AboutBahria,
} from './CustomDrawerSidebarMenu';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Drawer} from 'react-native-paper';
const CustomSidebarMenu = props => {
  const [active, setActive] = React.useState('Home');
  const navigation = props.navigation;
  return (
    <SafeAreaView style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          paddingTop: 0,
        }}>
        <ImageBackground
          resizeMode="cover"
          source={require('../../Drawables/profile-bg.png')}
          style={styles.sideMenuProfileIcon}>
          <Image
            resizeMode="cover"
            source={require('../../Drawables/profile_pic.png')}
            style={styles.profile_pic}
          />
        </ImageBackground>

        <View style={styles.userDrawerContainer}>
          <TouchableOpacity
            style={styles.userDrawer}
            onPress={() => navigation.navigate('BottomNavigation')}>
            <Icon name="home" style={styles.iconStyle} />
            <Text style={styles.userDrawerItem}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.userDrawer}
            onPress={() => navigation.navigate('AboutMyBahria')}>
            <Icon name="history" style={styles.iconStyle} />
            <Text style={styles.userDrawerItem}>About MyBahria</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.userDrawer}
            onPress={() => navigation.navigate('BahriaInfoDisk')}>
            <Icon name="info-circle" style={styles.iconStyle} />
            <Text style={styles.userDrawerItem}>Bahria Info Desk</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.userDrawer}
            onPress={() => navigation.navigate('Blog')}>
            <FontAwesome5 name="blog" style={styles.iconStyle} />
            <Text style={styles.userDrawerItem}>Blog</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.userDrawer}
            onPress={() => navigation.navigate('News')}>
            <Icon name="newspaper-o" style={styles.iconStyle} />
            <Text style={styles.userDrawerItem}>News</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.userDrawer}  onPress={()=>navigation.navigate('notification')}>
                <Icon name='commenting-o' style={styles.iconStyle}/>
                <Text style={styles.userDrawerItem}>Forum</Text>
              </TouchableOpacity> */}

          <TouchableOpacity
            style={styles.userDrawer}
            onPress={() => navigation.navigate('Contact')}>
            <Icon name="phone-square" style={styles.iconStyle} />
            <Text style={styles.userDrawerItem}>Contact</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.userDrawer}
            onPress={() => navigation.navigate('Gallery')}>
            <MaterialIcons name="perm-media" style={styles.iconStyle} />
            <Text style={styles.userDrawerItem}>Gallery</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.userDrawerContainer}>
          <Text style={styles.heading}>My Account</Text>
          <TouchableOpacity
            style={styles.userDrawer}
            onPress={() => navigation.navigate('editProfile')}>
            <Icon name="pencil" style={styles.iconStyle} />
            <Text style={styles.userDrawerItem}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.userDrawer}
            onPress={() => navigation.navigate('registerBusiness')}>
            <FontAwesome5 name="business-time" style={styles.iconStyle} />
            <Text style={styles.userDrawerItem}>Register Your Business</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.userDrawer}
            onPress={() => navigation.navigate('manageSells')}
            /*onPress={() => Linking.openURL('https://www.mybahria.pk/managebuy_sell.php')}*/
          >
            <FontAwesome5 name="hand-holding-usd" style={styles.iconStyle} />
            <Text style={styles.userDrawerItem}>Manage Sell / Purchase</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.userDrawerContainer}>
          <TouchableOpacity
            style={styles.userDrawer}
            onPress={
              () => {}
              // dispatch(authActions.logout())
            }>
            <Icon name="power-off" style={styles.iconStyle} />
            <Text style={styles.userDrawerItem}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',

    width: '100%',
    height: 250,

    alignSelf: 'center',
  },
  profile_pic: {
    position: 'absolute',
    alignSelf: 'center',
    width: 80,
    height: 80,
    borderRadius: 100,
    bottom: 30,
    borderColor: '#fff',
    borderWidth: 2,
  },

  userDrawerContainer: {
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
  },
  userDrawer: {
    flexDirection: 'row',
    paddingBottom: 5,
    paddingTop: 5,
  },
  userDrawerItem: {
    color: '#333333',
    fontSize: 14,
    marginTop: -1,
    width: '90%',
  },
  iconStyle: {
    color: '#cc0000',
    fontSize: 18,
    marginRight: 15,
    width: '8%',
    alignSelf: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  rightthumbnail: {
    marginRight: 10,
  },
});

export default CustomSidebarMenu;
