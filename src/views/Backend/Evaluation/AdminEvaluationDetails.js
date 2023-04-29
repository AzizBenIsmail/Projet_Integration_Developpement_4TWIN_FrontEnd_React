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
  Col,
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

import { getBtype, addBType } from "../../../services/apiBtype";
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

  const [badge, setBadge] = useState("");


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


  useEffect(() => {
    getD();
    getAllBtype();

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



//admin

const [badgeName, setBadgeName] = useState("");
const [badgeDescription, setBadgeDescription] = useState("");
const [badgeImg, setBadgeImg] = useState("");
const [usernameB, setUsernameB] = useState("");

const handleFormSubmit = (event) => {
  event.preventDefault();

  const newBType = {
    usernameB:id,
    badgeName: badgeName,
    badgeDescription: badgeDescription,
    badgeImg: badgeImg
  };

  axios.post("http://localhost:5000/badges/add", newBType)
  .then((res) => {
    console.log(res.data);
    setBadgeName("");
    setBadgeDescription("");
    setBadgeImg("");
  
  })
  .catch((err) => console.log(err));
  getD();

};


  return (
    <>
      <Header />
      {/* Page content */}
      <CardHeader className="bg-transparent border-0"></CardHeader>
      <h1>{evaluation.usernameE}</h1>
      <h1>{evaluation.lvl}</h1>
      <div>
        <h1> Badges</h1>
        {badge.length > 0 ? (
          badge.map((badge) => (
            <div key={badge._id}>
              <h3>Name: {badge.badgeName}</h3>

              <p>Description: {badge.badgeDescription}</p>
              <p>Date: {badge.date}</p>
              <p>img: {badge.badgeImg}</p>

              <Col className="order-lg-2">
                <div className="card-profile-image">
                  <br />
                  <br />
                  <div className="mt-2 border-top ">
                  
                  </div>
                </div>
                <br />
                <br />
              </Col>
            </div>
          ))
        ) : (
          <p>Aucun badge trouvé pour </p>
        )}
      </div>


      <form onSubmit={handleFormSubmit}>
  <label htmlFor="badgeName">Badge Name</label>
  <input
    type="text"
    id="badgeName"
    value={badgeName}
    onChange={(e) => setBadgeName(e.target.value)}
  />

  <label htmlFor="badgeDescription">Badge Description</label>
  <input
    type="text"
    id="badgeDescription"
    value={badgeDescription}
    onChange={(e) => setBadgeDescription(e.target.value)}
  />



  <button type="button" onClick={handleFormSubmit}>Add BType</button>
</form>

<div>
        
      {btype && btype.map((type) => (
        <div key={type._id}>
          <h3>{type.badgeName}  </h3>
          <p>{type.badgeDescription}</p>
          <img width="100" height="50" src={type.badgeImg} alt={type.badgeName} />

        </div>
        
      ))}
    </div>
    </>
  );
};
export default Details;
