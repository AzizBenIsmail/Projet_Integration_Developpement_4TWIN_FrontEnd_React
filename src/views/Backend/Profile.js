import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Input,
  Row,
  Col
} from "reactstrap";
import { faMale, faFemale } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { updateUser, getUser, addUser } from "../../services/apiUser";
import { useNavigate, useParams } from "react-router-dom";
import { differenceInYears } from 'date-fns';
import axios from 'axios';
import moment from 'moment';


const Profile = () => {
  let formData = new FormData();
  const navigate = useNavigate();
  const param = useParams();
  const [image, setImage] = useState();
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
  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handlechangeFile = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };
  const UpdateU = async () => {
    const res = await updateUser(param.id, user);
    console.log(res)
    if (res.status === 200)
    navigate(`/Tables`);

  };

  const deleteAUser = async (user) => {
    const result = window.confirm("Are you sure you want to delete " + user.username + "?");
    if (result) {
      //console.log(user);
      await axios.delete(`http://localhost:5000/users/${user._id}`);

      navigate("/Tables");
    }
  }
  const Show_more = async (user) => {
    const result = window.confirm("Are you sure you want to Show " + user.username + "?");
    if (result) {
      //console.log(user);  
      //navigate(`/profile-page/${user._id}`);
      navigate(`/Tables`);
      
    }
  }
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
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundImage:
            "url(" + `http://localhost:5000/images/${user.image_user}` + ")",
            // "url(" + require("../../assets/img/theme/profile-cover.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top"
        }}
      > 
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">Hello  {user.username}</h1>
              <p className="text-white mt-0 mb-5">
                This is your profile page. You can see the progress you've made
                with your work and manage your projects or assigned tasks
              </p>
              <Button
                color="info"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                Edit profile
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>

          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
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
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Connect
                  </Button>
                  <Button
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={(e) => deleteAUser(user)}
                    size="sm"
                  >
                    delete
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      {/* <div>
                        <span className="heading">22</span>
                        <span className="description">Friends</span>
                      </div>
                      <div>
                        <span className="heading">10</span>
                        <span className="description">Photos</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">Comments</span>
                      </div> */}
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    {user.username}
                    <span className="font-weight-light">| {differenceInYears(new Date(), new Date(user.dateOfBirth))}</span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {user.address}
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    first_Name:
                      {user.first_Name ? (<p>{user.first_Name}</p>) : (<FontAwesomeIcon icon={faCircle} />)}
                  - last_Name: {user.last_Name ? (<p>{user.last_Name}</p>) : (<FontAwesomeIcon icon={faCircle} />)}
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    email : {user.email}
                  </div>
                  <hr className="my-4" />
                  <p>
                    phoneNumber — {user.phoneNumber ? (<p>{user.phoneNumber}</p>) : (<FontAwesomeIcon icon={faCircle} />)}
                    <br />
                    dateOfBirth — {AfficherDateDeNaissance(user.dateOfBirth)}
                    <br />
                    gender      —  {genderIcon(user.gender)}

                  </p>
                  <a href="" onClick={(e) => Show_more(user)}>
                    Show more
                  </a>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => UpdateU()}
                      size="sm"
                    >
                      Save
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Username
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="username"
                            type="text"
                            defaultValue={user.username}
                            onChange={(e) => onValueChange(e)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="email"
                            type="email"
                            defaultValue={user.email}
                            onChange={(e) => onValueChange(e)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                            
                          >
                            First name
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="first_Name"
                            placeholder="First name"
                            defaultValue={user.first_Name}
                            type="text"
                            onChange={(e) => onValueChange(e)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Last name
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="last_Name"
                            placeholder="Last name"
                            type="text"
                            defaultValue={user.last_Name}
                            onChange={(e) => onValueChange(e)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Contact information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Address
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="address"
                            placeholder="Home Address"
                            type="text"
                            defaultValue={user.address}

                            onChange={(e) => onValueChange(e)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            phoneNumber 
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue= {user.phoneNumber}
                            name="phoneNumber"
                            placeholder="City"
                            type="text"
                            onChange={(e) => onValueChange(e)}

                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                           New password
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="password"
                            placeholder=" New password "
                            type="text"

                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
