import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {axiosInstance} from '../../axios/axios'
import {CREATE_TRAVEL, LOAD_TRAVEL, LOAD_TRAVEL_CALENDAR, DELETE_TRAVEL} from '../types/Travel'
import {createTravelSuccess, loadTravelSuccess, loadTravelCalendarSuccess, deleteTravelSuccess} from '../actions/Travel';


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

        console.log(response,'response is:::')
        if (response.data) {
          yield put(createTravelSuccess(response.data)); 
          console.log('created')
        } else {
          console.log('error')
          // alert('Error');
        }
      }     
    } catch (error) {
      alert('Error');
    }
}

const deleteTravelRequest = async (travelid) =>
  await axiosInstance.post('/api/travel/delete?travelid=' + travelid)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });

export function* deleteTravel({id}){
  try { 
      const response = yield call(deleteTravelRequest, id);
      if (response.status === 200) {
        yield put(deleteTravelSuccess(response.data)); 
        console.log(response.data)
        // if (response.data){
        //   notification['success']({
        //     message: 'Travel Deleted Successfully'
        //   });
        // } 
        // else {
        //   notification['error']({
        //     message: 'Cannot Delete Travel',
        //     description: 'Please note that there are evaluation results entered for this period!!'
        //   });
        // }

      }     
    } catch (error) {
      // notification['success']({
      //   message: 'Error deleting period'
      // });
      console.log(error);
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

export function* deleteTravels() {
  yield takeEvery(DELETE_TRAVEL, deleteTravel);
}


export default function* rootSaga() {
  yield all([
    fork(loadTravels),
    fork(create_travel), 
    fork(loadTravelsCalendar),
    fork(deleteTravels)
  ]);
}
  