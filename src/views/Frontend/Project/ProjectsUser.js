import { useState, useEffect } from "react";
import classnames from "classnames";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Progress,
  Media,
} from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";

import DemoNavbar from "../../../components/Navbars/DemoNavbar";
import { getProjectuser, deleteProject } from "../../../services/apiProject";
import { dark } from "@material-ui/core/styles/createPalette";

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

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getAllProject(config);
    const interval = setInterval(() => {
      getAllProject(config); // appel répété toutes les 10 secondes
    }, 2000);
    return () => clearInterval(interval); // nettoyage à la fin du cycle de vie du composant
  }, []);

  const getAllProject = async (config) => {
    const res = await getProjectuser(param.iduser, config)
      .then((res) => {
        setProjects(res.data.projects);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function moyenne(entier1, entier2) {
    const moyenne = (entier1 / entier2) * 100;
    return Math.floor(moyenne);
  }

  function getFirstTenWords(str) {
    // Supprimer les caractères de ponctuation et diviser la chaîne en mots
    const words = str.replace(/[^\w\s]|_/g, "").split(/\s+/);
    // Retourner les 10 premiers mots
    return words.slice(0, 10).join(" ");
  }
  function isMontantActuelGreaterOrEqual(project) {
    return (
      project.montant_actuel >= project.montant_Final ||
      project.numberOfPeople <= project.numberOfPeople_actuel 
    );
  }
  function isUpdated(project) {
    if(project.montant_actuel >= project.montant_Final ||
      project.numberOfPeople <= project.numberOfPeople_actuel )
    return "dark" 
    else return "success"
  }
  function isDeleted(project) {
    if(project.montant_actuel >= project.montant_Final ||
      project.numberOfPeople <= project.numberOfPeople_actuel )
    return "dark" 
    else return "danger"
  }
  return (
    <>
      <DemoNavbar />
      <main>
        <div className="position-relative bg-primary ">{/* shape Hero */}</div>
        <section className="section section-lg bg-gradient-default">
          <Container></Container>
          <Container className="pt-lg pb-300">
            <Row className="text-center justify-content-center">
              <Col lg="10">
                <h2 className="display-3 text-white">Build something</h2>
                <p className="lead text-white">
                  According to the National Oceanic and Atmospheric
                  Administration, Ted, Scambos, NSIDClead scentist, puts the
                  potentially record low maximum sea ice extent tihs year down
                  to low ice.
                </p>
              </Col>
            </Row>
            <div className="btn-wrapper">
              <Button
                className="btn-white btn-icon mb-3 mb-sm-0 ml-1"
                color="default"
                onClick={(e) => navigate(`/AddProjects`)}
              >
                <span className="btn-inner--icon mr-1">
                  <i className="fa fa-lightbulb-o" />
                </span>
                <span className="btn-inner--text">Create Your Project</span>
              </Button>
            </div>
            <Row className="justify-content-center">
              <Col lg="">
                <Row className="row-grid">
                  {projects.map((project) => (
                    <Col lg="4" className="py-4">
                      <Card
                        className="card-lift--hover shadow border-0"
                        key={project._id}
                      >
                        {!project.ecological ? (
                          <span
                            style={{
                              position: "absolute",
                              top: "5%",
                              left: "86%",
                              transform: "translate(-50%, -50%) ",
                              fontSize: "16px",
                              color: "white",
                              background: "red",
                              padding: "8px 8px",
                              borderRadius: "8px",
                            }}
                          >
                            Not_Ecological
                          </span>
                        ) : (
                          <span
                            style={{
                              position: "absolute",
                              top: "5%",
                              left: "86%",
                              transform: "translate(-50%, -50%)",
                              fontSize: "16px",
                              color: "white",
                              background: "green",
                              padding: "8px 8px",
                              borderRadius: "8px",
                            }}
                          >
                            ecological
                          </span>
                        )}
                        {project.verified ? (
                          <span
                            style={{
                              position: "absolute",
                              top: "5%",
                              left: "10%",
                              transform: "translate(-50%, -50%) ",
                              fontSize: "16px",
                              color: "white",
                              background: "#3c3c3c  ",
                              padding: "8px 8px",
                              borderRadius: "8px",
                            }}
                          >
                            finish
                          </span>
                        ) : (
                          <span
                            style={{
                              position: "absolute",
                              top: "5%",
                              left: "10%",
                              transform: "translate(-50%, -50%)",
                              fontSize: "16px",
                              color: "white",
                              background: "green",
                              padding: "8px 8px",
                              borderRadius: "8px",
                            }}
                          >
                            {moyenne(
                              project.montant_actuel,
                              project.montant_Final
                            )}
                            %
                          </span>
                        )}
                        <CardBody className="py-5">
                          {/* <div className="icon icon-shape icon-shape-danger rounded-circle mb-4"> */}
                          <div className=" icon-shape rounded-circle mb-4">
                            {/* <i className="ni ni-check-bold" /> */}
                            <Media className="align-items-center justify-content-end">
                              <a className="avatar ml-9">
                                <img
                                  alt="..."
                                  src={`http://localhost:5000/images/${project.image_project}`}
                                  style={{
                                    width: "250%",
                                    height: "auto",
                                    display: "block",
                                    margin: "10 auto",
                                  }}
                                />
                              </a>
                              <Media>
                                <span className="mb-0 text-sm"></span>
                              </Media>
                            </Media>
                          </div>
                          <h6 className=" display-2 text-dark text-capitalize font-weight-bold ">
                            {project.title}
                          </h6>
                          <p className="heading mt-2 ml-4 ">
                            {getFirstTenWords(project.description)}
                            {project.description.length >= 11 ? (
                              <botton
                                onClick={(e) =>
                                  navigate(
                                    `/Projects_details/${project._id}/${project.creator._id}`
                                  )
                                }
                              >
                                ...
                                <i
                                  class="fa fa-sort-desc"
                                  aria-hidden="true"
                                ></i>
                              </botton>
                            ) : (
                              ""
                            )}
                          </p>
                          <div className="font-weight-bold">
                            Domain :
                            <Badge color="success" pill className="mr-5 ml-2">
                              {project.domaine}
                            </Badge>
                            Goal :
                            <Badge color="warning" pill className="ml-2">
                              {project.goal}
                            </Badge>
                          </div>
                          <div className="progress-wrapper">
                            <div className="progress-info">
                              <div className="progress-label">
                                <span>
                                  Task completed : .
                                  {moyenne(
                                    project.montant_actuel,
                                    project.montant_Final
                                  )}
                                  %
                                </span>
                              </div>
                              <div className="progress-percentage">
                                <span>
                                  {project.montant_actuel}/
                                  {project.montant_Final}
                                  <i className="fa fa-usd mr-2 ml-2" />
                                </span>
                              </div>
                            </div>
                            <Progress
                              max={project.montant_Final}
                              value={project.montant_actuel}
                              color="default"
                            />
                            {project.numberOfPeople_actuel}/
                            {project.numberOfPeople}
                            <i className="fa fa-users mr-2 ml-2" />
                          </div>

                          {/* <Button
                            className="btn-1 mt-4"
                            color="primary"
                            outline
                            type="button"
                            onClick={(e) =>
                              navigate(
                                `/Projects_details/${project._id}/${project.creator}`
                              )
                            }
                          >
                            <i class="fa fa-eye mr-2" aria-hidden="true"></i>
                            More Details
                          </Button> */}
                          <Button
                            disabled={isMontantActuelGreaterOrEqual(project)}
                            className="btn-1 ml-1 mt-4"
                            color={ isUpdated(project) }
                            outline
                            type="button"
                            onClick={(e) =>
                              navigate(`/UpdateProject/${project._id}`)
                            }
                          >
                            <i class="fa fa-cubes mr-2" aria-hidden="true"></i>
                            updateProject
                          </Button>
                          <Button
                             disabled={isMontantActuelGreaterOrEqual(project)}
                            className="btn-1 ml-1 mt-4"
                            color={isDeleted(project) }
                            outline
                            type="button"
                            onClick={(e) => deleteProject(project._id, config)}
                          >
                            <i class="fa fa-cubes mr-2" aria-hidden="true"></i>
                            Delete
                          </Button>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
                  {/* <Col lg="4">
                    <Card className="card-lift--hover shadow border-0">
                      <CardBody className="py-5">
                        <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                          <i className="ni ni-istanbul" />
                        </div>
                        <h6 className="text-success text-uppercase">
                          Build Something
                        </h6>
                        <p className="description mt-3">
                          Argon is a great free UI package based on Bootstrap 4
                          that includes the most important components and
                          features.
                        </p>
                        <div>
                          <Badge color="success" pill className="mr-1">
                            business
                          </Badge>
                          <Badge color="success" pill className="mr-1">
                            vision
                          </Badge>
                          <Badge color="success" pill className="mr-1">
                            success
                          </Badge>
                        </div>
                        <Button
                          className="mt-4"
                          color="success"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Learn more
                        </Button>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="4">
                    <Card className="card-lift--hover shadow border-0">
                      <CardBody className="py-5">
                        <div className="icon icon-shape icon-shape-warning rounded-circle mb-4">
                          <i className="ni ni-planet" />
                        </div>
                        <h6 className="text-warning text-uppercase">
                          Prepare Launch
                        </h6>
                        <p className="description mt-3">
                          Argon is a great free UI package based on Bootstrap 4
                          that includes the most important components and
                          features.
                        </p>
                        <div>
                          <Badge color="warning" pill className="mr-1">
                            marketing
                          </Badge>
                          <Badge color="warning" pill className="mr-1">
                            product
                          </Badge>
                          <Badge color="warning" pill className="mr-1">
                            launch
                          </Badge>
                        </div>
                        <Button
                          className="mt-4"
                          color="warning"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Learn more
                        </Button>
                      </CardBody>
                    </Card>
                  </Col> */}
                </Row>
              </Col>
            </Row>
            <Row className="row-grid mt-5">
              <Col lg="4">
                <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                  <i className="ni ni-settings text-primary" />
                </div>
                <h5 className="text-white mt-3">Building tools</h5>
                <p className="text-white mt-3">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </Col>
              <Col lg="4">
                <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                  <i className="ni ni-ruler-pencil text-primary" />
                </div>
                <h5 className="text-white mt-3">Grow your market</h5>
                <p className="text-white mt-3">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </Col>
              <Col lg="4">
                <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                  <i className="ni ni-atom text-primary" />
                </div>
                <h5 className="text-white mt-3">Launch time</h5>
                <p className="text-white mt-3">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </Col>
            </Row>
          </Container>
          {/* SVG separator */}
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon className="fill-white" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
        </section>
      </main>
    </>
  );
}
