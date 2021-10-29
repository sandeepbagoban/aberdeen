import {SET_TOKEN,REMOVE_TOKEN} from '../types/Auth';

const INIT_STATE = {    
    token: localStorage.getItem('Token')   
  };
 
export default (state=INIT_STATE, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token: action.token
            };
        case REMOVE_TOKEN:
            return {
                ...state,
                token: null
            }; 
        default:
            return state;
    }
}

 