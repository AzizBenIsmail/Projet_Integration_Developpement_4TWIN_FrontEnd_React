import React from "react";
import { Link } from "react-router-dom";

const JobOffer = ({ jobOffer, showDetails  }) => {
  return (
    <div>
      <h2>Title: {jobOffer.title}</h2>
      <p>Description: {jobOffer.aboutCompany}</p>
      <p>Company: {jobOffer.company}</p>
      <p>Salary: {jobOffer.salary}</p>
      <p>Location: {jobOffer.location}</p>
      {showDetails && (
        <>
          <p>About Company: {jobOffer.aboutCompany}</p>
          <p>About Job: {jobOffer.aboutJob}</p>
          <p>Responsibilities: {jobOffer.responsibilities}</p>
          <p>Requirements: {jobOffer.requirements}</p>
          <p>Experience Needed: {jobOffer.experienceNeeded}</p>
          <p>Salary: {jobOffer.salary}</p>
        </>
      )}
    </div>
  );
};

export default JobOffer;

{
  /* <Link to={`/job-offers/${jobOffer._id}/candidates`}>View Candidates</Link> */
}
