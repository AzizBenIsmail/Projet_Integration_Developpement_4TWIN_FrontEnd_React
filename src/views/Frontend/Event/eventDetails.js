import DemoNavbar from "../../../components/Navbars/DemoNavbar";

import {  useParams } from "react-router-dom";
import Countdown from "./countDown";
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  
    Card,
  
    CardImg,
  
    Container,
    Row,
    Col
  } from "reactstrap";
import Event from "./event";
export default function EventDetails() {

    const param = useParams();
    const [event, setEvent] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [interested, setInterested] = useState([]);

    const [creator, setCreator] = useState(null);
    const style = `
    .countdown {
      margin-top: 5px;
    }
    .styled {
      margin-bottom: 5px;
    }
    .styled div {
      display: inline-block;
      margin-left: 0px;
      font-size: 18px;
      font-weight: normal;
      text-align: center;

      height: 50px;
      text-shadow: none;
      vertical-align: middle;
      color: #FFFFFF;
      margin: 2px 6px;
      height: auto;
      padding-bottom: 5px;
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
      font-size: 10px;
      margin-top: 0px;
      font-weight: normal;
      text-align: center;
      text-transform: uppercase;
      border-top: 1px solid #f5365c;
      padding: 10px;
    }
  `;
    const getEvent=async()=>{
        const res = await axios.get(`http://localhost:5000/events/${param.id}`)
          .then(res => {
            //console.log(res.data);
            setEvent(res.data.event);
            setCreator(res.data.user);
            setParticipants(res.data.participants);
            setInterested(res.data.interested);
          })
          .catch(err => {
            console.log(err);
          });
         
      }
    
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
      useEffect(() => {
        getEvent(); 
        const interval = setInterval(() => {
            getEvent(); // appel répété toutes les 10 secondes
        }, 10000);
        return () => clearInterval(interval); // nettoyage à la fin du cycle de vie du composant   
        
      },[]);
    return(
        <>

        <style>
        {`
          .avatar-group {
            display: flex;
            flex-wrap: nowrap;
          }
          
          .avatar-group .avatar {
            margin-right: -10px;
            z-index: 1;
          }
          
          .avatar-group .avatar:last-child {
            margin-right: 0;
          }
          
          .avatar-group .avatar + .avatar {
            margin-left: -10px;}
        `}

      </style>
         <DemoNavbar />
         <main>
         <section className="section bg-secondary">
            {event && ( <Container>
              <Row className="row-grid align-items-center">
                <Col md="4">
                  <Card className="bg-default shadow border-0">
                    <CardImg
                      alt="..."
                      src={`http://localhost:5000/images/${event.event_img}`}
                      top
                    />
                    <blockquote className="card-blockquote">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="svg-bg"
                        preserveAspectRatio="none"
                        viewBox="0 0 583 95"
                      >
                        <polygon
                          className="fill-default"
                          points="0,52 583,95 0,95"
                        />
                        <polygon
                          className="fill-default"
                          opacity=".2"
                          points="0,42 583,95 683,0 0,95"
                        />
                      </svg>
                      <h5 className="display-4 font-weight-bold text-white">
                      <i className="ni ni-single-02 " style={{marginRight:"5px",marginBottom:"10px"}}> </i> 
                        {event.participants.length} participants
                      </h5>
                      <p className="lead text-italic text-white">
                        <Countdown datetime={event.start_date} style={style} />
                      </p>
                    </blockquote>
                  </Card>
                </Col>
                <Col md="8">
                  <div className="pl-md-3"  style={{ marginTop: "0" }}>
                    <h3>{event.title}</h3>
                    <p className="lead">
                    {event.description}
                    
                    </p>
                            <div class="event-info d-flex align-items-center">
                               {creator && (<>
                        
                                <div class="event-info-single d-flex align-items-center" style={{backgroundColor: '#EEEEEE', padding: '0px 20px', borderRadius: '5px'}}>
                                    <div class="thumb">
                                        <img className="avatar avatar-s rounded-circle" src={`http://localhost:5000/images/${creator.image_user}`} alt="Icon"/>
                                    </div>
                                    <div class="content" style={{marginTop:"15px",marginLeft:"10px"}}>
                                        <h5 style={{marginBottom:"0px"}}>Created By</h5>
                                        <p >{creator.username}</p>
                                    </div>
                                </div></>)}
                                <div class="event-info-single d-flex align-items-center" style={{backgroundColor: '#EEEEEE', padding: '0px 5px', borderRadius: '5px',marginLeft:"10px"}}>
                                    <div class="thumb">
                                        <i className="ni circle ni-time-alarm " style={{  fontSize: "35px"}}></i>
                                       
                                    </div>
                                    <div class="content" style={{marginTop:"15px"}}>
                                        <h5 style={{marginBottom:"0px"}}>Start Date</h5>
                                        <p>{new Date(event.start_date).getFullYear()}-{new Date(event.start_date).getMonth() + 1}-{new Date(event.start_date).getDate()} at {new Date(event.start_date).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                                    </div>
                                </div>
                                <div class="event-info-single d-flex align-items-center" style={{backgroundColor: '#EEEEEE', padding: '0px 5px', borderRadius: '5px',marginLeft:"10px"}}>
                                    <div class="thumb">
                                        <i className="ni circle ni-calendar-grid-58 " style={{  fontSize: "35px"}}></i>
                                       
                                    </div>
                                    <div class="content" style={{marginTop:"15px"}}>
                                        <h5 style={{marginBottom:"0px"}}>Duration </h5>
                                        <p>{calculateDurationInDays(event.start_date, event.end_date)}</p>
                                    </div>
                                </div>
                                
                                <div class="event-info-single d-flex align-items-center" style={{backgroundColor: '#EEEEEE', padding: '0px 5px', borderRadius: '5px',marginLeft:"10px"}}>
                                    <div class="thumb">
                                        <i className="ni circle ni-favourite-28 text-danger" style={{  fontSize: "35px"}}></i>
                                       
                                    </div>
                                    <div class="content" style={{marginTop:"15px",marginRight:"10px"}}>
                                        <h5 style={{marginBottom:"0px"}}>interested </h5>
                                        <p>{interested.length}</p>
                                    </div>
                                </div>
                            </div>
                            <div>lenna map</div>
                  </div>
                </Col>
              </Row>
            </Container>)}
           
            
          </section>
          {event &&  <>
          
          <section className="section bg-gradient-default">
          <Container ><h5 className="display-4 font-weight-bold text-white">Related Events : </h5></Container>
          <Container>
            <Row className="justify-content-center">
              <Col>
                <Row className="row-grid">
                  <Event creatorId={event.creator} eventId={event._id}/>  </Row>
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
        </section></>}
        </main>
        </>

    )
}