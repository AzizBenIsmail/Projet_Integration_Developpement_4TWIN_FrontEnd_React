import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import JobOffer from "./JobOffer";
import { FormSelect } from "react-bootstrap";
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
  Button,
} from "reactstrap";
import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import DemoNavbar from "../../../components/Navbars/DemoNavbar";

const ListOfJobs = () => {
  const [jobOffers, setJobOffers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  //const [currentId, setCurrentId] = useState("123");
  const [resume, setResume] = useState(null);
  const [availability, setAvailability] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [adresse, setAdresse] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

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
        console.log("before");
        setJobOffers(data);
      } catch (err) {
        console.error(err);
      }
    };
    console.log("after");
    getJobOffers();
  }, []);

  const handleApply = async (event, jobOffer, candidate) => {
    event.preventDefault();
    // console.log("data", event.target);
    //console.log("data", event.target["availability"].value);
    const datas = {
      jobOfferId: localStorage.getItem("id"),
      candidateId: localStorage.getItem("userid"),
      resume: "resume",
      availability: event.target["availability"].value,
      firstName: event.target["firstName"].value,
      lastName: event.target["lastName"].value,
      adresse: event.target["adresse"].value,
      email: event.target["email"].value,
      phone: event.target["phone"].value,
    };
    console.log("data", datas);
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
    try {
      const response = await axios.post(
        "http://localhost:5000/recruit/apply",
        datas,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            foo: "bar",
          },
          ...config,
        }
      );

      const data = response.data;

      console.log(data.message); // success message from the backend
    } catch (err) {
      console.error(err);
    }
  };

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
    setResume(event.target.files[0]);
  };

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
                    className="ml-9 pb-4 text-success font-weight-bold"
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
                        onSubmit={handleApply}
                        role="form"
                        enctype="multipart/form-data"
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
                              id="firstName"
                              value={firstName}
                              onChange={(event) =>
                                setFirstName(event.target.value)
                              }
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
                              id="lastName"
                              value={lastName}
                              onChange={(event) =>
                                setLastName(event.target.value)
                              }
                            />
                          </InputGroup>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Adresse</Form.Label>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-briefcase-24" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Form.Control
                              type="text"
                              id="adresse"
                              value={adresse}
                              onChange={(event) =>
                                setAdresse(event.target.value)
                              }
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
                              id="email"
                              value={email}
                              onChange={(event) => setEmail(event.target.value)}
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
                              id="phone"
                              value={phone}
                              onChange={(event) => setPhone(event.target.value)}
                            />
                          </InputGroup>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Availability</Form.Label>

                          <Input
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
                          </Input>
                        </Form.Group>

                        {/* <Form.Group> */}
                        <Form.Label>Resume</Form.Label>
                        {/* <InputGroup className="input-group-alternative mb-3"> */}
                        {/* <InputGroupAddon addonType="prepend"> */}
                        <CustomFileInput
                          id="resume"
                          onChange={handleResumeChange}
                        >
                          {/* <Form.Control
                             type ="file"  id="resume" 
                          /> */}
                          {/* <i className="ni ni-briefcase-24" /> */}
                        </CustomFileInput>
                        {/* </InputGroupAddon> */}

                        {/* </InputGroup> */}
                        {/* </Form.Group> */}

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
          <div
            className="justify-content-center"
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            {jobOffers.map((jobOffer) => (
              <div key={jobOffer._id} style={{ margin: "10px" }}>
                <Card style={{ width: "18rem" }}>
                  <CardBody>
                    {/* <CardTitle>{jobOffer.title}</CardTitle> */}
                    <JobOffer jobOffer={jobOffer} />
                    <Button
                      onClick={() => {
                        localStorage.setItem("id", jobOffer._id);
                        setShowApplicationForm(true);
                      }}
                    >
                      Apply
                    </Button>
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

{
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
}
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

//
