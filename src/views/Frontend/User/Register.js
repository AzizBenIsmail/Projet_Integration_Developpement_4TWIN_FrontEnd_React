// reactstrap components
import React, { useState } from "react";
import { register } from "../../../services/apiUser";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
import ConnectVia from "./ConnectVia";
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

import LoginNavbar from "../../../components/Navbars/LoginNavbar";

export default function Register() {


  let formData = new FormData();
  const navigate = useNavigate();
  const [message, setmessage] = useState();
  const [image, setImage] = useState();
  const [user, setUsers] = useState({
    username: "",
    email: "",
    password: "",
    dateOfBirth: "",
    gender: "",
    image_user: "",
  });
  const handleChange = (e) => {
  //  const userFromCookie = JSON.parse(Cookies.get('user'));
   // console.log(userFromCookie)
   // console.log(userFromCookie._id)
    setUsers({ ...user, [e.target.name]: e.target.value });
  };
  const handleChangeFile = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };
  const add = async (e) => {
    e.preventDefault();
   formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("dateOfBirth", user.dateOfBirth);
    formData.append("gender", user.gender);


    console.log(user.username)
    console.log(user.password)
    console.log(user.gender)

    formData.append("image_user", image);
    const res = await axios.post(
      "http://localhost:5000/users/register",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    console.log(res.data);
    console.log(res.data.message);
    setmessage(res.data.message);
    // Check if email is already taken
  };
  const handleGoogleLogin = async () => {
    try {
      const response = await axios.get("http://localhost:5000/auth/connection");
      window.location.href = response.data.redirectUrl;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <LoginNavbar />
      <section className="section section-shaped section-lg">
        <div className="shape shape-style-1 bg-gradient-default"></div>
        <Container className="pt-lg-7">
          <Row className="justify-content-center">
            <Col lg="5">
              {/*largeur du login */}
              <Card className="bg-secondary shadow border-0">
              <ConnectVia />
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <small> Or sign up with credentials </small>
                  </div>
                  <Form role="form" enctype="multipart/form-data">
                    <Form.Group>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            {message === "username is already taken" ? (
                              <i
                                className="ni ni-circle-08"
                                style={{ color: "red" }}
                              />
                            ) : message != "username is already taken" ? (
                              <i
                                className="ni ni-circle-08"
                                style={{ color: "#0000FF" }}
                              />
                            ) : (
                              <i className="ni ni-circle-08" />
                            )}
                          </InputGroupText>
                        </InputGroupAddon>
                        <Form.Control
                          placeholder="username"
                          type="text"
                          name="username"
                          onChange={(e) => handleChange(e)}
                        />
                      </InputGroup>
                      {message === "username is already taken" ? (
                        <label style={{ color: "red" }}>
                          <i className="ni ni-fat-remove" />
                          username is already taken
                        </label>
                      ) : (
                        ""
                      )}
                    </Form.Group>
                    <Form.Group>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            {message === "email is already taken" ? (
                              <i
                                className="ni ni-email-83"
                                style={{ color: "red" }}
                              />
                            ) : (
                              <i
                                className="ni ni-email-83"
                                style={{ color: "#0000FF" }}
                              />
                            )}
                          </InputGroupText>
                        </InputGroupAddon>
                        <Form.Control
                          placeholder="email"
                          type="email"
                          name="email"
                          onChange={(e) => handleChange(e)}
                        />
                      </InputGroup>
                      {message === "email is already taken" ? (
                        <label style={{ color: "red" }}>
                          {" "}
                          <i className="ni ni-fat-remove" />
                          email is already taken
                        </label>
                      ) : (
                        ""
                      )}
                    </Form.Group>
                    <Form.Group>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            {message ===
                            "password : a character string of at least 8 characters containing at least one letter and one number" ? (
                              <i
                                className="ni ni-lock-circle-open"
                                style={{ color: "red" }}
                              />
                            ) : (
                              <i
                                className="ni ni-lock-circle-open"
                                style={{ color: "#0000FF" }}
                              />
                            )}
                          </InputGroupText>
                        </InputGroupAddon>
                        <Form.Control
                          placeholder="password"
                          type="password"
                          autoComplete="off"
                          name="password"
                          onChange={(e) => handleChange(e)}
                        />
                      </InputGroup>
                      {message ===
                      "password : a character string of at least 8 characters containing at least one letter and one number" ? (
                        <label style={{ color: "red" }}>
                          {" "}
                          <i className="ni ni-fat-remove" />
                          password : a character string of at least 8 characters
                          containing at least one letter and one number
                        </label>
                      ) : (
                        ""
                      )}
                    </Form.Group>
                    <Form.Group>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            {message === "You must be at least 18 years old" ? (
                              <i
                                className="ni ni-time-alarm"
                                style={{ color: "red" }}
                              />
                            ) : (
                              <i
                                className="ni ni-time-alarm"
                                style={{ color: "#0000FF" }}
                              />
                            )}
                          </InputGroupText>
                        </InputGroupAddon>
                        <Form.Control
                          placeholder="dateOfBirth"
                          type="date"
                          name="dateOfBirth"
                          max="2006-12-31"
                          onChange={(e) => handleChange(e)}
                        />
                      </InputGroup>
                      {message === "You must be at least 18 years old" ? (
                        <label style={{ color: "red" }}>
                          {" "}
                          <i className="ni ni-fat-remove" /> You must be at
                          least 18 years old
                        </label>
                      ) : (
                        ""
                      )}
                    </Form.Group>
                    <Form.Group>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            {message ===
                            "gender must be one of the following values: Male, Female" ? (
                              <i
                                className="ni ni-badge"
                                style={{ color: "red" }}
                              />
                            ) : (
                              <i
                                className="ni ni-badge"
                                style={{ color: "#0000FF" }}
                              />
                            )}
                          </InputGroupText>
                        </InputGroupAddon>
                        <Form.Check
                          type="radio"
                          id="male"
                          label="Male"
                          name="gender"
                          value="Male"
                          onChange={(e) => handleChange(e)}
                        />
                        <Form.Check
                          type="radio"
                          id="female"
                          label="Female"
                          name="gender"
                          value="Female"
                          onChange={(e) => handleChange(e)}
                        />
                      </InputGroup>
                      {message ===
                      "gender must be one of the following values: Male, Female" ? (
                        <label style={{ color: "red" }}>
                          <i className="ni ni-fat-remove" />
                          gender must be one of the following values: Male,
                          Female
                        </label>
                      ) : (
                        ""
                      )}
                    </Form.Group>
                    <Form.Group>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            {message ===
                            "Please fill in all the fields of the form" ? (
                              <i
                                className="ni ni-image"
                                style={{ color: "red" }}
                              />
                            ) : (
                              <i
                                className="ni ni-image"
                                style={{ color: "#0000FF" }}
                              />
                            )}
                          </InputGroupText>
                        </InputGroupAddon>
                        <Form.Control
                          placeholder="image_user"
                          name="image_user"
                          type="file"
                          onChange={(e) => handleChangeFile(e)}
                        />
                      </InputGroup>
                      {message ===
                      "Please fill in all the fields of the form" ? (
                        <label style={{ color: "red" }}>
                          <i className="ni ni-fat-remove" />
                          Please fill in all the fields of the form
                        </label>
                      ) : (
                        ""
                      )}
                    </Form.Group>
                    <div className="text-muted font-italic">
                      <small>
                        password strength:
                        <span className="text-success font-weight-700">
                          strong
                        </span>
                      </small>
                    </div>
                    <Row className="my-4">
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
                              I agree with the
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
                    </Row>
                    <div className="text-center">
                      <Button
                        className="mt-4"
                        color="primary"
                        type="button"
                        onClick={(e) => add(e)}
                      >
                        Create account
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
