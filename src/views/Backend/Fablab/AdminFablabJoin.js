import {    Badge,    Card,    CardHeader,    CardFooter,    DropdownMenu,  DropdownItem,    UncontrolledDropdown,    DropdownToggle,    Media,
    Pagination,    PaginationItem,    PaginationLink,    Progress,   Table,    Container,    Row,    UncontrolledTooltip,    Button, CardBody  } from "reactstrap";
  // core components
  import Header from "components/Headers/Header";
  import { useNavigate, useParams } from "react-router-dom";
  import axios from 'axios';
  import { useEffect, useState } from 'react';

import AdminFablab from "./AdminFablab";


  const AdminFablabJoin = () => {
    const navigate = useNavigate();
    const [fablabs, setFablabs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [disable, setDisable] = useState(true);
    const [accepted, setAccepted] = useState(false);
    const [nonAccepted, setNonAccepted] = useState(false);

    const getAllFablabs=async(page)=>{
        const res = await axios.get(`http://localhost:5000/fablabs/requests?page=${page}`)
          .then(res => {
            console.log(res.data);
            setFablabs(res.data.fablabs);
            setTotalPages(res.data.totalPages);
          })
          .catch(err => {
            console.log(err);
          });
      }
      useEffect(() => {
        getAllFablabs(currentPage); 
        const interval = setInterval(() => {
            getAllFablabs(currentPage); // appel répété toutes les 10 secondes
          }, 10000);
          return () => clearInterval(interval); // nettoyage à la fin du cycle de vie du composant   
      }, [currentPage]);

      const handlePageClick = (e, page) => {
        e.preventDefault();
        setCurrentPage(page);
      };
    
      const renderPaginationItems = () => {
        const items = [];
        for (let i = 1; i <= totalPages; i++) {
          items.push(
            <PaginationItem key={i} className={currentPage === i ? 'active' : ''}>
              <PaginationLink href="#pablo" onClick={(e) => handlePageClick(e, i)}>
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }
        return items;
      };

      const treatedFunction=()=>{
        setDisable(false);
        
       
      };

      const nonTreatedFunction=()=>{
        setDisable(true);
        setAccepted(false);
        setNonAccepted(false);
      };
      
      const handleAcceptedChange = (e) => {
        setAccepted(e.target.checked);
        setNonAccepted(false);
      };
      
      const handleNonAcceptedChange = (e) => {
        setNonAccepted(e.target.checked);
        setAccepted(false);
      };
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt-1" fluid>
          {/* Table */}
          <Row>
            <div className="col-2">
              <Card className="shadow" style={{ width: "240px" }}> 
                <Table className="align-items-center table-flush mt-2" responsive>
                <thead className="thead-light "  style={{ height: "58px" }}>
                  <tr>
                    <th scope="col"  style={{ fontSize : "20px"}}>Filter</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                        <div className="custom-control custom-radio mb-3">
                          <input
                            className="custom-control-input"
                            id="NonTreated"
                            type="radio"
                            name="custom-radio-2"
                            onClick={nonTreatedFunction}
                          />
                          <label className="custom-control-label" htmlFor="NonTreated">
                              Non Treated
                          </label>
                        </div>
                    </th>
                    
                  </tr>
                  <tr>
                    <th >
                        <div className="custom-control custom-radio mb-3">
                          <input
                            className="custom-control-input"
                            id="Treated"
                            type="radio"
                            name="custom-radio-2"
                            onClick={treatedFunction}
                          />
                          <label className="custom-control-label" htmlFor="Treated">
                             Treated
                          </label>
                        </div>
                    </th>
                    
                  </tr>
                  <tr>
                    <th >
                        <div className="custom-control custom-radio mb-3">
                          <input
                            className="custom-control-input"
                            id="Accepted"
                            type="radio"
                            name="custom-radio-3"
                            disabled={disable}
                            checked={accepted}
                            onClick={handleAcceptedChange}

                          />
                          <label className="custom-control-label" htmlFor="Accepted">
                              Accepted
                          </label>
                        </div>
                    </th>
                    
                  </tr>
                  <tr>
                    <th >
                        <div className="custom-control custom-radio mb-3">
                          <input
                            className="custom-control-input"
                            id="NonAccepted"
                            type="radio"
                            name="custom-radio-3"
                            disabled={disable}
                            checked={nonAccepted}
                            onClick={handleNonAcceptedChange}
                          />
                          <label className="custom-control-label" htmlFor="NonAccepted">
                          Non Accepted
                          </label>
                        </div>
                    </th>
                    
                  </tr>
                
                </tbody>
              </Table>
              </Card>
            </div>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Fablab Requests</h3>
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
                    <tr key={fablab._id}>
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
                                <i class="fa fa-eye" style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}></i>
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
                                          <i class="fa fa-eye-slash" style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}></i>
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
                    <Pagination className="pagination justify-content-end mb-0" listClassName="justify-content-end mb-0">
                      <PaginationItem className={currentPage === 1 ? 'disabled' : ''}>
                        <PaginationLink href="#pablo" onClick={(e) => handlePageClick(e, currentPage - 1)} tabIndex="-1">
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      {renderPaginationItems()}
                      <PaginationItem className={currentPage === totalPages ? 'disabled' : ''}>
                        <PaginationLink href="#pablo" onClick={(e) => handlePageClick(e, currentPage + 1)}>
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
        <AdminFablab />
      </>
    );
  };
  
  export default AdminFablabJoin;
  