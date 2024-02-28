import {combineReducers} from 'redux';

import {tab_reducer, forumReducer, BlogsReducer} from '.';
import {ConstantReducer} from './Reducers/Constant.reducer';

const AppReducers = combineReducers({
  tab_reducer: tab_reducer,
  forumReducer: forumReducer,
  BlogsReducer: BlogsReducer,
  ConstantReducer: ConstantReducer,
});
export const root_reducer = (state, action) => {
  return AppReducers(state, action);
};
