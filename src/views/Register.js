// reactstrap components
import React, { useState } from "react";
import { register } from "../services/apiUser";
import { useNavigate } from "react-router-dom";

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
} from "reactstrap";
import { Button, Container, Form } from "react-bootstrap";

// core components


export default function Register() {
    let formData = new FormData();
    const navigate = useNavigate();
    const [image, setImage] = useState();
    const [user, setUsers] = useState({
        username: "",
        // "first_Name": "",
        // "last_Name": "",
        email: "",
        password: "",
        dateOfBirth: "",
        // "phoneNumber": 0,
        gender: "",
        // "userType": "",
        // "address": "",
        image_user: "",
    });
    const handlechange = (e) => {
        setUsers({ ...user, [e.target.name]: e.target.value });
    };
    const handlechangeFile = (e) => {
        // setUsers({ ...user, image_user: e.target.files[0].name })
        setImage(e.target.files[0]);
        console.log(e.target.files[0]);
    };
    const add = async (e) => {
        console.log("1");
        e.preventDefault();
        formData.append("username", user.username);
        // formData.append('first_Name', user.first_Name);
        // formData.append('last_Name', user.last_Name);
        formData.append("email", user.email);
        formData.append("password", user.password);
        formData.append("dateOfBirth", user.dateOfBirth);
        // formData.append('phoneNumber', user.phoneNumber);
        formData.append("gender", user.gender);
        // formData.append('userType', user.userType);
        // formData.append('address', user.address);
        formData.append("image_user", image);
        // try {
        //     const res = await axios.post('http://localhost:5000/users', formData, {
        //         headers: { 'Content-Type': 'multipart/form-data' }
        //     });
        //     console.log(res.data);
        // } catch (error) {
        //     console.error(error);
        // }
        // console.log(formData);

        const res = await register(formData).catch((error) => {
            console.log(error.response.data.message);
        });

        // const res = await axios.post('http://localhost:5000/users', formData, {
        //     headers: { 'Content-Type': 'multipart/form-data' }
        // });

        console.log(res.data);
        console.log(res.data.message);

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
                    "successful account creation Welcom : `" + res.data.username + "`"
                );
                break;
            default:
                console.log("Please fill in all the fields of the form");
                alert("Please fill in all the fields of the form");
                break;
        }   
    };
    return (
        <>
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
                                            className="btn-neutral btn-icon mr-4"
                                            color="default"
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            <span className="btn-inner--icon mr-1">
                                                <img
                                                    alt="..."
                                                    src={
                                                        require("assetsFrontOffice/img/icons/common/github.svg")
                                                            .default
                                                    }
                                                />
                                            </span>
                                            <span className="btn-inner--text"> Github </span>
                                        </Button>
                                        <Button
                                            className="btn-neutral btn-icon ml-1"
                                            color="default"
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
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
                                            <span className="btn-inner--text"> Google </span>
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardBody className="px-lg-5 py-lg-5">
                                    <div className="text-center text-muted mb-4">
                                        <small> Or sign up with credentials </small>
                                    </div>
                                    <Form
                                        role="form"
                                        enctype="multipart/form-data" /*method="HTTP_METHOD" */
                                    >
                                        <Form.Group>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-hat-3" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Form.Control
                                                    placeholder="username"
                                                    type="text"
                                                    name="username"
                                                    onChange={(e) => handlechange(e)}
                                                />
                                            </InputGroup>
                                        </Form.Group>
                                        {/* <Form.Group>
                                                        <InputGroup className="input-group-alternative mb-3">
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>
                                                                    <i className="ni ni-circle-08" />
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                            <Form.Control placeholder="first_Name" type="text" name='first_Name' onChange={(e) => handlechange(e)} />
                                                        </InputGroup>
                                                    </Form.Group>
                                                    <FormGroup>
                                                        <InputGroup className="input-group-alternative mb-3">
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>
                                                                    <i className="ni ni-circle-08" />
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                            <Form.Control placeholder="last_Name" type="text" name='last_Name' onChange={(e) => handlechange(e)} />
                                                        </InputGroup>
                                                    </FormGroup> */}
                                        <Form.Group>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-email-83" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Form.Control
                                                    placeholder="email"
                                                    type="email"
                                                    name="email"
                                                    onChange={(e) => handlechange(e)}
                                                />
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-lock-circle-open" />
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
                                        </Form.Group>
                                        <Form.Group>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-time-alarm" />
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
                                        </Form.Group>
                                        {/* <Form.Group>
                                                        <InputGroup className="input-group-alternative mb-3">
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>
                                                                    <i className="ni ni-mobile-button" />
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                            <Form.Control placeholder="phoneNumber" type="number" name='phoneNumber' onChange={(e) => handlechange(e)} />
                                                        </InputGroup>
                                                    </Form.Group> */}
                                        <Form.Group>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-gender-83" />
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
                                        </Form.Group>
                                        {/* <Form.Group>
                                                        <InputGroup className="input-group-alternative mb-3">
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>
                                                                    <i className="ni ni-building" />
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                            <Form.Control placeholder="address" type="text" name='address' onChange={(e) => handlechange(e)} />
                                                        </InputGroup>
                                                    </Form.Group> */}
                                        <Form.Group>
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-image" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Form.Control
                                                    placeholder="image_user"
                                                    name="image_user"
                                                    type="file"
                                                    onChange={(e) => handlechangeFile(e)}
                                                />
                                            </InputGroup>
                                        </Form.Group>
                                        {/* <Form.Group>
                                                        <InputGroup className="input-group-alternative">
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>
                                                                    <i className="ni ni-image" />
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                            <Form.Control placeholder="userType"  type="text" name='userType' onChange={(e)=>handlechange(e)}/>
                                                        </InputGroup>
                                                    </Form.Group> */}
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
                                        {/* <div className="text-center">
                                                        <Button className="mt-4" color="primary" type="button" onClick={(e)=>add(e)} > Create account </Button>
                                                    </div> */}
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
