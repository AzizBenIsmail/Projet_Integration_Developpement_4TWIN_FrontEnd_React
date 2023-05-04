//// hedha candidate list 
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useLocation } from 'react-router-dom';
// import Cookies from 'js-cookie';


// const CandidateList = ({ candidates }) => {
//   // const { paramId } = useParams();
//   // const [candidates, setCandidates] = useState([]);
//   // const [joId,setJoId]= useState("");
//   console.log("ee");
//   //const location=useLocation();
//      /////cookies
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


//   return (
//     <div>
//       <h1>Candidates List</h1>
//       <ul>
//         {candidates.map(candidate => (
//           <li key={candidate._id}>
//             {candidate.firstName} - {candidate.email}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


///// w hedha offers created 
// import { useEffect, useState } from "react";
// import JobOfferCard from "./JobOfferCard";
// import JobOffer from "./JobOffer";
// import Cookies from "js-cookie";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import CandidateList from "./CandidateList";

// const OffersCreated = () => {
//   const [jobOffers, setJobOffers] = useState([]);
//   const [currentUser, setCurrentUser] = useState("");
//   const [candidates, setCandidates] = useState([]);
//   const [joId,setJoId]= useState("");
//   const navigate = useNavigate();

//   /////cookies
//   if (!Cookies.get("user")) {
//     window.location.replace("/login-page");
//   }

//   const token = JSON.parse(Cookies.get("user")).token;
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   ////////


  
// const handleView = async (event, joId) => {
//     event.preventDefault();
//     setJoId(localStorage.getItem("joId"));
//     setJoId(joId);

//     try {
//       const response = await axios.get(
//         `http://localhost:5000/recruit/list-job-offers/${joId}`,config);
//       const data = response.data;
//        console.log("data : ",data); 
//       setCandidates(data);
//     } catch (error) {
//       console.log(error);
//     }
 
//     navigate(`/CandidateList`);

//   }


//   useEffect(() => {
//     const fetchJobOffers = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/recruit/getBOO",
//           config
//         );
//         const data = response.data;

//         setJobOffers(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchJobOffers();
//   }, []); //ken fama currentUser

//   console.log(jobOffers);
//   if (jobOffers.length > 0) {
//     return (
//       <div>
//         <h1>Job Offers Created</h1>
//         {jobOffers.map((jobOffer) => (
//           <div key={jobOffer._id}>
//             <JobOffer jobOffer={jobOffer} />
           
//             <button
//              onClick={(event) => {
//               setJobOffers(jobOffer);
//               setJoId(jobOffer._id);
//               handleView(event, joId);
//               }
              
            
//               }
//               >View Candidates</button>
              
//             <CandidateList candidates={candidates} />
//           </div>
//         ))}
//       </div>
//     );
//   }
//   return <p>No jobs created</p>;
// };

// export default OffersCreated;
