import {    Card,    CardHeader,    CardFooter,      Media,
    Pagination,    PaginationItem,    PaginationLink,  Table,    Container,    Row,      Button  } from "reactstrap";
  // core components
  import { makeStyles } from '@material-ui/core/styles';
  import axios from 'axios';
  import { useEffect, useState ,React } from 'react';
import AdminEvent from "./AdminEvent";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


  const AdminFablab = () => {
    
    const [fablabs, setFablabs] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [showEvent, setShowEvent] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
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
      const res = await axios.get("http://localhost:5000/fablabs")
        .then(res => {
          
          const filter = res.data.fablabs.filter(result => result.username.toLowerCase().includes(query.toLowerCase()))
          console.log(filter)
          setFablabs(filter);
          let options = [];
          for (var i = 0; i < filter.length; i++) {
            options.push(filter[i].username)
          }
          setMyOptions(options)
          console.log(myOptions)
        })
        .catch(err => {
          console.log(err);
        });
      
    }

    function handleInputChange(fablab) {
      setQuery(fablab.target.value);
      console.log(query)
      getFilteredResults(fablab.target.value);

    }
    
    const [query, setQuery] = useState('');
    const handleButtonClick = (rowIndex) => {
      setSelectedRow(rowIndex);
      setShowEvent(true);

    };
    const handleClose = () => {
      setShowEvent(false);
      setSelectedRow(null);
    };
    const getAllFablabs=async(page)=>{
        const res = await axios.get(`http://localhost:5000/fablabs?page=${page}`)
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
        setShowEvent(false);
        setSelectedRow(null);
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
      
    return (
      <>
       
        {/* Page content */}
        <Container className="mt-2" fluid>
     
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="bg-default" >
                <CardHeader className="bg-transparent border-0">
                  <h3 className="text-white mb-0">Fablabs</h3>
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
                            style: { height: 50 } // Set the height to 20px
                          }}
                          InputLabelProps={{
                            classes: {
                              root: classes.inputLabel,
                            },
                          }}
                        />
                      )}
                    />
                  </div>
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
                  {fablabs.map((fablab,rowIndex) => (
                   <>
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
                            onClick={() => handleButtonClick(rowIndex)}
                            color="Primary"
                            style={{backgroundColor:"#5E72E4",color:"#ffff",cursor: 'pointer'}}
                            size="sm"
                        >
                             Show Recent Events 
                          </Button>
                     
                       </td>
                      
                    </tr> 
                    {selectedRow === rowIndex && (
                                <tr>
                                  <td colSpan="6">
                                    <AdminEvent key={rowIndex} fablab={true} onClose={handleClose} url={`http://localhost:5000/events/creator?id=${fablab._id}&recent=true`} />
                                  </td>
                                </tr>
                    )}
                  
                    </>))}
                  </tbody>
                 
                 
                </Table>
                <CardFooter className="py-4 bg-transparent " style={{borderTop: '1px solid #F6F9FC'}}>
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
        
      </>
    );
  };
  
  export default AdminFablab;
  