import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardBody,
  DropdownItem,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

import { LoginUser } from "../../../services/apiUser";
import { Button, Container, Form } from "react-bootstrap";
import { stringify } from 'flatted';
import axios from "axios";
import Cookies from 'js-cookie';

import LoginNavbar from "../../../components/Navbars/LoginNavbar";

import ConnectVia from "./ConnectVia";
import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [user, setUsers] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
  setUsers({ ...user, [e.target.name]: e.target.value });
  };

  const Login = async (user) => {
    try {
      const res = await axios.post('http://localhost:5000/users/login', user, {
        credentials: "include"
      });
    
      // console.log(res.data.user._id);
      // console.log(res.data.user);
      console.log(res.data);
      console.log(res.status);    
      const token = res.data;
      // Set cookie
      Cookies.set('user', JSON.stringify(token), { expires: 24/24 }); 
      // expires in 2 hours
      const userCookie = Cookies.get('user');
      console.log('Cookie set:', userCookie);
      const u = JSON.parse(Cookies.get('user')).token;
    //const result = u.token;
      console.log(u);
      console.log(res.data.user.userType)
      if(res.data.user.userType === "admin")
      {
        window.location.replace(`/Backend_Users/`);
      }else{
      window.location.replace(`/landing-page/`);}
    } catch (error) {
      toast(error.response?.data?.message||'Error', { autoClose: 5000 });
    console.log(error.response?.data?.message||'error');
    }
  };

  function sendRequest() {
    const token = JSON.parse(Cookies.get('user')).token;
////get



axios.get('http://localhost:5000/users/test', {
  // Add request payload here
}, {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error(error);
});

   //////post

    axios.post('http://localhost:5000/users/test', {
      foo: 'bar'
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  }
  
  return (
    <>
      <LoginNavbar />
      <section className="section section-shaped section-lg">
        <div className="shape shape-style-1 bg-gradient-default"></div>
        <Container className="pt-lg-7">
          <Row className="justify-content-center">
            <Col lg="5">
              <Card className="bg-secondary shadow border-0">
              <ConnectVia />
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <small>Or sign in with credentials</small>
                  </div>
                  <Form role="form">
                    <Form.Group className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Form.Control
                          placeholder="email"
                          type="email"
                          name="email"
                          onChange={(e) => handleChange(e)}
                        />
                      </InputGroup>
                    </Form.Group>
                    <Form.Group>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
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
                    </Form.Group>
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id=" customCheckLogin"
                        type="checkbox"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor=" customCheckLogin"
                      >
                        <span>Remember me</span>
                      </label>
                    </div>
                    <div className="text-center">
                      <Button
                        className="mt-4"
                        color="primary"
                        type="button"
                        onClick={(e) => {
                          console.log(user);
                       // sendRequest();
                        Login(user);
                        }}
                      >
                        {" "}
                        Sign in{" "}
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
              <Row className="mt-3">
                <Col xs="6">
                  <a className="text-light" onClick={(e) => navigate(`/reset`)}>
                    <small>Forgot password?</small>
                  </a>
                </Col>
                <Col className="text-right" xs="6">
                  <a
                    className="text-light"
                    href="#pablo"
                    onClick={(e) => navigate(`/Register-page`)}
                  >
                    <small>Create new account</small>
                  </a>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
