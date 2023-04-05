import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, CardHeader } from "reactstrap";
import { Card, Container, Row, Col, Progress } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";

const ProfileHeader = (props) => {
  const navigate = useNavigate();

  const Modifier = async (user) => {
    const result = window.confirm(
      "Are you sure you want to modify " + user.username + "?"
    );
    if (result) {
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

  return (
    <>
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
            <polygon
              className="fill-white"
              points="2560 0 2560 100 0 100"
            />
          </svg>
        </div>
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "600px",
            backgroundImage:
              "url(" +
              `http://localhost:5000/images/${props.user.image_user}` +
              ")",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        >
          {/* Mask */}
          <span className="mask bg-gradient-default opacity-8" />
        </div>
      </section>

      <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={`http://localhost:5000/images/${props.user.image_user}`}
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
                        onClick={(e) => Modifier(props.user)}
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
                </Row>

</>
  );
};
export default ProfileHeader;