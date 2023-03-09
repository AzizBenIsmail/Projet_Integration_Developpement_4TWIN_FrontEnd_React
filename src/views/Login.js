import { useState } from "react";
import { useNavigate } from'react-router-dom'
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import { LoginUser } from '../services/apiUser';
import { Button, Container, Form } from 'react-bootstrap'
import flatted from 'flatted';

export default function Login () {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [user, setUsers] = useState(
    {
        "email": "",
        "password": "",
    }
)
const handlechange = (e) => {
    console.log(e.target.value)
    setUsers({ ...user, [e.target.name]: e.target.value })
    console.log(user)

}

const Login = async (e) => {
    e.preventDefault();
    //const jsonString = flatted.stringify(user); 
    LoginUser(user)
    .then(()=>navigate('/landing-page'))
    .catch((e)=> console.log(e))
}
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
                    <div className="text-muted text-center mb-3">
                      <small>Sign in with</small>
                    </div>
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
                            src={require("assets/img/icons/common/github.svg").default}
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
                            src={require("assets/img/icons/common/google.svg").default}
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
                            <Form.Control placeholder="email" type="email" name='email' onChange={(e) => handlechange(e)} />
                          </InputGroup>
                        </Form.Group>
                        <Form.Group>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Form.Control placeholder="password" type="password" autoComplete="off" name='password' onChange={(e) => handlechange(e)} />
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
                          <Button className="mt-4" color="primary" type="button" onClick={(e)=>{console.log(e); Login(e)}}  >  Sign in </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                  <Row className="mt-3">
                    <Col xs="6">
                      <a
                        className="text-light"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <small>Forgot password?</small>
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
        <SimpleFooter />
      </>
    )
  }