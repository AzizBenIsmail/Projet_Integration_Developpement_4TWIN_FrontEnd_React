import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const JobOfferCard = ({}) => {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [resume, setResume] = useState(null);
  const [availability, setAvailability] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [adresse, setAdresse] = useState("");
  const locationE = useLocation();
  const jobOffer = locationE.state.jobOffer;

  const handleApply = async (candidate) => {
    const formData = new FormData();
    formData.append("jobOfferId", jobOffer.id);
    formData.append("candidateId", candidate.id);
    formData.append("resume", resume);
    formData.append("availability", availability);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("adresse", adresse);

    try {
      const response = await fetch("http://localhost:5000/recruit/apply", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data.message); // success message from the backend
    } catch (err) {
      console.error(err);
    }
  };

  const handleResumeChange = (event) => {
    setResume(event.target.files[0]);
  };

  if (showApplicationForm) {
    return (
      <form onSubmit={handleApply}>
        <label htmlFor="firstName">First Name</label>
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
        <label htmlFor="adresse">adresse</label>
        <input
          type="text"
          id="adresse"
          value={adresse}
          onChange={(event) => setAdresse(event.target.value)}
        />
        <label htmlFor="resume">Resume</label>
        <input type="file" id="resume" onChange={handleResumeChange} />
        <label htmlFor="availability">Availability</label>
        <select
          id="availability"
          value={availability}
          onChange={(event) => setAvailability(event.target.value)}
        >
          <option value="part-time">Part-time</option>
          <option value="full-time">Full-time</option>
        </select>
        <button type="submit">Submit Application</button>
      </form>
    );
    }
    return(
      <div>
        <h2>Job Title: {jobOffer.title}</h2>
        <p>Description: {jobOffer.description}</p>
        <p>Company: {jobOffer.company}</p>
        <p>Salary: {jobOffer.salary}</p>
        <p>Location: {jobOffer.location}</p>
        <button onClick={() => setShowApplicationForm(true)}>Apply</button>
      </div>
    );

  /*
  const deleteJobOffer = async (id) => {
  try {
    const response = await fetch(`/api/delete/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data.message); // success message from the backend
  } catch (err) {
    console.error(err);
  }
};
const JobOfferCard = ({ jobOffer }) => {
  const handleDelete = () => {
    deleteJobOffer(jobOffer._id);
  };

  return (
    <div>
      <h2>Job Title: {jobOffer.title}</h2>
      <p>Description: {jobOffer.description}</p>
      <p>Company: {jobOffer.company}</p>
      <p>Salary: {jobOffer.salary}</p>
      <p>Location: {jobOffer.location}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

  */

  // return (
  //   <>
  //     <DemoNavbar />
  //     <main>
  //       <div className="position-relative bg-primary ">{/* shape Hero */}</div>
  //       <section className="section section-lg bg-gradient-default">
  //         <Container className="pt-lg-7">
  //           <Row className="justify-content-center">
  //             <Col lg="5">
  //               <div className="ml-9 text-success font-weight-bold">
  //                 Apply on a job
  //               </div>

  //               <Card className="bg-secondary shadow border-0">
  //                 <CardBody className="px-lg-5 py-lg-5">
  //                   <Form role="form" enctype="multipart/form-data">
  //                     <Form.Group>
  //                       <Form.Label>Job Title:</Form.Label>
  //                       <h2>{jobOffer.title}</h2>
  //                     </Form.Group>
  //                     <Form.Group>
  //                       <Form.Label>Description :</Form.Label>
  //                       <p>{jobOffer.description}</p>
  //                       <Form.Label>Company :</Form.Label>
  //                       <p>{jobOffer.company}</p>
  //                       <Form.Label>Salary :</Form.Label>
  //                       <p>{jobOffer.salary}</p>
  //                       <Form.Label>Location :</Form.Label>
  //                       <p>{jobOffer.location}</p>
  //                     </Form.Group>
  //                     <div className="text-center">
  //                       <button onClick={() => setShowApplicationForm(true)}>
  //                         Apply
  //                       </button>
  //                     </div>
  //                   </Form>
  //                 </CardBody>
  //               </Card>
  //             </Col>
  //           </Row>
  //         </Container>
  //       </section>
  //     </main>
  //   </>
 
};

export default JobOfferCard;
