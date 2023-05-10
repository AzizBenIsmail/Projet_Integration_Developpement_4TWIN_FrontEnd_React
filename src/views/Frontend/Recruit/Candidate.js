import React from 'react';
///import JobOffer from "./JobOffer";
import Modals from "./Modals";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Row
} from "reactstrap";
import ResumeModal from './ResumeModal';
import ReactStoreIndicator from 'react-score-indicator';

const Candidate = ({ candidate  }) => {
  const [resume, setResume] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const handleQuickReview = () => {
    setShowDetails(true);
  };
  
  
  return (
    <>
    {/* <style>
      {`.score {
    display: inline-block;
    width: 50px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    border: 1px solid black;
    border-radius: 5px;
    font-weight: bold;
    color: white;
    background-color: ${(Math.round(candidate.score * 100)) < 25 ? "red" : (Math.round(candidate.score * 100)) < 50 ? "yellow" : (Math.round(candidate.score * 100)) < 75 ? "blue" : "green"};
  }

  .sentiment {
    display: inline-block;
    width: 50px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    border: 1px solid black;
    border-radius: 5px;
    font-weight: bold;
    color: white;
    background-color: ${(Math.abs(Math.round(candidate.sentimentScore * 100)) < 25) ? "red" : (Math.abs(Math.round(candidate.sentimentScore * 100)) < 50) ? "yellow" : (Math.abs(Math.round(candidate.sentimentScore * 100)) < 75) ? "blue" : "green"};
  }
`}
    </style> */}
    <div >
      
      <h2>First name: {candidate.firstName}</h2>
      <h2>Last name :{candidate.lastName}</h2>
      <h2>Address: {candidate.adresse}</h2>
      <h2>Email: {candidate.email}</h2>
      <h2>Phone: {candidate.phone}</h2>
      <>
      {showDetails && (
    
      <div>
        <h2>Score: {(Math.round(candidate.score * 100)).toFixed(2)} %</h2>
      
       
        <h2>Sentiment Score: {(candidate.sentimentScore < 0)
          ? Math.abs(-candidate.sentimentScore * 1000).toFixed(2) 
          : Math.abs(candidate.sentimentScore * 1000).toFixed(2)} %  </h2> 
      
        {/* <p>score: <span style={{ display: 'inline-block', width: '50px',  
        height: '20px', textAlign: 'center',
        lineHeight: '20px',
        border: '1px solid black',
        borderRadius: '5px',
        fontWeight: 'bold',
        color: 'white', backgroundColor: (Math.round(candidate.score * 100).toFixed(2) < 50) ? 'red' : 'green' }}>{(Math.round(candidate.score * 100)).toFixed(2)} </span>%</p>
      
       
        <p>sentimentScore:<span style={{ display: 'inline-block', marginLeft: '10px', padding: '5px', borderRadius: '5px', backgroundColor: (Math.abs(candidate.sentimentScore * 1000).toFixed(2) < 50) ? 'red' : 'green' }}>{(candidate.sentimentScore < 0)
          ? Math.abs(-candidate.sentimentScore * 1000).toFixed(2) 
          : Math.abs(candidate.sentimentScore * 1000).toFixed(2)} % </span> </p> */}
      
    </div>
  )}
 
 
  
  <Button style={{ width: '100%' , marginTop: '15px' , backgroundColor:'#1560BD', color:'white'}} 
onClick={handleQuickReview}>Quick Preview</Button>
</>
      {/* {showDetails && (
        <>
          <p>score: {candidate.score}</p>
          <p>sentimentScore: {candidate.sentimentScore}</p>
        </>
        
      )} */}
      {resume && <iframe src={resume} width="100%" height="500px" />}
      <ResumeModal  url = {`http://localhost:5000/resumes/${candidate.resume}`}></ResumeModal>
    </div>
    </>
  );
  
  };

  export default Candidate;
  