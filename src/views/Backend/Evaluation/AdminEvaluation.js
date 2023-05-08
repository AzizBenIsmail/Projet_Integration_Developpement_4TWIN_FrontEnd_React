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
  Col,
  CustomFileInput,
  InputGroupText,
  InputGroupAddon,
  InputGroup,
  CardBody,
} from "reactstrap";
import { differenceInYears } from "date-fns";
import { faMale, faFemale } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, useNavigate, useParams } from "react-router-dom";

import { addXP, reduceXP } from "../../../services/apiEvaluation";
import axios from "axios";

// core components
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { getEvaluations } from "../../../services/apiEvaluation";

import { getBtype, addBType } from "../../../services/apiBtype";
import { getFBadges, updateBadge } from "../../../services/apiBadges";

const Tables = () => {
  const navigate = useNavigate();
  const [evaluations, setEvaluations] = useState([2]);

  const [addedXP, setAddedXP] = useState({});
  const [reducedXP, setReducedXP] = useState({});

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
    getAllEvaluations();
    getAllBtype();

    getD();
  }, [1000]);

  const getAllEvaluations = async (config) => {
    const res = await getEvaluations(config)
      .then((res) => {
        setEvaluations(res.data.evaluations);
        console.log(res.data.evaluations);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddXP = async (username, xp) => {
    const response = await addXP(username, xp, config);
    setAddedXP({ ...addedXP, [username]: xp });
    getAllEvaluations();
  };

  const handleReduceXP = async (username, xp) => {
    const response = await reduceXP(username, xp, config);
    setReducedXP({ ...reducedXP, [username]: xp });
    getAllEvaluations();
  };

  const [btype, setBtype] = useState();

  const getAllBtype = async (config) => {
    const res = await getBtype(config)
      .then((res) => {
        setBtype(res.data.btype);
        console.log(res.data.btype);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //admin
  const [badgeName, setBadgeName] = useState("");
  const [badgeDescription, setBadgeDescription] = useState("");
  const [badgeImg, setBadgeImg] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const newBType = {
      badgeName: badgeName,
      badgeDescription: badgeDescription,
      badgeImg: badgeImg,
    };

    axios
      .post("http://localhost:5000/btype/add", newBType)
      .then((res) => {
        console.log(res.data);
        setBadgeName("");
        setBadgeDescription("");
        setBadgeImg("");
        getAllBtype();
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/btype/${id}`);
    getAllBtype();
  };

  const handleDetailsClick = (id) => {
    window.history.pushState({}, "", `/evaluation/${id}`);
    window.location.reload();
  };

  const [fbadges, setFbadges] = useState("");
  const getD = async () => {
    try {
      const response2 = await getFBadges(config); // Appeler votre fonction de service pour obtenir les badges d'un utilisateur en fonction de son nom d'utilisateur
      setFbadges(response2.data.badges); // Supposons que la réponse contient un champ 'badges' avec un tableau d'objets de badges
      //------------
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteB = async (id, xp, username) => {
    const response = await reduceXP(username, xp, config);

    await axios.delete(`http://localhost:5000/badges/${id}`);
    getD();
    getAllEvaluations();
  };

  async function handleUpdateBadge(id, xp, username, config) {
    try {
      const response = await addXP(username, xp, config);

      const updatedBadge = await updateBadge(id, { etat: true }); // Call the updateBadge function with the new etat value
      console.log(updatedBadge.data); // Log the updated badge data to the console
    } catch (error) {
      console.error(error);
    }
    getD();
    getAllEvaluations();
  }
  //---
  return (
    <>
      <Header />
      {/* Page content */}
      <CardHeader className="bg-transparent border-0"></CardHeader>
      <br /> <br />
      <h2 className="my-4">BADGE REQUESTS</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Details</th>
            <th>Date</th>
            <th>Username</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {fbadges.length > 0 ? (
            fbadges.map((badge) => (
              <tr key={badge._id}>
                <td>{badge.badgeName}</td>
                <td>{badge.badgeDescription}</td>
                <td>{badge.details}</td>
                <td>{badge.date.split("T")[0]}</td>
                <td>{badge.usernameB}</td>
                <td>
                  <div className="d-flex">
                    <button
                      className="btn btn-success mr-3"
                      onClick={() =>
                        handleUpdateBadge(
                          badge._id,
                          document.getElementById("xp").value,
                          badge.usernameB,
                          config
                        )
                      }
                    >
                      Accept(xp)+
                    </button>
                    <input
                      type="number"
                      className="form-control mr-3"
                      id="xp"
                      name="xp"
                      size="1"
                    />
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        handleDeleteB(
                          badge._id,
                          document.getElementById("xp").value,
                          badge.usernameB
                        )
                      }
                    >
                      Delete(xp) -
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No badge requests found.</td>
            </tr>
          )}
        </tbody>
      </table>
      <br />
      <hr className="my-4" />
      <Container fluid>
        {/* Dark table */}
        <Row className="mt-0">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Evaluation Table</h3>
              </CardHeader>
              <Table
                className="align-items-center table-dark table-flush"
                responsive
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Level</th>
                    <th scope="col">
                      Add ➕ or Reduce ➖{" "}
                      <input
                        type="text"
                        id="xp-input"
                        name="xp-input"
                        size="1"
                      />{" "}
                      XP%
                    </th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {evaluations.map((evaluation) => (
                    <tr key={evaluation._id}>
                      <td>{evaluation.usernameE}</td>
                      <td>{evaluation.lvl}</td>
                      <td>
                        {" "}
                        <div className="d-flex align-items-center">
                          <button
                            type="button"
                            className="btn"
                            onClick={() =>
                              handleReduceXP(
                                evaluation.usernameE,
                                document.getElementById("xp-input").value
                              )
                            }
                          >
                            ➖
                          </button>
                      
                          <span className="mr-2">{evaluation.xp}%</span>
                          <div>
                            <Progress
                              max="100"
                              value={evaluation.xp}
                              barClassName="bg-warning"
                            />
                          </div>
                          <button
                            type="button"
                            className="btn"
                            onClick={() =>
                              handleAddXP(
                                evaluation.usernameE,
                                document.getElementById("xp-input").value
                              )
                            }
                          >
                            ➕
                          </button>
                        </div>{" "}
                      </td>

                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              onClick={() =>
                                handleDetailsClick(evaluation.usernameE)
                              }
                            >
                              {" "}
                              Details
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
      <br />
      <div></div>
      <br />
      <hr className="my-4" />
      <br />
      <h2 className="my-4">ADD NEW BADGE TYPE</h2>
      <table>
        <thead>
          <tr>
            <th colspan="4">
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="badgeName">Badge Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="badgeName"
                    value={badgeName}
                    onChange={(e) => setBadgeName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="badgeDescription">Badge Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="badgeDescription"
                    value={badgeDescription}
                    onChange={(e) => setBadgeDescription(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="badgeImg">Badge Image</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="badgeImg"
                    onChange={(e) => setBadgeImg(e.target.files[0].name)}
                  />
                </div>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleFormSubmit}
                >
                  Add Badge Type
                </button>
              </form>
            </th>
          </tr>
          <tr>
            <th> Name|</th>
            <th> Description|</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {btype &&
            btype.map((type) => (
              <tr key={type._id}>
                <td>{type.badgeName}</td>
                <td>{type.badgeDescription}</td>
                <td>
                  <img
                    width="100"
                    height="50"
                    src={require(`../../../assets/img/badges/${type.badgeImg}`)}
                    alt={type.badgeName}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(type._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <hr className="my-4" />
    </>
  );
};

export default Tables;
