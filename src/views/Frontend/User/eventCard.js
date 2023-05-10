
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
  import { useNavigate , useParams} from "react-router-dom";

const EventCard = (props) =>{
    const event=props.event ;
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
      function compare(start_date) {
        const currentDate = new Date();
        const sDate = new Date(start_date);
        return sDate > currentDate;
      }
      function getFirstTwentyWords(str) {
        // Supprimer les caractères de ponctuation et diviser la chaîne en mots
        const words = str.replace(/[^\w\s]|_/g, "").split(/\s+/);
    
        // Retourner les 10 premiers mots
        return words.slice(0, 20).join(" ");
      }
      const navigate = useNavigate();

 return(
    <>
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

                            {!compare(event.start_date) &&
                              <Badge color="danger" pill className="ml-1" >
                              <i className="ni ni-single-02" style={{marginRight:"5px"}}> </i> 
                                Passed
                              
                              </Badge>}
                            
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
    
    </>
 )

}
export default EventCard;