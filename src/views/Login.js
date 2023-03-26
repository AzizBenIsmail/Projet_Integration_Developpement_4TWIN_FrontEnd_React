import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import {  Card,  CardHeader,  CardBody,  DropdownItem,  InputGroupAddon,  InputGroupText,  InputGroup,  Row,  Col,} from "reactstrap";

import { LoginUser } from "../services/apiUser";
import { Button, Container, Form } from "react-bootstrap";
import flatted from "flatted";
import axios from "axios";

import LoginNavbar from "components/Navbars/LoginNavbar";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [user, setUsers] = useState({
    email: "",
    password: "",
  });
  const handlechange = (e) => {
    console.log(e.target.value);
    setUsers({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const Login = async (user) => {
    //const jsonString = flatted.stringify(user);

    //   const res = await LoginUser(user).catch((error) => {
    //     console.log(error.response.data.message);
    // });

    //const res = await axios.post('http://localhost:5000/users/login',user);

    //console.log(res.data);
    //console.log(res.data.message);
    // switch (user.password ||res.data.message ) {
    //   case "User successfully authenticated":
    //     console.log("welcom ");
    //       alert("welcom ");
    //     navigate("/landing-page");
    //     break;case "azerty":
console.log(user.password);
    switch (user.password) {
      case "azerty":
        console.log("Please fill in all the fields of the form");
        alert("Please fill in all the fields of the form");
        break;
        case "Notdone123":
          console.log("failed toauthent");
          alert("failed to authent");
          break;      
        case "Administrateur123":
          console.log("welcom admin");
          alert("welcom Admin");
          navigate("/Tables");
        break;
      default:
        navigate("/landing-page");
        break;
    }
  };
  const handleGoogleLogin = async () => {
    try {
      const response = await axios.get('http://localhost:5000/auth/connection');
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
              <Card className="bg-secondary shadow border-0">
                <CardHeader className="bg-white pb-5">
                  <div className="text-muted text-center mb-3">
                    <small>Sign in with</small>
                  </div>
                  <div className="btn-wrapper text-center">
                    <Button
                      className="btn-neutral btn-icon ml-1"
                      color="default"
                      href="https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=1011336119202-68ccv8g3nnrvrbhaibacj684alcpfmss.apps.googleusercontent.com&service=lso&o2v=2&flowName=GeneralOAuthFlow"
                       onClick={handleGoogleLogin}
                    >
                      <span className="btn-inner--icon mr-1">
                        <img
                          alt="..."
                          src={
                            require("assetsFrontOffice/img/icons/common/google.svg")
                              .default
                          }
                        />
                      </span>
                      <span className="btn-inner--text">Google</span>
                    </Button>
                  </div>
                </CardHeader>
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
                          onChange={(e) => handlechange(e)}
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
                          onChange={(e) => handlechange(e)}
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
