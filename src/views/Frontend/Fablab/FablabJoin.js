// reactstrap components
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactDatetime from "react-datetime";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import "../../../assetsFrontOffice/css/fablab.css";
import DemoNavbar from "components/Navbars/DemoNavbar";
import AddImage from "../Event/addImage";
import moment from "moment";
// reactstrap components

import {
  Card,
  CardBody,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Alert,
  
} from "reactstrap";
import { Button, Container, Form ,FormControl,Feedback} from "react-bootstrap";

// core components

import axios from "axios";
import LoginNavbar from "components/Navbars/LoginNavbar";

export default function FablabJoin() {
  // const [image, setImage] = useState();

  const navigate = useNavigate();
  const [image, setImage] = useState();
  const [croppedImage, setCroppedImage] = useState(null);
  const [visible,setVisible]=useState(false)
  
  const [errorMessageName, setErrorMessageName] = useState("");
  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const [fablabErrors, setFablabErrors] = useState("");

  // const[phoneNumber,setPhoneNumber]=useState();
  const [fablab, setFablab] = useState({
    fablabName: "",
    fablabEmail: "",
    description: "",
    phoneNumber: "",
    address: "",
    //"fablbLogo":"",
    dateOfCreation: "",
  });
  const handlechangeFile = (croppedImageUrl,croppedImageBlob) => {
    setCroppedImage(croppedImageUrl);
    setImage(croppedImageBlob);
    console.log(croppedImageUrl);
    console.log(croppedImageBlob);
  };
  const handlechange = async (e) => {
    setFablab({ ...fablab, [e.target.name]: e.target.value });
  };

  const handlechangeName = async (e) => {
    setFablab({ ...fablab, [e.target.name]: e.target.value });
    try {
      const res = await axios.get(`http://localhost:5000/fablabs/checkName/${e.target.value}`);
      console.log(res.data.isUnique);
      if (!res.data.isUnique) {
        setErrorMessageName("fablab Name is already taken , please choose another name.");
      }else {
        setErrorMessageName("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlechangeEmail = async (e) => {
    setFablab({ ...fablab, [e.target.name]: e.target.value });
    try {
      const res = await axios.get(`http://localhost:5000/fablabs/checkEmail/${e.target.value}`);
      console.log(res.data.isUnique);
      if (!res.data.isUnique) {
        setErrorMessageEmail("fablab Email is already taken , please choose another name.");
      }else {
        setErrorMessageEmail("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDateChange = (date) => {
    
      setFablab({ ...fablab, dateOfCreation: date.format("YYYY-MM-DD") });
    

  };

  useEffect(() => {
   
  }, [fablab]);
  function handlePhoneNumberChange(status, value, countryData, number, id) {
    // handle the phone number change here
    setFablab({ ...fablab, phoneNumber: number });
  }
  function isValidDate(currentDate, selectedDate) {
    // disable dates that are after the current date
    return currentDate.isBefore(moment());
  }
  const add = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    let nameError = "";
    let emailError = "";
    let descError = "";
    let phoneError = "";
    let addError = "";
    let imgError = "";
    let docError = "";
   

    // Check required fields
    if (!fablab.fablabName) {
      nameError = "Fablab name is required.";
    }
    if (!fablab.fablabEmail) {
      emailError = "Fablab email is required.";
    }
    if (!fablab.description) {
      descError = "description is required.";
    }
    if (!fablab.phoneNumber) {
      phoneError = "phoneNumber is required.";
    }
    if (!fablab.address) {
      addError = "address is required.";
    }
    if (!image) {
      imgError = "Logo is required.";
    }

    if (!fablab.dateOfCreation) {
      docError = "dateOfCreation is required.";
    }
  
    setFablabErrors({ name: nameError, email: emailError , phone: phoneError, description: descError, address: addError, date: docError , img : imgError});
  
    // Check for errors
    if (nameError || emailError || phoneError || descError || addError || docError || imgError ) {
      return;
    }

    
    formData.append("fablabLogo", image ,`${fablab.fablabName}+cropped.jpg`);
    formData.append("fablabName", fablab.fablabName);
    formData.append("fablabEmail", fablab.fablabEmail);
    formData.append("description", fablab.description);
    formData.append("phoneNumber", fablab.phoneNumber);
    formData.append("address", fablab.address);
    formData.append("dateOfCreation", fablab.dateOfCreation);
    console.log(formData);
   

    try {
      const res = await axios.post("http://localhost:5000/fablabs", formData);
     // console.log(res.data);
     // console.log(res.data.message);
      //console.log(res.data.fablabName)
      if(res.data.fablabName){
        setVisible(true)
        setTimeout(()=>{setVisible(false)},4000)
      } 
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
            <Col lg="8">
              {" "}
              {/*largeur du login */}
             
              <Card className="bg-secondary shadow border-0">
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <p>
                      <big>
                        Please make sure to fill out the form attentively
                      </big>
                    </p>
                    <small>
                      Your Request will be validated by an admin as soon as
                      possible
                    </small>
                  </div>
                  <Form
                    role="form"
                    enctype="multipart/form-data" /*method="HTTP_METHOD" */
                  >
                    <Form.Group>
                     <div type="invalid" style={{ color: "red", marginTop:"0px" }}>
                        {fablabErrors.name}
                      </div>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-building" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Form.Control
                          placeholder="fablab name"
                          type="text"
                          name="fablabName"
                          onChange={(e) => handlechangeName(e)}
                          isInvalid={!!fablabErrors.name}
                        />
                      </InputGroup>
                      
                      {errorMessageName && <p style={{ color: "red" }}>{errorMessageName}</p>}
                     
                      
                    </Form.Group>
                    <Form.Group>
                    <div type="invalid" style={{ color: "red", marginBottom:"5px" }}>
                        {fablabErrors.email}
                      </div>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Form.Control
                          placeholder="professionnel email"
                          type="email"
                          name="fablabEmail"
                          onChange={(e) => handlechangeEmail(e)}
                        />
                      </InputGroup>
                      {errorMessageEmail && <p style={{ color: "red" }}>{errorMessageEmail}</p>}
                     
                    </Form.Group>
                    <Form.Group>
                    <div type="invalid" style={{ color: "red", marginBottom:"5px" }}>
                        {fablabErrors.description}
                      </div>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-smile-o" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Form.Control
                          className="form-control-alternative"
                          placeholder="Tell as more about your fablab"
                          rows="5"
                          type="textarea"
                          name="description"
                          onChange={(e) => handlechange(e)}
                        />
                      </InputGroup>
                     
                    </Form.Group>
                    <FormGroup>
                    <div type="invalid" style={{ color: "red", marginBottom:"5px" }}>
                        {fablabErrors.date}
                      </div>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-calendar-grid-58" />
                          </InputGroupText>
                        </InputGroupAddon>

                        <ReactDatetime
                          inputProps={{
                            placeholder: "Date of fablab's foundation",
                          }}
                          timeFormat={false}
                          onChange={(date) => handleDateChange(date)}
                          isValidDate={isValidDate}
                          //maxDate={moment()}
                        />
                      </InputGroup>
                     
                    </FormGroup>

                    <Form.Group>
                    <div type="invalid" style={{ color: "red", marginBottom:"5px" }}>
                        {fablabErrors.phone}
                      </div>
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
                    <div type="invalid" style={{ color: "red", marginBottom:"5px" }}>
                        {fablabErrors.address}
                      </div>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-building" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Form.Control
                          placeholder="address"
                          type="text"
                          name="address"
                          onChange={(e) => handlechange(e)}
                        />
                      </InputGroup>
                     
                    </Form.Group>

                   
                    <Form.Group>
                    <div type="invalid" style={{ color: "red", marginBottom:"5px" }}>
                        {fablabErrors.img}
                      </div>
                      <AddImage className="input-group-alternative" onEvent={handlechangeFile} aspect={1/1} holder={"add the fablab logo"} />
                     
                    </Form.Group>
                    <Form.Group> {croppedImage && <img src={croppedImage} alt="Cropped Image" style={{width:"50%",height:"30%"}} />}</Form.Group>

                   
                    <div className="text-center">
                      <Button
                        className="mt-4"
                        color="primary"
                        type="button"
                        onClick={(e) => add(e)}
                      >
                        {" "}
                        Send Request{" "}
                      </Button>
                    </div>
                   
                  </Form>
                </CardBody>
              </Card>
              {visible &&   <Alert style={{ marginTop: "30px" }} variant="primary">
                <p>
                Request succefully received an admin will contact you sooner
                </p>
                </Alert>}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
