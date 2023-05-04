// reactstrap components
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactDatetime from "react-datetime";
import "react-intl-tel-input/dist/main.css";
//import "../../../assetsFrontOffice/css/fablab.css";
import DemoNavbar from "components/Navbars/DemoNavbar";
import {
  getUserAuth,
} from "../../../services/apiUser";
import Cookies from 'js-cookie';
// reactstrap components

import {
  Card,
  CardBody,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { Button, Container, Form } from "react-bootstrap";

// core components

import axios from "axios";
import AddImage from "./addImage";
import Map from "./Map/mapPage";
import MapPage from "MapPage/MapPage";
import moment from "moment";
export default function AddEvent() {
  // const [image, setImage] = useState();

  const navigate = useNavigate();
  const location= useLocation();
  
  const exist = location.state ? location.state.e : null;

  
 // const [image, setImage] = useState();
  const [currentUser, setCurrentUser] = useState([]);
  const [croppedImage, setCroppedImage] = useState(null);
  const [image, setImage] = useState(null);
  const[eventErrors,setEventErrors]= useState("")

  const handleEvent = (croppedImageUrl,croppedImageBlob) => {
    setCroppedImage(croppedImageUrl);
    setImage(croppedImageBlob);
    console.log(croppedImageUrl);
    console.log(croppedImageBlob);
  };
 
 /////cookies
 if (!Cookies.get("user")) {
  window.location.replace("/login-page");
}

const token = JSON.parse(Cookies.get("user")).token;
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
////////
  const [event, setEvent] = useState({
    title: exist?.title || "",
    description:exist?.description || "",
    start_date:exist?.start_date || "",
    end_date:exist?.end_date ||"",

  });
  const handlechange = async (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleStartDateChange = (date) => {
    setEvent({ ...event, start_date:date.format("YYYY-MM-DD")});
  };

  const handleEndDateChange = (date) => {
    setEvent({ ...event, end_date: date.format("YYYY-MM-DD")});
  };

  const isValidDate = (current) => {
    if (event.start_date && event.end_date) {
      return current.isSameOrAfter(event.start_date) && current.isSameOrBefore(event.end_date);
    }
    return true;
  };

 

  const handlechangeFile = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    getUserFunction(config)
    console.log(exist);
    console.log(event);

  }, [exist,event]);
  const getUserFunction = async (config) => {
    const res = await getUserAuth("", config)
      .then((res) => {
        setCurrentUser(res.data.user);
        console.log(currentUser);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  const add = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    let titleError = "";
    let descError = "";
    let sdError = "";
    let edError = "";
    let imgError = "";
   

    // Check required fields
    if (!event.title) {
      titleError = "event name is required.";
    }
    if (!event.start_date) {
      sdError = "start date is required.";
    }
    if (!event.description) {
      descError = "description is required.";
    }
    if (!event.end_date) {
      edError = "end date is required.";
    }
   
    if (!image) {
      imgError = "image is required.";
    }

  
    setEventErrors({ title: titleError, startDate: sdError , endDate: edError, description: descError, img : imgError});
  
    if (titleError || sdError || edError || descError || imgError) {
      return;
    }

    if(image){
      formData.append("event_img", image ,`${event.title}+cropped.jpg`);
    }
  
    formData.append("title", event.title);
    formData.append("description", event.description);
    formData.append("start_date", event.start_date);
    formData.append("end_date", event.end_date);
    formData.append("creator",currentUser._id)
    console.log(formData);
    try {
      
      const res = exist ? await axios.put(`http://localhost:5000/events/${exist._id}`, formData) : axios.post("http://localhost:5000/events", formData) ;
      console.log(res.data);
      //console.log(res.data.message);
      navigate(`/eventsFablab/${currentUser._id}`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <DemoNavbar />
      <section className="section section-shaped section-lg">
        <div className="shape shape-style-1 bg-gradient-default"></div>
        <Container className="pt-lg-7">
          <Row className="justify-content-center">
            <Col lg="8">
              {" "}
              {/*largeur du login */}
              <Card className="bg-secondary shadow border-0">
                <CardBody className="px-lg-5 py-lg-8">
                  <div className="text-center text-muted mb-4">
                    <p>
                      <big>
                        Please make sure to fill out the form attentively
                       
                      </big>
                    </p>
                    <small>
                      Your Request will be validated by an admin as soon as
                      possible
                    </small>
                  </div>
                  <Form
                    role="form"
                    enctype="multipart/form-data" /*method="HTTP_METHOD" */
                  >
                    <Form.Group>
                    <div type="invalid" style={{ color: "red", marginTop:"0px" }}>
                        {eventErrors.title}
                      </div>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-building" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Form.Control
                          placeholder="Event Name"
                          
                          value={exist ? event.title : null}
                          type="text"
                          name="title"
                          onChange={(e) => handlechange(e)}
                        />
                        
                      </InputGroup>
                    
                    </Form.Group>
                    <Form.Group>
                    <div type="invalid" style={{ color: "red", marginTop:"0px" }}>
                        {eventErrors.description}
                      </div>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-smile-o" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Form.Control
                          className="form-control-alternative"
                          placeholder="Tell us more about your event"
                          value={exist ? event.description : null}
                          rows="5"
                          type="textarea"
                          name="description"
                          onChange={(e) => handlechange(e)}
                        />
                      </InputGroup>
                    </Form.Group>
                    
                    <Row>
                    <Col xs={6}>
                    <FormGroup>
                    <div type="invalid" style={{ color: "red", marginTop:"0px" }}>
                        {eventErrors.startDate}
                      </div>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-calendar-grid-58" />
                          </InputGroupText>
                        </InputGroupAddon>
                        {exist ? (<ReactDatetime
                          inputProps={{
                            placeholder: "Starting date",
                            value: `${new Date(event.start_date).getFullYear()}-${
                                  new Date(event.start_date).getMonth() + 1
                                }-${new Date(event.start_date).getDate()} at ${new Date(
                                  event.start_date
                                ).toLocaleString("en-US", {
                                  hour: "numeric",
                                  minute: "numeric",
                                  hour12: true,
                                })}`
                              
                          }}
                          timeFormat={true}
                          onChange={(date) => handleStartDateChange(date)}
                          isValidDate={(current) => {
                            return current.isSameOrAfter(moment(), "day");
                          }}
                        />):(<ReactDatetime
                          inputProps={{
                            placeholder: "Starting date",
                            
                          }}
                          timeFormat={true}
                          onChange={(date) => handleStartDateChange(date)}
                          isValidDate={(current) => {
                            return current.isSameOrAfter(moment(), "day");
                          }}
                          
                        
                        />)}
                        
                      </InputGroup>
                    </FormGroup>
                    </Col>
                    <Col xs={6}>
                    <FormGroup>
                    <div type="invalid" style={{ color: "red", marginTop:"0px" }}>
                        {eventErrors.endDate}
                      </div>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-calendar-grid-58" />
                          </InputGroupText>
                        </InputGroupAddon>
                        {exist ? (<ReactDatetime
                          inputProps={{
                            placeholder: "Ending date",
                            value:`${new Date(event.end_date).getFullYear()}-${new Date(event.end_date).getMonth() + 1}-${new Date(event.end_date).getDate()} at ${new Date(event.end_date).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}` ,

                          }}
                          timeFormat={true}
                          onChange={(date) => handleEndDateChange(date)}
                          isValidDate={(current) => {
                            return current.isSameOrAfter(event.start_date, "day");
                          }}
                        />):(<ReactDatetime
                          inputProps={{
                            placeholder: "Ending date",

                          }}
                          timeFormat={true}
                          onChange={(date) => handleEndDateChange(date)}
                          isValidDate={(current) => {
                            return current.isSameOrAfter(event.start_date, "day");
                          }}
                        />) }
                        
                      </InputGroup>
                        </FormGroup>
                      </Col>
                      </Row>


                    <Form.Group>
                      
                    </Form.Group>
                    <Form.Group>
                    <div type="invalid" style={{ color: "red", marginTop:"0px" }}>
                        {eventErrors.img}
                      </div>
                      <AddImage className="input-group-alternative" onEvent={handleEvent} aspect={3/2} holder={"add Event cover Image"} />

                    </Form.Group>
                    <Form.Group> {croppedImage ? (<img src={croppedImage} alt="Cropped Image" style={{width:"50%",height:"30%"}} />):(<>{exist && <img src={`http://localhost:5000/images/${exist.event_img}`} alt="" style={{width:"50%",height:"30%"}} />}</>)}</Form.Group>
                  
                    <div className="text-center">
                      <Button
                        className="mt-4"
                        color="primary"
                        type="button"
                        onClick={(e) => add(e)}
                      >
                        {" "}
                        Add Event{" "}
                      </Button>
                    </div>
                  
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
