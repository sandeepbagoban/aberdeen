import {all} from "redux-saga/effects";
import periodSaga from './Period';
import travelSaga from './Travel';
import selectSaga from './Select';
export default function* rootSaga(getState) {
  yield all([
    periodSaga(),
    travelSaga(),
    selectSaga()
  ]);
}
 