import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import {  Card,  CardHeader,  CardBody,  DropdownItem,  InputGroupAddon,  InputGroupText,  InputGroup,  Row,  Col,} from "reactstrap";

import { LoginUser } from "../../../services/apiUser";
import { Button, Container, Form } from "react-bootstrap";
import flatted from "flatted";

import DemoNavbar from "components/Navbars/DemoNavbar";


export default function ResetPwd() {
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

  const Login = async (e) => {
    e.preventDefault();

    const res = await LoginUser(user).catch((error) => {
      console.log(error.response.data.message);
    });

    console.log(res.data);
    console.log(res.data.message);

    switch (res.data) {
      case "failed to authent":
        console.log("failed to authent");
        alert("failed to authent");
        break;
      case "done":
        console.log("User successfully authenticated");
        alert(
          "User: `" + res.data.username + "`" + " successfully authenticated"
        );
        navigate("/landing-page");
        break;
      default:
        console.log("Please fill in all the fields of the form");
        alert("Please fill in all the fields of the form");
        break;
    }
  };
  return (
    <>
          <DemoNavbar />

      <section className="section section-shaped section-lg">
        <div className="shape shape-style-1 bg-gradient-default"></div>
        <Container className="pt-lg-7">
          <Row className="justify-content-center">
            <Col lg="5">
              <Card className="bg-secondary shadow border-0">
                <CardHeader className="bg-white pb-5">
                  <div className="btn-wrapper text-center">
                    <Button
                      className="btn-neutral btn-icon"
                      color="default"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <span className="btn-inner--icon mr-1">
                        <img
                          alt="..."
                          src={
                            require("assetsFrontOffice/img/icons/common/github.svg")
                              .default
                          }
                        />
                      </span>
                      <span className="btn-inner--text">Github</span>
                    </Button>
                    <Button
                      className="btn-neutral btn-icon ml-1"
                      color="default"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
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
                    <small>Forgot Password ?</small>
                  </div>
                  <Form role="form">
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
                      <div style={{ opacity: "0" }}>
                        -------------------------- --------------------------
                        --------------------------
                      </div>
                    </Form.Group>
                    <Form.Group>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Form.Control
                          placeholder="Verify password"
                          type="password"
                          autoComplete="off"
                          name="password2"
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
                    </div>
                    <div className="text-center">
                      <Button
                        className="mt-4"
                        color="primary"
                        type="button"
                        onClick={(e) => {
                          console.log(e);
                          Login(e);
                        }}
                      >
                        {" "}
                        Change{" "}
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
              <Row className="mt-3">
                <Col xs="6">
                  <a className="text-light" onClick={(e) => e.preventDefault()}>
                    <small>Sign in</small>
                  </a>
                </Col>
                <Col className="text-right" xs="6">
                  <a
                    className="text-light"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
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
