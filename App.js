// import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  LogBox,
  StatusBar,
} from 'react-native';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
// import {StartUp_stack} from './src/Route';
import {StartUp_stack} from './src/Route';

const App = () => {
  LogBox.ignoreAllLogs(true);
  return (
    <Provider store={store}>
      {/* <NativeBaseProvider> */}
      <PersistGate persistor={persistor}>
        <SafeAreaView>
          <View style={{height: '100%', width: '100%'}}>
            <StatusBar animated={true} backgroundColor="firebrick" />
            {/* <StartUp_stack /> */}
            <StartUp_stack />
          </View>
        </SafeAreaView>
      </PersistGate>
      {/* </NativeBaseProvider> */}
    </Provider>
  );
};

const styles = StyleSheet.create({
  thumnailStyle: {
    marginTop: 30,
    marginBottom: 30,
    width: '30%',
    height: 130,
    borderRadius: 2,
    alignSelf: 'baseline',
  },
});

export default App;
