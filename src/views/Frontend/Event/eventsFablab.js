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

export default function EventsFablab(props) {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [goingEvents, setGoingEvents] = useState([]);
  const [interestedEvents, setInterestedEvents] = useState([]);
  
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
          console.log(res.data);
          setEvents(res.data.events);
         
        })
        .catch(err => {
          console.log(err);
        });
    }

    const update = async (reaction,eventId) => {
     
      const formData = new FormData();
      formData.append("userId", "643216cd888293912452e8eb");
      formData.append("reaction", reaction);
      console.log(formData);
      try {
        const res = await axios.put(`http://localhost:5000/events/${eventId}`, formData);
        console.log(res.data);
        console.log(res.data.message);
      } catch (error) {
        console.error(error);
      }
    };
    const interested=(e)=>{
      update("interested",e)
      setInterestedEvents(prevInterestedEvents => [...prevInterestedEvents, e]);
      getAllEventsFablab('http://localhost:5000/events/')
    };

    const going = (e) =>{
      //console.log(e)
      update("going",e)
      setGoingEvents(prevGoingEvents => [...prevGoingEvents, e]);
      getAllEventsFablab('http://localhost:5000/events/')
      
    };
    useEffect(() => {
      const url =  (props.fablabEvent && id)
      ? `http://localhost:5000/events/creator?id=${id}`
      : 'http://localhost:5000/events/'; 
      getAllEventsFablab(url); 
      const interval = setInterval(() => {
          getAllEventsFablab(url); // appel répété toutes les 10 secondes
        }, 10000);
        return () => clearInterval(interval); // nettoyage à la fin du cycle de vie du composant
    }, [id, props.fablabEvent]);
    
  return (
    <>
      <DemoNavbar />
      <main>
        <div className="position-relative bg-primary ">{/* shape Hero */}</div>
        <section className="section section-lg bg-gradient-default">
          <Container></Container>
          <Container className="pt-lg pb-300">
            <Row className="text-center justify-content-center">
              <Col lg="10">
                <h2 className="display-3 text-white">Build something</h2>
                <p className="lead text-white">
                  According to the National Oceanic and Atmospheric
                  Administration, Ted, Scambos, NSIDClead scentist, puts the
                  potentially record low maximum sea ice extent tihs year down
                  to low ice.
                </p>
              </Col>
            </Row>
            <div className="btn-wrapper">
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
            <Row className="justify-content-center">
              <Col>
                <Row className="row-grid">
                {events.map((event) => (
                  <Col lg="4" className="py-4">
                  <Card style={{ width: "21rem" }}>
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
                         {event.description}
                      
                        </CardText>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Button
                            color="primary"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                            style={{fontSize: '12px'}}
                            >
                            Show More
                            </Button>
                            {!id && <div style={{ display: 'flex', alignItems: 'center', marginLeft: '55px',marginTop:"20px" }}>
                              <div style={{ display: 'flex', alignItems: 'center' ,flexDirection: "column"}}>
                                  <i className={`ni circle ni-favourite-28 ${
                                         interestedEvents.includes(event._id) ? 'bg-danger text-white' : 'bg-Secondary text-Default'
                                           }`} style={{cursor:"pointer"}} onClick={() => interested(event._id)}> </i> 
                                  <p>Interested </p>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center' ,flexDirection: "column",marginLeft: '20px'}}>
                                  <i className={`ni circle ni-check-bold ${
                                         goingEvents.includes(event._id) ? 'bg-green text-white' : 'bg-Secondary text-Default'
                                           }`} style={{cursor:"pointer"}} onClick={() => going(event._id)}> </i>
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
            <Row className="row-grid mt-5">
              <Col lg="4">
                <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                  <i className="ni ni-settings text-primary" />
                </div>
                <h5 className="text-white mt-3">Building tools</h5>
                <p className="text-white mt-3">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </Col>
              <Col lg="4">
                <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                  <i className="ni ni-ruler-pencil text-primary" />
                </div>
                <h5 className="text-white mt-3">Grow your market</h5>
                <p className="text-white mt-3">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </Col>
              <Col lg="4">
                <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                  <i className="ni ni-atom text-primary" />
                </div>
                <h5 className="text-white mt-3">Launch time</h5>
                <p className="text-white mt-3">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
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
