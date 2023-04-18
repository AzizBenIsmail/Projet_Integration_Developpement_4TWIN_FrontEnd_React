import React from "react";
// reactstrap components
import {
  Button,

  Modal,
 
} from "reactstrap";

const SimpleModal = ({isOpen, toggle}) => {
  
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
            Modal title
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
        <div className="modal-body">...</div>
        <div className="modal-footer">
          <Button
            color="secondary"
            data-dismiss="modal"
            type="button"
            onClick={toggle}
          >
            Close
          </Button>
          <Button color="primary" type="button">
            Save changes
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default SimpleModal;
