import React, { useState, useRef, useEffect } from 'react';

import { ArrowRight, Calendar3 } from 'react-bootstrap-icons';

const FilterButton = ({ showHideCalendarState, setShowHideCalendarState }) => {

  // const [calendar, setCalendar] = useState({
  //   showCalendar: true, 
  //   showGrid: false
  // });

  return (
    <div className="relative inline-flex">
      <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
      <button
        className="btn bg-white border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-600"
        aria-haspopup="true"
        onClick={() => setShowHideCalendarState(
          showHideCalendarState = {
            calendar: true, 
            grid: false
          }
          )}>
        
        <Calendar3 color="#c34949" size={16} />
      </button>

      <button
        className="btn bg-white border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-600"
        aria-haspopup="true"
        onClick={() => setShowHideCalendarState(
          showHideCalendarState = {
            calendar: false, 
            grid: true
          }
        )}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-grid-3x2-gap-fill" viewBox="0 0 16 16">
            <path d="M1 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V4zM1 9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V9zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V9z"/>
          </svg>
      </button>
      </div>
    </div>
  );
}

export default FilterButton;
