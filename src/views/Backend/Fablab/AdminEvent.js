import {      Card,    CardHeader,      Media,
     Table,    Container,    Row ,Badge} from "reactstrap";
  // core components
  import { useNavigate } from "react-router-dom";
  import axios from 'axios';
  import { useEffect, useState } from 'react';
  //import "assets/vendor/nucleo/css/nucleo.css";
  import "../../../assets/plugins/nucleo/css/nucleo.css"
import Header from "components/Headers/Header";
import WarningModal from "views/Frontend/Models/warningModel";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

function AdminEvent(props) {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [showEvent, setShowEvent] = useState(false);
    const [creators, setCreators] = useState([]);
    const [warningModal, setWarningModal] = useState(false);
    const [selectedE, setSelectedE] = useState(false);
    const [myOptions, setMyOptions] = useState([])
 
    const useStyles = makeStyles({
      inputRoot: {
        backgroundColor: 'white',
        '&:hover': {
          backgroundColor: 'white',
        },
        '&.Mui-focused': {
          backgroundColor: 'white',
        },
        borderRadius: 25,
      },
      inputInput: {
        color: 'green',
        '&::placeholder': {
          color: 'green',
          opacity: 1,
        },
      },
      inputLabel: {
        color: 'green',
        backgroundColor:'white',
        '&.Mui-focused': {
          color: 'green',
        },
      },
    });

    const classes = useStyles();

    async function getFilteredResults(query) {
      setMyOptions([]);
      const res = await axios.get(props.url)
        .then(res => {
          const filter = res.data.events.filter(result => result.title.toLowerCase().includes(query.toLowerCase()))
          console.log(filter)
          setEvents(filter);
        /*  let options = [];
          for (var i = 0; i < filter.length; i++) {
            options.push(filter[i].title)
          }
          setMyOptions(options)
          console.log(myOptions)*/
        })
        .catch(err => {
          console.log(err);
        });
      
    }

    function handleInputChange(event) {
      setQuery(event.target.value);
      console.log(query)
      getFilteredResults(event.target.value);

    }
    
    const [query, setQuery] = useState('');
      const handleButtonClick = () => {
        setShowEvent(true);
      }; 

      const selectedEvent = (event_id) => {
        setSelectedE(event_id)
      };

      const toggleModal = () => {
        setWarningModal(!warningModal);
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
      const getEvents = async () => {
        try {
          const res = await axios.get(props.url);
          const events = res.data.events;
          //events.push(res.data.nearestEvent);
          const creators = [];
      
          const promises = events.map(async (event) => {
            const creatorRes = await axios.get(
              `http://localhost:5000/events/creator/${event._id}`
            );
            console.log(creatorRes.data.user)
            creators.push(creatorRes.data.user);
          });
      
          await Promise.all(promises);
      
          setEvents(events);
          setCreators(creators);
        
        } catch (err) {
          console.log(err);
        }
      };
      
      function compare(start_date) {
        const currentDate = new Date();
        const sDate = new Date(start_date);
        return sDate > currentDate;
      }
      useEffect(() => {
        getEvents(); 
        
      }, []);

  return (
    <>

     {!props.fablab && <Header />} 
      {/* Page content */}
      <Container className="mt-1" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow" >
            
              
              <CardHeader style={{padding: '0.5rem', fontSize: '0.8rem'}} className="border-0">
                {props.fablab ? (<><h4 style={{display:'inline-block'}}  className="mb-0" >Recent Events</h4>
                <i style={{display:'inline-block',float:'right',color:'#32325D',cursor:'pointer'}} onClick={props.onClose} class="fa fa-times fa-lg"></i></>):(<>
                <h4 style={{display:'inline-block'}}  className="mb-3" >Events</h4>
                 <div className="btn-wrapper" style={{ marginLeft: '70%' ,marginTop:"-40px",marginBottom:"5px"}}>
                    <Autocomplete
                      style={{ width: 400,height: 30 }}
                      freeSolo
                      autoComplete
                      autoHighlight
                      options={myOptions}
                      value={query}
                      renderInput={(params) => (
                        <TextField {...params}
                
                          onChange={handleInputChange}
                          variant="outlined"
                          label="Search Box"
                          InputProps={{
                            ...params.InputProps,
                            classes: {
                              root: classes.inputRoot,
                              input: classes.inputInput,
                            },
                            style: { height: 40 } // Set the height to 20px
                          }}
                          InputLabelProps={{
                            classes: {
                              root: classes.inputLabel,
                            },
                          }}
                        />
                      )}
                    />
                  </div></>
                )}
                
              </CardHeader>
            {events.length ? (
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Event</th>
                    <th scope="col">Description</th>
                    <th scope="col">Date</th>
                    <th scope="col">Duration</th>
                    {!props.fablab && <th scope="col">Created By </th>}
                    <th scope="col">Status</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                {creators.map((c , index) => (
                  <tr key={c._id}>
                    {events[index] && (<>
                      <th scope="row">
                      <Media className="align-items-center">
                         <img
                           className="img-fluid rounded shadow-lg"
                           style={{height:"100%",width:"80px",marginRight:"8px"}}
                            alt="..."
                            src={`http://localhost:5000/images/${events[index].event_img}`}
                          />
                         
                      
                        <Media>
                          <span className="mb-0 text-sm">
                            {events[index].title}
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>{events[index].description}</td>
                    <td>
                    {new Date(events[index].start_date).getFullYear()}-{new Date(events[index].start_date).getMonth() + 1}-{new Date(events[index].start_date).getDate()} at {new Date(events[index].start_date).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                     
                    </td>
                    <td>
                    {calculateDurationInDays(events[index].start_date,events[index].end_date)}      
                    </td> 
                    {!props.fablab && ( <th scope="row">
                      <Media className="align-items-center">
                          <img
                           className="avatar rounded-circle mr-3"
                            alt="..."
                            src={`http://localhost:5000/images/${c.image_user}`}
                          />
                      
                        <Media>
                          <span className="mb-0 text-sm">
                          {c.username}
                          </span>
                        </Media>
                      </Media>
                    </th>)}

                    {!compare(events[index].start_date) ? ( <td><Badge color="danger" pill className="ml-1" >
                             
                                Passed
                              
                              </Badge></td>) : ( <td><Badge color="success" pill className="ml-1" >
                             
                                Coming
                              
                              </Badge></td>)
                             }
                  {!props.fablab &&(  <><WarningModal isOpen={warningModal}
                                      event={selectedE}
                                      toggle={toggleModal}
                                      title={"Event Delete"}
                                      body={"You will delete this event permanently, and you cannot get it back. "}
                                      button={"Delete"}
                                      onDelete={(id) => {
                                        const updatedEvents = events.filter(event => event._id !== id);
                                        getEvents(); 
                                        //setEvents(updatedEvents);
                                      }} />
                                      <td> <i className="fa fa-trash text-danger"  style={{cursor:"pointer",marginLeft:"15px"}}  onClick={()=>{toggleModal() ; selectedEvent(events[index]._id)}}> </i> 
                                       <p>Delete</p></td></>)}
                                 
                   {/* {creators[index] && <td>{creators[index].username}</td>}
                    creators && (<td>{creators[index].username}</td>)}*/}</>)}
                    
                  </tr>
                   
                 ))}
                
                 {!props.fablab && (<div>
                 
                 </div>)}

                
                </tbody>
              </Table>
              ) : (

              <Table className="align-items-center table-flush" responsive> 
              <tbody>
                  {props.fablab ? (<h4 style={{display:'inline-block'}}  className="mb-0" >   No Recent Events</h4>):(<h4 style={{display:'inline-block'}}  className="mb-0" > No Events</h4>)}
                <i style={{display:'inline-block',float:'right',color:'#32325D',cursor:'pointer'}} onClick={props.onClose} class="fa fa-times fa-lg"></i>
                </tbody>
                </Table>
              )}
              
              
            </Card>
          </div>
        </Row>
      
      </Container>
      
    </>
  );
}

export default AdminEvent;
