import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import CustomHeader from '../CustomHeader/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';

function BahriaInfo(props) {
  const DATA = [
    {
      title: 'Accommodations',
      data: ['Hostels'],
    },
    {
      title: 'Bahria Info Disk',
      data: ['Parks & Garden', 'Onion Rings', 'Fried Shrimps'],
    },
    {
      title: 'Businesses',
      data: ['Water', 'Coke', 'Beer'],
    },
    {
      title: 'Constructions Materials',
      data: ['Cheese Cake', 'Ice Cream'],
    },
    {
      title: 'Entertainment',
      data: ['Cheese Cake', 'Ice Cream'],
    },

    {
      title: 'Health & Fitness',
      data: ['Cheese Cake', 'Ice Cream'],
    },
    {
      title: 'Hospitals',
      data: ['Cheese Cake', 'Ice Cream'],
    },
    {
      title: 'Property Portal',
      data: ['Cheese Cake', 'Ice Cream'],
    },

    {
      title: 'Services',
      data: ['Cheese Cake', 'Ice Cream'],
    },

    {
      title: 'Sports',
      data: ['Cheese Cake', 'Ice Cream'],
    },
  ];

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.itemsStyle}>
      <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
      <Ionicons name="chevron-forward-sharp" size={28} color="firebrick" />
    </TouchableOpacity>
  );
  return (
    <View style={styles.body}>
      <CustomHeader title="Bahria info Disk" navigation={props.navigation} />

      <FlatList data={DATA} renderItem={item => renderItem(item)} />
    </View>
  );
}

export default BahriaInfo;
