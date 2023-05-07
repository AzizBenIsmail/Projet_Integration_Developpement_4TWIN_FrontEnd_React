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
import { getTBadge } from "../../../services/apiBadges";
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
//username !
      const response2 = await getTBadge(id); // Appeler votre fonction de service pour obtenir les badges d'un utilisateur en fonction de son nom d'utilisateur
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
  const [etat, setEtat] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const newB = {
      usernameB: id,
      badgeName: badgeName,
      badgeDescription: badgeDescription,
      badgeImg: badgeImg,
      etat: true,
    };

    axios
      .post("http://localhost:5000/badges/add", newB)
      .then((res) => {
        console.log(res.data);
        setBadgeName("");
        setBadgeDescription("");
        setBadgeImg("");
      })
      .catch((err) => console.log(err));

    getD();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/badges/${id}`);
    getD();
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <CardHeader className="bg-transparent border-0"></CardHeader>
      <div className="progress-label"  align="center">
     <h1>{evaluation.usernameE}</h1>
      <span style={{ background:"#e9ecef",opacity: 5,borderRadius: "70px",padding: "0.25rem 1rem"}}>LEVEL: {evaluation.lvl}</span> 
                            </div>
      <h1>
       {id}
      </h1>
      <h1>Badges</h1>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Date</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {badge.length > 0 ? (
              badge.map((badge) => (
                <tr key={badge._id}>
                  <td>{badge.badgeName}</td>
                  <td>{badge.badgeDescription}</td>
                  <td>{badge.date.split("T")[0]}</td>
                  <td>
                    <img
                      width="100"
                      height="50"
                      src={require(`../../../assets/img/badges/${badge.badgeImg}`)}
                      alt={badge.badgeName}
                    />
                  </td>
                  <td>
                    <button
                      class="btn btn-danger"
                      onClick={() => handleDelete(badge._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colspan="5">Aucun badge trouvé pour</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <br/><br/>
      <h1>ADD NEW BADGE </h1>


      <table class="table">
  <thead>
    <tr>
      <th scope="col">Badge Name</th>
      <th scope="col">Badge Description</th>
      <th scope="col">Select a Badge</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <div class="form-group">
          <label for="badgeName">Badge Name</label>
          <input
            type="text"
            class="form-control"
            id="badgeName"
            value={badgeName}
            onChange={(e) => setBadgeName(e.target.value)}
          />
        </div>
      </td>
      <td>
        <div class="form-group">
          <label for="badgeDescription">Badge Description</label>
          <input
            type="text"
            class="form-control"
            id="badgeDescription"
            value={badgeDescription}
            onChange={(e) => setBadgeDescription(e.target.value)}
          />
        </div>
      </td>
      <td>
        <div class="form-group">
          <label for="my-select">Select an option:</label>
          <select class="form-control" id="my-select" onChange={(e) => setBadgeImg(e.target.value)}>
            <option value="">--Select Badge--</option>
            {btype &&
              btype.map((type) => (
                <option key={type.id} value={type.badgeImg}>
                  {type.badgeName}
                </option>
              ))}
          </select>
        </div>
      </td>
      <td>
        <button type="button" class="btn btn-primary" onClick={handleFormSubmit}>
          Add Badge
        </button>
      </td>
    </tr>
  </tbody>
</table>


<table className="table">
  <thead>
    <tr>
      <th>Badge Name</th>
      <th>Badge Description</th>
      <th>Badge Image</th>
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
        </tr>
      ))}
  </tbody>
</table>

    </>
  );
};
export default Details;
