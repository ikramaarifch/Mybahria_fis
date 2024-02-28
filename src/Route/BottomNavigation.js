import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import {Directories, Services, Buy_Sells, Home} from '../screens';
import CustomDTabBar from '../utils/CustomDTabBar';

// import {Home} from '../Screens';

const Tab = createBottomTabNavigator();

function BottomNavigation(props) {
  return (
    <View style={{flex: 1}}>
      <Tab.Navigator
        // tabBar={props => <CustomDTabBar {...props} />}
        tabBarOptions={{
          // Default Color is blue you can change it by following props
          activeTintColor: '#ff4757',
          // inactiveTintColor: '#ff6b81',
          // Default Background Color is white you can change it by following props
          // activeBackgroundColor: '#ced6e0',
          // inactiveBackgroundColor: '#ced6e0',
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({color, size}) => (
              <FontAwesome name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Directories"
          component={Directories}
          options={{
            tabBarIcon: ({color, size}) => (
              <FontAwesome name="phone-square" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Services"
          component={Services}
          options={{
            tabBarIcon: ({color, size}) => (
              <FontAwesome5 name="cogs" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Buy / Sell"
          component={Buy_Sells}
          options={{
            tabBarIcon: ({color, size}) => (
              <FontAwesome5 name="hand-holding-usd" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

export default BottomNavigation;
