const BASE_URL = 'https://mybahria.com.pk/api/';
// const BASE_URL = 'http://localhost:8000/api/';
export const Directoryiconurl =
  'https://mybahria.com.pk/assets/directory-icons/';

export const IMAGES_BASAE_URL =
  'https://mybahria.com.pk/storage/images/';

export const FORUM_COMMENTS = `${BASE_URL}forum_detail/{id}?id=`;
export const FORUM_CATEGORY_SUB_LIST = `${BASE_URL}forums-list?id=`;
export const FORUM_CATEGORY = `${BASE_URL}forum-categories`;

// export const JOB_LIST = `${BASE_URL}jobs-list`;
// export const DIRECTORY_CATEGORIES = `${BASE_URL}directory`;

// export const BLOGS_LIST = `${BASE_URL}all-blogs`;
// export const GALLERY_LIST = `${BASE_URL}gallery-list`;
// export const GALLERY_SUB_LIST = `${BASE_URL}gallery-detail/{id}?id=`;
export const PROPERTIES = `${BASE_URL}bahria-property`;
// export const NEWS = `${BASE_URL}news-list`;

export const news_image_base_url = 'https://api-mybahria.com.pk';

export const APIS = {
  default_image: require('../../Drawables/logo.png'),
  image_base_url: 'https://mybahria.com.pk/public/assets/uploads/',
  login: `${BASE_URL}login`,
  register: `${BASE_URL}register`,
  data_signup_city: `${BASE_URL}city`,
  data_signup_area: `${BASE_URL}area`,
  get_news_list: `${BASE_URL}news-list`,
  get_hot_news_list: `${BASE_URL}hot-news`,
  get_hot_properties_list: `${BASE_URL}all-bahria-property`,

  // get_forum_categories : `${BASE_URL}forum_categories`,
  post_search_news: `${BASE_URL}search-news`,
  get_forum_news: `${BASE_URL}forum-categories`,
  post_forum_list: `${BASE_URL}forums-list?id=20`,
  get_gallery_list: `${BASE_URL}gallery-list`,
  get_buy_Sell: `${BASE_URL}buy-and-sell`,
  post_gallery_detail: `${BASE_URL}gallery-detail`,
  get_all_blogs: `${BASE_URL}all-blogs`,
  post_search_blogs: `${BASE_URL}search-blogs?search_key=1`,
  get_jobs: `${BASE_URL}jobs-list`,
  post_search_jobs: `${BASE_URL}search-jobs?search_key=11`,
  get_directory: `${BASE_URL}directory`,
  post_forum_detail: `${BASE_URL}forum-detail`,
  get_contructions: `${BASE_URL}constructions`,
  post_product_detail: `${BASE_URL}product-detail`,
  post_search_construction: `${BASE_URL}search-constructions`,
  get_entertainment: `${BASE_URL}entertainments`,
  post_entertainment_detail: `${BASE_URL}entertainment-detail`,
  post_search_entertainment: `${BASE_URL}search-entertainment?search_key=43`,
  get_food_drinks: `${BASE_URL}food-and-drinks`,
  post_food_drinks_details: `${BASE_URL}food-and-drinks-detail`,
  post_search_food_drinks: `${BASE_URL}search-food-and-drinks?search_key=1`,
  get_health_care: `${BASE_URL}Health-Care`,
  post_health_care_detail: `${BASE_URL}Health-Care-detail`,
  post_search_health_care: `${BASE_URL}search-health-care?search_key=yoga`,
  get_manage_property: `${BASE_URL}manage-property/`,
  post_manage_property_detail: `${BASE_URL}manage-property-detail?slug=2-Midtown-East`,
  post_delete_property: `${BASE_URL}delete-property`,
  post_add_property: `${BASE_URL}add-property`,
  post_directory_list: `${BASE_URL}directory-list`,
  post_add_Sell: `${BASE_URL}add-sells`,
  post_save_edit_sell: `${BASE_URL}save-edit-sells`,
  get_emergency: `${BASE_URL}emergency`,
  get_user_detail: `${BASE_URL}user`,
  post_profile: `${BASE_URL}profile`,
  post_update_avatar: `${BASE_URL}update-avatar`,
  get_update_profile_info: `${BASE_URL}update-profile-info`,
  post_save_profile_info: `${BASE_URL}save-profile-info`,
  post_update_password: `${BASE_URL}update-password`,
  get_service: `${BASE_URL}service`,
  post_service_detail: `${BASE_URL}service-detail`,
  get_city: `${BASE_URL}city`,
  post_area: `${BASE_URL}area`,
  get_all_bahria_properties: `${BASE_URL}all-property`,
  get_Purchase: `${BASE_URL}purchase-requests`,
  get_Sell: `${BASE_URL}user-buy-and-sells`,
};
