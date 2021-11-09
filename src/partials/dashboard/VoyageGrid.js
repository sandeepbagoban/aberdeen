import React, { useState,useEffect,useRef } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { loadCompanies, loadEmployees, deleteTravel } from '../../appRedux/actions';
import {loadTravel} from '../../appRedux/actions/Travel';
import DatePicker from 'react-date-picker'
import { Col, Row, Container, Button, Form, Spinner } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import Dialog from 'react-bootstrap-dialog';
import ModalCreate from './ModalCreate';
import DataTable, { createTheme } from 'react-data-table-component';

const VoyageGrid = ({ props }) => {

  createTheme('solarized', {
    // text: {
    //   primary: '#268bd2',
    //   //secondary: '#2aa198',
    // },
    // background: {
    //   default: '#e2e8f0',
    // },
    // context: {
    //   background: '#cb4b16',
    //   text: '#FFFFFF',
    // },
    // divider: {
    //   default: '#073642',
    // },
    // action: {
    //   button: 'rgba(0,0,0,.54)',
    //   hover: 'rgba(0,0,0,.08)',
    //   disabled: 'rgba(0,0,0,.12)',
    // },
  });

  const [pending, setPending] = React.useState(true);


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
  const { added,deleted,updated }= useSelector( ({travel}) => travel);
  const employees = useSelector(({select}) => select.employees);
	const companies = useSelector(({select}) => select.companies);

  const [travelState, SetTravelState] = useState([]);
  var dialog;
  const formRef = useRef(null);
  const countPerPage = 3;

  useEffect(() => {
    dispatch(loadTravel(page));
  }, [dispatch,added,deleted,updated]);

  useEffect(() => {
    dispatch(loadEmployees());
    dispatch(loadCompanies());
  }, [dispatch]);
  
const columns =  [
  {
    key:"Id",
    name: "Travel ID",
    selector: row => row.TravelId,
    sortable: true
  },
  {
    key:"Employee",
    name: "Employee Name",
    selector: row => row.Employee.Name,
    sortable: true
  },
  {
    key:"Company",
    name: "Company Name",
    selector: row => row.Company.Name,
    sortable: true
  },
  {
    name: "Purpose",
    selector: row => row.Purpose
  },
  {
    key:"startDate",
    name: "Start  Date",
    selector: row => {
      return(<>{ formatDate(row.startDate) }</>)
    },
    sortable: true
  },
  {
    key:"endDate",
    name: "End Date",
    selector: row => {
      return(<>{ formatDate(row.endDate) }</>)
    },
    sortable: true
  },
  {
    name: "Action",
    cell: row => 
    <>
    <button className="btn-viewmore btn bg-white border-gray-200 hover:border-red-300 text-gray-500 hover:text-gray-600" aria-haspopup="true" onClick={(e) => console.log(e)}>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
    </svg>
    </button>
    <button className="btn-viewmore btn bg-white border-gray-200 hover:border-red-300 text-gray-500 hover:text-gray-600" aria-haspopup="true" onClick={e => update_Travel(e,row)}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
      </svg>
    </button>
    <button className="btn-viewmore btn bg-white border-gray-200 hover:border-red-300 text-gray-500 hover:text-gray-600" aria-haspopup="true" onClick={e => delete_Travel(e,row)}>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="#c34949" class="bi bi-trash" viewBox="0 0 16 16">
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
      <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
    </svg>
    </button>
    </>
  },
];


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

  // const [state, setState] = useState({
  //   columns: column(),
  //   //rows: travel.travels.Items
  // });

  const rowcheck = (row, column, display_value) => {
    if (column.field === "action") {
      return (
        <>
          <button className="btn-viewmore btn bg-white border-gray-200 hover:border-red-300 text-gray-500 hover:text-gray-600" aria-haspopup="true" onClick={(e) => console.log(e)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
          </button>

          <button
            className="btn-viewmore btn bg-white border-gray-200 hover:border-red-300 text-gray-500 hover:text-gray-600"
            aria-haspopup="true"
            onClick={e => delete_Travel(e,row)}
          >
            <svg xmlns="http://www.w3.org/2000/svg"
             width="16" height="20" fill="currentColor"
             class="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
              <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
          </button>

          <button
            className="btn-viewmore btn bg-white border-gray-200 hover:border-red-300 text-gray-500 hover:text-gray-600"
            aria-haspopup="true"
            onClick={e => update_Travel(e,row)}
          >
            <svg xmlns="http://www.w3.org/2000/svg"
             width="16" height="20" fill="currentColor"
             class="bi bi-pencil-square" viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
              <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
            </svg>
          </button>

        </>
      );
    }
    if (column.field === "startDate" || column.field === "endDate"){
      display_value = formatDate(display_value)
    }

    return display_value;
  };

  const onChange = (value,name) => {
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
    formRef.current.reset();
    page.companyid = -1;
    page.employeeid = -1;
    onChangeStartDate(null);
    onChangeEndDate(null);
    page.startdate = null;
    page.enddate = null;
    dispatch(loadTravel(page));
  }

  // const delete_Travel = (e, row) => {
  //   {this.onClickOkCancelWithHandler}
  //   // dispatch(deleteTravel(row.TravelId));
  // }

  const delete_Travel = (e, row) => {
    dialog.show({
      body: 'Are you sure to delete this travel entry?',
      actions: [
        Dialog.CancelAction(() => {
          console.log('cancel button clicked')
          //action('cancel button was clicked!')()
        }),
        Dialog.OKAction(() => {
          console.log('ok button clicked')
          dispatch(deleteTravel(row.TravelId));
          //action('ok button was clicked!')()
        })
      ]
    })
  }

  const [visiblechild, setvisiblechild] = useState(false);
  const [dataFromParent, setdatafromparent] = useState();

  const update_Travel = (e, row) => {
    setvisiblechild(true);
    setdatafromparent(row);
  }

  const handleTableChange = (_page, totalRows) => {
    console.log(page,'page')
    console.log(totalRows,'total rows')
    page.currentpage = _page;
    dispatch(loadTravel(page));
  }

  const handleRowsPerPage = (e) => {
    page.count = e;
    dispatch(loadTravel(page));
  }

  const onSort = (column,  sortOrder) => {
    page.column = column.key;
    page.order = sortOrder;
    dispatch(loadTravel(page));
    console.log(column,'column')
    console.log(sortOrder,'sort order')
  }

  return (
    <>
      <div className="grid grid-cols bg-white shadow-lg rounded-xl border border-gray-200 px-5 py-4 border-b border-gray-100">
        <Container>
          {/* Row 1 */}
          <Form ref={formRef}>
          <Row>
            <Col xs={6} md={6}>
              <span className="text-gray-300 title">Company</span>
              <Form.Select aria-label="Default select example" onChange={e => onChange(e,'company')}>
                <option key="-1" value="-1">---SELECT ALL COMPANIES---</option>
                {companies.map ((company) =>{
                  return <option key={company.id} value={company.id}>{company.text}</option>
                  })}
              </Form.Select>
            </Col>
            <Col xs={6} md={6}>
              <span className="text-gray-300 title">Employee</span>
              <Form.Select aria-label="Default select example" onChange={e => onChange(e,'employee')}>
                <option key="-1" value="-1">---SELECT ALL EMPLOYEES---</option>
                  {employees.map ((employee) =>{
                  return <option key={employee.id} value={employee.id}>{employee.text}</option>
                  })}
              </Form.Select>
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
                    className="clear-filters btn border-gray-100 hover:border-gray-300 bg-gray-100 hover:bg-gray-600 text-black"
                    variant="primary"
                    onClick={handleClickClearFilters}>
                    Clear Filters
                  </Button> 
                  <Button
                    className="search-filters btn border-red-100 hover:border-red-600 bg-red-500 hover:bg-red-600 text-white"
                    variant="primary"
                    onClick={handleClick}>
                    Search
                  </Button> 
              </div>
            </Col>
          </Row> 
          </Form>
        </Container>
        {/* <Table
          columns={state.columns}
          rows={travel.travels.Items}
          per_page={10}
          table_header="Voyage Table"
          row_render={rowcheck}
        /> */}
{console.log('asdgasdad', travel.travels.loading)}
      <DataTable 
          title="Voyage" 
          columns={columns} 
          data={travel.travels.Items} 
          highlightOnHover
          pagination
          paginationServer
          paginationPerPage={page.count}
          paginationTotalRows={travel.travels.Count}
          paginationRowsPerPageOptions={[5, 10, 15]}
          progressPending={travel.loading}
          progressComponent={
            <div class="flex justify-center items-center">
              <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
          }
          sortServer
          onSort={onSort}
          onChangePage={handleTableChange}
          onChangeRowsPerPage={handleRowsPerPage}
          theme="solarized"/>
        
        <Dialog ref={(el) => { dialog = el }} />
        <ModalCreate show={visiblechild} setvisiblechild={setvisiblechild} dataFromParent={dataFromParent}></ModalCreate>
      </div>
    </>
  );
}; 
export default VoyageGrid;