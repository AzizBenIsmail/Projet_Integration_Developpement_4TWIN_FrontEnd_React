import { useState, useEffect } from "react";
import axios from "axios";
import JobOffer from "./JobOffer";
import Cookies from "js-cookie";
import DemoNavbar from "../../../components/Navbars/DemoNavbar";
import {
  Button,
  Card,
  CardBody,
 
} from "reactstrap";
function VoiceSearch() {
    const [searchText, setSearchText] = useState("");
    const [jobOffers, setJobOffers] = useState([]);

    
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

    const handleVoiceSearch = () => {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = "en-US";
      recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        setSearchText(result);
      };
      recognition.start();
    };

 
    const handleSearch = async () => {       
      console.log("aaa");     //Search hedhy
        try {
          const response = await axios.get(`http://localhost:5000/recruit/search/jobs?title=${searchText}`,
          config
          );
          const data = response.data;
         
          setJobOffers(jobOffers);
        } catch (err) {
          console.log(err);
        }
        console.log(jobOffers);
      };

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
              Jobs Offers
            </h1>

            <div
              className="justify-content-center"
              style={{ display: "flex", flexWrap: "wrap" }}
            >
              {jobOffers.map((jobOffer) => (
                <div key={jobOffer._id} style={{ margin: "10px" }}>
                  <Card style={{ width: "18rem" }}>
                    <CardBody>
                      {/* <CardTitle>{jobOffer.title}</CardTitle> */}
                      <JobOffer jobOffer={jobOffer} />
                      <Button
            onClick={() => {
              localStorage.setItem("id", jobOffer._id);
           
            }}
          >
            Apply
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
};

export default VoiceSearch;
//   if (jobOffers.length > 0) {
//     return (
//       <>
//       <div>
//         <button onClick={handleVoiceSearch}>Voice Search</button>
//         <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
//         <button sound-wave onClick={handleSearch}>Search</button>
// </div> 
//         <div>
//               {jobOffers.map((jobOffer) => (
//                 <div key={jobOffer._id} style={{ margin: "10px" }}>
//                   <Card style={{ width: "18rem" }}>
//                     <CardBody>
//                       {/* <CardTitle>{jobOffer.title}</CardTitle> */}
//                       <JobOffer jobOffer={jobOffer} />
                     
                      
//                     </CardBody>
//                   </Card>
//                 </div>
//               ))}
//             </div>
//        </>
//     );
      
//    return <p>No jobs created</p>;












      //   <Row>
    //         <Col md="6">
    //           <FormGroup>
    //             <InputGroup className="input-group-alternative mb-4">
    //               <InputGroupAddon addonType="prepend">
    //                 <InputGroupText>
    //                   <i className="ni ni-zoom-split-in" />
    //                 </InputGroupText>
    //               </InputGroupAddon>
    //               <Input
    //                 className="form-control-alternative"
    //                 placeholder="Search"
    //                 type="text"
    //               />
    //             </InputGroup>
    //           </FormGroup>
    //         </Col>
    //         <Col md="6">
    //           <FormGroup>
    //             <InputGroup className="input-group-alternative mb-4">
    //               <Input placeholder="Birthday" type="text" />
    //               <InputGroupAddon addonType="append">
    //                 <InputGroupText>
    //                   <i className="ni ni-zoom-split-in" />
    //                 </InputGroupText>
    //               </InputGroupAddon>
    //             </InputGroup>
    //           </FormGroup>
    //         </Col>
    //       </Row>