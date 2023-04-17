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
import { getInvests, deleteInvest } from "../../../services/apiInvest";

// core components
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Tables = () => {
  const navigate = useNavigate();
  const [invests, setinvests] = useState([]);

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
    getAllInvest(config);
    const interval = setInterval(() => {
      getAllInvest(config); // appel répété toutes les 10 secondes
    }, 1000);
    return () => clearInterval(interval); // nettoyage à la fin du cycle de vie du composant
  }, []);

  const getAllInvest = async (config) => {
    const res = await getInvests(config)
      .then((res) => {
        setinvests(res.data.invests);
        console.log(res.data.invests);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteAinvest = async (invest, config) => {
    const result = window.confirm(
      "Are you sure you want to delete " + invest.message + "?"
    );
    if (result) {
      //console.log(user);
      deleteInvest(invest._id, config);
      getAllInvest(config);
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
                <h3 className="text-white mb-0">Invest tables</h3>
              </CardHeader>
              <Table
                className="align-items-center table-dark table-flush"
                responsive
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">message</th>
                    <th scope="col">current amount</th>
                    <th scope="col">Project</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {invests.map((invest) => (
                    <tr key={invest._id}>
                      <td>{invest.message}</td>
                      <td>{invest.montant}</td>
                      <td>
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-2 "
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={`http://localhost:5000/images/${invest.project.image_project}`}
                            />
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">
                              {invest.project.title}{" "}
                            </span>
                          </Media>
                        </Media>
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
                              onClick={(e) => deleteAinvest(invest, config)}
                            >
                              Supprimer
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
