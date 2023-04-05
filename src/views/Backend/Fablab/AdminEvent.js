import {    Badge,    Card,    CardHeader,    CardFooter,    DropdownMenu,  DropdownItem,    UncontrolledDropdown,    DropdownToggle,    Media,
    Pagination,    PaginationItem,    PaginationLink,    Progress,   Table,    Container,    Row,    UncontrolledTooltip,    Button  } from "reactstrap";
  // core components
  import { useNavigate, useParams } from "react-router-dom";
  import axios from 'axios';
  import { useEffect, useState } from 'react';
  //import "assets/vendor/nucleo/css/nucleo.css";
  import "../../../assets/plugins/nucleo/css/nucleo.css"


function AdminEvent(props) {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [showEvent, setShowEvent] = useState(false);

    
      const handleButtonClick = () => {
        setShowEvent(true);
      };

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
    const getEvents=async()=>{
        const res = await axios.get(props.url)
          .then(res => {
            console.log(res.data);
            setEvents(res.data.events);
          })
          .catch(err => {
            console.log(err);
          });
      }
      useEffect(() => {
        getEvents(); 
        const interval = setInterval(() => {
          getEvents(); // appel répété toutes les 10 secondes
          }, 10000);
          return () => clearInterval(interval); // nettoyage à la fin du cycle de vie du composant   
      }, []);

  return (
    <>
     
      {/* Page content */}
      <Container className="mt-1" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow" >
              {events.length ? (
              <>
              <CardHeader style={{padding: '0.5rem', fontSize: '0.8rem'}} className="border-0">
                <h4 style={{display:'inline-block'}}  className="mb-0" >Recent Events</h4>
                <i style={{display:'inline-block',float:'right',color:'#32325D',cursor:'pointer'}} onClick={props.onClose} class="fa fa-times fa-lg"></i>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Event</th>
                    <th scope="col">Description</th>
                    <th scope="col">Date</th>
                    <th scope="col">Duration</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                {events.map(event => (
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                          <img
                           className="avatar rounded-circle mr-3"
                            alt="..."
                            src={`http://localhost:5000/images/${event.event_img}`}
                          />
                      
                        <Media>
                          <span className="mb-0 text-sm">
                            {event.title}
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>{event.description}</td>
                    <td>
                    {new Date(event.start_date).getFullYear()}-{new Date(event.start_date).getMonth() + 1}-{new Date(event.start_date).getDate()} at {new Date(event.start_date).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                     
                    </td>
                    <td>
                    {calculateDurationInDays(event.start_date, event.end_date)}      
                    </td> 
                  </tr>
                   
                 ))}
                </tbody>
              </Table>
              </>) : (
                <CardHeader style={{padding: '0.5rem', fontSize: '0.8rem'}} className="border-0">
                <h4 style={{display:'inline-block'}}  className="mb-0" > No Recent Events</h4>
                <i style={{display:'inline-block',float:'right',color:'#32325D',cursor:'pointer'}} onClick={props.onClose} class="fa fa-times fa-lg"></i>
                </CardHeader>
              )}
              
              
            </Card>
          </div>
        </Row>
      
      </Container>
      
    </>
  );
}

export default AdminEvent;
