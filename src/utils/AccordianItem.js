import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-paper';

const AccordionItem = ({title, description, date}) => {
  const [expanded, setExpanded] = useState(false);
  let Dateitem = date.split(' ');
  const toggleAccordion = () => {
    setExpanded(!expanded);
  };
  const innerText = description.replace(/<\/?p>/g, '');
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
          <Text>{innerText}</Text>
        </Card.Content>
      )}
    </Card>
  );
};

export default AccordionItem;
