import {CREATE_TRAVEL, CREATE_TRAVEL_SUCCESS, LOAD_TRAVEL, LOAD_TRAVEL_SUCCESS, LOAD_TRAVEL_CALENDAR, LOAD_TRAVEL_CALENDAR_SUCCESS, DELETE_TRAVEL, DELETE_TRAVEL_SUCCESS} from '../types/Travel';

const INIT_STATE = {    
    travels:[],
    createTravels: {},
    loading:true,
    added: false,
    deleted: false,
    calendar: []
  };
 
// eslint-disable-next-line import/no-anonymous-default-export
export default (state=INIT_STATE, action) => {
    switch (action.type) {
        case LOAD_TRAVEL:
            return {
                ...state,
                calendar: [],
                loading: true
            };
        case LOAD_TRAVEL_SUCCESS:
            return {
                ...state,
                calendar: [],
                travels: action.travels,
                loading:false
            }; 
        case DELETE_TRAVEL: {
            return {
                ...state,
                deleted: false
                }
        }
        case DELETE_TRAVEL_SUCCESS: {
            return {
                ...state,
                deleted: true
                }
        }
        case CREATE_TRAVEL: 
                return {
                    ...state,
                    //travels: action.createTravels,            
                    added: false, 
            };
        case CREATE_TRAVEL_SUCCESS:
                return {
                    ...state,              
                    added: true
            };
        case LOAD_TRAVEL_CALENDAR:
                return {
                    ...state,
                    calendar: [],
                    loading: true
                };
        case LOAD_TRAVEL_CALENDAR_SUCCESS:
                return {
                    ...state,
                    calendar: action.calendar,
                    loading:false
                }; 
        default:
            return state;
    }
}
