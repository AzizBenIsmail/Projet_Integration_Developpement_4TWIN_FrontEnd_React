import {    Badge,    Card,    CardHeader,    CardFooter,    DropdownMenu,  DropdownItem,    UncontrolledDropdown,    DropdownToggle,    Media,
    Pagination,    PaginationItem,    PaginationLink,    Progress,   Table,    Container,    Row,    UncontrolledTooltip,    Button  } from "reactstrap";
  // core components
  import { useNavigate, useParams } from "react-router-dom";
  import axios from 'axios';
  import { useEffect, useState } from 'react';
  //import "assets/vendor/nucleo/css/nucleo.css";
  import "../../../assets/plugins/nucleo/css/nucleo.css"


function AdminEvent({ onClose }) {
    const navigate = useNavigate();
    const [fablabs, setFablabs] = useState([]);
    const [sideNavWidth, setSideNavWidth] = useState(0);
    const [showEvent, setShowEvent] = useState(false);

    function openNav() {
        setSideNavWidth(250);
      }
    
      function closeNav() {
        setSideNavWidth(0);
      }

      const handleButtonClick = () => {
        setShowEvent(true);
      };
    const getAllFablabs=async()=>{
        const res = await axios.get('http://localhost:5000/fablabs')
          .then(res => {
            console.log(res.data);
            setFablabs(res.data.fablabs);
          })
          .catch(err => {
            console.log(err);
          });
      }
      useEffect(() => {
        getAllFablabs(); 
        const interval = setInterval(() => {
            getAllFablabs(); // appel répété toutes les 10 secondes
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
                <i style={{display:'inline-block',float:'right',color:'white',cursor:'pointer'}} onClick={onClose}class="fa fa-times fa-lg"></i>
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
                {fablabs.map(fablab => (
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                          <img
                           className="avatar rounded-circle mr-3"
                            alt="..."
                            src={`http://localhost:5000/images/${fablab.image_user}`}
                          />
                      
                        <Media>
                          <span className="mb-0 text-sm">
                            {fablab.username}
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>{fablab.email}</td>
                    <td>
                    {fablab.phoneNumber1}
                    </td>
                    <td>
                      { new Date(fablab.dateOfBirth).toISOString().slice(0, 10)}
                    </td>
                    <td>
                      {fablab.address}
                    </td>
                   
                    <td>
                      
                      <Button
        
                          onClick={handleButtonClick}
                          color="Primary"
                          style={{backgroundColor:"#5E72E4",color:"#ffff",cursor: 'pointer'}}
                          size="sm"
                      >
                           Show Recent Events 
                        </Button>
                   
                     </td>
                     {showEvent && <AdminEvent/>}
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
