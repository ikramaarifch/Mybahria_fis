import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {JobsSample} from '../../utils';
import RenderHtml from 'react-native-render-html';
import HTMLView from 'react-native-htmlview';

import {JOB_LIST} from '../../utils/URLS';
import {APIS} from '../../utils/URLS/Urls';
import {useDispatch, useSelector, useStore} from 'react-redux';

function Jobs(props) {
  const states = useSelector(state => state.ConstantReducer);
  const [Loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState([]);

  const getAlljobs = async () => {
    await fetch(APIS.get_jobs, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + states.user_token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(({jobs}) => {
        setApiData(jobs.data)
      })
      .catch(error => {
        return console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const [data, setData] = useState([
    {
      Post_Title: 'Assistant manager',
      WhereToJob: 'Plumbing services',
      Post_Image: require('../../Drawables/gallery-1.png'),
      Post_Location: ' Hayat Abad phase VII, Peshawar',
      Post_Description: 'Incredible suction power',
      Post_ManadatoryPoints: [
        'Handy built-in crevice tool',
        'For Fast, Easier, Power Cleaning',
        'Free Delivery in Bahria Town',
      ],
      Post_Email: 'Contact 0300-8525504',
    },
    {
      Post_Title: 'Waiter',
      WhereToJob: 'Food And Drinks',
      Post_Image: require('../../Drawables/gallery-2.png'),
      Post_Location: 'Sheikh Malthon, Phase II, Mardan',
      Post_Description:
        '28KW Electricity Saving Box 90V-250V Electric Energy Power Saver Power Factor Saver Portable Smart Home Electricity Saver Socket',
      Post_ManadatoryPoints: [
        ' Made of premium material, it is safe and&a Made of premium material, it is safe and&a',
        'For Fast, Easier, Power Cleaning',
        'Free Delivery in Bahria Town',
      ],
      Post_Email: 'Contact 0300-8525504',
    },
    {
      Post_Title: 'Chemical PEC Registered Enginee',
      WhereToJob: 'Plumbing services',
      Post_Image: require('../../Drawables/gallery-3.png'),
      Post_Location: 'Sheikh Malthon, Phase II, Mardan',
      Post_Description: 'Model : DM-20SM1',
      Post_ManadatoryPoints: [
        'Handy built-in crevice tool',
        'For Fast, Easier, Power Cleaning',
        'Free Delivery in Bahria Town',
      ],
      Post_Email: 'Contact 0300-8525504',
    },
  ]);

  useEffect(async () => {
    setLoading(false);
    await getAlljobs();
  }, []);

  const renderItem = ({item}) => {
    return <JobsSample item={item} />;
  };
  return (
    <View style={styles.body}>
      {Loading ? (
        <ActivityIndicator
          style={{marginTop: '30%'}}
          color="red"
          size="large"
        />
      ) : (

        <FlatList
          data={apiData}
          renderItem={renderItem}
          keyExtractor={(index, item) => {
            index;
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: 8,
    // paddingVertical: 8,
  },
});
const styles1 = StyleSheet.create({
  a: {
    fontSize: 12,
  },
  p: {
    // fontSize: ,
    textAlign: 'center',

    backgroundColor: 'red',
  },
});

export default Jobs;
