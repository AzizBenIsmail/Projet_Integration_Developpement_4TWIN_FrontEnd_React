import {    Button,    Card,    CardHeader,    CardBody,    FormGroup,    Form,    Input,    Container,    Row,    Col  } from "reactstrap";
  // core components
  
  import { useNavigate, useParams } from "react-router-dom";
  import axios from 'axios';
  import { useEffect, useState } from 'react';
  import Header from "components/Headers/Header";


  const FablabRequestDetails = () => {
    const navigate = useNavigate();
    const param = useParams();
    const [fablab, setFablab] = useState(null);
    const [is_treated, setIs_treated] = useState(null);
    const [is_accepted, setIs_accepted] = useState(null);

    const getFablab=async()=>{
        const res = await axios.get(`http://localhost:5000/fablabs/requests/${param.id}`)
          .then(res => {
            console.log(res.data);
            setFablab(res.data.fablab);
            setIs_treated(res.data.fablab.is_treated);
            setIs_accepted(res.data.fablab.is_accepted);
          })
          .catch(err => {
            console.log(err);
          });
      }
      const acceptFablab=async()=>{
        const result = window.confirm("Are you sure to accept this request ?");
              if (result) {
                //console.log(user);
               const res = await axios.post(`http://localhost:5000/fablabs/${param.id}`)
              .then(res => {
               console.log(res.data);
               navigate("/AdminFablabJoin");
               })
            .catch(err => {
                 console.log(err);
          });

            }
        
      }
      const declineFablab=async()=>{
        const result = window.confirm("Are you sure to decline this request ?");
              if (result) {
                const res = await axios.put(`http://localhost:5000/fablabs/${param.id}`)
          .then(res => {
            navigate(`/FablabRequestDetails/${param.id}`);
            console.log(res.data);
            setFablab(res.data.fablab);
            setIs_treated(res.data.fablab.is_treated);
            setIs_accepted(res.data.fablab.is_accepted);
          })
          .catch(err => {
            console.log(err);
          });
              }
        
      }
      useEffect(() => {
        getFablab(); 
        const interval = setInterval(() => {
          getFablab(); // appel répété toutes les 10 secondes
        }, 10000);
        return () => clearInterval(interval); // nettoyage à la fin du cycle de vie du composant   
        
      },[]);
      useEffect(() => {
        console.log(fablab);
        console.log(is_treated);
        console.log(is_accepted);
      }, [fablab,is_treated,is_accepted]);
    return (  
      <>
      <Header />
      {fablab && (
        <>
        <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "300px",
          backgroundImage:
            "url(" + require("../../../assets/img/theme/profile-cover.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top"
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        
      </div>
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={`http://localhost:5000/images/${fablab.fablbLogo}`}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="Secondary"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    
                  </Button>
                  {is_treated && (
                    <>
                    {is_accepted ? (<Button
                    className="float-right"
                    color="success"
                    disabled
                    size="sm"
                  >
                    Accepted
                  </Button>) : (<Button
                    className="float-right"
                    color="danger"
                    disabled
                    size="sm"
                  >
                    Not Accepted
                  </Button>)}</>)}
                  
                </div>
              </CardHeader>
                <CardBody className="pt-0 pt-md-1">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span className="heading">{fablab.fablabName}</span>
                          <span className="description">founded in {new Date(fablab.dateOfCreation).getFullYear()}</span>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <div className="text-center">
                    <h4>
                    <i class="fa fa-location-arrow" />
                      <span className="font-weight-light">  {fablab.address}</span>
                    </h4>
                   
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      <i class="fa fa-phone fa-rotate-90" ></i> {fablab.phoneNumber}
                    </div>
                    <div>
                      <i className="ni education_hat mr-2" />
                      <i class="fa fa-envelope"> </i>  {fablab.fablabEmail}
                        
                    </div>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                     
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Accept This Request ?</h3>
                    </Col>
                    {!is_treated ?(
                    <Col className="text-right" xs="4">
                    <Button 
                    color="success"
                     type="button" 
                    style={{ borderRadius: '80%', backgroundColor: '#2DCE89',width: '40px', height: '40px' }}
                    onClick={(e) => acceptFablab()} >
                     <span className="btn-inner--icon">
                     <i class="fa fa-check " style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}></i>
                     </span>
                     </Button>
                     <Button color="danger"
                      type="button"
                       style={{ borderRadius: '80%', backgroundColor: 'red',width: '40px', height: '40px' }}
                       onClick={(e) => declineFablab()}>
                     <span className="btn-inner--icon">
                     <i class="fa fa-times" style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}></i>
                     </span>
                     </Button>
                    </Col>):(
                       <Col className="text-right" xs="4">
                       <Button
                         color="success"
                         disabled
                         size="m"
                       >
                        This Request is treated
                       </Button>
                     </Col>
                    )}
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                   
                    <div className="pl-lg-4">
                      
                        <Row lg="6">
                            <h2  className="form-control-label" >Fablab Request</h2>
                        </Row>
                        <Row >
                            <p>{fablab.description}</p>
                        </Row>
                      
                      
                       
                    </div>
                    
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      
      </>
      )}
      </>
    );
  };
  
  export default FablabRequestDetails;
  