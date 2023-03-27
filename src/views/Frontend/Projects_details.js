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
import Download from "../IndexSections/Download.js";
import { useNavigate, useParams } from "react-router-dom";

import DemoNavbar from "../../components/Navbars/DemoNavbar";
import { getProject } from "../../services/apiProject";
import { getUser } from "../../services/apiUser";

export default function Landing() {
  const navigate = useNavigate();
  const param = useParams();

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

  const [project, setProject] = useState([]);
  const [user, setuser] = useState([]);
  useEffect(() => {
    getoneProject(project);
    getCreator();
    // const interval = setInterval(() => {
    //   getoneProject();
    // }, 1000);
  }, []);
  const getoneProject = async () => {
    const res = await getProject(param.id)
      .then((res) => {
        setProject(res.data.project);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  async function getCreator(project) {
    const res = await getUser(project.creator)
      .then((res) => {
        setuser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function moyenne(entier1, entier2) {
    const moyenne = entier1 / entier2;
    return moyenne;
  }
  function calculerDureeDeVie(dateDeCreation) {
    const dateDeCreationObjet = new Date(dateDeCreation);
    const maintenant = new Date();
    const differenceEnMilliseconds =
      maintenant.getTime() - dateDeCreationObjet.getTime();
    const differenceEnSecondes = Math.floor(differenceEnMilliseconds / 1000);
    const differenceEnMinutes = Math.floor(differenceEnSecondes / 60);
    const differenceEnHeures = Math.floor(differenceEnMinutes / 60);
    const differenceEnJours = Math.floor(differenceEnHeures / 24);
    const differenceEnMois = Math.floor(differenceEnJours / 30);
    const differenceEnAnnees = Math.floor(differenceEnMois / 12);
    return `${differenceEnJours % 30} jours ${differenceEnHeures % 24} Heures ${
      differenceEnMinutes % 60
    } Minutes et ${differenceEnSecondes % 60} Seconds `;
  }

  return (
    <>
      <DemoNavbar />
      <main>
        <div className="position-relative bg-primary ">{/* shape Hero */}</div>
        <section className="section section-lg bg-gradient-default">
          <Container className="pt-lg pb-50">
            <Row className=" justify-content-right">
              <Col lg="10">
              <div class="d-flex align-items-center">
                  <div class="mr-1"></div>
                  <div class="mx-1">
                    <h2 className="display-3 text-white ml-5 ">
                      {project.title}
                    </h2>
                  </div>
                  <div className=" icon-shape rounded-circle mb-4">
                    {/* <i className="ni ni-check-bold" /> */}
                    <Media className="align-items-center justify-content-end ml-5">
                      <a className="avatar ml-9">
                        <img
                          alt="..."
                          src={`http://localhost:5000/images/${project.image_project}`}
                          style={{
                            width: "200px",
                            height: "200px",
                            display: "block",
                            margin: "10 auto",
                          }}
                        />
                      </a>
                    </Media>
                  </div>
                </div>
                <p className="lead text-white">{project.description}</p>
                <div className="font-weight-bold">
                  Domaine :
                  <Badge color="success" pill className="text-white mr-5 ml-2">
                    {project.domaine}
                  </Badge>
                  Goal :
                  <Badge color="warning" pill className="text-white  mr-5 ml-2">
                    {project.goal}
                  </Badge>
                  location :
                  <Badge color="info" pill className="text-white  mr-5 ml-2">
                    {project.location}
                  </Badge>
                  <br></br>
                  <div class="d-flex align-items-center">
                    <div class="mr-1">Duration</div>
                    <div class="mx-1">:</div>
                    <h2 className="text-white  mr-5 ml-2">
                      {calculerDureeDeVie(project.created_at)}
                    </h2>
                  </div>
                  <div class="d-flex align-items-center">
                    <div class="mr-1">montant_actuel</div>
                    <div class="mx-1">:</div>
                    <h2 className="text-white  mr-5 ml-2">
                      {project.montant_actuel} $
                    </h2>
                  </div>
                  <div class="d-flex align-items-center">
                    <div class="mr-1">Creator</div>
                    <div class="mx-1">:</div>
                    <h2 className="text-white  mr-5 ml-2">
                    {user.username} <img
                      className=" ml-8 "
                      src={`http://localhost:5000/images/${user.image_user}`}
                      style={{
                        width: "190px",
                        height: "190px",
                        display: "block",
                      }}
                    />
                    </h2>
                  </div>
                </div>

                <div className="progress-wrapper">
                  <div className="progress-info">
                    <div className="progress-label">
                      <span>
                        Task completed : .
                        {moyenne(project.montant_Final, project.montant_actuel)}
                        %
                      </span>
                    </div>
                    <div className="progress-percentage">
                      <span>
                        {project.montant_actuel}/{project.montant_Final}
                        <i className="fa fa-usd mr-2 ml-2" />
                      </span>
                    </div>
                  </div>
                  <Progress
                    max={project.montant_Final}
                    value={project.montant_actuel}
                    color="success"
                  />
                  {project.numberOfPeople_actuel}/{project.numberOfPeople}
                  <i className="fa fa-users mr-2 ml-2" />
                </div>
              </Col>
              <Button
                className="btn-1 ml-1 mt-4"
                color="success"
                outline
                type="button"
                onClick={(e) => e.preventDefault()}
              >
                Invest
              </Button>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
}
