import React, { useState,useEffect } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import FilterButton from '../partials/actions/FilterButton';
import BigCalendar from '../partials/dashboard/Calendar';
import VoyageGrid from '../partials/dashboard/VoyageGrid';
import ModalCreate from '../partials/dashboard/ModalCreate';
import {useDispatch, useSelector} from "react-redux";
import {loadTravel, loadTravelCalendar} from '../appRedux/actions/Travel';

function Dashboard() {
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showHideCalendarState, setShowHideCalendarState] = useState({
    calendar: true,
    grid: false
  });

  const [page] = useState({
		companyid: -1,
		employeeid: -1,
		order:'',	
		column:'',	
		currentpage:1,
		count:10
		});

  const [date] = useState({
    month: 10, 
    year: 2021
  })
		
  useEffect(() => {
    //dispatch(loadTravel(page));
    // dispatch(loadTravelCalendar(date));
  }, [dispatch]);

  const [visiblechild, setvisiblechild] = useState(false);
  const [dataFromParent, setdatafromparent] = useState();

  const handleVisible = (e, row) => {
    setvisiblechild(true);
    setdatafromparent(undefined);
  }

  //const {travel} = useSelector(travel => travel)
  
  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      {/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen}/>

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-end sm:items-center mb-8">
              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">

                
            <button
              className="btn bg-red-500 hover:bg-red-600 text-white"
              aria-controls="search-modal"
              onClick={handleVisible}
              >
              <span className="hidden xs:block ml-2">Add Travelling</span>
            </button> 
            <ModalCreate show={visiblechild} setvisiblechild={setvisiblechild} dataFromParent={dataFromParent}></ModalCreate>


                {/* Filter button */}
                <FilterButton 
                  showHideCalendarState={showHideCalendarState} 
                  setShowHideCalendarState={setShowHideCalendarState}/>
                {/* <ModalCreate/> */}

              </div>
            </div>

            {/* Modal Add travelling */}
            {/* Cards */}           
            { showHideCalendarState.calendar ? <BigCalendar />  : null }
            { showHideCalendarState.grid ? <VoyageGrid />  : null }
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;