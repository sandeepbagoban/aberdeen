import {LOAD_PERIOD,LOAD_PERIOD_SUCCESS} from '../types/Period';

export const loadPeriod = () => {
    return {
      type: LOAD_PERIOD     
    };
};

export const loadPeriodSuccess = (periods) => {
    return {
      type: LOAD_PERIOD_SUCCESS,
      periods:periods
    };
};
