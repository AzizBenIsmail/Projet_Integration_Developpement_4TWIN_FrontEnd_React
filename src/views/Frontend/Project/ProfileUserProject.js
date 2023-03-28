import { Button, Card, Container, Row, Col, Progress } from "reactstrap";
import { faMale, faFemale } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { updateUser, getUser, addUser } from "../../../services/apiUser";
import { useNavigate, useParams } from "react-router-dom";
import { differenceInYears } from "date-fns";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getProjectuser } from "../../../services/apiProject";

import DemoNavbar from "../../../components/Navbars/DemoNavbar";

export default function ProfileUserProject() {
  const navigate = useNavigate();

  const param = useParams();
  const [friendCount, setFriendCount] = useState(22);
  const [photoCount, setPhotoCount] = useState(10);
  const [commentCount, setCommentCount] = useState(89);
  const [projects, setProjects] = useState([]);

  const [user, setUser] = useState({
    _id: param.id,
    username: "",
    first_Name: "",
    last_Name: "",
    email: "",
    password: "",
    dateOfBirth: "",
    phoneNumber: 0,
    gender: "",
    // userType: "",
    address: "",
    image_user: "",
  });
  const { _id, username, first_Name, last_Name, email, phoneNumber, address } =
    user;

  useEffect(() => {
    getUserFunction();
    getoneProject();
  }, []);

  const getUserFunction = async () => {
    const response = await getUser(param.id);
    setUser(response.data.user);
  };

  const getoneProject = async () => {
    const res = await getProjectuser(param.id)
      .then((res) => {
        setProjects(res.data.projects);
        console.log(res.data.projects);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const AfficherDateDeNaissance = (dateOfBirth) => {
    const date = moment(dateOfBirth);
    const mois = date.format("MM");
    const jour = date.format("DD");
    const annee = date.format("YYYY");
    return "" + annee + "/" + mois + "/" + jour + "";
  };

  const genderIcon = (gender) => {
    if (gender === "Male") {
      return <FontAwesomeIcon icon={faMale} size="2x" color="#007bff" />;
    } else if (gender === "Female") {
      return <FontAwesomeIcon icon={faFemale} size="2x" color="#f54291" />;
    } else {
      return null;
    }
  };

  const Modifier = async (user) => {
    const result = window.confirm(
      "Are you sure you want to modify " + user.username + "?"
    );
    if (result) {
      //console.log(user);
      navigate(`/profile/${user._id}`);
    }
  };
  function countProject(arr) {
    if (arr === undefined) {
      return 0;
    }
    return arr.length;
  }
  function displayProjectElements(arr) {
    if (arr === undefined) {
      return 0;
    }
    for (let i = 0; i < arr.length; i++) {
      console.log(arr[i]);
    }
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

      <main className="profile-page">
        <section className="section-profile-cover section-shaped my-0">
          <div className="shape shape-style-1 shape-default alpha-4"></div>
          <div className="separator separator-bottom separator-skew">
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
          <div
            className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
            style={{
              minHeight: "600px",
              backgroundImage:
                "url(" +
                `http://localhost:5000/images/${user.image_user}` +
                ")",
              // "url(" + require("../../assets/img/theme/profile-cover.jpg") + ")",
              backgroundSize: "cover",
              backgroundPosition: "center top",
            }}
          >
            {/* Mask */}
            <span className="mask bg-gradient-default opacity-8" />
          </div>
        </section>
        <section className="section">
          <Container>
            <Card className="card-profile shadow mt--300">
              <div className="px-4">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={`http://localhost:5000/images/${user.image_user}`}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <div className="ml-8 mt-5">
                  <h1 className="text-capitalize ml-5">
                    {user.username}
                    <span className="font-weight-light">
                      |
                      {differenceInYears(
                        new Date(),
                        new Date(user.dateOfBirth)
                      )}
                    </span>
                  </h1>
                  <div>
                    <i className="ni education_hat mr-2" />
                    <h1>email :</h1> <p className="h3 ml-8">{user.email}</p>
                  </div>
                  <div className="h6 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    <h1>address:</h1>
                    {user.address ? (
                      <p className="h3 ml-8">{user.address}</p>
                    ) : (
                      <i class="fa fa-ban fa-3x  ml-8" aria-hidden="true"></i>
                    )}
                  </div>
                </div>
                <div className="text-capitalize font-weight-bold ml-4">
                  more information:
                </div>
                <div className="mt-2 border-top ">
                  <Row className="justify-content-center font-weight-bold">
                    <Col lg="9">
                      <h1>
                        <br />
                        gender : {genderIcon(user.gender)}
                      </h1>
                    </Col>
                  </Row>
                </div>
                <div className="text-capitalize font-weight-bold ml-4">
                  Project information:
                </div>
                <div className="mt-2 border-top ">
                  <Row className="justify-content-center">
                    <Col lg="9">
                      <h1>Project : {countProject(user.projects)}</h1>
                      {projects.map((project) => (
                        <Col lg="4" className="py-4" key={project._id}>
                          <table border={"2"}>
                            <thead>
                              <tr>
                                <th colspan="3">
                                  <Button
                                    type="button"
                                    onClick={(e) =>
                                      navigate(
                                        `/Projects_details/${project._id}/${project.creator._id}`
                                      )
                                    }
                                  >
                                    <i aria-hidden="true"></i>
                                    <h6 className=" display-4 text-dark text-capitalize font-weight-bold mr-9 ml-9">
                                      {project.title}
                                      <img
                                        alt="..."
                                        className="rounded-circle"
                                        src={`http://localhost:5000/images/${project.image_project}`}
                                        height="90"
                                        width="90"
                                      />
                                    </h6>
                                  </Button>
                                </th>
                                </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  number Of People :
                                  {project.numberOfPeople_actuel}
                                </td>
                                <td>
                                current amount : {project.montant_actuel}
                                </td>
                                <td>
                                Duration : {calculerDureeDeVie(project.created_at)}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </Col>
                      ))}
                    </Col>
                  </Row>
                </div>
                <div className="text-capitalize font-weight-bold ml-4">
                  Invest information:
                </div>
                <div className="mt-2 border-top ">
                  <Row className="justify-content-center">
                    <Col lg="9">
                      <h1>Invest : {countProject(user.invests)}</h1>
                    </Col>
                  </Row>
                </div>
              </div>
            </Card>
          </Container>
        </section>
      </main>
    </>
  );
}
