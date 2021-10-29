import {SET_TOKEN,REMOVE_TOKEN} from '../types/Auth';

export const setToken = (token) => {
    return {
      type: SET_TOKEN,
      token: token
    };
};
 
export const removeToken = () => {
    return {
      type: REMOVE_TOKEN
    };
};