import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import classnames from "classnames";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Progress,
  Media,
  CardText,
  CardTitle
} from "reactstrap";
import { useNavigate , useParams} from "react-router-dom";
import Cookies from 'js-cookie';
import "assetsFrontOffice/vendor/nucleo/css/nucleo.css";
import "assetsFrontOffice/vendor/font-awesome/css/font-awesome.min.css";

import DemoNavbar from "../../../components/Navbars/DemoNavbar";
import axios from 'axios';
import Countdown from "./countDown";

export default function EventsFablab(props) {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [goingEvents, setGoingEvents] = useState([]);
  const [interestedEvents, setInterestedEvents] = useState([]);
  const [comingEvent, setComingEvent] = useState(null);
  const [bestEvent,setBestEvent]=useState(null)
  const style = `
  .countdown {
    margin-top: 10px;
  }
  .styled {
    margin-bottom: 60px;
  }
  .styled div {
    display: inline-block;
    margin-left: 0px;
    font-size: 40px;
    font-weight: normal;
    text-align: center;
    /* margin: 0 25px; */
    height: 100px;
    text-shadow: none;
    vertical-align: middle;
    color: #32325d;
    margin: 10px 30px;
    height: auto;
    padding-bottom: 15px;
    font-family: 'Fjalla One', sans-serif;
  }
  /* IE7 inline-block hack */
  *+html .styled div {
    display: inline;
    zoom: 1;
  }
  .styled div:first-child {
    margin-left: 0;
  }
  .styled div span {
    display: block;
    font-size: 17px;
    margin-top: 0px;
    font-weight: normal;
    text-align: center;
    text-transform: uppercase;
    border-top: 1px solid #f5365c;
    padding: 10px;
  }
  `;
  const { id } = useParams();
 
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
    function calculateDurationInDays(startDate, endDate) {
      const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
      const start = new Date(startDate);
      const end = new Date(endDate);
      const startUTC = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
      const endUTC = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
      let durationInMs = endUTC - startUTC;

      // If end time is later in the day than start time, add an extra day to the duration
      if (end.getHours() > start.getHours() || (end.getHours() === start.getHours() && end.getMinutes() > start.getMinutes())) {
        durationInMs += oneDay;
      }

      const durationInDays = Math.ceil(durationInMs / oneDay);
      if (durationInDays === 1){
        return `${durationInDays} day`;
      }
      return `${durationInDays} days`;
    }
    const getAllEventsFablab =async(url)=>{
      const res = await axios.get(url)
        .then(res => {
         // console.log(res.data.events);
          setEvents(res.data.events);
          setComingEvent(res.data.nearestEvent);
          setBestEvent(res.data.bestevent)
        })
        .catch(err => {
          console.log(err);
        });
    }

    const update = async (reaction,eventId) => {
     
      const formData = new FormData();
      formData.append("userId", "643216cd888293912452e8eb");
      formData.append("reaction", reaction);
      //console.log(formData);
      try {
        const res = await axios.put(`http://localhost:5000/events/${eventId}`, formData);
        //console.log(res.data);
        //console.log(res.data.message);
      } catch (error) {
        console.error(error);
      }
    };
    const isInterested = (event) => {
      return interestedEvents.includes(event._id) || event.interestedUsers.includes("643216cd888293912452e8eb");
    };

    const isGoing = (event) => {
      return goingEvents.includes(event._id) || event.participants.includes("643216cd888293912452e8eb");
    };
    
    const interested = (event) => {
      update("interested", event._id);
      if (event.interestedUsers.includes("643216cd888293912452e8eb")) {
        setInterestedEvents((prevInterestedEvents) => prevInterestedEvents.filter((item) => item !== event._id));
      } else {
        setInterestedEvents((prevInterestedEvents) => [...prevInterestedEvents, event._id]);
      }
      getAllEventsFablab('http://localhost:5000/events/')
    };
      
    const going = (e) =>{
      //console.log(e)
      update("going",e._id)
      if (e.participants.includes("643216cd888293912452e8eb")) {
        setGoingEvents((prevInterestedEvents) => prevInterestedEvents.filter((item) => item !== e._id));
      } else {
        setGoingEvents((prevInterestedEvents) => [...prevInterestedEvents, e._id]);
      }
  
      getAllEventsFablab('http://localhost:5000/events/')
      
    };
    function getFirstTwentyWords(str) {
      // Supprimer les caractères de ponctuation et diviser la chaîne en mots
      const words = str.replace(/[^\w\s]|_/g, "").split(/\s+/);
  
      // Retourner les 10 premiers mots
      return words.slice(0, 20).join(" ");
    }
    useEffect(() => {
      
      const url =  (props.fablabEvent && id)
      ? `http://localhost:5000/events/creator?id=${id}`
      : 'http://localhost:5000/events/'; 
      getAllEventsFablab(url); 
      
     /* const interval = setInterval(() => {
          getAllEventsFablab(url); // appel répété toutes les 10 secondes
        }, 10000);
        return () => clearInterval(interval); // nettoyage à la fin du cycle de vie du composant*/
    }, [id, props.fablabEvent,interestedEvents,goingEvents]);
    
  return (
    <>
     <style>
        {`
          .read-more {
            margin-left: 5px;
          }

          .read-more:hover {
            margin-left: 8px;
          }
        `}

      </style>
      <DemoNavbar />
      <main>
        <div className="position-relative bg-primary ">{/* shape Hero */}</div>
        <section className="section section-lg bg-gradient-default">
          <Container></Container>
          <Container className="pt-lg pb-300">
            {!id ? (<>{comingEvent && ( 
                 <Card style={{width: "99%",
                              height: "400px",
                              padding: "63px 0 62px",
                              position: "relative",
                              
                                      }}>
                          <div 
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                backgroundImage: `url(${`http://localhost:5000/images/${comingEvent.event_img}`})`,
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center center",
                                filter: "grayscale(100%)",
                                opacity: 0.7,
                              }}
                            />
                   
                    <CardBody  style={{ position: "absolute", bottom: 0,top:0, left: 0, right: 0 ,fontSize:"20px"}}>
                          <div className="font-weight-bold" style={{marginBottom:"20px"}}>
                            
                            <Badge className="badge-default" pill>
                            <i className="ni ni-calendar-grid-58" style={{marginRight:"5px"}}> </i> 
                            {calculateDurationInDays(comingEvent.start_date, comingEvent.end_date)}      
                            </Badge>
                           
                            <Badge color="primary" pill className="ml-2" >
                            <i className="ni ni-square-pin" style={{marginRight:"5px"}}> </i> 
                             {comingEvent.location}
                             
                            </Badge>
                            <Badge style={{color:"#1e8f5e"}} pill className="ml-1" >
                            <i className="ni ni-single-02" style={{marginRight:"5px"}}> </i> 
                             {comingEvent.participants.length} participants
                             
                            </Badge>
                            <Badge style={{color:"#f5365c"}} pill className="ml-1" >
                            <i className="ni ni-favourite-28" style={{marginRight:"5px"}}> </i> 
                             {comingEvent.interestedUsers.length} interested
                            </Badge>
                            
                          </div>

                          <CardTitle  style={{fontSize:"30px",bottom:"0px",color:"#172b4d"}}><b>{comingEvent.title}</b></CardTitle>
                        <CardText style={{fontSize:"20px",bottom:"0px",width:"700px",color:"#32325d"}}>
                          <span style={{backgroundColor:"#dee2e6"}}><b>{getFirstTwentyWords(comingEvent.description)} ...</b></span>
                        </CardText>
                        <Countdown datetime={comingEvent.start_date} style={style} />
                        <div style={{ display: 'flex', alignItems: 'center',height:"100%"  }} >
                            <a
                            color="primary"
                            
                            onClick={(e) => navigate(`/eventDetails/${comingEvent._id}`)}
                    
                            style={{fontSize: '17px',marginTop:"30px",cursor:"pointer"}}
                            className="read-more"

                            >
                             <div style={{ display: 'flex', alignItems: 'center',position: 'absolute', bottom:"30px",color:"#2f3e96", left: '25px' }}>
                              Read More   
                                 <i className="fas fa-arrow-right read-more" aria-hidden="true" style={{marginTop:"2px",marginLeft:"5px"}} ></i>
                                 
                              </div>
                           
                            </a>
                            
                            {!id && <div style={{ display: 'flex', alignItems: 'center',position: 'absolute', bottom: 0, right: '10px' }}>
                              <div style={{ display: 'flex', alignItems: 'center' ,flexDirection: "column"}}>
                                  <i className={`ni circle ni-favourite-28 ${
                                         isInterested(comingEvent)  ? 'bg-danger text-white' : 'bg-Secondary text-Default'
                                           }`} style={{cursor:"pointer"}} onClick={() => interested(comingEvent)}> </i> 
                                  <p style={{color:"#172b4d"}}><b>Interested</b></p>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center' ,flexDirection: "column",marginLeft: '20px'}}>
                                  <i className={`ni circle ni-check-bold ${
                                         isGoing(comingEvent) ? 'bg-green text-white' : 'bg-Secondary text-Default'
                                           }`} style={{cursor:"pointer"}} onClick={() => going(comingEvent)}> </i>
                                  <p style={{color:"#172b4d"}}><b>Going</b></p>
                              </div>
                              </div>
                            }
                            
                        </div>
                        <div style={{ position: "absolute", top:"10px",right:"10px" ,fontSize:"20px"}}>
                          <img src= {require("../../../assets/img/soon.gif")} />
                        </div>
                    </CardBody>
                  </Card>)}<div>
             
            
            
            </div></>):(<>
                  
                    
                    {bestEvent && (<Card style={{width: "99%",
                              height: "400px",
                              padding: "63px 0 62px",
                              position: "relative",
                              
                                      }}>
                          <div 
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                backgroundImage: `url(${`http://localhost:5000/images/${bestEvent.event_img}`})`,
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center center",
                                filter: "grayscale(50%)",
                                opacity: 0.7,
                              }}
                            />
                   
                    <CardBody  style={{ position: "absolute", bottom: 0,top:0, left: 0, right: 0 ,fontSize:"30px"}}>
                          <div className="font-weight-bold" style={{marginBottom:"20px"}}>
                            
                            <Badge className="badge-default" pill>
                            <i className="ni ni-calendar-grid-58" style={{marginRight:"5px"}}> </i> 
                            {calculateDurationInDays(bestEvent.start_date, bestEvent.end_date)}      
                            </Badge>
                          
                            <Badge style={{color:"#1e8f5e"}} pill className="ml-1" >
                            <i className="ni ni-single-02" style={{marginRight:"5px"}}> </i> 
                             {bestEvent.participants.length} participants
                            </Badge>
                            <Badge style={{color:"#f5365c"}} pill className="ml-1" >
                            <i className="ni ni-favourite-28" style={{marginRight:"5px"}}> </i> 
                             {bestEvent.interestedUsers.length} interested
                            </Badge>
                            
                          </div>

                        <CardTitle  style={{fontSize:"30px",bottom:"0px",color:"#172b4d"}}><b>{bestEvent.title}</b></CardTitle>
                        <CardText style={{fontSize:"20px",bottom:"0px",width:"700px",color:"#32325d"}}>
                        <b>{getFirstTwentyWords(bestEvent.description)} ...</b>
                        
                        </CardText>
                        <div class="event-info d-flex align-items-center">
                          <div class="event-info-single d-flex align-items-center" style={{backgroundColor: '#EEEEEE', borderRadius: '5px',marginLeft:"5px",width:"20%"}}>
                                      <div class="thumb">
                                          <i className="ni circle ni-time-alarm " style={{fontSize: "35px"}}></i>
                                        
                                      </div>
                                      <div class="content" style={{marginTop:"15px"}}>
                                          <h5 style={{marginBottom:"0px"}}>Start Date</h5>
                                          <p>{new Date(bestEvent.start_date).getFullYear()}-{new Date(bestEvent.start_date).getMonth() + 1}-{new Date(bestEvent.start_date).getDate()} at {new Date(bestEvent.start_date).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                                      </div>
                            
                          </div>
                          <div class="event-info-single d-flex align-items-center" style={{backgroundColor: '#EEEEEE', borderRadius: '5px',marginLeft:"5px",width:"20%"}}>
                                      <div class="thumb">
                                          <i className="ni circle ni-square-pin " style={{fontSize: "35px"}}></i>
                                        
                                      </div>
                                      <div class="content" style={{marginTop:"15px"}}>
                                          <h5 style={{marginBottom:"0px"}}>Location</h5>
                                          <p>Ariana</p>
                                      </div>
                            
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center',height:"100%"  }} >
                            <a
                            color="primary"
                            
                            onClick={(e) => navigate(`/eventDetails/${bestEvent._id}`)}
                    
                            style={{fontSize: '14px',marginTop:"30px",cursor:"pointer"}}
                            className="read-more"

                            >
                             <div style={{ display: 'flex', alignItems: 'center',position: 'absolute', bottom:"30px", left: '25px',color:"#2f3e96",fontSize:"20px" }}>
                              Read More   
                                 <i className="fas fa-arrow-right read-more" aria-hidden="true" style={{marginTop:"2px",marginLeft:"5px"}} ></i>
                                 
                              </div>
                           
                            </a>
                            
                        </div>
                        
                        <div style={{ position: "absolute", bottom:"10px",top:"10px",right:"10px" ,fontSize:"20px",backgroundColor:"white"}}>
                          <img src= {require("../../../assets/img/bestevent.gif")} />
                        </div>
                    </CardBody>
                    </Card>)}
                    
                
                  <div className="btn-wrapper" style={{marginTop:"20px"}}>
                      <Button
                        className="btn-icon mb-3 mb-sm-0"
                        color="info"
                        onClick={(e) =>
                          navigate(`/ProjectsUser`)
                        }
                      >
                        <span className="btn-inner--icon mr-1">
                          <i className="ni ni-settings" />
                        </span>
                        <span className="btn-inner--text">
                          Manage your Events
                        </span>
                      </Button>
                      <Button
                        className="btn-white btn-icon mb-3 mb-sm-0 ml-1"
                        color="default"
                        onClick={(e) => navigate(`/addEvent`)}
                      >
                        <span className="btn-inner--icon mr-1">
                          <i className="fa fa-lightbulb-o" />
                        </span>
                        <span className="btn-inner--text">
                          Create an Event
                        </span>
                      </Button>
                  </div>
                  </>)}
            
            <Row className="justify-content-center">
              <Col>
                <Row className="row-grid">
                {events.map((event) => (
                  <Col lg="4" className="py-4">
                  <Card style={{ width: "21rem" ,height:"500px"}}>
                    <CardImg
                        alt="..."
                        src={`http://localhost:5000/images/${event.event_img}`}
                        top
                        style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <CardBody>
                          <div className="font-weight-bold" style={{marginBottom:"7px"}}>
                            
                            <Badge className="badge-default" pill>
                            <i className="ni ni-calendar-grid-58" style={{marginRight:"5px"}}> </i> 
                            {calculateDurationInDays(event.start_date, event.end_date)}      
                            </Badge>
                           
                            <Badge color="primary" pill className="ml-2" >
                            <i className="ni ni-square-pin" style={{marginRight:"5px"}}> </i> 
                             {event.location}
                             
                            </Badge>
                            <Badge color="info" pill className="ml-1" >
                            <i className="ni ni-single-02" style={{marginRight:"5px"}}> </i> 
                             {event.participants.length} participants
                             
                            </Badge>
                            
                          </div>

                        <CardTitle>{event.title}</CardTitle>
                        <CardText>
                        {getFirstTwentyWords(event.description)} ...
                      
                        </CardText>
                        <div style={{ display: 'flex', alignItems: 'center'  }} >
                            <a
                            color="primary"
                            
                            onClick={(e) => navigate(`/eventDetails/${event._id}`)}
                    
                            style={{fontSize: '14px',marginTop:"30px",cursor:"pointer"}}
                            className="read-more"

                            >
                             <div style={{ display: 'flex', alignItems: 'center',position: 'absolute', bottom:"30px", left: '25px' }}>
                              Read More   
                                 <i className="fas fa-arrow-right read-more" aria-hidden="true" style={{marginTop:"2px",marginLeft:"5px"}} ></i>
                                 
                              </div>
                           
                            </a>
                            
                            {!id && <div style={{ display: 'flex', alignItems: 'center',position: 'absolute', bottom: 0, right: '10px' }}>
                              <div style={{ display: 'flex', alignItems: 'center' ,flexDirection: "column"}}>
                                  <i className={`ni circle ni-favourite-28 ${
                                         isInterested(event)  ? 'bg-danger text-white' : 'bg-Secondary text-Default'
                                           }`} style={{cursor:"pointer"}} onClick={() => interested(event)}> </i> 
                                  <p>Interested</p>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center' ,flexDirection: "column",marginLeft: '20px'}}>
                                  <i className={`ni circle ni-check-bold ${
                                         isGoing(event) ? 'bg-green text-white' : 'bg-Secondary text-Default'
                                           }`} style={{cursor:"pointer"}} onClick={() => going(event)}> </i>
                                  <p>Going</p>
                              </div>
                              </div>
                            }
                            
                        </div>
                    </CardBody>
                  </Card>
                  </Col>
                   ))}
                </Row>
              </Col>
            </Row>
          
          </Container>
          {/* SVG separator */}
          <div className="separator separator-bottom separator-skew zindex-100">
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
        </section>
        
    
      </main>
    </>
  );
}
