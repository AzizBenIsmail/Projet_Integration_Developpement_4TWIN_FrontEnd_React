import {    Badge,    Card,    CardHeader,    CardFooter,    DropdownMenu,  DropdownItem,    UncontrolledDropdown,    DropdownToggle,    Media,
    Pagination,    PaginationItem,    PaginationLink,    Progress,   Table,    Container,    Row,    UncontrolledTooltip,    Button  } from "reactstrap";
  // core components
  import Header from "components/Headers/Header";
  import { useNavigate, useParams } from "react-router-dom";
  import axios from 'axios';
  import { useEffect, useState } from 'react';

  import DemoNavbar from "components/Navbars/DemoNavbar";


  const AdminFablabJoin = () => {
    const navigate = useNavigate();
    const [fablabs, setFablabs] = useState([]);
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
            <DemoNavbar />
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Card tables</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Fablab</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Address</th>
                      <th scope="col">Status</th>
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
                              src={`http://localhost:5000/images/${fablab.fablbLogo}`}
                            />
                        
                          <Media>
                            <span className="mb-0 text-sm">
                              {fablab.fablabName}
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>{fablab.fablabEmail}</td>
                      <td>
                      {fablab.phoneNumber}
                      </td>
                      <td>
                        {fablab.address}
                      </td>
                      <td>
                        <div className="avatar-group">
                         {fablab.is_treated ? (<>
                          <a
                            className="avatar avatar-sm"
                           
                            id="treated"
                          
                            style={{backgroundColor: '#2DCE89' , cursor: "help"}}
                          >
                             <span className="rounded-circle"  >
                                <i class="fa fa-check " style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}></i>
                              </span>

                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="treated"
                          >
                            Treated
                          </UncontrolledTooltip>
                          {fablab.is_accepted ?(<><a
                            className="avatar avatar-sm"
                           
                            id="accepted"
                          
                            style={{backgroundColor: '#2DCE89' , cursor: "help"}}
                          >
                             <span className="rounded-circle"  >
                                <i class="fa fa-check " style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}></i>
                              </span>

                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="accepted"
                          >
                            Accepted
                          </UncontrolledTooltip></>):(<><a
                                      className="avatar avatar-sm"
                                
                                      id="notaccepted"
                                      style={{backgroundColor: '#f5365c' , cursor: "help"}}
                                    >
                                      <span className="rounded-circle"  >
                                          <i class="fa fa-times" style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}></i>
                                        </span>
                                    </a>
                                    <UncontrolledTooltip
                                      delay={0}
                                      target="notaccepted"
                                    >
                                      Not Accepted
                                    </UncontrolledTooltip></>)}
                         </>):(<>
                         <a
                                      className="avatar avatar-sm"
                                
                                      id="nottreated"
                                      style={{backgroundColor: '#f5365c' , cursor: "help"}}
                                    >
                                      <span className="rounded-circle"  >
                                          <i class="fa fa-times" style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}></i>
                                        </span>
                                    </a>
                                    <UncontrolledTooltip
                                      delay={0}
                                      target="nottreated"
                                    >
                                      Not Treated
                                    </UncontrolledTooltip>
                         </>)}
                          

                       
                        </div>
                      </td>
                      <td>
                      <Button
                          
                          color="Primary"
                          style={{backgroundColor:"#5E72E4",color:"#ffff"}}
                          size="sm"
                          onClick={(e) => navigate(`/FablabRequestDetails/${fablab._id}`)}
                       >
                        More Details
                      </Button>
                      </td>
                    </tr>
                   ))}
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
        
        </Container>
      </>
    );
  };
  
  export default AdminFablabJoin;
  