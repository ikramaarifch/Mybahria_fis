import {
  ACTION_SET_ACTIVE_TAB,
  ACTION_PROFILE_IMAGE,
  ACTION_SelectedDrawerItem,
  ACTION_MODAL_STATE,
  ACTION_SERVICES_MODAL_STATE,
  ACTION_EMERGENCY_SERVICE_MODAL,
  ACTION_ADD_NEW_ITEM_SELL_PURCHASE,
  ACTION_SEARCH_FILTER_SELL_ITEM,
  ACTION_AddPropertyModalVisibility,
  ACTION_Service_FilterModal_Visibility,
  ACTION_ADD_NEW_ITEM,
} from './actionTypes';

const initialState = {
  activeTab: 'Home',
  userImage: '',
  drawerActiveTab: 'home',
  Filter_Modal_State: false,
  ServicesModal: false,
  EmergencyModalState: false,
  addNewItemSellPurchase: false,
  addNewItem: false,
  applyFilterModalVisibility: false,
  addPropertyModalVisibility: false,
  addPropertyModalVisibility: false,
  ServiceFilterModalVisibility: false,
};

export const tab_reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.tab,
      };
    case ACTION_PROFILE_IMAGE:
      return {
        ...state,
        userImage: action.payload,
      };
    case ACTION_SelectedDrawerItem:
      return {
        ...state,
        drawerActiveTab: action.payload,
      };
    case ACTION_MODAL_STATE:
      return {
        ...state,
        Filter_Modal_State: !state.Filter_Modal_State,
      };
    case ACTION_SERVICES_MODAL_STATE:
      return {
        ...state,
        ServicesModal: !state.ServicesModal,
      };
    case ACTION_EMERGENCY_SERVICE_MODAL:
      return {
        ...state,
        EmergencyModalState: !state.EmergencyModalState,
      };
    case ACTION_ADD_NEW_ITEM_SELL_PURCHASE:
      return {
        ...state,
        addNewItemSellPurchase: !state.addNewItemSellPurchase,
      };
    case ACTION_ADD_NEW_ITEM:
      return {
        ...state,
        addNewItem: !state.addNewItem,
      };
    case ACTION_SEARCH_FILTER_SELL_ITEM:
      return {
        ...state,
        applyFilterModalVisibility: !state.applyFilterModalVisibility,
      };
    case ACTION_AddPropertyModalVisibility:
      return {
        ...state,
        addPropertyModalVisibility: !state.addPropertyModalVisibility,
      };
    case ACTION_Service_FilterModal_Visibility:
      return {
        ...state,
        ServiceFilterModalVisibility: !state.ServiceFilterModalVisibility,
      };
    default:
      return state;
  }
};
