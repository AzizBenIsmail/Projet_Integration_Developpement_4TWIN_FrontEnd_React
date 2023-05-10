import React, { useState } from "react";
import JobOfferCard from "./JobOfferCard";
import Cookies from 'js-cookie';
import axios from 'axios';
import {
  Card,
  CardBody,
  FormGroup,
  Label,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Button
} from "reactstrap";
import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


import DemoNavbar from "../../../components/Navbars/DemoNavbar";


const ApplicationEmployer = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    aboutCompany: "",
    aboutJob: "",
    responsibilities: "",
    requirements: "",
    experienceNeeded: "",
    salary: "",
  });

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
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
 
  const navigate=useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/recruit/add-job-offer", formData, {
        headers: {
          "Content-Type": "application/json",
          'foo':'bar'
        },
        ...config,
      });
      const data = response.data;
      console.log(data);
      navigate('/OffersCreated',{state:{jobOffer:data}});
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <>
      <DemoNavbar />
      <main>
        <div className="position-relative bg-primary ">{/* shape Hero */}</div>
        <section className="section section-lg bg-gradient-default">
          <Container className="pt-lg-7">
            <Row className="justify-content-center">
              <Col lg="10">
              <div className="d-flex justify-content-center align-items-start   font-weight-bold"
            style={{
              fontSize: "40px",
              fontWeight: 600,
              color: "white" }}>
                Create Your Job Offer
              </div>
              <br></br>


                <Card className="bg-secondary shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5">
                    <Form role="form" enctype="multipart/form-data">
                      <Form.Group>
                        <Form.Label>Job Title:</Form.Label>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-briefcase-24" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Form.Control
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            label="Title job"
                            aria-label="Titre job"
                          />
                        </InputGroup>
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Company :</Form.Label>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-building " />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Form.Control
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                          />
                        </InputGroup>
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Location :</Form.Label>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-square-pin" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Form.Control
                          type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                          />
                        </InputGroup>
                      </Form.Group>
                      <br></br>
                      <Form.Group>
                        <Form.Label>About Company :</Form.Label>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-building " />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Form.Control
                            type="text"                    
                            name="aboutCompany"
                            value={formData.aboutCompany}
                            onChange={handleChange}
                          />
                        </InputGroup>
                      </Form.Group>
                      {/* <Form.Group>
                        <Form.Label>About Company :</Form.Label>
                        <Input type="textarea" className="input-group-alternative mb-3" >     
                                    
                          <Form.Control     
                          type="text"                    
                            name="aboutCompany"
                            value={formData.aboutCompany}
                            onChange={handleChange}
                          />
                        </Input>
                      </Form.Group> */}
                      <Form.Group>
                        <Form.Label>About Job :</Form.Label>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-building " />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Form.Control
                            type="text"
                            name="aboutJob"
                            value={formData.aboutJob}
                            onChange={handleChange}
                          />
                        </InputGroup>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Responsibilities :</Form.Label>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-building " />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Form.Control
                            type="text"
                            name="responsibilities"
                            value={formData.responsibilities}
                            onChange={handleChange}
                          />
                        </InputGroup>
                      </Form.Group>
                      
                      <Form.Group>
                        <Form.Label>Requirements :</Form.Label>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-building " />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Form.Control
                            type="text"
                            name="requirements"
                            value={formData.requirements}
                            onChange={handleChange}
                          />
                        </InputGroup>
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Experience Needed :</Form.Label>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-book-bookmark" />
                            </InputGroupText> 
                          </InputGroupAddon>
                          <Form.Control
                            type="text"
                            name="experienceNeeded"
                            value={formData.experienceNeeded}
                            onChange={handleChange}
                          />
                        </InputGroup>
                      </Form.Group>

                      <Form.Label>Salary :</Form.Label>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-money-coins" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          placeholder="1000 DT"
                          name="salary"
                          value={formData.salary}
                          onChange={handleChange}
                        />
                      </InputGroup>
                      
                      <div className="text-center mt-5">
                        <Button style={{ width: '100%' , backgroundColor:'#1560BD', color:'white'}} onClick = {handleSubmit} type="submit">Submit</Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
};

export default ApplicationEmployer;