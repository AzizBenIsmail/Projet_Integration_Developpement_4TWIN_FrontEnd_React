import React, { useState } from "react";
import JobOfferCard from "./JobOfferCard";
import Cookies from 'js-cookie';
import axios from 'axios';
import {
  Card,
  CardBody,
  FormGroup,
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
    description: "",
    company: "",
    salary: "",
    location: "",
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
              <Col lg="5">
              <div className="ml-6 pb-4 text-success font-weight-bold" 
              style={{ fontSize: "30px", fontWeight: 600, color: "#4a4a4a", textShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)" }}>
                Create Your Job Offer
              </div>
              


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
                        <Form.Label>Description :</Form.Label>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-book-bookmark" />
                            </InputGroupText> 
                          </InputGroupAddon>
                          <Form.Control
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
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

                      <Form.Label>Salary :</Form.Label>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-money-coins" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <input
                          type="number"
                          name="salary"
                          value={formData.salary}
                          onChange={handleChange}
                        />
                      </InputGroup>
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
                      <div className="text-center mt-5">
                        <Button  onClick = {handleSubmit} type="submit">Submit</Button>
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
