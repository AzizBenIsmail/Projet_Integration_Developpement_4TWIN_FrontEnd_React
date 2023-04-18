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

import { addXP, reduceXP } from "../../../services/apiEvaluation";

// core components
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { getEvaluations } from "../../../services/apiEvaluation";

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
  };

  const handleReduceXP = async (username, xp) => {
    const response = await reduceXP(username, xp, config);
    setReducedXP({ ...reducedXP, [username]: xp });
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
                      Add ➕ or Reduce ➖  25% XP
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
                            onClick={() =>
                              handleReduceXP(evaluation.usernameE, 25)
                            }
                          >
                            ➖
                          </button>
                          <button
                            onClick={() =>
                              handleAddXP(evaluation.usernameE, 25)
                            }
                          >
                            ➕
                          </button>
                          <span className="mr-2">
                            {evaluation.xp +
                              (addedXP[evaluation.usernameE] || 0) -
                              (reducedXP[evaluation.usernameE] || 0)}
                            %
                          </span>
                          <div>
                            <Progress
                              max="100"
                              value={evaluation.xp}
                              barClassName="bg-warning"
                            />
                          </div>
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
                            <DropdownItem href="">Details</DropdownItem>
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
