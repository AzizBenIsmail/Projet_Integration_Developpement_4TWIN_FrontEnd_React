import { Button, Card, Container, Row, Col, Progress } from 'reactstrap';
import { faMale, faFemale } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from "react";
import { updateUser, getUser, addUser } from "../services/apiUser";
import { useNavigate, useParams } from "react-router-dom";
import { differenceInYears } from 'date-fns';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

export default function Profile() {
  const navigate = useNavigate();

  const param = useParams();
  const [friendCount, setFriendCount] = useState(22);
  const [photoCount, setPhotoCount] = useState(10);
  const [commentCount, setCommentCount] = useState(89);
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
  const { _id, username, first_Name, last_Name, email, phoneNumber, address } = user;

  useEffect(() => {
    getUserFunction();
  }, []);

  const getUserFunction = async () => {
    const response = await getUser(param.id);
    console.log(response.data.user);
    setUser(response.data.user);
  };
  const AfficherDateDeNaissance = (dateOfBirth) => {
    const date = moment(dateOfBirth);
    const mois = date.format('MM');
    const jour = date.format('DD');
    const annee = date.format('YYYY');
    return "" + annee + "/" + mois + "/" + jour + ""
  }

  const genderIcon = (gender) => {
    if (gender === 'Male') {
      return <FontAwesomeIcon icon={faMale} size="2x" color="#007bff" />;
    } else if (gender === 'Female') {
      return <FontAwesomeIcon icon={faFemale} size="2x" color="#f54291" />;
    } else {
      return null;
    }
  };
  
  const Modifier = async (user) => {
    const result = window.confirm("Are you sure you want to modify "+user.username+"?");
    if (result) {
      //console.log(user);
      navigate(`/profile/${user._id}`);

    }
  }
  function calculateCompletionPercentage(user) {
    let percentage = 100;
    
    if (!user.first_Name) {
      percentage -= 30;
    }
    
    if (!user.last_Name) {
      percentage -= 20;
    }
    
    if (!user.phoneNumber) {
      percentage -=15;
    }   
    if (!user.address) {
      percentage -=10;
    }
    console.log(percentage);
    return percentage;
  }
  
  return (
    <>
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
                        src={`http://localhost:5000/images/${user.image_user}`}                        />
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
                        onClick={(e) => Modifier(user)  }
                        size="sm"
                      >
                        Modifier
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
          <Progress max="100" value={calculateCompletionPercentage(user)}/>
        </div>
                      </div>
                  </Col>
                </Row>
                
                <div className="text-center mt-5">
                <h3>
                    {user.username}
                      <span className="font-weight-light">| {differenceInYears(new Date(), new Date(user.dateOfBirth))}</span>
                    </h3>
                    <div className="h6 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      {user.address}
                    </div>
                    <div className="h6 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      <h1>first_Name:</h1> {user.first_Name ? (<p>{user.first_Name}</p>) : (<FontAwesomeIcon icon={faCircle} />)}
                  -<h1> last_Name: </h1>{user.last_Name ? (<p>{user.last_Name}</p>) : (<FontAwesomeIcon icon={faCircle} />)}
                    </div>
                    <div>
                      <i className="ni education_hat mr-2" />
                    <h1>email :</h1> {user.email}
                    </div>
                  </div>
                  <div className="mt-5 py-5 border-top text-center">
                    <Row className="justify-content-center">
                      <Col lg="9">
<                  h1>
                    phoneNumber — {user.phoneNumber ? (<p>{user.phoneNumber}</p>) : (<FontAwesomeIcon icon={faCircle} />)}
                    <br />
                    dateOfBirth — {AfficherDateDeNaissance(user.dateOfBirth)}
                    <br />
                    gender      —  {genderIcon(user.gender)}

                  </h1>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Card>
            </Container>
          </section>
        </main>
      </>
  )
}
