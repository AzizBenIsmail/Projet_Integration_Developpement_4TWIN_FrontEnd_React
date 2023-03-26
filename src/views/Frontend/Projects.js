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
} from "reactstrap";
import Download from "../IndexSections/Download.js";
import { useNavigate } from "react-router-dom";

import DemoNavbar from "../../components/Navbars/DemoNavbar";
import { getProjects } from "../../services/apiProject";

export default function Landing() {
  const navigate = useNavigate();

  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);

  const handleNameFocus = () => {
    setNameFocused(true);
  };

  const handleNameBlur = () => {
    setNameFocused(false);
  };

  const handleEmailFocus = () => {
    setEmailFocused(true);
  };

  const handleEmailBlur = () => {
    setEmailFocused(false);
  };

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getAllProject();
    const interval = setInterval(() => {
      getAllProject(); // appel répété toutes les 10 secondes
    }, 10000);
    return () => clearInterval(interval); // nettoyage à la fin du cycle de vie du composant
  }, []);

  const getAllProject = async () => {
    const res = await getProjects()
      .then((res) => {
        console.log(res.data);
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
            <Row className="justify-content-center">
              <Col lg="12">
                <Row className="row-grid">
                  <Col lg="4">
                    <Card className="card-lift--hover shadow border-0">
                      <CardBody className="py-5">
                        <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                          <i className="ni ni-check-bold" />
                        </div>
                        <h6 className="text-primary text-uppercase">
                          Download Argon
                        </h6>
                        <p className="description mt-3">
                          Argon is a great free UI package based on Bootstrap 4
                          that includes the most important components and
                          features.
                        </p>
                        <div>
                          <Badge color="primary" pill className="mr-1">
                            design
                          </Badge>
                          <Badge color="primary" pill className="mr-1">
                            system
                          </Badge>
                          <Badge color="primary" pill className="mr-1">
                            creative
                          </Badge>
                        </div>
                        <Button
                          className="mt-4"
                          color="primary"
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
                  </Col>
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
