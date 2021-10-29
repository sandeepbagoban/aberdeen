import {LOAD_EMPLOYEES, LOAD_EMPLOYEES_SUCCESS, LOAD_COMPANIES, LOAD_COMPANIES_SUCCESS} from '../types/Select';

export const loadEmployees = () => {
    return {
      type: LOAD_EMPLOYEES     
    };
};
 
export const loadEmployeesSuccess = (employees) => {
    return {
      type: LOAD_EMPLOYEES_SUCCESS,
      employees:employees
    };
};

export const loadCompanies = () => {
  return {
    type: LOAD_COMPANIES     
  };
};

export const loadCompaniesSuccess = (companies) => {
  return {
    type: LOAD_COMPANIES_SUCCESS,
    companies:companies
  };
};