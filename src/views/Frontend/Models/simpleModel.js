import React from "react";
import { useNavigate } from "react-router-dom";
// reactstrap components
import {
  Button,

  Modal,
 
} from "reactstrap";

import axios from 'axios';


const SimpleModal = ({isOpen, toggle, title, body, button, fablab, onAccept}) => {
  const navigate= useNavigate()
  const handleAction = async () => {
      if(fablab){
        const res = await axios.post(`http://localhost:5000/fablabs/${fablab}`)
        .then(res => {
         console.log(res.data);
         onAccept(res.data.fablab)
         navigate(`/FablabRequestDetails/${fablab}`);
         })
         
      .catch(err => {
           console.log(err);
       });
      }
      toggle(); // close the modal
  };
     
  return (
    <>
      {/* Button trigger modal */}
      
      {/* Modal */}
      <Modal
        className="modal-dialog-centered"
        isOpen={isOpen} toggle={toggle}
      >
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel"  toggle={toggle}>
          {title}
          </h5>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={toggle}
          >
            <span aria-hidden={true} >×</span>
          </button>
        </div>
        <div className="modal-body">{body}</div>
        <div className="modal-footer">
          <Button
            color="secondary"
            data-dismiss="modal"
            type="button"
            onClick={() => {toggle()}}
          >
            Close
          </Button>
         {button && <Button color="primary" type="button" onClick={handleAction}>
            {button}
          </Button>} 
        </div>
      </Modal>
    </>
  );
};

export default SimpleModal;
