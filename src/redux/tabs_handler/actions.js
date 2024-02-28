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

export const setActiveTab = activeTab => {
  return {
    type: ACTION_SET_ACTIVE_TAB,
    tab: activeTab,
  };
};

export const profileImage = image => {
  return {
    type: ACTION_PROFILE_IMAGE,
    payload: image,
  };
};

export const selectDrawerTab = DrawerTab => {
  return {
    type: ACTION_SelectedDrawerItem,
    payload: DrawerTab,
  };
};
export const FilterModalState = () => {
  return {
    type: ACTION_MODAL_STATE,
  };
};
export const ServiceFilterModalState = () => {
  return {
    type: ACTION_SERVICES_MODAL_STATE,
  };
};
export const EmergencyModal = () => {
  return {
    type: ACTION_EMERGENCY_SERVICE_MODAL,
  };
};

export const addNewItemSellPurchase = () => {
  return {
    type: ACTION_ADD_NEW_ITEM_SELL_PURCHASE,
  };
};

export const addNewItem = () => {
  return {
    type: ACTION_ADD_NEW_ITEM,
  };
};

export const applyFilterToSellItems = () => {
  return {
    type: ACTION_SEARCH_FILTER_SELL_ITEM,
  };
};
export const addPropertyModalVisibilityAction = () => {
  return {
    type: ACTION_AddPropertyModalVisibility,
  };
};
export const openServiceFilterModal = () => {
  return {
    type: ACTION_Service_FilterModal_Visibility,
  };
};
