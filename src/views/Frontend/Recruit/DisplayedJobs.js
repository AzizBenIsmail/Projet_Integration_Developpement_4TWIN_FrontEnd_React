import { useEffect, useState } from "react";
import JobOfferCard from "./JobOfferCard";
import JobOffer from "./JobOffer";
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const DisplayedJobs = ({jobOffer}) => {
    const [jobOffers, setJobOffers] = useState([]);
    const navigate=useNavigate();


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

const handleApply = () => {
    navigate("/FillApplication", { state: { jobId: jobOffer._id } });
  };


useEffect(() => {
  const getJobOffers = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/recruit/job-offers",
        config
      );
      console.log("before") ;       
      setJobOffers(data);
    } catch (err) {
      console.error(err);
    }
  };
  console.log("after") ;  
  getJobOffers();
}, [token]);    

return (
    <div>
      {jobOffers.map((jobOffer) => (
        <div key={jobOffer._id}>
          <h2>{jobOffer.title}</h2>
          <p>{jobOffer.description}</p>
          <p>{jobOffer.company}</p>
          <p>{jobOffer.salary}</p>
          <p>{jobOffer.location}</p>
          <button onClick={handleApply}>Apply</button>
        </div>
      ))}
    </div>
  );
  
}
export default DisplayedJobs;


//navigate('/OffersCreated',{state:{jobOffer:data}});