import {Icon} from 'native-base';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Searchbar} from 'react-native-paper';
import styles from './styles';
const {height, width} = Dimensions.get('window');

function CustomHeader(props) {
  const SearchBarVisibility = props.SBV === undefined ? false : props.SBV;
  const Title = props.title === undefined ? '' : props.title;
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
  return (
    <View
      style={{
        ...styles.mainContainer,
        height: SearchBarVisibility ? height * 0.15 : height * 0.08,
      }}>
      <View style={styles.iconsView}>
        <TouchableOpacity
          onPress={() => props.navigation.openDrawer()}
          style={{padding: 4, alignSelf: 'center'}}>
          <FontAwesome name="navicon" color="#fff" size={18} />
        </TouchableOpacity>
        <Text style={styles.title}>{Title}</Text>
        <TouchableOpacity
          style={{
            // backgroundColor: '#fff',
            padding: 2,
            alignSelf: 'center',
          }}>
          <FontAwesome5 name="phone-alt" color="#fff" size={18} />
        </TouchableOpacity>
      </View>
      {SearchBarVisibility ? (
        <Searchbar
          fontSize={14}
          iconColor="#e91e63"
          placeholderTextColor="firebrick"
          fontStyle="italic"
          // color="#e91e63"
          style={{
            height: 40,
            backgroundColor: '#E8E8E8',
            borderRadius: 25,
            fontSize: 14,
            width: '90%',
            alignSelf: 'center',
          }}
          placeholder="Search..."
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      ) : null}
    </View>
  );
}

export default CustomHeader;
