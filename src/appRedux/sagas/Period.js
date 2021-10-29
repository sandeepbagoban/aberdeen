 import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import { axiosInstance} from '../../axios/axios'
import { LOAD_PERIOD} from '../types/Period'
import {loadPeriodSuccess} from '../actions/Period';


const getPeriodRequest = async () =>
  await axiosInstance.get('/api/Evaluation/evaluations', {})
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });

export function* getPeriod(){
    try { 
        const response = yield call(getPeriodRequest);
        if (response.status === 200) {
          yield put(loadPeriodSuccess(response.data)); 
        }
       
      } catch (error) {
        console.log(error);
      }
}

export function* loadPeriods() {
    yield takeEvery(LOAD_PERIOD, getPeriod);
  }
  

export default function* rootSaga() {
    yield all([
      fork(loadPeriods)
    ]);
  }
  