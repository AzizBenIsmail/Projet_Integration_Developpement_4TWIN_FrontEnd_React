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
import { getFBadges,updateBadge } from "services/apiBadges";




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
    badgeImg: badgeImg
  };

  axios.post("http://localhost:5000/btype/add", newBType)
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
  window.history.pushState({}, '', `/evaluation/${id}`);
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


const handleDeleteB = async (id,xp,username) => {
  const response = await reduceXP(username, xp, config);

  await axios.delete(`http://localhost:5000/badges/${id}`);
  getD();
  getAllEvaluations();


};


async function handleUpdateBadge(id,xp,username, config) {
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
              <Table
                className="align-items-center table-dark table-flush"
                responsive
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Level</th>
                    <th scope="col">
                      Add ➕ or Reduce ➖  <input type="text" id="xp-input" name="xp-input" size="1" /> XP%   
                      

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
                              handleReduceXP(evaluation.usernameE, document.getElementById("xp-input").value)
                              
                            }
                          >
                            ➖
                          </button>
                          <button
                            onClick={() =>
                              handleAddXP(evaluation.usernameE, document.getElementById("xp-input").value)
                            }
                          >
                            ➕
                          </button>
                          <span className="mr-2">
                            {evaluation.xp}
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
                       
                            <DropdownItem    onClick={() => handleDetailsClick(evaluation.usernameE)}  >  Details</DropdownItem>
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

   
      <br/><br/>
      <h2>ADD NEW BADGE TYPE</h2>
      <br/>
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

  <label htmlFor="badgeImg">Badge Image</label>
  <input
    type="file"
    id="badgeImg"
    onChange={(e) => setBadgeImg(e.target.files[0].name)}
  />

  <button type="button" onClick={handleFormSubmit}>Add BType</button>
</form>
<br/>
<div>
        
      {btype && btype.map((type) => (
        <div key={type._id}>
          <h3>{type.badgeName}  </h3>
          <p>{type.badgeDescription}</p>
          <img width="100" height="50"         src={require(`../../../assets/img/badges/${type.badgeImg}`)}
 alt={type.badgeName} />

          <button  onClick={() => handleDelete(type._id)}   >Delete</button>
        </div>
        
      ))}
    </div>


<h1>waaaa</h1>



<div>
        <h1> Badges request</h1>
        {fbadges.length > 0 ? (
          fbadges.map((badge) => (
            <div key={badge._id}>
              <h3>Name: {badge.badgeName}</h3>

              <p>Description: {badge.badgeDescription}</p>
              <p>Date: {badge.date}</p>
              <p>img: {badge.usernameB}</p>
              <button onClick={() => handleUpdateBadge(badge._id,document.getElementById("xp").value,badge.usernameB, config)}>accept +</button>
              <input type="number" id="xp" name="xp" size="1" />
              <button  onClick={() => handleDeleteB(badge._id,document.getElementById("xp").value,badge.usernameB)}   >Delete - </button>
             


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




    </>
  );
};

export default Tables;
