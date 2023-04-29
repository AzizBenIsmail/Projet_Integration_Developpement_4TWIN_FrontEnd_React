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
  CardBody,
} from "reactstrap";
import { differenceInYears } from "date-fns";
import { faMale, faFemale } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";

import { addXP, reduceXP } from "../../../services/apiEvaluation";
import axios from "axios";

// core components
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { getEvaluations } from "../../../services/apiEvaluation";

import { getBtype,addBType } from "../../../services/apiBtype";
import { getEvaluation } from "../../../services/apiEvaluation";
import { getBadge } from "../../../services/apiBadges";
import { config } from "@fortawesome/fontawesome-svg-core";




const Details = () => {


  const { id } = useParams();
  const [evaluation, setEvaluation] = useState({
    usernameE: "", // Utiliser le même nom de propriété que dans localStorage
    xp: 0,
    lvl: 0,
  });

  const [badge, setBadge] = useState({
    usernameB: "", // Utiliser le même nom de propriété que dans localStorage
    badgeName: "",
    badgeDescription: "",
    date: "",
    badgeImg: "",
  });


  useEffect(() => {
  getD();

  }, [1000]);

  const getD = async () => {
    try {
  
      const response1 = await getEvaluation(id, config);
      // Supposons que la réponse contient un champ 'evaluations' avec un tableau d'évaluations
      const firstEvaluation = response1.data.evaluations[0]; // Accéder à la première évaluation
      setEvaluation(firstEvaluation);

      const response2 = await getBadge(id); // Appeler votre fonction de service pour obtenir les badges d'un utilisateur en fonction de son nom d'utilisateur
      setBadge(response2.data.badges); // Supposons que la réponse contient un champ 'badges' avec un tableau d'objets de badges

      //------------
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <>
      <Header />
      {/* Page content */}
      <CardHeader className="bg-transparent border-0">
      </CardHeader>
      <Container fluid>
        {/* Dark table */}
        <Row className="mt-0">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Evaluation Table</h3>
              </CardHeader>
              <CardBody>
                <h1>{evaluation.usernameE}</h1>
              <h1>hi</h1>
                {/* afficher les autres propriétés de l'objet evaluation */}
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
  }
export default Details;
