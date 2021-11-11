import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid';
import {useDispatch, useSelector} from "react-redux";
import { Spinner, Tooltip } from 'react-bootstrap';
import { loadTravelCalendar } from '../../appRedux/actions';
import Loader from '../actions/spinner';
import ReactTooltip from 'react-tooltip';
import tippy from "tippy.js";
import 'tippy.js/dist/tippy.css'; 
import { Col, Row,Container } from "react-bootstrap";

const BigCalendar = () => {

  const dispatch = useDispatch();
  const { travel }= useSelector(travel => travel);
  const { loading }= useSelector( ({travel}) => travel);
  const [travelState, setTravelState] = useState([]);
  const [spinner, setSpinner] = useState(false);

  const [companyColor, setCompanyColor] = useState([
    {
      name: 'Aberdeen BXL',
      code: 'BXL',
      color: '#e9a0e7',
      background:  '#e9a0e773'
    },
    {
      name: 'Aberdeen PAR',
      code: 'PAR',
      color: '#8bdcf38c',
      background:  '#8bdcf38c'
    },
    {
      name: 'Aberdeen MOK',
      code: 'MOK',
      color: '#94f4be',
      background:  '#94f4be73'
    },
    {
      name: 'Aberdeen BKK',
      code: 'BKK',
      color: '#ffbd8999',
      background:  '#ffbd8999'
    },
    {
      name: 'Aberdeen HKK',
      code: 'HKK',
      color: '#3f97ee94',
      background:  '#3f97ee94'
    },
    {
      name: 'Aberdeen SGP',
      code: 'SGP',
      color: '#a99af296',
      background:  '#a99af296'
    },
    {
      name: 'Aberdeen CAS',
      code: 'CAS',
      color: '#ffda7094',
      background:  '#ffda7094'
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

let newDate = new Date()
  const [date, setDate] = useState({
    month: '', 
    year: ''
  });


  useEffect(() => {
    const value = [];
    if (travel.calendar && travel.calendar.length > 0) {
      console.log(travel.loading, '<----travel');
      travel.calendar.map(x  => {
        var aberColor = '';
        var aberbgColor = '';
        var aberCode = '';
        companyColor.map(color => {
          if (x.Company.Name === color.name) {
            aberColor = color.color;
            aberbgColor = color.background;
            aberCode = color.code;
          } 
        })
        x.TravelEntries.map(y => {
          value.push({
            date: y.Date,
            title: y.Description,
            color: aberColor,
            backgroundColor:  aberbgColor,
            countryColor: aberColor,
            countryCode: aberCode
          });
        })
      });
      setTravelState(value);
    }
  }, [travel])

  const openEvent = (e) => {
    console.log('open', e)
  }

  var prev =document.getElementsByClassName("fc-prev-button");
  var next =document.getElementsByClassName("fc-next-button");
  var monthyear = document.getElementsByClassName("fc-toolbar-title");
  var calendarRef = React.createRef();
  var [month, setmonth] = useState([]);
  var [year, setyear] = useState([]);


  useEffect(() => {
    month = newDate.getMonth() + 1;
    year = newDate.getFullYear();
  }, [dispatch]);

  if (prev.length > 0){
    prev[0].addEventListener('click', function() {
      var my = monthyear[0].innerHTML.split(' ');
      month = my[0];
      year = my[1];
      let test = monthNames.find(x => x.name == month)
      if (test.id > 1){
        month = test.id - 1;
      } else {
        year = Number(year) - 1;
        month = 12;
      }
      setyear(year)
      setmonth(month)
    });
  }

  if (next.length > 0){
    next[0].addEventListener('click', function() {
      var my = monthyear[0].innerHTML.split(' ');
      month = my[0];
      year = my[1];
      let test = monthNames.find(x => x.name == month)
      if (test.id < 12){
        month = test.id + 1;
      } else {
        year = Number(year) + 1;
        month = 1;
      }
      setyear(year)
      setmonth(month)
    });
  };

  useEffect(() => {
    console.log('re dispatching!!!!!!!!!')
    date.year = year;
    date.month = month;
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

  // const eventRender = (info) =>{
  //   console.log('event render test')
  //   // var tooltip = new Tooltip(info.el, {
  //   //   title: info.event.extendedProps.description,
  //   //   placement: 'top',
  //   //   trigger: 'hover',
  //   //   container: 'body'
  //   // });
  // }

  const handleEventPositioned = (info) => {
    console.log('handle event positioned!!!')
    info.el.setAttribute("data-tip","some text tip");
     ReactTooltip.rebuild();
   }

   const eventMouseEnter = (mouseEnterInfo) => {
    console.log(mouseEnterInfo,'mouse info')
    tippy(mouseEnterInfo.el, {
      content: mouseEnterInfo.event._def.title,
      placement: "top-start",
      // arrow: false,
      // interactive: true,  
    });
  }


  const eventDidMount= function(info) {
    console.log(info.event._def,'info')
    info.el.querySelector('.fc-event-title').innerHTML = "<span class='cu' style=background:"+ info.event._def.extendedProps.countryColor +">" +info.event._def.extendedProps.countryCode+"</span>" + info.event.title;
  }

    return (
      <>
      <div className="grid grid-cols bg-white shadow-lg rounded-xl border border-gray-200 px-5 py-4 border-b border-gray-100" >
        <Container>
          <Row>
          <Col md={2}>
            <Row className="country_dot"><h3>Countries</h3></Row>
            <Row className="country_dot"><div><span class="cu" style={{background:"#e9a0e7"}}>BXL</span>  Bruxelles</div></Row>
            <Row className="country_dot"><div><span class="cu" style={{background:"#c1f1ff"}}>PAR</span>  Paris</div></Row>
            <Row className="country_dot"><div><span class="cu" style={{background:"#94f4be"}}>MOK</span>  Moka</div></Row>
            <Row className="country_dot"><div><span class="cu" style={{background:"#FFBD89"}}>BKK</span>  Bangkok</div></Row>
            <Row className="country_dot"><div><span class="cu" style={{background:"#3F97EE"}}>HKK</span>  Hongkong</div></Row>
            <Row className="country_dot"><div><span class="cu" style={{background:"#A99AF2"}}>SGP</span>  Singapore</div></Row>
            <Row className="country_dot"><div><span class="cu" style={{background:"#FFDA70"}}>CAS</span>  Casablanca</div></Row>
            </Col>
          <Col md={10}>
            {/* {travel.loading ? <Loader/> : '' } */}
            <FullCalendar
              ref={calendarRef}
              plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: 'dayGridMonth'        
              }}
              
              initialView="dayGridMonth"
              weekends={true}
              eventBackgroundColor = {travelState.map(x => x.color)}
              eventDisplay="block"
              eventTextColor="black"
              //eventRender={eventRender}
              // eventDidMount={ function(info) {
              //   console.log('test')
              //   console.log(info);
              // }}
              eventDidMount={eventDidMount}
              dayMaxEvents={true}
              aspectRatio={1}
              height={780}
              displayEventTime= {false}
              events={travelState}
              dateClick={(e) => openEvent(e)}
              eventPositioned={(e) => handleEventPositioned(e)}
              eventMouseEnter={(e) => eventMouseEnter(e)}
              />
          </Col>
          </Row>
        </Container>
        


        </div>
      </>
    )
};

export default BigCalendar;
