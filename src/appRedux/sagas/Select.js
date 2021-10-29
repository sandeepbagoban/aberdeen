import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import { axiosInstance} from '../../axios/axios';
import { LOAD_COMPANIES, LOAD_EMPLOYEES } from '../types/Select';
import { loadCompaniesSuccess, loadEmployeesSuccess } from '../actions/Select';


//Employees
const getEmployeesRequest = async () =>
  await axiosInstance.get('/api/Travel/Select/getEmployeesList', {})
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
});

export function* getEmployees(){
    try { 
        const response = yield call(getEmployeesRequest);
        if (response.status === 200) {
          yield put(loadEmployeesSuccess(response.data)); 
        }
       
      } catch (error) {
        console.log(error);
      }
}

export function* loadSelectEmployees() {
    yield takeEvery(LOAD_EMPLOYEES, getEmployees);
}


//Companies
const getCompaniesRequest = async () =>
  await axiosInstance.get('/api/Travel/Select/getCompaniesList', {})
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
});

export function* getCompanies(){
  try { 
      const response = yield call(getCompaniesRequest);
      if (response.status === 200) {
        yield put(loadCompaniesSuccess(response.data)); 
      }
     
    } catch (error) {
      console.log(error);
    }
}

export function* loadSelectCompanies() {
  yield takeEvery(LOAD_COMPANIES, getCompanies);
}



export default function* rootSaga() {
    yield all([
      fork(loadSelectEmployees),
      fork(loadSelectCompanies)
    ]);
}
  