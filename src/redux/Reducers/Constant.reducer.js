import {USER_DATA, USER_TOKEN} from '../Constant/Constant.action';

export const constant_initialstate = {
  user_token: '',
  user_data: '',
};

export const ConstantReducer = (state = constant_initialstate, action) => {
  // console.log('actions payload in Constant reducer', action);
  switch (action.type) {
    case USER_TOKEN:
      return {
        ...state,
        user_token: action.payload?.token,
        user_data: action.payload?.user,
      };

    case USER_DATA:
      return {
        ...state,
        user_token: action.payload?.token,
        user_data: action.payload?.user,
      };

    default:
      return state;
  }
};
