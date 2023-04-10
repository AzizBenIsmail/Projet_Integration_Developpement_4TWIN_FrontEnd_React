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
  Button,
  NavItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Nav,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
import { differenceInYears } from "date-fns";
import { faMale, faFemale } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";
import Chart from "chart.js";
import { getProjects, deleteProject } from "../../../services/apiProject";

// core components
import Header from "components/Headers/Header.js";
import { getUsers, deleteUser } from "../../../services/apiUser.js";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Tables = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  /////cookies
  if (!Cookies.get("user")) {
    window.location.replace("/login-page");
  }

  const token = JSON.parse(Cookies.get("user")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    getAllProject(config);
    const interval = setInterval(() => {
      getAllProject(config); // appel répété toutes les 10 secondes
    }, 10000);
    return () => clearInterval(interval); // nettoyage à la fin du cycle de vie du composant
  }, []);

  const getAllProject = async (config) => {
    const res = await getProjects(config)
      .then((res) => {
        setProjects(res.data.projects);
        console.log(res.data.projects);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function moyenne(entier1, entier2) {
    const moyenne = (entier1 / entier2) * 100;
    return Math.floor(moyenne);
  }
  const deleteAProject = async (project, config) => {
    const result = window.confirm(
      "Are you sure you want to delete " + projects.title + "?"
    );
    if (result) {
      //console.log(user);
      deleteProject(project._id, config);
      getAllProject(config);
    }
  };

  const Modifier = async (user) => {
    const result = window.confirm(
      "Are you sure you want to modify " + user.username + "?"
    );
    if (result) {
      //console.log(user);
      navigate(`/profile/${user._id}`);
    }
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container fluid>
        {/* Dark table */}
        <Row className="mt-0">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Project tables</h3>
              </CardHeader>
              <Table
                className="align-items-center table-dark table-flush"
                responsive
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Domain </th>
                    <th scope="col">Goal </th>
                    <th scope="col">location</th>
                    <th scope="col">Final amount </th>
                    <th scope="col">current amount</th>
                    <th scope="col">Finaml amount</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project._id}>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-2 "
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={`http://localhost:5000/images/${project.image_project}`}
                            />
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">
                              {project.title}{" "}
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>{project.description}</td>
                      <td>{project.domaine}</td>
                      <td>
                        <span className="gender-logo">{project.goal} </span>
                      </td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          {project.location}{" "}
                        </Badge>
                      </td>
                      <td>
                        <div className="avatar-group">
                          {project.montant_Final} dt
                        </div>
                      </td>
                      <td>
                        <div className="avatar-group">
                          {project.montant_actuel} dt
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">
                            {moyenne(
                              project.montant_actuel,
                              project.montant_Final
                            )}
                            %
                          </span>
                          <div>
                            <Progress
                              max="100"
                              value={moyenne(
                                project.montant_actuel,
                                project.montant_Final
                              )}
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
                              href=""
                              onClick={(e) => deleteAProject(project, config)}
                            >
                              Supprimer
                            </DropdownItem>
                            <DropdownItem
                              href=""
                              onClick={(e) => Modifier(project)}
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
