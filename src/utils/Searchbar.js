import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
function Searchbar(props) {
  return (
    <View style={styles.searchBgStyle}>
      <TextInput
        keyboardType="web-search"
        placeholder="Search..."
        placeholderTextColor="firebrick"
        style={{
          paddingHorizontal: 4,
          paddingVertical: 8,
          fontStyle: 'italic',
          flex: 1,
          fontSize: 14,
          textAlignVertical: 'center',
        }}
      />
      <TouchableOpacity>
        <FontAwesome name="search" size={16} color="firebrick" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBgStyle: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    backgroundColor: '#E8E8E8',
    width: '95%',
    alignSelf: 'center',
    // height: 30,
    borderRadius: 20,
    alignItems: 'center',
  },
});

export default Searchbar;
