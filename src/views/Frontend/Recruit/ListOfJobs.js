import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import JobOffer from "./JobOffer";
import { FormSelect } from "react-bootstrap";
import Modals from "./Modals";
import {
  CustomFileInput,
  DropdownItem,
  DropdownMenu,
  InputGroupButtonDropdown,
} from "reactstrap";
import Siedbar from "components/siedbar/Siedbar.js";
import {
  Card,
  CardBody,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Input,
  Row,
  Col,
  Modal,
  Button,
} from "reactstrap";
import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import DemoNavbar from "../../../components/Navbars/DemoNavbar";


const ListOfJobs = () => {
  const [jobOffers, setJobOffers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [jobId, setJobId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [resume, setResume]= useState(null);
  const [formData, setFormData] = useState({
    resumeFile: "",
    availability: "",
    firstName: "",
    lastName: "",
    adresse: "",
    email: "",
    phone: "",
  });

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
  
  useEffect(() => {
    const getJobOffers = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/recruit/job-offers",
          config
        );
        setJobOffers(data);
      } catch (err) {
        console.error(err);
      }
    };
    getJobOffers();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  // const handleChange = (event) => {
  //   const { name, value, type } = event.target;
  //   if (type === "file") {
  //     setFormData({
  //       ...formData,
  //       [name]: event.target.files[0], // use the `files` property for file inputs
  //     });
  //   } else {
  //     setFormData({
  //       ...formData,
  //       [name]: value, // use the `value` property for text inputs
  //     });
  //   }
  // };
  

  const navigate=useNavigate();
  const handleApply = async (event, jobOffer, candidate) => {
    event.preventDefault();
    
    
      const form = new FormData();
      form.append("firstName", formData.firstName);
      form.append("lastName", formData.lastName);
      form.append("email", formData.email);
      form.append("phone", formData.phone);
      form.append("availability", formData.availability);
      form.append("adresse", formData.adresse);
      form.append("resume", formData.resumeFile);
      console.log("data :", form);

      try {
      const response = await axios.post(
        `http://localhost:5000/recruit/apply/${jobId}`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            foo: "bar",
          },
          ...config,
        }
      );
      console.log("data", form);
      const data = response.data;
      //navigate('/LandingPage');
      console.log(data.message); // success message from the backend
    } catch (err) {
      console.error(err);
    }
  };
  //   try {
  //     const response = await axios.post(
  //       `http://localhost:5000/recruit/apply/${jobId}`, // apply hedhy heya submit lakhreneya
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           foo: "bar",
  //         },
  //         ...config,
  //       }
  //     );

  //     const data = response.data;
  //     navigate('/LandingPage');
  //     console.log(data.message); // success message from the backend
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const handleVoiceSearch = () => {
  //   const recognition = new window.webkitSpeechRecognition();
  //   recognition.lang = "ar-SA,en-US"; // set the language to both Arabic and English
  //   recognition.onresult = async (event) => {
  //     const result = event.results[0][0].transcript;
  //     const isArabic = isTextArabic(result);
  //     const translatedText = isArabic
  //       ? await translateText(result, "ar", "en")
  //       : result;
  //     setSearchText(translatedText);
  //   };
  //   recognition.start();
  // };

  // // Helper function to check if the text is in Arabic
  // const isTextArabic = (text) => {
  //   const arabicRange = /[\u0600-\u06FF]/;
  //   return arabicRange.test(text);
  // };

  // // Helper function to call the Google Cloud Translation API
  // const translateText = async (text, sourceLang, targetLang) => {
  //   const response = await fetch(
  //     `https://translation.googleapis.com/language/translate/v2?key=YOUR_API_KEY&q=${text}&source=${sourceLang}&target=${targetLang}`
  //   );
  //   const data = await response.json();
  //   return data.data.translations[0].translatedText;
  // };

  const handleVoiceSearch = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setSearchText(result);
      //searchText.valueOf(result);
    };
    recognition.start();
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/recruit/search/jobs?title=${searchText}`,
        config
      );
      const data = response.data;

      setJobOffers(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleResumeChange = (event) => {
    console.log(event.target.files[0]);
    setFormData({ ...formData, resumeFile: event.target.files[0]});
    console.log(formData.resumeFile);
  }
  
  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  // const handleResumeUpload = async (event) => {
  //   const file = event.target.files[0];
  //   setFormData({ ...formData, resume: file });
  // };
  
  // const handleResumeUpload = async (event) => {
  //   const { name, value } = event.target.files[0];
  //   setFormData({ ...formData, [name]: value});
  // };
  // const handleResumeUpload = (event) => {
  //   setFormData({ ...formData, resume: event.target.files[0] });
  // };
  if (showApplicationForm) {
    return (
      <>
        <DemoNavbar />
        <main>
          <div className="position-relative bg-primary ">
            {/* shape Hero */}
          </div>
          <section className="section section-lg bg-gradient-default">
            <Container className="pt-lg-7">
              <Row className="justify-content-center">
                <Col lg="7">
                  <div
                    className="ml-9 pb-5 text-success font-weight-bold"
                    style={{
                      fontSize: "30px",
                      fontWeight: 600,
                      color: "#4a4a4a",
                      textShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    Apply to the job offer
                  </div>

                  <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5 py-lg-5">
                      <Form
                        //onSubmit={handleApply}
                        role="form"
                        encType="multipart/form-data"
                      >
                        <Form.Group>
                          <Form.Label>First Name</Form.Label>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-briefcase-24" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Form.Control
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                            />
                          </InputGroup>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Last Name</Form.Label>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-briefcase-24" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Form.Control
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                            />
                          </InputGroup>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Address</Form.Label>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-briefcase-24" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Form.Control
                              type="text"
                              name="adresse"
                              value={formData.adresse}
                              onChange={handleChange}
                            />
                          </InputGroup>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Email</Form.Label>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-briefcase-24" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Form.Control
                              type="text"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                            />
                          </InputGroup>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Phone Number</Form.Label>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-briefcase-24" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Form.Control
                              type="text"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                            />
                          </InputGroup>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Availability</Form.Label>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-briefcase-24" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Form.Control
                              type="text"
                              name="availability"
                              value={formData.availability}
                              onChange={handleChange}
                              
                            />
                          </InputGroup>

                          {/* <Input
                            id="availability"
                            value={availability}
                            onChange={(event) =>
                              setAvailability(event.target.value)
                            }
                            type="select"
                            name="select"
                          >
                            <option value="Part-Time">Part-Time</option>
                            <option value="Full-Time">Full-Time</option>
                          </Input> */}
                        </Form.Group>

                        <Form.Group controlId="resume">
                        <Form.Label >Resume</Form.Label>
                        {/* <InputGroup className="input-group-alternative mb-3"> */}
                        {/* <InputGroupAddon addonType="prepend"> */}
                        <CustomFileInput
                          // type="file"
                          // name="resume"
                          // value={formData.resume}
                          // onChange={handleChange}
                          type="file"
                          name="resumeFile"
                          //value={formData.resume}
                          onChange={(e) => handleResumeChange(e)}
                        >
                          {/* <Form.Control
                             type ="file"  id="resume" 
                          /> */}
                          {/* <i className="ni ni-briefcase-24" /> */}
                        </CustomFileInput>
                        {/* </InputGroupAddon> */}

                        {/* </InputGroup> */}
                        </Form.Group>

                        <div className="text-center mt-5">
                          <Button onClick={handleApply} type="submit">
                            Submit
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
      </>
    );
  }
  return (
    <>
      <DemoNavbar />

      <main>
        <div className="position-relative bg-primary "></div>
        <section className="section section-lg bg-gradient-default">
          <h1
            className="d-flex justify-content-center align-items-start  text-success font-weight-bold"
            style={{
              fontSize: "30px",
              fontWeight: 600,
              color: "#4a4a4a",
              textShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            Jobs Offers
          </h1>
          <h1
            className="pr-5 d-flex justify-content-center align-items-start  text-success font-weight-bold"
            style={{
              fontSize: "30px",
              fontWeight: 600,
              color: "#4a4a4a",
              textShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Form className=" navbar-search navbar-search-dark form-inline d-none d-md-flex ml-lg-auto">
              <FormGroup className="mb-0">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-search" onClick={handleSearch} />
                      <i
                        className="ml-3 mr-2 ni ni-sound-wave"
                        onClick={handleVoiceSearch}
                      />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Search Job"
                    type="text"
                    value={searchText}
                    onChange={(e) => {
                      setSearchText(e.target.value);
                      handleSearch(e.target.value);
                      //handleVoiceSearch(e.target.value);
                    }}
                  />
                </InputGroup>
              </FormGroup>
            </Form>
          </h1>

          <br></br>
          <div className="justify-content-center"
               style={{ display: "flex", flexWrap: "wrap" }}>
            {jobOffers.map((jobOffer) => (
              <div key={jobOffer._id} style={{ margin: "10px" }}>
                <Card style={{ width: "18rem" }}>
                  <CardBody>
                    {/* <CardTitle>{jobOffer.title}</CardTitle> */}
                    <JobOffer jobOffer={jobOffer} />
                    <Button
                      color="primary"
                      onClick={() => {
                        setJobId(jobOffer._id);
                        setShowApplicationForm(true);
                      }}
                    >
                      Apply
                    </Button>
                    <Modals jobOffer={jobOffer} />
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default ListOfJobs;



  // const formData = new FormData();

    // formData.append("jobOfferId", localStorage.getItem("id"));

    // //formData.append("candidateId", candidate.id);
    // formData.append("candidateId", "64398dc36852045a473bdbba");

    // formData.append("resume", resume);
    // formData.append("availability", availability);
    // formData.append("firstName", firstName);
    // formData.append("lastName", lastName);
    // formData.append("location", location);
    // formData.append("email", email);
    // formData.append("phone", phone);
    // console.log(formData);
  /* 
                //////////////////////// search mteei //////////
  <div>
              
              <button onClick={handleVoiceSearch}>Voice Search</button>
              <input type="text" value={searchText}   onChange={(e) => {
                  setSearchText(e.target.value);
                  handleSearch(e.target.value);
              // handleVoiceSearch(e.target.value);
              }} ></input>
              <button sound-wave onClick={handleSearch}>Search</button>
          </div>  




      <form >
        <label htmlFor="firstName"></label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
        <label htmlFor="adresse">Adresse</label>
        <input
          type="text"
          id="adresse"
          value={adresse}
          onChange={(event) => setAdresse(event.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor="phone">Phone Number</label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
        <label htmlFor="availability">Availability</label>
        <select
          id="availability"
          value={availability}
          onChange={(event) => setAvailability(event.target.value)}
        >
          <option value="part-time">Part-time</option>
          <option value="full-time">Full-time</option>
        </select>
        <label htmlFor="resume">Resume</label>
        <input type="file" id="resume" onChange={handleResumeChange} />
        <button type="submit">Submit Application</button>
      </form>
    );
  } */

// return (
//   <div>
//     {jobOffers.map((jobOffer) => (
//       <div key={jobOffer._id}>
//         <h2>{jobOffer.title}</h2>
//         <p>{jobOffer.description}</p>
//         <p>{jobOffer.company}</p>
//         <p>{jobOffer.salary}</p>
//         <p>{jobOffer.location}</p>
//         {/* <button onClick={() => prepareForm(jobOffer._id)}>Apply</button> */}
//         <button
//           onClick={() => {
//             localStorage.setItem("id", jobOffer._id);
//             setShowApplicationForm(true);
//           }}
//         >
//           apply
//         </button>
//       </div>
//     ))}
//   </div>
// );

