// reactstrap components
import React, { useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import ReactDatetime from "react-datetime";
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import '../assetsFrontOffice/css/fablab.css'

// reactstrap components

import { Card, CardHeader, CardBody, FormGroup, InputGroupAddon, InputGroupText, InputGroup, Row, Col } from "reactstrap";
import { Button, Container, Form } from 'react-bootstrap'

// core components

import axios from 'axios';

export default function FablabJoin() {

   // const [image, setImage] = useState();

   
    const navigate = useNavigate();
    const [image, setImage] = useState();
   // const[phoneNumber,setPhoneNumber]=useState();
    const [fablab, setFablab] = useState(
        {
            "fablabName":"",
            "fablabEmail":"",
            "description":"",
            "phoneNumber":"",
            "address":"",
            "fablbLogo":"",
            "dateOfCreation":"",

        }
    )
    const handlechange = (e) => {
        setFablab({ ...fablab, [e.target.name]: e.target.value })
        

    }
    const handleDateChange = (date) => {
        setFablab({ ...fablab, dateOfCreation: date.format("YYYY-MM-DD") });
      };

    useEffect(() => {
        console.log(fablab);
      }, [fablab]);
    function handlePhoneNumberChange(status, value, countryData, number, id) {
        // handle the phone number change here
        setFablab({ ...fablab,phoneNumber:number});
        
      }
    const handlechangeFile = (e) => {
        setFablab({ ...fablab,fablbLogo:e.target.files[0].name});
    }
    const add = async (e) => {
        e.preventDefault();
       
        const fablabName = fablab.fablabName ;
        const fablabEmail = fablab.fablabEmail ;
        const description = fablab.description ; 
        const phoneNumber = fablab.phoneNumber;
        const address=fablab.address;
        const fablbLogo= fablab.fablbLogo;
        const dateOfCreation= fablab.dateOfCreation;

        console.log(fablbLogo)
         try {
            const res = await axios.post('http://localhost:5000/users/fablab',{
                fablabName,
                fablabEmail,
                description,
                phoneNumber,
                address,
                fablbLogo,
                dateOfCreation
            });
            console.log(res.data);
            } catch (error) {
             console.error(error);
         }
      
        // Check if email is already taken
        {/*if (res.data.message === 'email is already taken') {
            console.log('email is already taken');
            alert('Email is already taken');
        } else
            if (res.data.message === 'username is already taken') {
                console.log('username is already taken');

                alert('username is already taken');
            } else
                if (res.data.message === 'password : a character string of at least 8 characters containing at least one letter and one number') {
                    console.log('password is already taken');
                    alert('password : a character string of at least 8 characters containing at least one letter and one number');
                } else
                    if (res.data.message === 'You must be at least 18 years old') {
                        console.log('you must be at least 18 years old');

                        alert('You must be at least 18 years old');
                    } else {
                        console.log('addUser');
                        addUser(formData)
                            .then(() => navigate('/login-page'))
                            .catch((error) => {
                                console.log(error.response.data.message);
                            });
                    }*/}
    }
    return (
        <>
            <section className="section section-shaped section-lg">
                <div className="shape shape-style-1 bg-gradient-default">
                </div>
                <Container className="pt-lg-7">
                    <Row className="justify-content-center">
                        <Col lg="8"> {/*largeur du login */}
                            <Card className="bg-secondary shadow border-0">
                                <CardBody className="px-lg-5 py-lg-5">
                                    <div className="text-center text-muted mb-4">
                                    <p><big>Please make sure to fill out the form attentively</big></p>
                                    <small>Your Request will be validated by an admin as soon as possible</small>
                                    </div>
                                    <Form role="form" enctype="multipart/form-data" /*method="HTTP_METHOD" */>
                                        <Form.Group>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="fa fa-building"  />
                                                        
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Form.Control placeholder="fablab name" type="text" name='fablabName' onChange={(e) => handlechange(e)} />
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-email-83" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Form.Control placeholder="professionnel email" type="email" name='fablabEmail' onChange={(e) => handlechange(e)} />
                                            </InputGroup>
                                        </Form.Group>
                                         <Form.Group >
                                            <InputGroup className="input-group-alternative mb-3" >
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="fa fa-smile-o" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Form.Control className="form-control-alternative" placeholder="Tell as more about your fablab" rows="5" type="textarea" name='description' onChange={(e) => handlechange(e)} />
                                            </InputGroup>
                                        </Form.Group>
                                        <FormGroup>
                        
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-calendar-grid-58" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                              
                                                <ReactDatetime
                                                inputProps={{
                                                    placeholder: "Date of fablab's foundation"
                                                }}
                                                timeFormat={false}
                                                onChange={(date) => handleDateChange(date)}
                                                />
                                                
                                            </InputGroup>
                                           
                                        </FormGroup>

                                        <Form.Group>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-mobile-button" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Form.Group>
                                                <IntlTelInput
                                                    containerClassName="intl-tel-input"
                                                    inputClassName="form-control"
                                                    preferredCountries={[]}
                                                    //onlyCountries={africanCountries}
                                                    defaultCountry="tn"
                                                    format
                                                    onPhoneNumberChange={handlePhoneNumberChange}
                                                    inputProps={{
                                                      name: "phoneNumber",
                                                      placeholder: "Phone number",
                                                    }}
                                                  
                                                />
                                                </Form.Group>
                                            </InputGroup>
                                        </Form.Group>

                                        <Form.Group>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-building" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Form.Control placeholder="address" type="text" name='address' onChange={(e) => handlechange(e)} />
                                            </InputGroup>
                                        </Form.Group>

                                        <Form.Group>
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-image" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Form.Control placeholder="fablb Logo" name='fablbLogo' type="file" onChange={(e) =>handlechangeFile(e)}/>
                                            </InputGroup>
                                                        
                                        </Form.Group>
                                        
                                       
                                       
                                       
                                       {/* <Row className="my-4">
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
                                                            I agree with the{" "}
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
                                        </Row>*/}
                                        <div className="text-center">
                                            <Button className="mt-4" color="primary" type="button" onClick={(e) => add(e)} > Send Request </Button>
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
    )
}
