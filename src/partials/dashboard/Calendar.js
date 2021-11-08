import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid';
import {useDispatch, useSelector} from "react-redux";
import { Tooltip } from 'react-bootstrap';
import { loadTravelCalendar } from '../../appRedux/actions';
import Spinner from 'react-bootstrap/Spinner'

const BigCalendar = () => {

  const dispatch = useDispatch();
  const { travel }= useSelector(travel => travel);
  const { loading }= useSelector( ({travel}) => travel);
  const [travelState, setTravelState] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [companyColor, setCompanyColor] = useState([
    {
      name: 'Aberdeen BXL',
      color: 'blue' 
    },
    {
      name: 'Aberdeen MOK',
      color: 'red' 
    },
    {
      name: 'Aberdeen PAR',
      color: 'yellow' 
    },
    {
      name: 'Aberdeen BKK',
      color: 'green' 
    }
  ]);

  const monthNames =[{
    "id": 1,
    "name": "January"
  },
  {
    "id": 2,
    "name": "February"
  },
  {
    "id": 3,
    "name": "March"
  },
  {
    "id": 4,
    "name": "April"
  },
  {
    "id": 5,
    "name": "May"
  },
  {
    "id": 6,
    "name": "June"
  },
  {
    "id": 7,
    "name": "July"
  },
  {
    "id": 8,
    "name": "August"
  },
  {
    "id": 9,
    "name": "September"
  },
  {
    "id": 10,
    "name": "October"
  },
  {
    "id": 11,
    "name": "November"
  },
  {
    "id": 12,
    "name": "December"
  }
]

  const [date, setDate] = useState({
    month: 10, 
    year: 2021
  });
  		
  useEffect(() => {
    dispatch(loadTravelCalendar(date));
  }, [dispatch]);





  useEffect(() => {
    const value = [];
    if (travel.calendar && travel.calendar.length > 0) {
      console.log(travel, '<----travel');
      travel.calendar.map(x  => {
        var aberColor = '';
        companyColor.map(color => {
          if (x.Company.Name === color.name) {
            aberColor = color.color;
          } 
        })
        x.TravelEntries.map(y => {
          value.push({
            date: y.Date,
            title: y.Description,
            color: aberColor, 
          });
        })
      });
      setTravelState(value);
    }
  }, [travel])

  const openEvent = (e) => {
    console.log('open')
  }

  // useEffect(() => {
  //   //var prev = document.getElementById('fc-prev-button')
  //   var prev =document.getElementsByClassName("fc-prev-button");
  //   var prevtest =document.getElementsByClassName("fc-prev-button111");

  //   console.log(prev.length,'prev button')
  //   console.log(prevtest.length,'prev test button')
  //   // prev.addEventListener('click', function() {
  //   //   console.log('previous button clicked')
  //   // });
  // }, []);

  var prev =document.getElementsByClassName("fc-prev-button");
  var next =document.getElementsByClassName("fc-next-button");
  var monthyear = document.getElementsByClassName("fc-toolbar-title");
  var calendarRef = React.createRef()
  var [month, setmonth] = useState([]);
  var [year, setyear] = useState([]);


  if (prev.length > 0){
    prev[0].addEventListener('click', function() {
      var my = monthyear[0].innerHTML.split(' ');
      month = my[0];
      year = my[1];
      let test = monthNames.find(x => x.name == month)
      if (test.id > 1){
        month = test.id - 1;
      }
      setmonth(month)
      setyear(year)
    });
  }

  if (next.length > 0){
    next[0].addEventListener('click', function() {
      var my = monthyear[0].innerHTML.split(' ');
      month = my[0];
      year = my[1];
      let test = monthNames.find(x => x.name == month)
      month = test.id + 1;
      setmonth(month)
      setyear(year)
    });
  };

  useEffect(() => {

    date.year = year;
    date.month = month;
    console.log(date,'DATE')
    dispatch(loadTravelCalendar(date));
  }, [month]);

  // useEffect(() => {
  //   if (loading){
  //     console.log('loading true!!!!')
  //     setSpinner(true);
  //     prev[0].disabled = true;
  //     next[0].disabled = true;
  //   } else {
  //     console.log('loading false!!!!')
  //     setSpinner(false);
  //     prev[0].disabled = false;
  //     next[0].disabled = false;
  //   }  
  // }, [loading]);


    return (
      <> 
      <div className="grid grid-cols bg-white shadow-lg rounded-xl border border-gray-200 px-5 py-4 border-b border-gray-100" >
        
        {/* {spinner ? <Spinner animation="border" variant="danger" /> : ""} */}
        <FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: 'dayGridMonth'        
        }}
        
        initialView="dayGridMonth"
        weekends={true}
        eventColor={travelState.map(x => x.color)}
        eventRender={ (info) => {
          new Tooltip(info.el, {
            title: 'info.event.extendedProps.description',
            placement: 'top',
            trigger: 'hover',
            container: 'body'
          });
        }}
        dayMaxEvents={true}
        aspectRatio={1}
        height={950}
        displayEventTime= {false}
        events={travelState}
        eventClick={(e) => openEvent(e)}
        ref={calendarRef}/>
        

        </div>
      </>
    )
};

export default BigCalendar;
