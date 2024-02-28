import {FETCH_FORUM_CATAGORIES} from '../Types/Forum.types';

const initialstate = {
  forumCategoryList: [],
};

export const forumReducer = (state = initialstate, action) => {
  switch (action.type) {
    case FETCH_FORUM_CATAGORIES:
      return {
        ...state,
        forumCategoryList: action.payload,
      };

    default:
      return state;
  }
};
