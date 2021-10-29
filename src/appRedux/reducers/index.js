import {combineReducers} from 'redux';
import Auth  from './Auth';
import Period  from './Period';
import Travel from './Travel';
import Select from './Select';
const AUTH_FEATURE_STORE = 'auth'; 
const PERIOD_FEATURE_STORE = 'period'; 
const TRAVEL_FEATURE_STORE = 'travel';
const SELECT_FEATURE_STORE = 'select';

export default () => 
    combineReducers({
    [AUTH_FEATURE_STORE]: Auth ,
    [PERIOD_FEATURE_STORE] :Period,
    [TRAVEL_FEATURE_STORE]: Travel,
    [SELECT_FEATURE_STORE]: Select
});