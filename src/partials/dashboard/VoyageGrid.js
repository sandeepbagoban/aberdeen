import React, { useState,useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { loadCompanies, loadEmployees } from '../../appRedux/actions';
import {loadTravel} from '../../appRedux/actions/Travel';
import DatePicker from 'react-date-picker'
import { Col, Row, Container, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import Datatable from '../actions/Datatable';
import Table from "react-tailwind-table";

const VoyageGrid = ({ props }) => {
  const dispatch = useDispatch();
  const [startDatevalue, onChangeStartDate] = useState();
  const [endDatevalue, onChangeEndDate] = useState();
  const [isLoading, setLoading] = useState(false);
  const [page] = useState({
		companyid: -1,
		employeeid: -1,
    startdate: null,
    enddate: null,
		order:'',
		column:'',
		currentpage:1,
		count:10
	})

  const { travel }= useSelector(travel => travel);
  const { added }= useSelector( ({travel}) => travel);
  const employees = useSelector(({select}) => select.employees);
	const companies = useSelector(({select}) => select.companies);

  useEffect(() => {
    console.log(page,'page is:')
    dispatch(loadTravel(page));
  }, [dispatch,added]);

  useEffect(() => {
    dispatch(loadEmployees());
    dispatch(loadCompanies());
  }, [dispatch,added]);



  const column = () => {
    return [
      {
        field: "TravelId",
        use: "Travel ID",
      },
      {
        field: "Employee.Name",
        use: "Employee Name",
      },
      {
        field: "Company.Name",
        use: "Company Name",
      },
      {
        field: "Purpose",
        use: "Purpose",
      },
      {
        field: "startDate",
        use: "Start  Date",
      },
      {
        field: "endDate",
        use: "End Date",
      },
      {
        field: "action",
        use: "Action",
      },
    ];
  };


  const formatDate =(date) =>  {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [day, month,year ].join('/');
  }

  const formatDateForApi =(date) =>  {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month,day ].join('-');
  }

  const [state, setState] = useState({
    columns: column(),
    //rows: travel.travels.Items
  });

  const rowcheck = (row, column, display_value) => {
    if (column.field === "action") {
      return (
        <>
          <button
            className="btn-viewmore btn bg-white border-gray-200 hover:border-red-300 text-gray-500 hover:text-gray-600"
            aria-haspopup="true"
            onClick={(e) => console.log(e)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>
          {/* <button
            className="btn-viewmore btn bg-white border-gray-200 hover:border-red-300 text-gray-500 hover:text-gray-600"
            aria-haspopup="true"
            onClick={(e) => console.log(e)}
          >
            <svg xmlns="http://www.w3.org/2000/svg"
             fill="currentColor"
             class="bi bi-archive"
             viewBox="0 0 16 16">
            <path
             d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
            </svg>
          </button> */}
        </>
      );
    }
    if (column.field == "startDate" || column.field == "endDate"){
      display_value = formatDate(display_value)
    }

    return display_value;
  };

  const onChange = (value,name) => {
    console.log(value,'on changing company')
    console.log(value.target.value,'target value!!!!')
    if (name.toString() === 'company'){
      page.companyid = value.target.value;
    }
    if (name.toString() === 'employee'){
      page.employeeid = value.target.value;
    }
  }

  const handleClick = () => {
    if (startDatevalue != undefined){
      if (startDatevalue != null){
        page.startdate = formatDateForApi(startDatevalue);
      }
    } 
    if (endDatevalue != undefined){
      if (endDatevalue != null){
        page.enddate = formatDateForApi(endDatevalue);
      } 
    }
    dispatch(loadTravel(page));
  }

  const handleClickClearFilters = () => {
    page.companyid = -1;
    page.employeeid = -1;
    onChangeStartDate(null);
    onChangeEndDate(null);
    page.startdate = null;
    page.enddate = null;
    dispatch(loadTravel(page));
  }

  return (
    <>
      <div className="grid grid-cols bg-white shadow-lg rounded-xl border border-gray-200 px-5 py-4 border-b border-gray-100">
        <Container>
          {/* Row 1 */}
          <Row>
            <Col xs={6} md={6}>
              <label className="block mb-2">
                <span className="text-gray-300 title">Company</span>
                <select className="form-select block w-full" onChange={e => onChange(e,'company')}>
                <option key="-1" value="-1">---SELECT ALL COMPANIES---</option>
                {companies.map ((company) =>{
                  return <option key={company.id} value={company.id}>{company.text}</option>
                  })}
                </select>
              </label>
            </Col>
            <Col xs={6} md={6}>
              <label className="block mb-2">
                <span className="text-gray-300 title">Employee</span>
                <select className="form-select block w-full" onChange={e => onChange(e,'employee')}>
                <option key="-1" value="-1">---SELECT ALL EMPLOYEES---</option>
                  {employees.map ((employee) =>{
                  return <option key={employee.id} value={employee.id}>{employee.text}</option>
                  })}
                </select>
              </label>
            </Col>
            <Col xs={6} md={6}>
            <span className="text-gray-300 title">Start Date</span>
            <label className="block mb-2">
            <DatePicker className="form-control" 
            onChange={onChangeStartDate}
            value={startDatevalue}
            customInput={<input type="text" id="validationCustom01" placeholder="Start Date"/>}/>
            </label>
            </Col>

            <Col xs={6} md={6}>
            <span className="text-gray-300 title">End Date</span>
            <label className="block mb-2">
            <DatePicker className="form-control" 
            onChange={onChangeEndDate}
            value={endDatevalue}
            customInput={<input type="text" id="validationCustom02" placeholder="End Date"/>}/>
            </label>
            </Col>
          </Row>

          <Row>
          <Col xs={12} md={12} className="py-4">     
          <div className="action-buttons">
              <Button
                variant="primary"
                onClick={handleClick}>
                Search
              </Button>
              <Button
                className="clear-filters"
                variant="primary"
                onClick={handleClickClearFilters}>
                Clear Filters
              </Button>  
          </div>
          </Col>
          </Row>      
          {/* <Row>
            <Col xs={12} md={12}>
              <Datatable/>
            </Col>
          </Row> */}
        </Container>
        <Table
          columns={state.columns}
          rows={travel.travels.Items}
          per_page={10}
          table_header="Voyage Table"
          row_render={rowcheck}
        />
      </div>
    </>
  );
};
export default VoyageGrid;