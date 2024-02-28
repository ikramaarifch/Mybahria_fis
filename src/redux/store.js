// import {createStore,applyMiddleware} from 'redux';
// import {root_reducer} from './rootReducer';
// import { persistReducer,persistStore } from 'redux-persist';
// import thunk from 'redux-thunk';
// import { createLogger } from 'redux-logger';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const persistconfig={
//   key:'persist',
//   storage:AsyncStorage
// }
// const  persistedReducer = persistReducer(persistconfig,root_reducer)
// // export const store = createStore(root_reducer);
// // export const
// // export const persistor = persistStore(store)

// // const persistedReducer = persistReducer(persistConfig, rootReducer);
// // export const store = createStore(reducer, applyMiddleware(thunk, createLogger()));
// let store = createStore(
//   persistedReducer,
//   applyMiddleware(thunk, createLogger()),
// );
// let persistor = persistStore(store);
// export {store, persistor};

import {createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {root_reducer} from './rootReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // Optionally, you can blacklist or whitelist specific reducers
  // blacklist: ['reducerToExclude'],
  // whitelist: ['reducerToInclude']
};

const persistedReducer = persistReducer(persistConfig, root_reducer);

const store = createStore(
  persistedReducer,
  // Initial state can be passed here if needed
);

const persistor = persistStore(store);

export {store, persistor};
