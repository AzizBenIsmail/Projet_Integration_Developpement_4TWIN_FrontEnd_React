import { useState ,useEffect } from "react";
import DemoNavbar from "../../../components/Navbars/DemoNavbar";
import { Container,Row ,Col } from 'reactstrap';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FablabList = () => {

    const navigate = useNavigate()
   const [fablabs,setFablabs]=useState([])
   const handleViewProfile = (fablab) => {
    navigate("/profile-page", { state: { e: fablab } });
  };
   const getAllFablabs=async()=>{
    const res = await axios.get(`http://localhost:5000/fablabs`)
      .then(res => {
        
        if (res.data.fablabs){
            setFablabs(res.data.fablabs);
        }
       
        
      })
      .catch(err => {
        console.log(err);
        console.log(fablabs);
      });
  }
  useEffect(() => {
    getAllFablabs(); 
      
  }, []);

    return(
        <>
        
        <DemoNavbar />
        <style>
            {`
           .card{
            width: 400px;
            border: none;
            border-radius: 10px;
             
            background-color: #fff;
          }
          
          
          
          .stats{
          
                background: #f2f5f8 !important;
          
              color: #000 !important;
          }
          .articles{
            font-size:10px;
            color: #a1aab9;
          }
          .number1{
            font-weight:500;
          }
          .followers{
              font-size:10px;
            color: #a1aab9;
          
          }
          .number2{
            font-weight:500;
          }
          .rating{
              font-size:10px;
            color: #a1aab9;
          }
          .number3{
            font-weight:500;
          }
          
           
            `}
        </style>
      <main>
        <section className="section-shaped my-0">
          <div className="shape shape-style-1 shape-default alpha-4">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span /> 
            
          </div>
          <div className="separator separator-bottom separator-skew">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon className="fill-white" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
          <Container className="pt-lg pb--300 ml-8" >
           <Row style={{marginRight:"-120px", minHeight:"500px"}} >
              <Col>
                <Row className="row-grid">
                
                 {fablabs.length > 0  ? (fablabs.map((fablab) => (<>
                    <Col lg="4" className="py-4" >
                  <div className="card p-3">
                
                    <div className="d-flex align-items-center">

                        <div className="image">
                    <img src={`http://localhost:5000/images/${fablab.image_user}`} className="rounded" width="155" />
                    </div>

                    <div className="ml-3 w-100">
                        
                    <h4 className="mb-0 mt-0">{fablab.username}</h4>
                    <span>founded in {new Date(fablab.dateOfBirth).getFullYear()}-{new Date(fablab.dateOfBirth).getMonth() + 1}-{new Date(fablab.dateOfBirth).getDate()}</span>

                    <div className="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">

                        <div className="d-flex flex-column">

                            <span className="articles">Invests</span>
                            <span className="number1">{fablab.invests.length}</span>
                            
                        </div>

                        <div className="d-flex flex-column">

                            <span className="followers">Events</span>
                            <span className="number2">{fablab.events.length}</span>
                            
                        </div>


                        <div className="d-flex flex-column">

                            <span className="rating">Since</span>
                            <span className="number3">{new Date(fablab.created_at).getFullYear()}</span>
                            
                        </div>
                        
                    </div>


                    <div className="button mt-2 d-flex flex-row align-items-center">

                        <button className="btn btn-sm btn-primary w-100 ml-2"  onClick={(e) => handleViewProfile(fablab)}>View Profile</button>

                        
                    </div>


                    </div>

                        
                    </div>

                </div>

                  </Col>  
                </>))):(<>
                    <h1
                         className="d-flex justify-content-center align-items-start font-weight-bold"
                         style={{
                             fontSize: "30px",
                             fontWeight: 600,
                             marginLeft :"40%",
                             marginTop :"10%"
                         }}
                     >
                
                    No fablabs for now
                    </h1></>)}
                </Row>
              </Col>
           </Row>
      
            </Container>
        </section>
      
      
           </main>
        </>
    )
}

export default FablabList;
