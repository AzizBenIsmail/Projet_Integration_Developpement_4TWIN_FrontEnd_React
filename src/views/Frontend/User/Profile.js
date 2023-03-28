import { Button, Card, Container, Row, Col, Progress } from "reactstrap";
import { faMale, faFemale } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { updateUser, getUser, addUser } from "../../../services/apiUser";
import { useNavigate, useParams } from "react-router-dom";
import { differenceInYears } from "date-fns";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { getProjectuser } from "../../../services/apiProject";

import DemoNavbar from "../../../components/Navbars/DemoNavbar";

export default function Profile() {
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
              </div>
            </Card>
          </Container>
        </section>
      </main>
    </>
  );
}
