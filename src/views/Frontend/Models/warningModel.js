import React from "react";
// reactstrap components
import {
  Button,

  Modal,

} from "reactstrap";
import axios from 'axios';

const  WarningModal= ({isOpen, toggle, title, body, button, event, onDelete}) => {
   
  const handleAction = async () => {
    try {
      if (event) {
        const res = await axios.delete(`http://localhost:5000/events/${event}`);
        onDelete(event); // call the callback function with the id of the deleted event
      }
      toggle(); // close the modal
    } catch (error) {
      console.error(error);
    }
  };
     
    
  return (
    <>
      {/* Button trigger modal */}
     
      {/* Modal */}
      <Modal
         className="modal-dialog-centered modal-danger"
         contentClassName="bg-gradient-danger"
         isOpen={isOpen}
         toggle={toggle}
      >
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel" toggle={toggle}>
             {title}
          </h5>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={toggle}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
                <div className="py-3 text-center">
                  <i className="ni ni-bell-55 ni-3x" />
                  <h4 className="heading mt-4">You should read this!</h4>
                  <p>
                    {body}
                  </p>
                </div>
              </div>
        <div className="modal-footer">
          <Button
             className="text-white ml-auto"
             color="link"
             data-dismiss="modal"
             type="button"
             onClick={() => {toggle()}}
          >
            Close
          </Button>
          <Button className="btn-white" color="default" type="button" onClick={handleAction} >
           {button}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default WarningModal;
