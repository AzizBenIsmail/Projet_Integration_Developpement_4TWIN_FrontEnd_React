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

import { getEvaluations } from "../../../services/apiEvaluation";

const Tables = () => {
  const navigate = useNavigate();
  const [invests, setinvests] = useState([]);
  const [evaluations, setEvaluations] = useState([]);

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
    getAllEvaluations();

  }, []);




  
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
                    <th scope="col">message</th>
                    <th scope="col">current amount</th>
                    <th scope="col">Project</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
              
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
      <div>
      {evaluations.map((evaluation) => (
        <div key={evaluation.id}>
          <p>{evaluation.usernameE}</p>
          <p>{evaluation.xp}</p>
          {/* Ajoutez d'autres éléments ici si nécessaire */}
        </div>
      ))}
    </div>

    </>
  );
};

export default Tables;
