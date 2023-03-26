// reactstrap components
import React, { useState } from "react";
import { register } from "../services/apiUser";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// reactstrap components
import {    Card,    CardHeader,    CardBody,    FormGroup,    InputGroupAddon,    InputGroupText,    InputGroup,    Row,    Col,} from "reactstrap";
import { Button, Container, Form } from "react-bootstrap";

import LoginNavbar from "components/Navbars/LoginNavbar";


export default function Register() {
    let formData = new FormData();
    const navigate = useNavigate();
    const [message,setmessage]=useState();
    const [image, setImage] = useState();
    const [user, setUsers] = useState({
        username: "",
        email: "",
        password: "",
        dateOfBirth: "",
        gender: "",
        image_user: "",
    });
    const handlechange = (e) => {
        setUsers({ ...user, [e.target.name]: e.target.value });
    };
    const handlechangeFile = (e) => {
        setImage(e.target.files[0]);
        console.log(e.target.files[0]);
    };
    const add = async (e) => {
        e.preventDefault();
        formData.append("username", user.username);
        formData.append("email", user.email);
        formData.append("password", user.password);
        formData.append("dateOfBirth", user.dateOfBirth);
        formData.append("gender", user.gender);
        formData.append("image_user", image);
        const res = await axios.post('http://localhost:5000/users/register', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        console.log(res.data);
        console.log(res.data.message);
        setmessage(res.data.message);
        // Check if email is already taken
        switch (res.data.message) {
            case "email is already taken":
                console.log("email is already taken");
                alert("Email is already taken");
                break;
            case "username is already taken":
                console.log("username is already taken");
                alert("username is already taken");

                break;
            case "password : a character string of at least 8 characters containing at least one letter and one number":
                console.log("password is already taken");
                alert(
                    "password : a character string of at least 8 characters containing at least one letter and one number"
                );
                break;
            case "You must be at least 18 years old":
                console.log("you must be at least 18 years old");
                alert("You must be at least 18 years old");

                break;
            case "gender must be one of the following values: Male, Female":
                console.log("gender must be one of the following values: Male, Female");
                alert("gender must be one of the following values: Male, Female");
                break;
            case undefined:
                navigate("/login-page");
                alert(
                    "successful account creation Welcom : `" + user.username + "`"
                );  
                break;
            default:
                console.log("Please fill in all the fields of the form");
                alert("Please fill in all the fields of the form");
                setmessage("Please fill in all the fields of the form");
                break;
        }   
    };
    const handleGoogleLogin = async () => {
        try {
          const response = await axios.get('http://localhost:5000/auth/connection');
          window.location.href = response.data.redirectUrl;
        } catch (error) {
          console.error(error);
        }
      };
      
    return (
        <>
              <LoginNavbar />
            <section className="section section-shaped section-lg">
                <div className="shape shape-style-1 bg-gradient-default"></div>
                <Container className="pt-lg-7">
                    <Row className="justify-content-center">
                        <Col lg="5">

                            {/*largeur du login */}
                            <Card className="bg-secondary shadow border-0">
                                <CardHeader className="bg-white pb-5">
                                    <div className="text-muted text-center mb-3">
                                        <small> Sign up with </small>
                                    </div>
                                    <div className="text-center">
                                    <Button
                                            className="btn-neutral btn-icon ml-1"
                                            color="default"
                                            href="https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=1011336119202-68ccv8g3nnrvrbhaibacj684alcpfmss.apps.googleusercontent.com&service=lso&o2v=2&flowName=GeneralOAuthFlow"
                                            onClick={handleGoogleLogin}
                                            >
                                            <span className="btn-inner--icon mr-1">
                                                <img
                                                alt="..."
                                                src={
                                                    require("assetsFrontOffice/img/icons/common/google.svg")
                                                    .default
                                                }
                                                />
                                            </span>
                                            <span className="btn-inner--text">Google</span>
                                            </Button>
                                    </div>
                                </CardHeader>
                                <CardBody className="px-lg-5 py-lg-5">
                                    <div className="text-center text-muted mb-4">
                                        <small> Or sign up with credentials </small>
                                    </div>
                                    <Form role="form" enctype="multipart/form-data" >
                                        <Form.Group >
                                            <InputGroup className="input-group-alternative mb-3">
                                                <InputGroupAddon addonType="prepend" >
                                                    <InputGroupText>
                                                    {message === "username is already taken" ?<i className="ni ni-circle-08" style={{ color: "red" }}/>:
                                                        message != "username is already taken" ?<i className="ni ni-circle-08" style={{ color: "#0000FF" }} />:
                                                            <i className="ni ni-circle-08" />}
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                            <Form.Control  placeholder="username" type="text" name="username" onChange={(e) => handlechange(e)} />
                                            </InputGroup>
                                            {message === "username is already taken"?<label style={{ color: "red" }} ><i className="ni ni-fat-remove" />username is already taken</label>:""}
                                        </Form.Group>
                                        <Form.Group>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                    {message === "email is already taken" ?<i className="ni ni-email-83" style={{ color: "red" }}/>:
                                                    <i className="ni ni-email-83" style={{ color: "#0000FF" }} /> }
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Form.Control
                                                    placeholder="email"
                                                    type="email"
                                                    name="email"
                                                    onChange={(e) => handlechange(e)}
                                                />
                                            </InputGroup>
                                            {message === "email is already taken"?<label style={{ color: "red" }} > <i className="ni ni-fat-remove" />email is already taken</label>:""}
                                        </Form.Group>
                                        <Form.Group>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                    {message === "password : a character string of at least 8 characters containing at least one letter and one number" ?<i className="ni ni-lock-circle-open" style={{ color: "red" }}/>:
                                                        <i className="ni ni-lock-circle-open" style={{ color: "#0000FF" }}/>}
                                                        
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Form.Control
                                                    placeholder="password"
                                                    type="password"
                                                    autoComplete="off"
                                                    name="password"
                                                    onChange={(e) => handlechange(e)}
                                                />
                                            </InputGroup>
                                            {message === "password : a character string of at least 8 characters containing at least one letter and one number"?<label style={{ color: "red" }} > <i className="ni ni-fat-remove" />password : a character string of at least 8 characters containing at least one letter and one number</label>:""}
                                        </Form.Group>
                                        <Form.Group>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                    {message === "You must be at least 18 years old" ?<i className="ni ni-time-alarm" style={{ color: "red" }}/>:
                                                        <i className="ni ni-time-alarm" style={{ color: "#0000FF" }}/>}
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Form.Control
                                                    placeholder="dateOfBirth"
                                                    type="date"
                                                    name="dateOfBirth"
                                                    max="2006-12-31"
                                                    onChange={(e) => handlechange(e)}
                                                />
                                            </InputGroup>
                                            {message === "You must be at least 18 years old"?<label style={{ color: "red" }} > <i className="ni ni-fat-remove" /> You must be at least 18 years old</label>:""}

                                        </Form.Group>
                                        <Form.Group>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                    {message === "gender must be one of the following values: Male, Female" ?<i className="ni ni-badge" style={{ color: "red" }}/>:
                                                        <i className="ni ni-badge" style={{ color: "#0000FF" }}/>}
                                                        
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Form.Check
                                                    type="radio"
                                                    id="male"
                                                    label="Male"
                                                    name="gender"
                                                    value="Male"
                                                    onChange={(e) => handlechange(e)}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    id="female"
                                                    label="Female"
                                                    name="gender"
                                                    value="Female"
                                                    onChange={(e) => handlechange(e)}
                                                />
                                            </InputGroup>
                                            {message === "gender must be one of the following values: Male, Female"?<label style={{ color: "red" }} ><i className="ni ni-fat-remove" />gender must be one of the following values: Male, Female</label>:""}

                                        </Form.Group>
                                        <Form.Group>
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                    {message === "Please fill in all the fields of the form" ?<i className="ni ni-image" style={{ color: "red" }}/>:
                                                            <i className="ni ni-image" style={{ color: "#0000FF" }}/>}
                                                   </InputGroupText>
                                                </InputGroupAddon>
                                                <Form.Control
                                                    placeholder="image_user"
                                                    name="image_user"
                                                    type="file"
                                                    onChange={(e) => handlechangeFile(e)}
                                                />
                                            </InputGroup>
                                            {message === "Please fill in all the fields of the form"?<label style={{ color: "red" }} ><i className="ni ni-fat-remove" />Please fill in all the fields of the form</label>:""}
                                        </Form.Group>
                                        <div className="text-muted font-italic">
                                            <small>
                                                password strength:
                                                <span className="text-success font-weight-700">
                                                    strong
                                                </span>
                                            </small>
                                        </div>
                                        <Row className="my-4">
                                            <Col xs="12">
                                                <div className="custom-control custom-control-alternative custom-checkbox">
                                                    <input
                                                        className="custom-control-input"
                                                        id="customCheckRegister"
                                                        type="checkbox"
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor="customCheckRegister"
                                                    >
                                                        <span>
                                                            I agree with the
                                                            <a
                                                                href="#pablo"
                                                                onClick={(e) => e.preventDefault()}
                                                            >
                                                                Privacy Policy
                                                            </a>
                                                        </span>
                                                    </label>
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className="text-center">
                                            <Button
                                                className="mt-4"
                                                color="primary"
                                                type="button"
                                                onClick={(e) => add(e)}
                                            >

                                                Create account
                                            </Button>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}
