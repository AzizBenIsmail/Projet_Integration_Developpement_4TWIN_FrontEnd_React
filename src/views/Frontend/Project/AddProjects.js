import { useState, useEffect } from "react";
import classnames from "classnames";
import { addProject } from "../../../services/apiProject";
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

import DemoNavbar from "../../../components/Navbars/DemoNavbar";

export default function Landing() {
  const navigate = useNavigate();
  const param = useParams();

  let formData = new FormData();
  const [image, setImage] = useState();
  const [Project, setProject] = useState({
    title: "",
    description: "",
    domaine: "",
    goal: "",
    numberOfPeople: "",
    montant_Final: "",
    location: "",
    image_project: "",
    duration: "",
  });
  const handlechange = (e) => {
    setProject({ ...Project, [e.target.name]: e.target.value });
    console.log(Project);
  };
  const handlechangeFile = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };
  const add = async (e) => {
    formData.append("title", Project.title);
    formData.append("description", Project.description);
    formData.append("domaine", Project.domaine);
    formData.append("goal", Project.goal);
    formData.append("numberOfPeople", Project.numberOfPeople);
    formData.append("montant_Final", Project.montant_Final);
    formData.append("location", Project.location);
    formData.append("Duration", Project.duration);
    formData.append("image_project", image);
    const res = await addProject(formData, "641cdeee29a97f7a08bd9a42")
      .then(navigate("/landing-page"))
      .catch((error) => {
        console.log(error.response.data.message);
      });
    // const res = await axios.post(
    //   "http://localhost:5000/project/641cdeee29a97f7a08bd9a42",
    //   formData,
    //   {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   }
    // );
    console.log("123", res.data);
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
                <div className="ml-9 text-success font-weight-bold">
                  Create Your Project
                </div>
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5">
                    <Form role="form" enctype="multipart/form-data">
                      <Form.Group>
                        <Form.Label>title projet :</Form.Label>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-circle-08" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Form.Control
                            placeholder="title projet"
                            type="text"
                            name="title"
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
                            name="description"
                            onChange={(e) => handlechange(e)}
                          />
                        </InputGroup>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Domaine :</Form.Label>
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

                      <Form.Label>Goal :</Form.Label>
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
                        <Form.Label>number Of People :</Form.Label>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-image" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Form.Control
                            placeholder="numberOfPeople"
                            name="numberOfPeople"
                            type="number"
                            onChange={(e) => handlechange(e)}
                          />
                        </InputGroup>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>final amount :</Form.Label>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-image" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Form.Control
                            placeholder="final amount"
                            name="montant_Final"
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
                            type="text"
                            onChange={(e) => handlechange(e)}
                          />
                        </InputGroup>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Duration :</Form.Label>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-image" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Form.Control
                            placeholder="duration"
                            name="duration"
                            type="date"
                            onChange={(e) => handlechange(e)}
                          />
                        </InputGroup>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>picture :</Form.Label>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-image" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Form.Control
                            placeholder="image_project"
                            name="image_project"
                            type="file"
                            onChange={(e) => handlechangeFile(e)}
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
      </main>
    </>
  );
}
