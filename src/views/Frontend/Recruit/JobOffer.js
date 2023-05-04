import React from "react";
import { Link } from "react-router-dom";

const JobOffer = ({ jobOffer }) => {
  return (
    <div>
      <h2>Title: {jobOffer.title}</h2>
      <p>Description: {jobOffer.description}</p>
      <p>Company: {jobOffer.company}</p>
      <p>Salary: {jobOffer.salary}</p>
      <p>Location: {jobOffer.location}</p>
    </div>
  );
};

export default JobOffer;

{
  /* <Link to={`/job-offers/${jobOffer._id}/candidates`}>View Candidates</Link> */
}
