import { useState, useEffect } from "react";
import classnames from "classnames";
import { updateProject } from "../../../services/apiProject";
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
import { getProject } from "../../../services/apiProject";
import { differenceInYears } from "date-fns";

export default function Landing() {
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
  let formData = new FormData();
  const [Project, setProject] = useState({
    _id: param.id,
    title: "",
    description: "",
    domaine: "",
    goal: "",
    numberOfPeople: "",
    montant_Final: "",
    location: "",
    Duration: "",
    creator:""
  });
  const handlechange = (e) => {
    setProject({ ...Project, [e.target.name]: e.target.value });
    console.log(Project);
  };

  const add = async (e) => {
    const {
      _id,
      title,
      description,
      domaine,
      goal,
      montant_Final,
      location,
      Duration,
    } = Project;
    const res = await updateProject(Project,param.id,config).then(navigate(`/ProjectsUser`)).catch((error) => {
      console.log(error.response.data.message);
    });
  };
  // 
  useEffect(() => {
    getProjectFunction(config);
  }, []);

  const getProjectFunction = async (config) => {
    const response = await getProject(param.id,config);
    console.log(response.data.project);
    setProject(response.data.project);
  };
  return (
    <>
      <DemoNavbar />
      <main>
        <div className="position-relative bg-primary ">{/* shape Hero */}</div>
        <section className="section section-lg bg-gradient-default">
          <Container className="pt-lg-7">
            <Row className="justify-content-center">
              <Col lg="5"> <div className="ml-9 text-success font-weight-bold" >Manage Your Project</div>
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5">
                    <Form >
                      <Form.Group>
                        <Form.Label>Titre du projet :</Form.Label>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-circle-08" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Form.Control
                            placeholder="Titre du projet"
                            type="text"
                            name="title"
                            value={Project.title}
                            onChange={(e) => handlechange(e)}
                            label="Titre du projet"
                            aria-label="Titre du projet"
                          />
                        </InputGroup>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Description :</Form.Label>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Form.Control
                            placeholder="description"
                            type="text"
                            value={Project.description}
                            name="description"
                            onChange={(e) => handlechange(e)}
                          />
                        </InputGroup>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Domaine : {Project.domaine} </Form.Label>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open " />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Form.Check
                            type="radio"
                            label="earthly"
                            name="domaine"
                            value="earthly"
                            onChange={(e) => handlechange(e)}
                          />
                          <Form.Check
                            type="radio"
                            label="oceanic "
                            name="domaine"
                            value="oceanic "
                            onChange={(e) => handlechange(e)}
                          />
                          <Form.Check
                            type="radio"
                            label="information technology "
                            name="domaine"
                            value="informatique "
                            onChange={(e) => handlechange(e)}
                          />
                          <Form.Check
                            type="radio"
                            label="health and medicine  "
                            name="domaine"
                            value="health"
                            onChange={(e) => handlechange(e)}
                          />
                          <Form.Check
                            type="radio"
                            label="art and culture "
                            name="domaine"
                            value="Art&culture"
                            onChange={(e) => handlechange(e)}
                          />
                        </InputGroup>
                      </Form.Group>

                      <Form.Label>Goal : {Project.goal}</Form.Label>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-time-alarm" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <div>
                          <input
                            type="radio"
                            name="goal"
                            value="Social"
                            onChange={(e) => handlechange(e)}
                          />
                          <label>Social</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            name="goal"
                            value="Economy"
                            onChange={(e) => handlechange(e)}
                          />
                          <label>Economy</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            name="goal"
                            value="Environment"
                            onChange={(e) => handlechange(e)}
                          />
                          <label>Environment</label>
                        </div>
                      </InputGroup>
                      <Form.Group>
                        <Form.Label>Nombre de personnes :</Form.Label>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-image" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Form.Control
                            placeholder="numberOfPeople"
                            name="numberOfPeople"
                            value={Project.numberOfPeople}
                            type="number"
                            onChange={(e) => handlechange(e)}
                          />
                        </InputGroup>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Montant final :</Form.Label>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-image" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Form.Control
                            placeholder="montantFinal"
                            name="montant_Final"
                            value={Project.montant_Final}
                            type="number"
                            onChange={(e) => handlechange(e)}
                          />
                        </InputGroup>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Location :</Form.Label>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-image" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Form.Control
                            placeholder="location"
                            name="location"
                            value={Project.location}
                            type="text"
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
                          Valider
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
