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

    const getEvents=async()=>{
        const res = await axios.get(`http://localhost:5000/events/creator/${props.creatorId}`)
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
      <Container className="mt-2" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="bg-default" >
              <CardHeader className="bg-transparent border-0" >
                <h3 style={{display:'inline-block'}} className="text-white mb-0">Recent Events</h3>
                <i style={{display:'inline-block',float:'right',color:'white',cursor:'pointer'}} onClick={props.onClose} class="fa fa-times fa-lg"></i>
              </CardHeader>
              <Table className="align-items-center table-dark table-flush" responsive>
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Fablab</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Fondation Date</th>
                    <th scope="col">Address</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                {events && events.map(event => (
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
                      { new Date(event.start_date).toISOString().slice(0, 10)}
                    </td>
                    <td>
                      { new Date(event.end_date).toISOString().slice(0, 10)}
                    </td>
                    
                   
                    
                  </tr>
                   
                 ))}
                </tbody>
              </Table>
              
            </Card>
          </div>
        </Row>
      
      </Container>
      
    </>
  );
}

export default AdminEvent;
