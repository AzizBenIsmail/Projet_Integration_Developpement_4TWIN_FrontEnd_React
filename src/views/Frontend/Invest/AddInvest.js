import { useState, useEffect } from "react";
import classnames from "classnames";
import { addInvest } from "../../../services/apiInvest";
import axios from "axios";
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
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import Cookies from 'js-cookie';

import DemoNavbar from "../../../components/Navbars/DemoNavbar";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddInvest() {
  const navigate = useNavigate();
  const param = useParams();
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
    const [InvestNotif, setInvestNotif] = useState(false);

  const [Invest, setInvest] = useState({
    title: "",
    message: "",
    montant: 0
  });
  const handlechange = (e) => {
    setInvest({ ...Invest, [e.target.name]: e.target.value });
    console.log(Invest);  console.log(param.idUser,param.idProject);

  };

  const add = async (e) => {
    const {
    title, 
    message, 
    montant, 
    } = Invest;
    try{
    const res = await addInvest(Invest, param.idUser,param.idProject,config)
      if(res.status === 200)
      {
        toast.success("Nous sommes heureux de vous informer que votre investissement a été traité avec succès. !", { autoClose: 2000, position: "top-center" });      }
        delayFunction() 

      }
      catch(error){
        console.log(error.response.data.message);
      };
  };
  function delayFunction() {
    setTimeout(function() {
      navigate(`/landing-page`)
        }, 2000); // 3000 ms = 3 secondes
  }
  return (
    <>
      <DemoNavbar />
      <ToastContainer />
      <main>
        <div className="position-relative bg-primary ">{/* shape Hero */}</div>
        <section className="section section-lg bg-gradient-default">
          <Container className="pt-lg-7">
            <Row className="justify-content-center">
              <Col lg="5">
                {" "}
                <div className="ml-9 text-success font-weight-bold">
                  Invest
                </div>
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5">
                    <Form>
                      
                      <Form.Group>
                        <Form.Label>message :</Form.Label>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Form.Control
                            placeholder="message"
                            type="text"
                            name="message"
                            onChange={(e) => handlechange(e)}
                          />
                        </InputGroup>
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>amount to invest :</Form.Label>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-image" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Form.Control
                          min={0}
                            placeholder="amount to invest"
                            name="montant"
                            type="number"
                            onChange={(e) => handlechange(e)}
                          />
                        </InputGroup>
                      </Form.Group>

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
                          Invest
                        </Button>
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
}
