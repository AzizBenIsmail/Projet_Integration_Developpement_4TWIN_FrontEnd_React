// reactstrap components
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactDatetime from "react-datetime";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
//import "../../../assetsFrontOffice/css/fablab.css";
import DemoNavbar from "components/Navbars/DemoNavbar";

// reactstrap components

import {
  Card,
  CardHeader,
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

export default function AddEvent() {
  // const [image, setImage] = useState();

  const navigate = useNavigate();
  const [image, setImage] = useState();

  const [event, setEvent] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date:"",

  });
  const handlechange = async (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleStartDateChange = (date) => {
    setEvent({ ...event, start_date: date.format("YYYY-MM-DD") });
  };

  const handleEndDateChange = (date) => {
    setEvent({ ...event, end_date: date.format("YYYY-MM-DD") });
  };

  const handlechangeFile = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    
  }, [event]);
  
  
  const add = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("event_img", image);
    formData.append("title", event.title);
    formData.append("description", event.description);
    formData.append("start_date", event.start_date);
    formData.append("end_date", event.end_date);
    formData.append("creator","643216cd888293912452e8eb")
    console.log(formData);
    try {
      const res = await axios.post("http://localhost:5000/events", formData);
      console.log(res.data);
      console.log(res.data.message);
      navigate("/eventsFablab");
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
                <CardBody className="px-lg-5 py-lg-5">
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
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-building" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Form.Control
                          placeholder="Event Name"
                          type="text"
                          name="title"
                          onChange={(e) => handlechange(e)}
                        />
                      </InputGroup>
                    </Form.Group>
                    <Form.Group>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-smile-o" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Form.Control
                          className="form-control-alternative"
                          placeholder="Tell us more about your event"
                          rows="5"
                          type="textarea"
                          name="description"
                          onChange={(e) => handlechange(e)}
                        />
                      </InputGroup>
                    </Form.Group>

                    <FormGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-calendar-grid-58" />
                          </InputGroupText>
                        </InputGroupAddon>

                        <ReactDatetime
                          inputProps={{
                            placeholder: "Starting date",
                          }}
                          timeFormat={true}
                          onChange={(date) => handleStartDateChange(date)}
                        />
                      </InputGroup>
                    </FormGroup>

                    <FormGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-calendar-grid-58" />
                          </InputGroupText>
                        </InputGroupAddon>

                        <ReactDatetime
                          inputProps={{
                            placeholder: "Ending date",
                          }}
                          timeFormat={true}
                          onChange={(date) => handleEndDateChange(date)}
                        />
                      </InputGroup>
                    </FormGroup>

                    <Form.Group>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-image" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Form.Control
                          placeholder="Event Image"
                          name="event_img"
                          type="file"
                          onChange={(e) => handlechangeFile(e)}
                        />
                      </InputGroup>
                    </Form.Group>

                    {/* <Row className="my-4">
                                            <Col xs="12">
                                                <div className="custom-control custom-control-alternative custom-checkbox">
                                                    <input
                                                        className="custom-control-input"
                                                        id="customCheckRegister"
                                                        type="checkbox"
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor="customCheckRegister"
                                                    >
                                                        <span>
                                                            I agree with the{" "}
                                                            <a
                                                                href="#pablo"
                                                                onClick={(e) => e.preventDefault()}
                                                            >
                                                                Privacy Policy
                                                            </a>
                                                        </span>
                                                    </label>
                                                </div>
                                            </Col>
                                        </Row>*/}
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
                    {/* <div className="text-center">
                                            <Button className="mt-4" color="primary" type="button" onClick={(e)=>add(e)} > Create account </Button>
                    </div> */}
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
