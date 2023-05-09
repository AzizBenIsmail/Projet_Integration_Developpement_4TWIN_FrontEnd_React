import React, { useEffect, useState } from "react";
import { Button, Card, Container, Row, Col, Progress, Badge } from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import { differenceInYears } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import ChatBox from "./profile/chat";
import SimpleModal from "../Models/simpleModel";
import {
  getEvaluation,
  getTopEvaluations,getIstop3
} from "../../../services/apiEvaluation";
//import Particles from "particles.js";

const ProfileDetails = (props) => {
  const [simpleModal, setSimpleModal] = useState(false);
  const [selectedE, setSelectedE] = useState(false);

  const selectedEvent = (id) => {
    setSelectedE(id);
  };

  const simpletoggleModal = () => {
    setSimpleModal(!simpleModal);
  };
  const user = props.user;
  const badge = props.badge;
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
  const navigate = useNavigate();

  const Modifier = async (id) => {

    navigate(`/profile/${id}`);
  };

  useEffect(() => {
    getTEvaluations();
  }, []);

  const [evaluations, setEvaluations] = useState([]);
  const [med, setMed] = useState([]);


  useEffect(() => {
    getIstop3(props.user.username).then((data) => {
      if (data) {
        // User is evaluated
        setMed("🏆");
      } else {
        // User is not evaluated
        setMed("");
      }
    }).catch((error) => {
      console.error(error);
      setMed("");
    });
  }, [props.user.username]);


  

  const getTEvaluations = async () => {
    try {

      const res = await getTopEvaluations({});
      setEvaluations(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
   
      <div className="px-4">
        <Row className="justify-content-center">
          <Col className="order-lg-3" lg="3">
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
          <Col className="order-lg-4 text-lg-right align-self-lg-center mr--4" lg="4">
            <div className="card-profile-actions py-4 mt-lg-0 ">
              
              <div ><ChatBox user={user} />  </div>
             
              {props.isConnected &&  <Button
               
                color="default"
                href="#pablo"
                onClick={(e) => Modifier(user._id)}
                size="sm"
              >
                <span>Modify</span>
                <i className="ni ni-settings-gear-65"></i>
              </Button> }
             
            </div>
          </Col>
          <Col className="order-lg-1" lg="0" style={{marginLeft:"-40px",marginTop:"3%"}}>
          <span><h1>{med}</h1></span>
          </Col>
          

          <Col className="order-lg-2" lg="4">
            <div className="card-profile-stats d-flex justify-content-center">
              <div>
                <span className="heading">{props.nbP}</span>
              
                {user.userType === "fablab" ? (<><span className="description">Events</span></>):(<><span className="description">Projects</span></>)}
              </div>
              <div>
                <span className="heading">{props.nbI}</span>
                <span className="description">Invests</span>
              </div>
              <div>
                <span className="heading">{badge.length || 0}</span>
                <span className="description">Badges</span>
              </div>
            </div>
          </Col>
        </Row>
        <div className="text-center mt-5">
          <h3>
            {user.username}{" "}
            <span className="font-weight-light">
              , {differenceInYears(new Date(), new Date(user.dateOfBirth))} ans
            </span>
          </h3>
          <div className="h6 font-weight-300">
            <i class="ni ni-pin-3" />
            <span style={{ marginLeft: "0.5%" }}> {user.address}</span>
          </div>
          <div className="h6 mt-4">
            <i className="ni ni-email-83" />
            <span style={{ marginLeft: "0.8%" }}>{user.email}</span>
          </div>
          <div>
            <i className="ni ni-mobile-button " />
            <span style={{ marginLeft: "0.5%" }}>
            {user.userType === "fablab" ? (<>{user.phoneNumber1}</>):(<>{user.phoneNumber}</>)}</span>
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div
            className="text-capitalize font-weight-bold ml-0 mt-5"
            style={{ flex: 1 }}
          >
            more informations:
          </div>
          <div
            className="text-capitalize font-weight-bold ml-0 mt-5"
            style={{ flex: 1 }}
          >
            earned badge:
          </div>
        </div>
        <div className="mt-2 py-2 border-top">
          <Row className="justify-content-right">
            <Col className="order-lg-3 align-self-lg-top mt-0" lg="6">
              <div className="card-profile-actions py-2 mt-lg-0">
                <div className="progress-wrapper">
                  <div className="progress-info">
                    <div className="progress-label">
                      <div className="progress-label">
                        <span
                          style={{
                            background: "#e9ecef",
                            opacity: 0.6,
                            borderRadius: "30px",
                            padding: "0.25rem 1rem",
                          }}
                        >
                          LEVEL: {props.evaluation.lvl}
                        </span>
                      </div>
                    </div>
                    <div className="progress-percentage">
                      <span>XP {props.evaluation.xp} %</span>
                    </div>
                  </div>
                  <Progress max="100" value={props.evaluation.xp} />
                </div>
                <div className="progress-wrapper">
                  <div className="progress-info">
                    <div className="progress-label">
                      <span
                        style={{
                          background: "#e9ecef",
                          opacity: 0.6,
                          borderRadius: "30px",
                          padding: "0.25rem 1rem",
                        }}
                      >
                        Progress completed
                      </span>
                    </div>
                    <div className="progress-percentage">
                      <span>{calculateCompletionPercentage(props.user)} %</span>
                    </div>
                  </div>
                  <Progress
                    max="100"
                    value={calculateCompletionPercentage(props.user)}
                  />
                </div>
              </div>
            </Col>
            <style>
              {`
                              .img-wrapper {
                                position: relative;
                              }
                              .details {
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 100%;
                                background-color: rgba(0, 0, 0, 0.6);
                                color: white;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                opacity: 0;
                                border-radius: 5px;
                                transition: opacity 0.3s ease;
                                cursor:pointer;
                              }
                              .img-wrapper:hover .details {
                                opacity: 1;
                              }
                              `}
            </style>
            <Col className="order-lg-3 align-self-lg-top mt-2" lg="6" md="6">
              <div className="d-flex flex-wrap">
                {badge.length > 0 ? (
                  badge.map((badge) => (
                    <>
                      <div className="img-wrapper mr-2 mb-2">
                        <img
                          alt="..."
                          className="img-fluid rounded shadow-lg"
                          style={{ height: "100px", width: "140px" }}
                          src={require(`../../../assets/img/badges/${badge.badgeImg}`)}
                        />
                        <div
                          className="details"
                          onClick={() => {
                            simpletoggleModal();
                            selectedEvent(badge._id);
                          }}
                        >
                          Details
                        </div>
                      </div>
                      <SimpleModal
                        isOpen={simpleModal && selectedE === badge._id}
                        fablab={badge}
                        toggle={simpletoggleModal}
                        title={badge.badgeName}
                        body={badge.badgeDescription}
                      />
                    </>
                  ))
                ) : (
                  <p>Aucun badge trouvé pour {user.username}</p>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};
export default ProfileDetails;
