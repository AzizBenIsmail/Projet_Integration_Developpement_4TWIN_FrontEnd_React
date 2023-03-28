import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import DemoNavbar from "../../../components/Navbars/DemoNavbar";

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

import { forgotpwd } from "../../../services/apiUser";
import { Button, Container, Form } from "react-bootstrap";
import flatted from "flatted";

export default function Reset() {
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

    console.log(user);
  };

  const forgotpassword = async (e) => {
    e.preventDefault();

    const res = await forgotpwd(email).catch((error) => {
      console.log(error.response.data.message);
    });

    console.log(res.data);
    console.log(res.data.message);
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
                          onChange={(e) => setEmail(e.target.value)}
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
                          forgotpassword(e);
                        }}
                      >
                        {" "}
                        Submit{" "}
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
