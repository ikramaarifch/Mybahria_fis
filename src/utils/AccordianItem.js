import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {Card} from 'react-native-paper';
import RenderHTML from 'react-native-render-html';
const AccordionItem = ({title, description, date}) => {
  const [expanded, setExpanded] = useState(false);
  let Dateitem = date.split(' ');

  const [data, setData] = useState(null);
  const contentWidth = Dimensions.get('window').width;

  const toggleAccordion = () => {
    console.log('pressed', description);
    setExpanded(!expanded);
  };
  // const innerText = description.replace(/<\/?p>/g, '');
  useEffect(() =>{
    setData(description);
  })
  return (
    <Card
      style={{
        marginHorizontal: 5,
        width: '98%',
        borderWidth: 1,
        elevation: 2,
      }}>
      <TouchableOpacity onPress={toggleAccordion}>
        <Card.Title title={title} style={{color: 'red'}} />
        <Text
          style={{
            alignSelf: 'flex-end',
            margin: 3,
            fontWeight: '400',
            color: '#D10404',
          }}>
          {Dateitem[0]}
        </Text>
      </TouchableOpacity>
      {expanded && (
        <Card.Content>
        <RenderHTML
        contentWidth={contentWidth}
        source={{ html: description }}
      />
        </Card.Content>
      )}
    </Card>
  );
};

export default AccordionItem;
