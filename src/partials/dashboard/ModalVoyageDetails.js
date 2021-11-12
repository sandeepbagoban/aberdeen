import React, { useState, useRef, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import 'react-calendar/dist/Calendar.css';
import { Col, Row, Container, Modal, Form } from "react-bootstrap";


const ModalVoyageDetails = ({show,setvisiblechild,dataFromParent}) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [dataFromParentdetails, setdatafromparentdetails] = useState();


  useEffect(() => {
    if (show && show != undefined){
      setVisible(true)
    }
  }, [show]);

  const handleClose = () => {
    setVisible(false);
    setvisiblechild(false)
  }

  useEffect(() => {
    console.log(dataFromParent,'data from parent!!!')
    setdatafromparentdetails(dataFromParent);
  }, [dataFromParent]);

  return (
    <div>
      <Modal
        size="lg"
        onHide={handleClose}
        show={visible}
        setvisiblechild = {setvisiblechild}
        backdrop="static"
        keyboard={false}>
          <Modal.Header closeButton>
          <Modal.Title>Travel Details
          </Modal.Title>
        </Modal.Header>
        <Form>
        <Modal.Body >
          <Container>
          <Form.Group controlId="validationFormikPurpose">
          Employee Name:<Form.Control name="purpose" disabled type="text" value={dataFromParentdetails != undefined ? dataFromParentdetails.Employee.Name : ''}/>
          </Form.Group>

          <Form.Group controlId="validationFormikPurpose">
          Company:<Form.Control name="purpose" disabled type="text" value={dataFromParentdetails != undefined ? dataFromParentdetails.Company.Name : ''}/>
          </Form.Group>

          <Form.Group controlId="validationFormikPurpose">
          Purpose:<Form.Control name="purpose" disabled type="text" value={dataFromParentdetails != undefined ? dataFromParent.Purpose : ''}/>
          </Form.Group>

          <Form.Group controlId="validationFormikPurpose">
          Start Date:<Form.Control name="purpose" disabled type="text" value={dataFromParentdetails != undefined ? dataFromParent.startDate : ''}/>
          </Form.Group>

          <Form.Group controlId="validationFormikPurpose">
          End Date:<Form.Control name="purpose" disabled type="text" value={dataFromParentdetails != undefined ? dataFromParent.endDate : ''}/>
          </Form.Group>
          </Container>
        </Modal.Body>
        </Form>

      </Modal>
    </div>
  );
};

export default ModalVoyageDetails;














