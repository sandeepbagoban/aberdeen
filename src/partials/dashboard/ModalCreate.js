import React, { useState, useRef, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import Transition from "../../utils/Transition.js";
import uuid from "react-uuid";
import { Card, Button } from "tailwind-react-ui";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { createTravel, updateTravel } from "../../appRedux/actions/Travel.js";
import { Col, Row, Container, Modal, Form } from "react-bootstrap";
import { loadCompanies, loadEmployees } from '../../appRedux/actions';
import { Formik } from "formik";
import * as yup from "yup";
import moment from 'moment';

const ModalCreate = ({show,setvisiblechild,dataFromParent}) => {

  const localToUtc = (value) => {
    return moment(value).utcOffset(0, true);
  }
  const dispatch = useDispatch();
	const companies = useSelector(({select}) => select.companies);
  const { added,updated }= useSelector( ({travel}) => travel);
  const [purposeState, setPurposeState] = useState('');
  const [companyId, setCompanyId] = useState();
  const [travelDetails, setTravelDetails] = useState([
    {
      TravelEntryId: uuid(),
      TravelId: uuid(),
      Date : localToUtc(new Date()),
      Description: "",
    },
  ]);

  useEffect(() => {
    dispatch(loadEmployees());
    dispatch(loadCompanies());
  }, [dispatch]);

  const [visible, setVisible] = useState(false);

  const handleVisible = () => {
    dataFromParent = undefined;
    setVisible(true)
  }

  useEffect(() => {
    if (added || updated){
      setVisible(false);
      if (setvisiblechild != undefined) {
        setvisiblechild(false)
      }
    }
  }, [added,updated]);

  useEffect(() => {
    if (show && show != undefined){
      setVisible(true)
    }
  }, [show]);

  const handleClose = () => {
    setVisible(false);
    setvisiblechild(false)
  }

  const addTravelDate = (el) => {
    console.log(el,'elllll')
    const value = [...travelDetails];
    value.push({
      TravelEntryId: uuid(),
      TravelId: uuid(),
      Date: localToUtc(new Date(el)),
      Description: "",
    });
    setTravelDetails(value);
  };

  const clearTravelDetails = () => {
    const value = [...travelDetails];
    value.length = 0;
    value.push({
      TravelEntryId: uuid(),
      TravelId: uuid(),
      Date : localToUtc(new Date()),
      Description: ""
    });
    setTravelDetails(value);
  }


  const remSection = (travelEntryId) => {
    const value  = [...travelDetails];
    value.splice(value.findIndex(value => value.TravelEntryId===travelEntryId), 1);
    setTravelDetails(value);
  }

  const onKeyUpChange = (value, TravelEntryId) => {
    travelDetails.find(x => x.TravelEntryId === TravelEntryId).Description = value;
  }

  
  function onChange(value, name) {
    if (name.toString() === 'company'){
      setCompanyId(value.target.value);
    }
  }



  const initialValues = {
    company: dataFromParent != undefined ? dataFromParent.Company.CompanyId:"",
    purpose: dataFromParent != undefined ? dataFromParent.Purpose:""
  };



  useEffect(() => {
    console.log(dataFromParent,'data from parent!!!')
    const value = [...travelDetails];
    value.length = 0;
    if (dataFromParent != undefined && dataFromParent.TravelEntries.length > 0){
      dataFromParent.TravelEntries.forEach(x => {
        value.push({
          TravelEntryId: x.TravelEntryId,
          TravelId: dataFromParent.TravelId,
          Date: localToUtc(new Date(x.Date)),
          Description: x.Description,
        });
      });

      console.log(value,'valllll')
      setTravelDetails(value);
    }
  }, [dataFromParent]);


  const schema = yup.object().shape({
    company: yup.string().required("Please select a company!"),
    purpose: yup.string().required("Please enter purpose of travel!")
  })

  const handlerSubmitApi = () => {
    let travelId = dataFromParent == undefined ? 0 : dataFromParent.TravelId;
    const value =  {
      "TravelId":travelId,
      "Purpose": purposeState,
      "Company": {
          "CompanyId": companyId
      },
      "Employee": {
          "EmployeeId": 46
      },
      "TravelEntries": travelDetails
  }
    if (dataFromParent == undefined){
      console.log(value,'VALUE:::::')
      dispatch(createTravel(value));
      clearTravelDetails();
    } else{
      console.log(value,'VALUE:::::')
     dispatch(updateTravel(value));
    }

  }



  return (
    <div>
      {/* <button
        className="btn bg-red-500 hover:bg-red-600 text-white"
        aria-controls="search-modal"
        onClick={handleVisible}>
        <span className="hidden xs:block ml-2">Add Travelling</span>
      </button>  */}
      <Modal
        size="lg"
        onHide={handleClose}
        show={visible}
        setvisiblechild = {setvisiblechild}
        backdrop="static"
        keyboard={false}>
        <Formik validationSchema={schema} initialValues={initialValues}>
        {({
        handleChange,handleBlur,values,touched,dirty,isValid,errors
      }) => (

        <Form noValidate>
        <Modal.Header closeButton>
          <Modal.Title>Add Travelling
          </Modal.Title>
        </Modal.Header>

        <Modal.Body >
          <Container>
            {/* Row 1 */}
            <Row>
              <Col xs={6} md={6}>
              <Form.Group controlId="validationFormikCompany">
                    <Form.Label className="text-gray-300 title">Company</Form.Label>
                    <Form.Control name="company" as="select" placeholder="Select Company" isInvalid={touched.company && !!errors.company} onBlur={handleBlur} onChange = { e => {onChange(e,'company'); handleChange(e)}} value={values.company}>
                    <option defaultValue>Select Company</option>
                    {companies.map ((company) =>{
                      return <option key={company.id} value={company.id}>{company.text}</option>
                      })}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">{errors.company}</Form.Control.Feedback>
              </Form.Group>
              </Col>


              <Col xs={6} md={6}>
              <Form.Group controlId="validationFormikPurpose">
                    <Form.Label className="text-gray-300 title">Purpose of Travel</Form.Label>
                    <Form.Control name="purpose"  type="text" placeholder="Purpose of Travel" isInvalid={touched.purpose && !!errors.purpose} onBlur={handleBlur} onChange={event => {setPurposeState(event.target.value); handleChange(event)}} value={values.purpose}/>
                    <Form.Control.Feedback type="invalid">{errors.purpose}</Form.Control.Feedback>
              </Form.Group>
              </Col>

            </Row>

            {/* Row 2 */}
            <Row className="mt-8 mb-8">
              <Col xs={6} md={6}>
                <Calendar utcOffset={0,true} onClickDay={(el) => addTravelDate(el)} />
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
                        key={travelDetail.TravelEntryId}
                        onKeyUp={e => onKeyUpChange(e.target.value, travelDetail.TravelEntryId)}
                        defaultValue={travelDetail.Description}
                        ></textarea>
                        {travelDetails.length > 1 && <span className="btnremove" onClick={() => remSection(travelDetail.TravelEntryId)}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        </span>}
                      </>
                  ))}
              </Col>
            </Row>
            
          </Container>
        </Modal.Body>
        {/* disabled={!(dirty && isValid)} */}
        <Modal.Footer>
          <Button className="btn bg-red-500 hover:bg-red-600 text-white" onClick={handlerSubmitApi} disabled={dataFromParent == undefined ? !(dirty && isValid) : !(isValid)}>
            
              {(dataFromParent == undefined) ? 'Create Travelling' : 'Update Travelling'}
            
            
            </Button>
        </Modal.Footer>
        </Form>
        )}
        </Formik>
      </Modal>
    </div>
  );
};

export default ModalCreate;














