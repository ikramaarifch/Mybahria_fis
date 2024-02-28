import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  SectionList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Image,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StackHeader from '../../../utils/StackHeader';
import {DIRECTORY_CATEGORIES} from '../../../utils/URLS';
import CustomHeader from '../../CustomHeader/CustomHeader';
import {CustomTitle} from '../../Dashboard/DashboadComponents';
import styles from './styles';
import {APIS, Directoryiconurl} from '../../../utils/URLS/Urls';
import {useDispatch, useSelector, useStore} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CardOneComponentSample from '../../Dashboard/CardOneComponent/CardOneComponentSample/CardOneComponentSample';
import {Title} from 'react-native-paper';
import {flexDirection} from 'styled-system';
function Directories(props) {
  const {
    route: {
      params: {title},
    },
  } = props;

  // console.log('====================================');
  // console.log(props,'props');
  // console.log('====================================');
  const states = useSelector(state => state.ConstantReducer);
  const [isLoading, setLoading] = useState(true);
  const [loading, setloading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [current, setCurrent] = useState(null);
  const [currentIndex, setcurrentIndex] = useState(null);
  const [filteredData, setfilteredData] = useState([]);

  const data = [
    {
      title: 'Gaming',

      data: [
        {
          id: 2,
          Name: 'Riaha  Gold',
          Description: 'India',
          Location: 'Garden City',
          LandLineNumber: '+11215646',
        },
      ],
    },
  ];

  const [directorydata, setDirectorydata] = useState([]);

  const getDirectoriesData = async () => {
    await fetch(APIS.get_directory, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + states.user_token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(({parents}) => {
        console.log(
          '🚀 ~ file: Directories.js:190 ~ .then ~ parents:',
          parents,
        );
        let Array = [];

        for (let i = 0; i < parents.length; i++) {
          if (
            parents[i].title !== 'Construction' &&
            parents[i].title !== 'Entertainment' &&
            parents[i].title !== 'Health & Fitness'
          ) {
            Array.push(parents[i]);
          }
        }
        console.log(Array);
        setDirectorydata(Array);
      })
      .catch(error => {
        return console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getDirectoriesData();
    FilterDirectories();
  }, [current]);

  const FilterDirectories = () => {
    const filter = data.filter(item =>
      item.title ? item.title == current : null,
    );
    setfilteredData(filter);
    setloading(false);
  };

  const Item = ({item}) => (
    <TouchableOpacity
      style={styles.itemsStyle}
      onPress={() => {
        props.navigation.navigate('Directory', {item: item});
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image source={{uri: item.icon}} style={{height: 25, width: 25}} />
        <Text style={{fontWeight: 'bold', marginLeft: 5, color: '#8B0000'}}>
          {item.title}
        </Text>
      </View>
      <Ionicons name="chevron-forward-sharp" size={28} color="firebrick" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.body}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#cc0000" />
        ) : (
          <>
            <SectionList
              sections={directorydata}
              keyExtractor={(item, index) => item + index}
              renderItem={Item}
              renderSectionHeader={({section: {title}}) => (
                <Text style={styles.header}>{title}</Text>
              )}
            />
          </>
        )}

        <Modal
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}>
          <View style={styles.modalMainView}>
            <View
              style={{
                flex: 0.1,
                backgroundColor: 'firebrick',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
              }}>
              <MaterialIcons
                onPress={() => setModalVisible(false)}
                name="keyboard-arrow-down"
                size={30}
                color="white"
              />
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}
export default Directories;
