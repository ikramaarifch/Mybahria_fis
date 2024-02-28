import React, {useEffect} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import CardOneComponent from '../CardOneComponent/CardOneComponent';
import {NewsFlatlist, BlogsFlatlist} from '../DashboadComponents';

function DashboardStackComponent(props) {
  const Whichcomponent =
    props.route.params.paramKey === undefined
      ? 'Anonmyous call'
      : props.route.params.paramKey;
  const ComponentTitle =
    props.route.params.title === undefined
      ? 'Anonmyous call'
      : props.route.params.title;
  useEffect(() => {
    setTimeout(() => {
      props.navigation.setOptions({title: ComponentTitle});
    }, 1);
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      {Whichcomponent === 'c4' ? <NewsFlatlist /> : null}
      {Whichcomponent === 'c5' ? <BlogsFlatlist /> : null}
      {Whichcomponent === 'c1' ? (
        <CardOneComponent decision={'not_constructions'} />
      ) : null}

      {Whichcomponent === 'c2' ? (
        <CardOneComponent decision={'constructions'} />
      ) : null}
    </SafeAreaView>
  );
}

export default DashboardStackComponent;
