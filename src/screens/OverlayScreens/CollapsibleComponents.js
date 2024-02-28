import React, {useState} from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import {View, Text, StyleSheet} from 'react-native';
import Collapsible from 'react-native-collapsible';
import OneTapCard from '../../utils/OneTapCard';

const businessImage = require('../../Drawables/newIcons/business-time.png');
const propertyImage = require('../../Drawables/newIcons/property-portal.png');
const volleyballImage = require('../../Drawables/newIcons/volleyball-ball.png');
const foodImage = require('../../Drawables/newIcons/food-drinks.png');
const personImage = require('../../Drawables/newIcons/person-booth.png');
const toolsImage = require('../../Drawables/newIcons/tools.png');

function CollapsibleComponents(props) {
  const [isCollapsed, setisCollapsed] = useState(true);

  return (
    <View style={styles.header}>
      <View
        style={{
          backgroundColor: 'gray',
          height: 1,
          width: '40%',
          alignSelf: 'center',

          marginTop: 20,
          //   marginBottom: 8,
        }}
      />
      <View
        style={{
          marginVertical: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            paddingVertical: 8,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 8,
            width: '100%',
            justifyContent: 'space-evenly',
          }}>
          {/* <OneTapCard
            sendRequest="CardOneComponent"
            navigation={props.navigation}
            IMAGE={businessImage}
            TITLE="Business"
            bgColor="#fff"
            imageDimensions={{HEIHGT: 22, WIDTH: 28}}
          /> */}
          {/* <OneTapCard
            sendRequest="CardOneComponent"
            navigation={props.navigation}
            IMAGE={personImage}
            TITLE="Complaint"
            bgColor="#fff"
            imageDimensions={{HEIHGT: 22, WIDTH: 22}}
          /> */}
          <OneTapCard
            sendRequest="CardOneComponent"
            navigation={props.navigation}
            IMAGE={propertyImage}
            TITLE="Property Portal"
            bgColor="#fff"
            imageDimensions={{HEIHGT: 22, WIDTH: 22}}
          />

          <OneTapCard
            sendRequest="CardOneComponent"
            navigation={props.navigation}
            IMAGE={toolsImage}
            TITLE="Constructions"
            bgColor="#fff"
            imageDimensions={{HEIHGT: 22, WIDTH: 22}}
          />
          <OneTapCard
            sendRequest="CardOneComponent"
            IMAGE={foodImage}
            navigation={props.navigation}
            TITLE="Food & Drinks"
            bgColor="#fff"
            imageDimensions={{HEIHGT: 22, WIDTH: 22}}
          />
        </View>
        <View
          style={{
            paddingVertical: 8,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 8,
            width: '100%',
            justifyContent: 'space-evenly',
          }}>
          {/* <OneTapCard
            sendRequest="CardOneComponent"
            navigation={props.navigation}
            IMAGE={volleyballImage}
            TITLE="Sports"
            bgColor="#fff"
            imageDimensions={{HEIHGT: 22, WIDTH: 22}}
          /> */}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    width: '100%',
  },
});

export default CollapsibleComponents;
