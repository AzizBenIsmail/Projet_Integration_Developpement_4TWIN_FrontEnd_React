import React from "react";
import { Button, Modal, Row, Col } from "reactstrap";
import JobOffer from "./JobOffer";

class Modals extends React.Component {
  state = {
    defaultModal: false,
  };

  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };

  render() {
    const { jobOffer } = this.props;

    return (
      <>
        <Row>
          <Col md="4">
            <Button style={{ width: '345%' , marginTop: '15px', marginLeft:'2px' }} onClick={() => this.toggleModal("defaultModal")}>
              Details
            </Button>
            <Modal 
            
              className="modal-dialog-centered"
              isOpen={this.state.defaultModal}
              toggle={() => this.toggleModal("defaultModal")}
            >
              <div className="modal-header" >
                {/* <h6 className="modal-title" id="modal-title-default">
                  {jobOffer.title}
                </h6> */}
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => this.toggleModal("defaultModal")}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <div className="modal-body">   
              {/* style={{ width:'400rem'}} */}
                <JobOffer  jobOffer={jobOffer} showDetails={true} />
              </div>
              <div className="modal-footer" >
                {/* <Button color="primary" type="button">
                  Save changes
                </Button> */}
                <Button
                  className="ml-auto"
                  color="link"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => this.toggleModal("defaultModal")}
                >
                  Close
                </Button>
              </div>
            </Modal>
          </Col>
        </Row>
      </>
    );
  }
}

export default Modals;
