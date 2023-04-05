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
import Cookies from 'js-cookie';

import DemoNavbar from "../../../components/Navbars/DemoNavbar";
import { getInvestUser,deleteInvest } from "../../../services/apiInvest";

export default function InvestUser() {
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
  const [invests, setInvests] = useState([]);

  useEffect(() => {
    getAllInvest(config);
    const interval = setInterval(() => {
      getAllInvest(config); // appel répété toutes les 10 secondes
    }, 5000);
    return () => clearInterval(interval); // nettoyage à la fin du cycle de vie du composant
  }, []);

  const getAllInvest = async (config) => {
    const res = await getInvestUser(param.idUser,config)
      .then((res) => {
        setInvests(res.data.invests);
        console.log(res.data.invests);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function moyenne(entier1, entier2) {
    const moyenne = entier1 / entier2;
    return moyenne;
  }

  function getFirstTenWords(str) {
    // Supprimer les caractères de ponctuation et diviser la chaîne en mots
    const words = str.replace(/[^\w\s]|_/g, "").split(/\s+/);

    // Retourner les 10 premiers mots
    return words.slice(0, 10).join(" ");
  }
  const Delete = async (id,config) => {
    const res = await deleteInvest(id,config)
      .then((res) => { getAllInvest(config);
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
                <h2 className="display-3 text-white">Your Invest</h2>
                <p className="lead text-white">
                  <p class="font-italic">
                    Here are a few pieces of advice to keep in mind when
                    investing:
                  </p>

                  <p class="font-weight-bold">
                    Start early | Diversify your portfolio |Invest for the
                    long-term | Keep your emotions in check |Invest in what you
                    know | Stay informed
                  </p>

                  <p class="font-italic">
                    Remember, investing involves risk and there is no guarantee
                    of returns. Always consult with a financial advisor before
                    making any investment decisions.
                  </p>
                </p>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col>
                <Row className="row-grid">
                  {invests.map((Invest) => (
                    <Col lg="4" className="py-4">
                      <Card
                        className="card-lift--hover shadow border-0"
                        key={Invest._id}
                      >
                        <CardBody className="py-5">
                          {/* <div className="icon icon-shape icon-shape-danger rounded-circle mb-4"> */}
                          <h6 className=" display-2 text-dark text-capitalize font-weight-bold ">
                            {Invest.titre}
                          </h6>
                          <p className="heading mt-2 ml-4 ">{Invest.message}</p>
                          <div className="font-weight-bold">
                            montant :
                            <Badge color="warning" pill className="ml-2">
                              {Invest.montant}
                            </Badge> <br></br>
                            project :
                            <Badge color="success" pill className="ml-2">
                            {Invest.project.title}
                            <img
                                  alt="..."
                                  src={`http://localhost:5000/images/${Invest.project.image_project}
                                  `}
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                  }}/>
                            </Badge>
                          </div>
                          {/* <div className="progress-wrapper">
                            <div className="progress-info">
                              <div className="progress-label">
                                <span>
                                  Task completed
                                  {moyenne(
                                    project.montant_Final,
                                    project.montant_actuel
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
                          </div> */}
                          <Button
                            className="btn-1 ml-1 mt-4"
                            color="success"
                            outline
                            type="button"
                            onClick={(e) =>
                              navigate(
                                `/Projects_details/${Invest.project._id}/${Invest.project.creator}`
                              )
                            }
                          >
                            <i class="fa fa-cubes mr-2" aria-hidden="true"></i>
                            Show Project
                          </Button>
                          <Button
                            className="btn-1 ml-1 mt-4"
                            color="success"
                            outline
                            type="button"
                            onClick={(e) => Delete(Invest._id,config) }
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
