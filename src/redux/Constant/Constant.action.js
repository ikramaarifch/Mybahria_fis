export const USER_TOKEN = 'USER_TOKEN';
export const USER_DATA = 'USER_DATA';

export const setToken = token => {
  console.log(token,'token in actions')
  return {
    type: USER_TOKEN,
    payload: {token},
  };
};
export const setUserData = data => {
  return {
    type: USER_DATA,
    payload: data,
  };
};
