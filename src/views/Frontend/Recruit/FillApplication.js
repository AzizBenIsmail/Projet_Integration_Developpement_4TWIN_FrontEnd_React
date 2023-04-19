import { useEffect, useState } from "react";
import JobOfferCard from "./JobOfferCard";
import JobOffer from "./JobOffer";
import Cookies from 'js-cookie';
import axios from 'axios';

const FillApplication = ({jobId }) => {
    const [resume, setResume] = useState(null);
    const [availability, setAvailability] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [location, setLocation] = useState("");
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
  
  const handleApply = async (jobOffer , candidate) => {
    const formData = new FormData();
    formData.append("jobOffer", jobOffer.id);
    formData.append("candidate", candidate.id);
    formData.append("resume", resume);
    formData.append("availability", availability);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("location", location);
    formData.append("email", email);
    formData.append("phone", phone);
  
  
    try {
      const response = await axios.post("http://localhost:5000/recruit/apply", formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "foo": "bar",
          },
          ...config,
        }
      );
      const data = response.data;
      console.log(data);
      console.log(data.message); // success message from the backend
    } catch (err) {
      console.error(err);
    }
  };
  const handleResumeChange = (event) => {
    setResume(event.target.files[0]);
  };
  

    return (
      <form onSubmit={handleApply}>
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" value={firstName} onChange={(event) => setFirstName(event.target.value)}/>
  
        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" value={lastName} onChange={(event) => setLastName(event.target.value)}/>
  
        <label htmlFor="location">Location</label>
        <input type="text" id="location" value={location} onChange={(event) => setLocation(event.target.value)}/>
  
        <label htmlFor="email">Email</label>
        <input type="text" id="email" value={email} onChange={(event) => setEmail(event.target.value)}/>
  
        <label htmlFor="phone">Phone Number</label>
        <input type="text" id="phone" value={phone} onChange={(event) => setPhone(event.target.value)}/>
  
        <label htmlFor="availability">Availability</label>
        <select id="availability" value={availability} onChange={(event) => setAvailability(event.target.value)}>
          <option value="part-time">Part-time</option>
          <option value="full-time">Full-time</option>
        </select>
        <label htmlFor="resume">Resume</label>
        <input type="file" id="resume" onChange={handleResumeChange} />
        <button type="submit">Submit Application</button>
      </form>
    );
}

export default FillApplication;