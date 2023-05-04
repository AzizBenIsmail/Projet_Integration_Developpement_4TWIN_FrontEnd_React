import { useEffect, useState } from "react";
import JobOfferCard from "./JobOfferCard";
import JobOffer from "./JobOffer";
import Cookies from "js-cookie";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import CandidateList from "./CandidateList";
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
  Modal
} from "reactstrap";

const OffersCreated = () => {
  const [jobOffers, setJobOffers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [joId, setJoId] = useState("");
  const navigate = useNavigate();
   
  const businessOwnerId = localStorage.getItem("userid");
 

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
  
  //const businessOwnerId = "64398dc36852045a473bdbba";
  const handleView = async (event,id) => {
    //kenet , joId
    event.preventDefault();
    navigate(`/CandidateList/${id}`)
  };

   useEffect(() => {
    const fetchJobOffers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/recruit/findBOOffers/${businessOwnerId}`,
          config
        );
        const data = response.data;

        setJobOffers(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobOffers();
  }, []);
  
  // useEffect(() => {
  //   const fetchJobOffers = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:5000/recruit/getBOO",
  //         config
  //       );
  //       const data = response.data;

  //       setJobOffers(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchJobOffers();
  // }, []); //ken fama currentUser

  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      await axios.delete(
        `http://localhost:5000/recruit/delete/${joId}`,
        config
      ); 
      window.location.replace("/OffersCreated");
    } catch (err) {
      console.log(err);
    }
  };
  console.log(jobOffers);
  if (jobOffers.length > 0) {
    return (
      <>
        <DemoNavbar />
        <main>
          <div className="position-relative bg-primary "></div>
          <section className="section section-lg bg-gradient-default">
            <h1
              className="d-flex pb-4 justify-content-center align-items-start  text-success font-weight-bold"
              style={{
                fontSize: "30px",
                fontWeight: 600,
                color: "#4a4a4a",
                textShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              Job Offers Created
            </h1>

            <div
              className="ml-1 mr-1 justify-content-center"
              style={{ display: "flex", flexWrap: "wrap" }}
            >
              {jobOffers.map((jobOffer) => (
                <div key={jobOffer._id} style={{ margin: "10px" }}>
                  <Card style={{ width: "18rem" }}>
                    <CardBody>
                      {/* <CardTitle>{jobOffer.title}</CardTitle> */}
                      <JobOffer jobOffer={jobOffer} />
                      <Button
                        //block
                        color="primary"
                        type="button"
                        onClick={(event) => {
                          //this.toggleModal("notificationModal");
                          handleView(event,jobOffer._id);
                        }}
                      >
                        View Candidates
                      </Button>
          
                      <Button
                        color="danger"
                        href="#pablo"
                        onClick={(event) => {
                          setJoId(jobOffer._id);
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
          No Job Offers Created.
        </h1>

        
      </section>
    </main>
  </>
   )
};
export default OffersCreated;

// nekhdem el khedma nlem data f offerscreated mbaed naabthhom f props l candidatelist w naamel navigate bch ki toul nemchy lcnadidate list nalkaha hadhra data

//////////////////////////////// hedhom kenou taht setJobOffers(jobOffers) f onclick
// navigate(
//    `/CandidateList/${jobOffer._id}`
//window.location.replace(`/CandidateList/${jobOffer._id}`);
//localStorage.setItem("joId", jobOffer._id);
// { state: { jobOffer: jobOffers } }
// );

//onClick={() =>
//     setJobOffers(jobOffer);
//     localStorage.setItem("joId", jobOffer._id);
//     handleView();
//   }}
// >
//   View Candidates
// </button>
