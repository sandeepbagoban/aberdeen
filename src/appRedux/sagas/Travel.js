import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {axiosInstance} from '../../axios/axios'
import {CREATE_TRAVEL, LOAD_TRAVEL, LOAD_TRAVEL_CALENDAR} from '../types/Travel'
import {createTravelSuccess, loadTravelSuccess, loadTravelCalendarSuccess} from '../actions/Travel';


// API REQUEST
const getTravelRequest = async (companyid, employeeid, startdate, enddate, order, column, currentpage, count) =>
  //await axiosInstance.get('/api/Travel/get', {})
  await axiosInstance.get('/api/Travel/get?companyid='+ companyid + '&employeeid=' + employeeid + '&order='+order+'&column='+column+'&currentPage='+currentpage+'&count='+count  + '&startDate=' + startdate  + '&endDate=' + enddate )
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error,'ERROR')
      return error.response;
    });

const getTravelCalendarRequest = async (month, year) =>
    await axiosInstance.get('/api/Travel/getEntriesMonth?month='+ month + '&year=' + year)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error.response;
      });

const createTravelRequest = async (travels) =>
  await axiosInstance.post('/api/Travel/Create', travels)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
});

// CHECK RESPONSE
export function* getTravels({companyid, employeeid, startdate, enddate, order, column, currentpage, count}){
    try { 
        const response = yield call(getTravelRequest, companyid, employeeid, startdate, enddate, order, column, currentpage, count);
        if (response.status === 200) {
          yield put(loadTravelSuccess(response.data)); 
        }
       
      } catch (error) {
        console.log(error);
      }
}
// check response
export function* getTravelsCalendar({month, year}){
  try { 
      const response = yield call(getTravelCalendarRequest, month, year);
      if (response.status === 200) {
        yield put(loadTravelCalendarSuccess(response.data)); 
      }     
    } catch (error) {
      console.log(error);
    }
}

export function* createTravel({createTravels}) {
  try {
      const response = yield call(createTravelRequest, createTravels);
      if (response.status === 200) {
        yield put(createTravelSuccess(response.data)); 
        if (response.data) {
          // alert('Created');
        } else {
          // alert('Error');
        }
      }     
    } catch (error) {
      alert('Error');
    }
}

export function* loadTravels() {
    yield takeEvery(LOAD_TRAVEL, getTravels);
}

export function* create_travel() {
  yield takeEvery(CREATE_TRAVEL, createTravel);
}

export function* loadTravelsCalendar() {
  yield takeEvery(LOAD_TRAVEL_CALENDAR, getTravelsCalendar);
}

export default function* rootSaga() {
  yield all([
    fork(loadTravels),
    fork(create_travel), 
    fork(loadTravelsCalendar)
  ]);
}
  