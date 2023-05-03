import { Button, Card, Container, Row, Col, Progress } from "reactstrap";
import { faMale, faFemale } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import {
  updateUser,
  getUser,
  addUser,
  getUserAuth,
} from "../../../services/apiUser";
import { useNavigate, useParams } from "react-router-dom";
import { differenceInYears } from "date-fns";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { getProjectuser } from "../../../services/apiProject";
import Cookies from "js-cookie";
import DemoNavbar from "../../../components/Navbars/DemoNavbar";
//import badgeImg from "./src/new.png";
import ProfileHeader from "./profile/header";
import ChatBox from "./profile/chat";

import { getEvaluation } from "../../../services/apiEvaluation";

import { getTBadge } from "../../../services/apiBadges";

export default function Profile() {
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

  const param = useParams();
  const [friendCount, setFriendCount] = useState(22);
  const [photoCount, setPhotoCount] = useState(10);
  const [commentCount, setCommentCount] = useState(89);
  const [projects, setProjects] = useState([]);
  const [evaluation, setEvaluation] = useState({
    usernameE: "", // Utiliser le même nom de propriété que dans localStorage
    xp: 0,
    lvl: 0,
  });
  const { usernameE, xp, lvl } = evaluation;

  const [badge, setBadge] = useState({
    usernameB: "", // Utiliser le même nom de propriété que dans localStorage
    badgeName: "",
    badgeDescription: "",
    date: "",
    badgeImg: "",
  });
  const { usernameB, badgeName, badgeDescription, date, badgeImg } = badge;

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
    //fetchEvaluation();
    //fetchBadges();
    getUserFunction();
    getoneProject();
  }, []);

  const getUserFunction = async () => {
    try {
      /////cookies
      const response = await getUserAuth(param.id, config);
      ////////
      setUser(response.data.user);

      //evaluation---------
      const userL = response.data.user.username;
      const response1 = await getEvaluation(userL, config);
      // Supposons que la réponse contient un champ 'evaluations' avec un tableau d'évaluations
      const firstEvaluation = response1.data.evaluations[0]; // Accéder à la première évaluation
      setEvaluation(firstEvaluation);

      const response2 = await getTBadge(userL); // Appeler votre fonction de service pour obtenir les badges d'un utilisateur en fonction de son nom d'utilisateur
      setBadge(response2.data.badges); // Supposons que la réponse contient un champ 'badges' avec un tableau d'objets de badges

      //------------
    } catch (error) {
      console.log(error);
    }
  };

  const getoneProject = async () => {
    const res = await getProjectuser("", config)
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
  function calculateCompletionPercentage(user) {
    let percentage = 100;

    if (!user.first_Name) {
      percentage -= 30;
    }

    if (!user.last_Name) {
      percentage -= 20;
    }

    if (!user.phoneNumber) {
      percentage -= 15;
    }
    if (!user.address) {
      percentage -= 10;
    }
    return percentage;
  }

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

  //evaluation
  /*
  const fetchEvaluation = async () => {
    try {
      const response = await getEvaluation(username, config);
      // Supposons que la réponse contient un champ 'evaluations' avec un tableau d'évaluations
      const firstEvaluation = response.data.evaluations[0]; // Accéder à la première évaluation
      setEvaluation(firstEvaluation);
    } catch (error) {
      console.log(error);
    }
  };*/



  return (
    <>
      <ChatBox user={user} />
      <DemoNavbar />
      
      <ProfileHeader user={user} evaluation={evaluation} />
      <main className="profile-page">
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
                  <Col
                    className="order-lg-3 text-lg-right align-self-lg-center"
                    lg="4"
                  >
                    <div className="card-profile-actions py-4 mt-lg-0">
                      <Button
                        className="mr-4"
                        color="info"
                        href="#pablo"
                        onClick={(e) => Modifier(user)}
                        size="sm"
                      >
                        <i
                          class="fa fa-pencil-square-o mr-2"
                          aria-hidden="true"
                        ></i>
                        Modify
                      </Button>
                      {/* <Button
                        className="float-right"
                        color="default"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                      >
                        Message
                      </Button> */}

                      <div className="progress-wrapper">
                        <div className="progress-info">
                          <div className="progress-label">
                            <span>Progress completed</span>
                          </div>
                          <div className="progress-percentage">
                            <span>{calculateCompletionPercentage(user)} %</span>
                          </div>
                        </div>
                        <Progress
                          max="100"
                          value={calculateCompletionPercentage(user)}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="ml-8 mt-5">
                  <h3 className="text-capitalize ml-5">
                    {user.username}
                    <span className="font-weight-light">
                      |
                      {differenceInYears(
                        new Date(),
                        new Date(user.dateOfBirth)
                      )}
                    </span>
                  </h3>
                  <div className="h6 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    <h1>first_Name:</h1>
                    {user.first_Name ? (
                      <p className="h3 ml-8">{user.first_Name}</p>
                    ) : (
                      <i class="fa fa-ban fa-3x  ml-8" aria-hidden="true"></i>
                    )}
                    -<h1> last_Name: </h1>
                    {user.last_Name ? (
                      <p className="h3 ml-8">{user.last_Name}</p>
                    ) : (
                      <i class="fa fa-ban fa-3x  ml-8" aria-hidden="true"></i>
                    )}
                  </div>
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
                        phoneNumber :{" "}
                        {user.phoneNumber ? (
                          <h2>{user.phoneNumber}</h2>
                        ) : (
                          <i class="fa fa-ban fa-1x" aria-hidden="true"></i>
                        )}
                        <br />
                        dateOfBirth :{AfficherDateDeNaissance(user.dateOfBirth)}
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
                                <th colspan="2">
                                  <Button
                                    type="button"
                                    onClick={(e) =>
                                      navigate(
                                        `/Projects_details/${project._id}/${project.creator._id}`
                                      )
                                    }
                                  >
                                    <i
                                      class="fa fa-eye mr-2"
                                      aria-hidden="true"
                                    ></i>
                                    <h6 className=" display-4 text-dark text-capitalize font-weight-bold mr-9 ml-9">
                                      {project.title}
                                    </h6>{" "}
                                  </Button>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  number Of People :{" "}
                                  {project.numberOfPeople_actuel}{" "}
                                </td>
                                <td>
                                  current amount : {project.montant_actuel}
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
                <div className="text-capitalize font-weight-bold ml-4">
                  Badges:
                </div>
                <div className="mt-2 border-top ">
                  <Row className="justify-content-center">
                    <Col lg="9">
                      <div>
                        <h1>{username} Badges</h1>
                        {badge.length > 0 ? (
                          badge.map((badge) => (
                            <div key={badge._id}>
                              <h3>Name: {badge.badgeName}</h3>
                              
                              <p>Description: {badge.badgeDescription}</p>
                              <p>Date: {badge.date.split("T")[0]}</p>
                              
                              <Col className="order-lg-2" >
                    <div className="card-profile-image">
                    <br/><br/>
                    <div className="mt-2 border-top ">

                      <a  >
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={require(`../../../assets/img/badges/${badge.badgeImg}`)}
                        />
                      </a>
                      </div>
                    </div>
                    <br /><br />
                  </Col>


                            </div>
                          ))
                        ) : (
                          <p>Aucun badge trouvé pour {username}</p>
                        )}
                      </div>
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
