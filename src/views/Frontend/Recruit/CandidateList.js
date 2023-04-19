import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import Candidate from "./Candidate";
import DemoNavbar from "../../../components/Navbars/DemoNavbar";
import { Container, Form } from "react-bootstrap";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  Col,
  Row,
} from "reactstrap";

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  // const [joId, setJoId] = useState("");
  // const joId = localStorage.getItem("joId");
  //setJoId(localStorage.getItem("joId"));
  const {jobId}  = useParams();
  const [caId, setCaId] = useState("");
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
  console.log(jobId);
  useEffect(() => {
    console.log("test");
    const getCandidates = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/recruit/list-job-offers/${jobId}`,
          config
        );
        const data = response.data;
        console.log(data);
        // console.log("heey");
        setCandidates(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCandidates();
  }, []); //candidates
  console.log(candidates);

  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      await axios.delete(
        `http://localhost:5000/recruit/deleteCandidate/${caId}`,
        config
      ); 
      window.location.replace(`/CandidateList/${jobId}`);
    } catch (err) {
      console.log(err);
    }
  };


  if(candidates.length > 0) {
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
            Candidates
          </h1>

          <div
            className="justify-content-center"
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            {candidates.map((candidate) => (
              <div key={candidate._id}>
                <Card style={{ width: "18rem" }}>
                  <CardBody>
                    <Candidate candidate={candidate} />
                    <Button
                        color="danger"
                        href="#pablo"
                        onClick={(event) => {
                          setCaId(candidate._id);
                          handleDelete(event); // kenet , joId
                        }}
                      >
                        Delete
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
                    No Candidates Yet.
                  </h1>
        
                  
                </section>
              </main>
            </>
             )
};

export default CandidateList;

// const data = location.state?.job;
// console.log('data',data)
// const id = "643b45686db70f5c7616c8eb";
// console.log(paramId);

// setJoId(localStorage.getItem("joId"));
// console.log(joId);

// useEffect(() => {
//   const getCandidates = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/recruit/list-job-offers/${joId}`,config);
//       const data = response.data;
//        console.log(data);
//       // console.log("heey");
//       setCandidates(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   getCandidates();
// }, [joId]);

// console.log("candidates: ",candidates.candidates);
//if (candidates && candidates.candidates.length > 0) {
// return (
//   <div>
//     <h1>Candidates for Job Offer ID: {joId}</h1>
//     <ul>
//       {candidates.map(candidate => (
//         <li key={candidate._id}>
//           {candidate.firstName} - {candidate.email}
//         </li>
//       ))}
//     </ul>
//   </div>
// );
// } else {
//   return (
//     <div>
//       <h1>No Candidates Found for Job Offer ID: {id}</h1>
//     </div>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import axios from 'axios';
// import { useParams } from "react-router-dom";

// console.log("hee");

// const CandidateList = () => {
//   const [candidates, setCandidates] = useState([]);
//   console.log("candidates");
//    /////cookies
//    if (!Cookies.get("user")) {
//     window.location.replace("/login-page");
//   }

//   const token = JSON.parse(Cookies.get("user")).token;
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
// ////////

// //const params = useParams();
// //console.log(params);

// const { jobOfferId } = useParams();

//   useEffect(() => {
//     const fetchCandidates = async () => {
//       try {
//       const response  = await
//       axios.get(`http://localhost:5000/recruit/list-job-offers/${jobOfferId}`, config);
//       const data = response.data;

//       setCandidates(data);
//       console.log(candidates);
//     } catch (error) {
//       console.log(error);
//     }
//     };
//     fetchCandidates();
//   }, [jobOfferId]);

//   console.log(candidates);
//   // const handleApprove = async (id) => {
//   //   await axios.put(`http://localhost:5000/recruit/candidates${id}`, { status: 'accepted' });
//   //   const updatedCandidates = candidates.map((candidate) => {
//   //     if (candidate._id === id) {
//   //       return { ...candidate, status: 'accepted' };
//   //     }
//   //     return candidate;
//   //   });
//   //   setCandidates(updatedCandidates);
//   // };

//   // const handleDecline = async (id) => {
//   //   await axios.put(`http://localhost:5000/recruit/candidates${id}`, { status: 'rejected' });
//   //   const updatedCandidates = candidates.map((candidate) => {
//   //     if (candidate._id === id) {
//   //       return { ...candidate, status: 'rejected' };
//   //     }
//   //     return candidate;
//   //   });
//   //   setCandidates(updatedCandidates);
//   // };

//   return (
//     <div>
//       <h2>Candidate List</h2>
//       {/* <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Location</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {candidates.map((candidate) => (
//             <tr key={candidate._id}>
//               <td>{candidate.firstName} {candidate.lastName}</td>
//               <td>{candidate.location}</td>
//               <td>{candidate.status}</td> */}
//               {/* <td>
//                 {/* <Link to={`/candidate/${candidate._id}`}>Details</Link> */}
//                 {/* <button onClick={() => handleApprove(candidate._id)}>Approve</button>
//                 <button onClick={() => handleDecline(candidate._id)}>Decline</button> */}
//               {/* </td> */}
//             {/* </tr>
//           ))}
//         </tbody>
//       </table> */}
//     </div>
//   );
// };

// export default CandidateList;
