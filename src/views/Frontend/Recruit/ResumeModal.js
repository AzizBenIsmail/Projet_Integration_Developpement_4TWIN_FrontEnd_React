import React from "react";
import { Button, Modal, Row, Col } from "reactstrap";
import { Document, Page } from 'react-pdf';


class ResumeModal extends React.Component {
  state = {
    defaultModal: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      numPages: null,
      pageNumber: 1,
      scale: 1.0,
    };
  }

  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };

  

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  handleZoomIn = () => {
    this.setState(prevState => ({ scale: prevState.scale + 0.1 }));
  };

  handleZoomOut = () => {
    this.setState(prevState => ({ scale: prevState.scale - 0.1 }));
  };

  render() {
    const { url } = this.props;
    const { numPages, pageNumber, scale } = this.state;

    return (
      <>
        <Row>
          <Col md="4">
            <Button style={{ width: '350%' , marginBottom: '15px', marginTop: '15px' }}  onClick={() => this.toggleModal("defaultModal")}>
              View Resume
            </Button>
            <Modal 
              
              className="modal-dialog-centered"
              isOpen={this.state.defaultModal}
              toggle={() => this.toggleModal("defaultModal")}
            >
              
              <div className="modal-content" style={{ width: '900px',right:"50%" }}>
             <div className="modal-header">
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
              <iframe src={url} width="100%" height="550px"></iframe>
              {/* <div>
                <Document file={url} onLoadSuccess={this.onDocumentLoadSuccess}>
                  <Page pageNumber={pageNumber} scale={scale} />
                </Document>
                <div>
                  <button onClick={this.handleZoomIn}>Zoom In</button>
                  <button onClick={this.handleZoomOut}>Zoom Out</button>
                  <p>Page {pageNumber} of {numPages}</p>
                </div>
              </div> */}
              </div>
              <div className="modal-footer">
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
              </div>
            </Modal>
          </Col>
        </Row>
      </>
    );
  }
}

export default ResumeModal;
