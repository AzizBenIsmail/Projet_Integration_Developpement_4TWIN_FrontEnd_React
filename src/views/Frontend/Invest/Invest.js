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
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

import DemoNavbar from "../../../components/Navbars/DemoNavbar";
import { getInvests } from "../../../services/apiInvest";

export default function Invest() {
  const navigate = useNavigate();
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
    const res = await getInvests(config)
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
  return (
    <>
      <DemoNavbar />
      <main>
        <div className="position-relative bg-primary ">{/* shape Hero */}</div>
        <section className="section section-lg bg-gradient-default">
          <Container></Container>
          <Container className="pt-lg pb-10">
            <Row className="text-center justify-content-center">
              <Col lg="10">
                <h2 className="display-3 text-white"> <img
                style={{ width: "100px", height: "100px" }}
                alt="..."
                src={require("assets/investissement.png")}
              />Your Invest</h2>
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
            <div className="btn-wrapper">
                      <Button
                        className="btn-icon mb-3 mb-sm-0"
                        color="info"
                        onClick={(e) =>
                          navigate(`/ProjectsUser`)
                        }
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
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
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
