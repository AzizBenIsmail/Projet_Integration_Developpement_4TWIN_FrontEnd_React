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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import Cookies from "js-cookie";

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
  const [message, setmessage] = useState();
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
    creator: "",
  });
  const handlechange = (e) => {
    setProject({ ...Project, [e.target.name]: e.target.value });
    console.log(Project);
  };
  function delayFunction() {
    setTimeout(function() {
      navigate(`/landing-page`)
        }, 2000); // 3000 ms = 3 secondes
  }
  const add = async (e) => {
    toast.success(
      "Votre modification est en cours de traitement. Veuillez ne pas paniquer si cette procédure prend un peu de temps. Votre description passe par une validation automatique par l\'IA.",
      { autoClose: 45000, position: "top-center" }
    );
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
    const res = await updateProject(Project, param.id, config)
      .then()
      .catch((error) => {
        console.log(error.response.data.message);
      });
      console.log(res.data);
      console.log(res.data.message);
      setmessage(res.data.message);
      if (res.data.message == undefined) {
        delayFunction();  
      }
  };
  //
  useEffect(() => {
    getProjectFunction(config);
  }, []);

  const getProjectFunction = async (config) => {
    const response = await getProject(param.id, config);
    console.log(response.data.project);
    setProject(response.data.project);
  };
  return (
    <>
      <DemoNavbar /> <ToastContainer />
      <main>
        <div className="position-relative bg-primary ">{/* shape Hero */}</div>
        <section className="section section-lg bg-gradient-default">
          <Container className="pt-lg-7">
            <Row className="justify-content-center">
              <Col lg="5">
                {" "}
                <div className="ml-9 text-success font-weight-bold">
                  Manage Your Project
                </div>
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5">
                    <Form>
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
                      {message === "title is already taken" ||
                        message === "title is a required field" ? (
                          <label style={{ color: "red" }}>
                            <i className="ni ni-fat-remove" />
                            title is already taken
                          </label>
                        ) : (
                          ""
                        )}
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
                        {message ===
                        "description must contain min 4 characters max 50 characters" ? (
                          <label style={{ color: "red" }}>
                            <i className="ni ni-fat-remove" />
                            description must contain min 4 characters max 50
                            characters
                          </label>
                        ) : (
                          ""
                        )}
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
                        {message ===
                        "The numberOfPeople must be a positive number max 100 min 10" ? (
                          <label style={{ color: "red" }}>
                            <i className="ni ni-fat-remove" />
                            The numberOfPeople must be a positive number min 10
                            max 100
                          </label>
                        ) : (
                          ""
                        )}
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
                        {message ===
                          "The montant_Final must be a positive number min 1000 dt" ||
                        'montant_Final must be a `number` type, but the final value was: `NaN` (cast from the value `""`).' ? (
                          <label style={{ color: "red" }}>
                            <i className="ni ni-fat-remove" />
                            "The montant_Final must be a positive number min
                            1000 dt"
                          </label>
                        ) : (
                          ""
                        )}
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
