import {LOAD_EMPLOYEES,LOAD_EMPLOYEES_SUCCESS} from '../types/Select';
import {LOAD_COMPANIES,LOAD_COMPANIES_SUCCESS} from '../types/Select';

const INIT_STATE = {    
    employees:[],
    loadingemployees:false,
    companies:[],
    loadingcompanies:false,
};


export default (state=INIT_STATE, action) => {
    switch (action.type) {
        case LOAD_EMPLOYEES:
            return {
                ...state,
                loadingemployees: true
            };
        case LOAD_EMPLOYEES_SUCCESS:
            return {
                ...state,
                employees: action.employees,
                loadingemployees:false
            }; 

        case LOAD_COMPANIES:
            return {
                ...state,
                loadingcompanies: true
            };
        case LOAD_COMPANIES_SUCCESS:
            return {
                ...state,
                companies: action.companies,
                loadingcompanies:false
            }; 
        default:
            return state;
    }
}