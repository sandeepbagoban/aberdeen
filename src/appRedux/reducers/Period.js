import {LOAD_PERIOD,LOAD_PERIOD_SUCCESS} from '../types/Period';

const INIT_STATE = {    
    periods:[] ,
    loading:false
  };
 
export default (state=INIT_STATE, action) => {
    switch (action.type) {
        case LOAD_PERIOD:
            return {
                ...state,
                loading: true
            };
        case LOAD_PERIOD_SUCCESS:
            return {
                ...state,
                periods: action.periods,
                loading:false
            }; 
        default:
            return state;
    }
}
