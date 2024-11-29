import React from 'react';
import {
  View,
  Text,
  Image,
  Share,
  Linking,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AddressComponent = ({ address }) => {
  const MAX_LENGTH = 20;
  const displayAddress = address.length > MAX_LENGTH
    ? `${address.substring(0, 10)}...${address.substring(address.length - 10)}`
    : address;

  return (
    <Text style={{ fontSize: 14, fontWeight: '600', color: 'firebrick' }}>
      {displayAddress}
    </Text>
  );
};

const DirectoryDetails = props => {
  const {
    route: {
      params: {
        item: {phonebooks},
      },
    },
  } = props;

  const onShare = async item => {
    try {
      // Prepare message with all details
      const message = `
        Name: ${item.title}
         ${item.parent_category}
        Address: ${item.address1}
        Number: ${item.landline}
      `;

      const result = await Share.share({message});
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const openLocation = item => {
    if (item.address1) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        item.address1
      )}`;
      Linking.openURL(url).catch(err =>
        console.error("Failed to open location:", err)
      );
    } else {
      alert('Address not available for this.');
    }
  };

  const renderItem = ({item}) => (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ffff',
        elevation: 10,
        margin: 10,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Image
        source={{uri: item.image}}
        style={{height: 100, width: 100, borderRadius: 12}}
      />
      <View style={{paddingHorizontal: 10, flex: 1, marginLeft: 10}}>
        <Text style={{color: 'firebrick', fontWeight: 'bold', fontSize: 16}}>
          {item.title}
        </Text>
        <Text style={{fontSize: 14, fontWeight: '600', color: 'firebrick'}}>
          {item.parent_category}
        </Text>
        <AddressComponent address={item.address1} />
        <Text style={{fontSize: 14, fontWeight: '600', color: 'firebrick'}}>
          {item.landline}
        </Text>
      </View>
    </View>
  );

  const renderHiddenItem = ({item}, rowMap) => (
    <View
      style={{
        alignItems: 'flex-end',
        paddingHorizontal: 10,
        width: '90%',
        alignSelf: 'center',
      }}>
      <TouchableOpacity
        onPress={() => onShare(item)}
        style={{
          marginTop: 5,
          padding: 4,
        }}>
        <Ionicons color="#cc0000" name="arrow-redo-sharp" size={30} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(`tel:${item.phone_number}`);
        }}
        style={{
          padding: 4,
        }}>
        <Ionicons color="green" name="call-sharp" size={30} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => openLocation(item)}
        style={{
          padding: 4,
        }}>
        <MaterialCommunityIcons
          color="green"
          name="google-maps"
          size={30}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <SwipeListView
        data={phonebooks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-75}
        closeOnRowOpen={true}
      />
    </View>
  );
};

export default DirectoryDetails;
