import React, { useState, useEffect } from "react";

const EmployerOffers = () => {
  const [jobOffers, setJobOffers] = useState([]);
  
  useEffect(() => {
    const getJobOffers = async () => {
      try {
        const response = await fetch("http://localhost:5000/recruit/job-offers");
        const data = await response.json();
        setJobOffers(data);
      } catch (err) {
        console.error(err);
      }
    };
    getJobOffers();
  }, []);

  return (
    <div>
      {jobOffers.map((jobOffer) => (
        <div key={jobOffer._id}>
          <h2>{jobOffer.title}</h2>
          <p>{jobOffer.description}</p>
          <p>{jobOffer.company}</p>
          <p>{jobOffer.salary}</p>
          <p>{jobOffer.location}</p>
        </div>
      ))}
    </div>
  );
};

export default EmployerOffers;



