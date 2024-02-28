import {connect} from 'react-redux';
import CustomDTabBar from '../../utils/CustomDTabBar';
import {setActiveTab} from './actions';
import {ACTION_SET_ACTIVE_TAB} from './actionTypes';

const mapStateToProps = state => {
  return {
    userImage: state.tab_reducer.userImage,
    drawerActiveTab: state.tab_reducer.drawerActiveTab,
    activeTab: state.tab_reducer.activeTab,
  };
};

const mapActionsToProps = dispatch => {
  return {
    profileImage: image => dispatch(profileImage(image)),
    selectDrawerTab: tab => dispatch(selectDrawerTab(tab)),
    setActiveTab: tab => dispatch(setActiveTab(tab)),
  };
};

export const tabs_handler = connect(
  mapStateToProps,
  mapActionsToProps,
)(CustomDTabBar);
