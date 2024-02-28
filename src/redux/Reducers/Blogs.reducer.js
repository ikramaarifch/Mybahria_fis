import {DETAIL_MODAL_VISIBILITY} from '../Types/Blogs.types';

const initialstate = {
  detailModalVisibility: false,
};

export const BlogsReducer = (state = initialstate, action) => {
  switch (action.type) {
    case DETAIL_MODAL_VISIBILITY:
      return {
        ...state,
        detailModalVisibility: !state.detailModalVisibility,
      };

    default:
      return state;
  }
};
