import React, {useState, useEffect} from 'react';
import {View, Text, BackHandler} from 'react-native';
import {connect} from 'react-redux';
import {onpenCloseModal} from '../../redux/Actions/Blogs.action';
import CustomHeader from '../CustomHeader/CustomHeader';
import {BlogsFlatlist} from '../Dashboard';

function Blog(props) {
  const [detailScreenModal, setdetailScreenModal] = useState(false);

  return (
    <View style={{flex: 1}}>
      {/* <CustomHeader title="Blogs" navigation={props.navigation} /> */}

      <BlogsFlatlist />
    </View>
  );
}

const mapActionsToProps = dispatch => {
  return {
    openCloseModal: () => dispatch(onpenCloseModal()),
  };
};
const mapStateToProps = state => {
  return {
    detailModalVisibility: state.BlogsReducer.detailModalVisibility,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Blog);
