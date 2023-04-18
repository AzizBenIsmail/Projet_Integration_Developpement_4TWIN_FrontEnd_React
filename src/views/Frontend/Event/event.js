import { useState, useEffect } from "react";

import {
  getUserAuth,
} from "../../../services/apiUser";

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
 
  Container,
  Row,
  Col, 
  
  CardText,
  CardTitle
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import "assetsFrontOffice/vendor/nucleo/css/nucleo.css";
import "assetsFrontOffice/vendor/font-awesome/css/font-awesome.min.css";

import axios from 'axios';


export default function Event(props) {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const creatorId = props.creatorId
  const eventId = props.eventId

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
    const getAllEventsFablab =async()=>{
      const res = await axios.get(`http://localhost:5000/events/creator?id=${creatorId}`)
        .then(res => {
            const currentDateTime = new Date().getTime();
            const filteredEvents = res.data.events.filter(event => new Date(event.start_date).getTime() > currentDateTime).filter(event => event._id !== eventId);
            setEvents(filteredEvents);
  
        })
        .catch(err => {
          console.log(err);
        });
    }
    const getUserFunction = async (config) => {
      const res = await getUserAuth("", config)
        .then((res) => {
          setCurrentUser(res.data.user);
          console.log(currentUser);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    function getFirstTwentyWords(str) {
      // Supprimer les caractères de ponctuation et diviser la chaîne en mots
      const words = str.replace(/[^\w\s]|_/g, "").split(/\s+/);
  
      // Retourner les 10 premiers mots
      return words.slice(0, 20).join(" ");
    }
    useEffect(() => {
      getUserFunction(config);
      getAllEventsFablab(); 
      
      const interval = setInterval(() => {
          getAllEventsFablab();
          //getUserFunction(config); // appel répété toutes les 10 secondes
        }, 1000);
        return () => clearInterval(interval); // nettoyage à la fin du cycle de vie du composant*/
    }, [creatorId]);
    
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
                        </div>
                    </CardBody>
                  </Card>
                  </Col>
                ))}
              
        
    
     
    </>
  );
}
