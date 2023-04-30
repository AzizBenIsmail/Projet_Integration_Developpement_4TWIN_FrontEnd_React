import { useState, useEffect } from "react";
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
import { getProjects, getProjectsValider } from "../../../services/apiProject";
import Cookies from "js-cookie";
import { getUserAuth } from "../../../services/apiUser.js";
import DemoNavbar from "../../../components/Navbars/DemoNavbar";
import "../../../assets/css.css";

export default function Landing() {
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
  const navigate = useNavigate();
  const [user, setuser] = useState([]);
  const [ProjectValiders, setProjectValider] = useState([]);
  const param = useParams();

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getAllProject(config);
    getUserFunction(config);
    getAllProjectValider(config);

    const interval = setInterval(() => {
      getAllProject(config); // appel répété toutes les 10 secondes
      getUserFunction(config);
      getAllProjectValider(config);
    }, 2000);
    return () => clearInterval(interval); // nettoyage à la fin du cycle de vie du composant
  }, []);

  const getAllProject = async (config) => {
    const res = await getProjects(config)
      .then((res) => {
        setProjects(res.data.projects);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllProjectValider = async (config) => {
    const res = await getProjectsValider(config)
      .then((res) => {
        setProjectValider(res.data.projects);
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
    return words.slice(0, 9).join(" ");
  }
  function isMontantActuelGreaterOrEqual(project) {
    return (
      project.montant_actuel >= project.montant_Final ||
      project.numberOfPeople <= project.numberOfPeople_actuel ||
      project.creator == user._id
    );
  }

  function isGreaterOrEqual(project) {
    if (project.montant_actuel >= project.montant_Final)
      return "py-5 icon-shape-success";
    else return "py-5 ";
  }
  const getUserFunction = async (config) => {
    const res = await getUserAuth(param.id, config)
      .then((res) => {
        setuser(res.data.user);
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <DemoNavbar />
      <main>
        <div className="position-relative bg-primary ">
          {/* shape Hero */}
          <section className="section section-lg section-shaped pb-250">
            <div className="shape shape-style-1 shape-default" />
            <div class="car">
              <Container className="py-lg-md d-flex">
                <div className="col px-0">
                  <Row>
                    <Col lg="16 ">
                      <br></br>
                      <br></br>
                      <h1 className="display-3 text-white">
                      <img
                style={{ width: "150px", height: "100px" }}
                alt="..."
                src={require("assets/planete-terre.png")}
              />
                        Support the Ecological Project in Africa
                        <span>
                          "Empower Your Dreams: Join Our Crowdfunding Community
                          Today!"
                        </span>
                      </h1>
                      <p className="lead text-white">
                        Welcome to the crowdfunding page dedicated to the
                        ecological project in Africa. This project aims to
                        improve the living conditions of rural communities in
                        Africa while preserving the environment..
                      </p>
                      <div className="btn-wrapper">
                        <Button
                          className="btn-icon mb-3 mb-sm-0"
                          color="info"
                          onClick={(e) => navigate(`/ProjectsUser`)}
                        >
                          <span className="btn-inner--icon mr-1">
                            <i className="ni ni-settings" />
                          </span>
                          <span className="btn-inner--text">
                            Manage you Project
                          </span>
                        </Button>
                        <Button
                          className="btn-white btn-icon mb-3 mb-sm-0 ml-1"
                          color="default"
                          onClick={(e) => navigate(`/AddProjects`)}
                        >
                          <span className="btn-inner--icon mr-1">
                            <i className="fa fa-lightbulb-o" />
                          </span>
                          <span className="btn-inner--text">
                            Create Your Project
                          </span>
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Container>
            </div>

            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
          {/* 1st Hero Variation */}
        </div>
        <section className="section section-lg pt-lg-0 mt--200">
          <Container>
            <Row className="justify-content-center">
              <Col lg="12">
                <Row className="row-grid">
                  {projects.map((project) => (
                    <Col lg="4" className="py-4">
                      <Card
                        className="card-lift--hover shadow border-0"
                        key={project._id}
                      >
                        {project.verified ? (
                          <span
                            style={{
                              position: "absolute",
                              top: "5%",
                              left: "86%",
                              transform: "translate(-50%, -50%) ",
                              fontSize: "16px",
                              color: "white",
                              background: "grey",
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
                            left: "86%",
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
                        <CardBody className={isGreaterOrEqual(project)}>
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
                          <p className="heading mt-2 ml-4 text-dark">
                            {getFirstTenWords(project.description)}
                            {project.description.length >= 10 ? (
                              <botton
                                onClick={(e) =>
                                  navigate(
                                    `/Projects_details/${project._id}/${project.creator}`
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
                          <div className="font-weight-bold text-dark">
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
                              <div className="progress-label  " >
                                <span>
                                  Task completed : |
                                  {moyenne(
                                    project.montant_actuel,
                                    project.montant_Final
                                  )}
                                  %
                                </span>
                              </div>
                              <div className="progress-percentage " >
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
                          <Button
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
                          </Button>
                          <Button
                            disabled={isMontantActuelGreaterOrEqual(project)}
                            className="btn-1 ml-1 mt-4"
                            color="success"
                            outline
                            type="button"
                            onClick={(e) =>
                              navigate(`/AddInvest/${project._id}`)
                            }
                          >
                            <i class="fa fa-cubes mr-2" aria-hidden="true"></i>
                            Invest
                          </Button>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section section-lg bg-gradient-default">
          <Container>
            <Row className="row-grid align-items-center">
              <Col className="order-lg-2 ml-lg-auto" md="6">
                <div className="position-relative pl-md-5">
                  <img
                    alt="..."
                    className="img-center img-fluid"
                    src={require("assets/img/brand/logo.png")}
                  />
                </div>
              </Col>
              <Col className="order-lg-1" lg="6">
                <div className="d-flex px-3">
                  <div>
                    <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                      <i className="ni ni-building text-primary" />
                    </div>
                  </div>
                  <div className="pl-4 ">
                    <h4 className="display-3 text-white">Project Valider</h4>
                    <p className="text-white">
                      The Arctic Ocean freezes every winter and much of the
                      sea-ice then thaws every summer, and that process will
                      continue whatever.
                    </p>
                  </div>
                </div>
                {ProjectValiders.map((ProjectValider) => (
                  <Card className="shadow shadow-lg--hover mt-3 ">
                    <CardBody key={ProjectValider._id}>
                      <div className="d-flex px-3 ">
                        <div>
                          <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                            <img
                              alt="..."
                              src={`http://localhost:5000/images/${ProjectValider.image_project}`}
                              style={{
                                width: "300%",
                                height: "auto",
                                display: "block",
                                margin: "10 auto",
                              }}
                            />{" "}
                          </div>
                        </div>
                        <div className="pl-4">
                          <h5 className="display-4 text-success">
                            {ProjectValider.title}
                          </h5>
                          <p>{getFirstTenWords(ProjectValider.description)}
                            {ProjectValider.description.length >= 10 ? (
                              <botton
                                onClick={(e) =>
                                  navigate(
                                    `/Projects_details/${ProjectValider._id}/${ProjectValider.creator}`
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
                            )}</p>
                          <div className="font-weight-bold">
                            Domain :
                            <Badge color="success" pill className="mr-5 ml-2">
                              {ProjectValider.domaine}
                            </Badge>
                            Goal :
                            <Badge color="warning" pill className="ml-2">
                              {ProjectValider.goal}
                            </Badge>
                          </div>
                          <Button
                            className="btn-1 mt-4"
                            color="primary"
                            outline
                            type="button"
                            onClick={(e) =>
                              navigate(
                                `/Projects_details/${ProjectValider._id}/${ProjectValider.creator}`
                              )
                            }
                          >
                            <i class="fa fa-eye mr-2" aria-hidden="true"></i>
                            More Details
                          </Button>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}

                {/* <Card className="shadow shadow-lg--hover mt-5">
                  <CardBody>
                    <div className="d-flex px-3">
                      <div>
                        <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                          <i className="ni ni-active-40" />
                        </div>
                      </div>
                      <div className="pl-4">
                        <h5 className="title text-warning">
                          Modular Components
                        </h5>
                        <p>
                          The Arctic Ocean freezes every winter and much of the
                          sea-ice then thaws every summer, and that process will
                          continue whatever.
                        </p>
                        <a
                          className="text-warning"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Learn more
                        </a>
                      </div>
                    </div>
                  </CardBody>
                </Card> */}
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
        {/* <section className="section section-lg">
          <Container>
            <Row className="justify-content-center text-center mb-lg">
              <Col lg="8">
                <h2 className="display-3">The amazing Team</h2>
                <p className="lead text-muted">
                  According to the National Oceanic and Atmospheric
                  Administration, Ted, Scambos, NSIDClead scentist, puts the
                  potentially record maximum.
                </p>
              </Col>
            </Row>
            <Row>
              <Col className="mb-5 mb-lg-0" lg="3" md="6">
                <div className="px-4">
                  <img
                    alt="..."
                    className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                    src={require("assetsFrontOffice/img/theme/team-1-800x800.jpg")}
                    style={{ width: "200px" }}
                  />
                  <div className="pt-4 text-center">
                    <h5 className="title">
                      <span className="d-block mb-1">Ryan Tompson</span>
                      <small className="h6 text-muted">Web Developer</small>
                    </h5>
                    <div className="mt-3">
                      <Button
                        className="btn-icon-only rounded-circle"
                        color="warning"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fa fa-twitter" />
                      </Button>
                      <Button
                        className="btn-icon-only rounded-circle ml-1"
                        color="warning"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fa fa-facebook" />
                      </Button>
                      <Button
                        className="btn-icon-only rounded-circle ml-1"
                        color="warning"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fa fa-dribbble" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
              <Col className="mb-5 mb-lg-0" lg="3" md="6">
                <div className="px-4">
                  <img
                    alt="..."
                    className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                    src={require("assetsFrontOffice/img/theme/team-2-800x800.jpg")}
                    style={{ width: "200px" }}
                  />
                  <div className="pt-4 text-center">
                    <h5 className="title">
                      <span className="d-block mb-1">Romina Hadid</span>
                      <small className="h6 text-muted">
                        Marketing Strategist
                      </small>
                    </h5>
                    <div className="mt-3">
                      <Button
                        className="btn-icon-only rounded-circle"
                        color="primary"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fa fa-twitter" />
                      </Button>
                      <Button
                        className="btn-icon-only rounded-circle ml-1"
                        color="primary"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fa fa-facebook" />
                      </Button>
                      <Button
                        className="btn-icon-only rounded-circle ml-1"
                        color="primary"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fa fa-dribbble" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
              <Col className="mb-5 mb-lg-0" lg="3" md="6">
                <div className="px-4">
                  <img
                    alt="..."
                    className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                    src={require("assetsFrontOffice/img/theme/team-3-800x800.jpg")}
                    style={{ width: "200px" }}
                  />
                  <div className="pt-4 text-center">
                    <h5 className="title">
                      <span className="d-block mb-1">Alexander Smith</span>
                      <small className="h6 text-muted">UI/UX Designer</small>
                    </h5>
                    <div className="mt-3">
                      <Button
                        className="btn-icon-only rounded-circle"
                        color="info"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fa fa-twitter" />
                      </Button>
                      <Button
                        className="btn-icon-only rounded-circle ml-1"
                        color="info"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fa fa-facebook" />
                      </Button>
                      <Button
                        className="btn-icon-only rounded-circle ml-1"
                        color="info"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fa fa-dribbble" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
              <Col className="mb-5 mb-lg-0" lg="3" md="6">
                <div className="px-4">
                  <img
                    alt="..."
                    className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                    src={require("assetsFrontOffice/img/theme/team-4-800x800.jpg")}
                    style={{ width: "200px" }}
                  />
                  <div className="pt-4 text-center">
                    <h5 className="title">
                      <span className="d-block mb-1">John Doe</span>
                      <small className="h6 text-muted">Founder and CEO</small>
                    </h5>
                    <div className="mt-3">
                      <Button
                        className="btn-icon-only rounded-circle"
                        color="success"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fa fa-twitter" />
                      </Button>
                      <Button
                        className="btn-icon-only rounded-circle ml-1"
                        color="success"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fa fa-facebook" />
                      </Button>
                      <Button
                        className="btn-icon-only rounded-circle ml-1"
                        color="success"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fa fa-dribbble" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section section-lg pt-0">
          <Container>
            <Card className="bg-gradient-warning shadow-lg border-0">
              <div className="p-5">
                <Row className="align-items-center">
                  <Col lg="8">
                    <h3 className="text-white">
                      We made website building easier for you.
                    </h3>
                    <p className="lead text-white mt-3">
                      I will be the leader of a company that ends up being worth
                      billions of dollars, because I got the answers. I
                      understand culture.
                    </p>
                  </Col>
                  <Col className="ml-lg-auto" lg="3">
                    <Button
                      block
                      className="btn-white"
                      color="default"
                      href="https://www.creative-tim.com/product/argon-design-system-react?ref=adsr-landing-page"
                      size="lg"
                    >
                      Download React
                    </Button>
                  </Col>
                </Row>
              </div>
            </Card>
          </Container>
        </section>
        <section className="section section-lg bg-gradient-default">
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
        <section className="section section-lg pt-lg-0 section-contact-us">
          <Container>
            <Row className="justify-content-center mt--300">
              <Col lg="8">
                <Card className="bg-gradient-secondary shadow">
                  <CardBody className="p-lg-5">
                    <h4 className="mb-1">Want to work with us?</h4>
                    <p className="mt-0">
                      Your project is very important to us.
                    </p>
                    <FormGroup
                      className={classnames("mt-5", {
                        focused: nameFocused,
                      })}
                    >
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-user-run" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Your name"
                          type="text"
                          onFocus={(e) => this.setState({ nameFocused: true })}
                          onBlur={(e) => this.setState({ nameFocused: false })}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup
                      className={classnames({
                        focused: emailFocused,
                      })}
                    >
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Email address"
                          type="email"
                          onFocus={(e) => this.setState({ emailFocused: true })}
                          onBlur={(e) => this.setState({ emailFocused: false })}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup className="mb-4">
                      <Input
                        className="form-control-alternative"
                        cols="80"
                        name="name"
                        placeholder="Type a message..."
                        rows="4"
                        type="textarea"
                      />
                    </FormGroup>
                    <div>
                      <Button
                        block
                        className="btn-round"
                        color="default"
                        size="lg"
                        type="button"
                      >
                        Send Message
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section> */}
      </main>
    </>
  );
}
