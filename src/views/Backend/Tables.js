import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip
} from "reactstrap";
import { differenceInYears } from 'date-fns';
import { faMale, faFemale } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// core components
import Header from "components/Headers/Header.js";
import { getUsers, deleteUser } from "../../services/apiUser.js";
import { useEffect, useState } from 'react';
import axios from 'axios';


const Tables = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    // const res = getUsers()
    //   .then(res => {
    //     console.log(res.data);
    //     setUsers(res.data.users);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    getAllUser();
    const interval = setInterval(() => {
      getAllUser(); // appel répété toutes les 10 secondes
    }, 10000);
    return () => clearInterval(interval); // nettoyage à la fin du cycle de vie du composant
  
  }, []);

  const getAllUser=async()=>{
    const res = await getUsers()
      .then(res => {
        console.log(res.data);
        setUsers(res.data.users);
      })
      .catch(err => {
        console.log(err);
      });
  }
  const deleteAUser = async (user) => {
    const result = window.confirm("Are you sure you want to delete "+user.username+"?");
    if (result) {
      //console.log(user);
      await axios.delete(`http://localhost:5000/users/${user._id}`);

            getAllUser();
    }
  }


  const genderIcon = (gender) => {
    if (gender === 'Male') {
      return <FontAwesomeIcon icon={faMale} size="3x" color="#007bff" />;
    } else if (gender === 'Female') {
      return <FontAwesomeIcon icon={faFemale} size="3x" color="#f54291" />;
    } else {
      return null;
    }
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>

        {/* Dark table */}
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Card tables</h3>
              </CardHeader>
              <Table
                className="align-items-center table-dark table-flush"
                responsive
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">User Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Age</th>
                    <th scope="col">gender</th>
                    <th scope="col">First Name- Last Name</th>
                    <th scope="col">Image</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (



                    <tr key={user._id}>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-2 "
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={`http://localhost:5000/images/${user.image_user}`}
                            />
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">
                            {user.username}

                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>
                        {user.email}

                      </td><td>

                        {differenceInYears(new Date(), new Date(user.dateOfBirth))}

                      </td>
                      <td>
                        <span className="gender-logo">

                          {genderIcon(user.gender)}


                        </span>
                      </td>

                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-warning" />
                          {user.first_Name}{user.last_Name} 
                        </Badge>
                      </td>
                      <td>
                        <div className="avatar-group">
                          {user.address } 
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">60%</span>
                          <div>
                            <Progress
                              max="100"
                              value="70"
                              barClassName="bg-warning"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => deleteAUser(user)}

                            >
                              Supprimer
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Modifier
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
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
};

export default Tables;
