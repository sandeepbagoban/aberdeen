import React, { useState, useRef, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import Transition from "../../utils/Transition.js";
import uuid from "react-uuid";
import { Card, Button } from "tailwind-react-ui";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { createTravel } from "../../appRedux/actions/Travel.js";
import { Col, Row, Container, Modal } from "react-bootstrap";
import { loadCompanies, loadEmployees } from '../../appRedux/actions';

const ModalCreate = (props) => {
  const [createOpen, setSearchOpen] = useState(false);
  const dispatch = useDispatch();
  const trigger = useRef(null);
  const searchContent = useRef(null);  
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

	const companies = useSelector(({select}) => select.companies);
  const [purposeState, setPurposeState] = useState('');
  const [companyId, setCompanyId] = useState();
  const [travelDetails, setTravelDetails] = useState([
    {
      TravelEntryId: uuid(),
      TravelId: uuid(),
      Date : new Date(),
      Description: "",
    },
  ]);

  useEffect(() => {
    dispatch(loadEmployees());
    dispatch(loadCompanies());
  }, [dispatch]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addTravelDate = (el) => {
    console.log(el, ',fdsgbmdsgfbksfbgg');
    const value = [...travelDetails];
    value.push({
      TravelEntryId: uuid(),
      TravelId: uuid(),
      Date: el,
      Description: "",
    });
    setTravelDetails(value);
  };

  const remSection = (date) => {
    const value  = [...travelDetails];
    value.splice(value.findIndex(value => value.Date===date), 1);
    setTravelDetails(value);
  }

  const onKeyUpChange = (value, TravelId) => {
    travelDetails.find(x => x.TravelId === TravelId).Description = value;
  }

  
  function onChange(value, name) {
    if (name.toString() === 'company'){
      // console.log(value.target.value,'on changing company')
      setCompanyId(value.target.value);
    }
  }

  const handleSubmit = () => {
    const value =  {
          "Purpose": purposeState,
          "Company": {
              "CompanyId": companyId
          },
          "Employee": {
              "EmployeeId": 46
          },
          "TravelEntries": travelDetails
      }
      console.log('value', value);
      dispatch(createTravel(value));
      setShow(false);
  }

  return (
    <div>
      <button
        className="btn bg-red-500 hover:bg-red-600 text-white"
        aria-controls="search-modal"
        onClick={handleShow}>
        <span className="hidden xs:block ml-2">Add Travelling</span>
      </button> 
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>

        <Modal.Header closeButton>
          <Modal.Title>Add Travelling</Modal.Title>
        </Modal.Header>

        <Modal.Body >
          <Container>
            {/* Row 1 */}
            <Row>
              <Col xs={6} md={6}>
                  <label className="block mb-2">
                    <span className="text-gray-300 title">Company</span>
                    <select className="form-select block w-full" onChange={e => onChange(e,'company')} required>
                    <option key="-1" value="-1">---SELECT ALL COMPANIES---</option>
                    {companies.map ((company) =>{
                      return <option key={company.id} value={company.id}>{company.text}</option>
                      })}
                    </select>
                  </label>
              </Col>
              <Col xs={6} md={6}>
                  <span className="text-gray-300 title">Purpose of Travel</span>
                  <input
                    onChange={event => setPurposeState(event.target.value)}
                    className="form-input block w-full"
                    placeholder="Purpose of Travel"/>
              </Col>
            </Row>

            {/* Row 2 */}
            <Row className="mt-8 mb-8">
              <Col xs={6} md={6}>
                <Calendar onClickDay={(el) => addTravelDate(el)} />
              </Col>
              <Col xs={6} md={6} className="autoscroll">
                  {travelDetails && travelDetails.map((travelDetail, index) => (
                      <>
                        <div key={index} className="selectedDate">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          
                          {/* {new Intl.DateTimeFormat('GMT').formatDate(travelDetail.Date)} */}
                          {new Intl.DateTimeFormat(['ban', 'id']).format(travelDetail.Date)}
                          {/* {formatDate(travelDetail.Date)} */}
                        </div>
                        <textarea className="resize-none rounded-md areadesc"
                          onKeyUp={e => onKeyUpChange(e.target.value, travelDetail.TravelId)}></textarea>
                        <span className="btnremove" onClick={() => remSection(travelDetail.Date)}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </>
                  ))}
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn bg-red-500 hover:bg-red-600 text-white" onClick={handleSubmit}>Create Travelling</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalCreate;

