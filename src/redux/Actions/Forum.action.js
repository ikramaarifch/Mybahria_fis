import {FETCH_FORUM_CATAGORIES} from '../Types/Forum.types';

// FETCH_FORUM_CATAGORIES

export const setForumCategoryList = forumList => {
  return {
    type: FETCH_FORUM_CATAGORIES,
    payload: forumList,
  };
};
