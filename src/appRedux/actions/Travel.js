import { CREATE_TRAVEL, CREATE_TRAVEL_SUCCESS, LOAD_TRAVEL, LOAD_TRAVEL_SUCCESS, LOAD_TRAVEL_CALENDAR, LOAD_TRAVEL_CALENDAR_SUCCESS } from '../types/Travel';

export const loadTravel = (travelstate) => {
    return {
      type: LOAD_TRAVEL,
      companyid: travelstate.companyid,
      employeeid: travelstate.employeeid,
      startdate: travelstate.startdate,
      enddate: travelstate.enddate,
      order: travelstate.order,
      column: travelstate.column,
      currentpage: travelstate.currentpage,
      count: travelstate.count
    };
};

export const loadTravelSuccess = (travels) => {
    return {
      type: LOAD_TRAVEL_SUCCESS,
      travels: travels
    };
};

export const createTravel = (travels) => {
  return {
    type: CREATE_TRAVEL,
    //travels: travels
    createTravels: travels
  };
};

export const createTravelSuccess = (travels) => {
  return {
    type: CREATE_TRAVEL_SUCCESS,
    //travels: travels
  };
};

export const loadTravelCalendar = (calendar) => {
    return {
      type: LOAD_TRAVEL_CALENDAR,
      month: calendar.month,
      year: calendar.year
    };
};

export const loadTravelCalendarSuccess = (calendar) => {
    return {
      type: LOAD_TRAVEL_CALENDAR_SUCCESS,
      calendar: calendar
    };
};
