import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Headroom from "headroom.js";
import Cookies from "js-cookie";
import { getUserAuth } from "../../services/apiUser";

import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Dropdown,
} from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { getTBadge } from "../../services/apiBadges";
import axios from "axios";
import { updateBadgeV } from "../../services/apiBadges";

export default function NavbarF() {
  const param = useParams();
  const navigate = useNavigate();
  const [collapseClasses, setCollapseClasses] = useState("");
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [user, setuser] = useState([]);
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
  ////////
  const onExiting = () => {
    setCollapseClasses("collapsing-out");
  };

  const onExited = () => {
    setCollapseClasses("");
  };

  useEffect(() => {
    getUserFunction(config);
    let headroom = new Headroom(document.getElementById("navbar-main"));
    headroom.init();
    const interval = setInterval(() => {
      getUserFunction(config);
    }, 15000);
    return () => clearInterval(interval); // nettoyage à la fin du cycle de vie du composant
  }, []);

  useEffect(() => {
    getT();
  }, [user.username]);
  useEffect(() => {
    getTVU();
  }, [user.username]);

  const getUserFunction = async (config) => {
    const res = await getUserAuth(param.id, config)
      .then((res) => {
        setuser(res.data.user);
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //tst

  const [badge, setBadge] = useState("");

  const getT = async () => {
    try {
      const response2 = await getTBadge(user.username); // Appeler votre fonction de service pour obtenir les badges d'un utilisateur en fonction de son nom d'utilisateur
      setBadge(response2.data.badges); // Supposons que la réponse contient un champ 'badges' avec un tableau d'objets de badges
      //------------
    } catch (error) {
      console.log(error);
    }
  };

  const [nb, setNb] = useState("");

  const getTVU = async () => {
    try {
      const response2 = await axios.get(
        `http://localhost:5000/badges/tv/${user.username}`
      );
      setNb(response2.data.count);
    } catch (error) {
      console.log(error);
    }
  };

  async function handleUpdateBadge() {
    try {
      const updatedBadge = await updateBadgeV(user.username, { vu: true }); // Call the updateBadge function with the new etat value
      console.log(updatedBadge.data); // Log the updated badge data to the console
      getTVU();
      getT();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <header className="header-global">
        <Navbar
          className="navbar-main navbar-transparent navbar-light headroom bg-gradient-default"
          expand="lg"
          id="navbar-main"
        >
          <Container>
            <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
              <img
                style={{ width: "210px", height: "70px" }}
                alt="..."
                src={require("assets/img/brand/logo.png")}
              />
            </NavbarBrand>
            <button className="navbar-toggler " id="navbar_global">
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse
              toggler="#navbar_global"
              navbar
              className={collapseClasses}
              onExiting={onExiting}
              onExited={onExited}
            >
              <div className="navbar-collapse-header " user={user}>
                <Row>
                  <Col className="collapse-brand" xs="6" user={user}>
                    <Link to="/">
                      <img
                        user={user}
                        alt="..."
                        src={`http://localhost:5000/images/${user.image_user}`}
                      />
                    </Link>
                  </Col>
                  <Col className="collapse-close" xs="6">
                    <button className="navbar-toggler" id="navbar_global">
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>
              <Nav
                className="navbar-nav-hover align-items-lg-center  bg-gradient-default"
                navbar
              >
                <UncontrolledDropdown nav>
                  <DropdownToggle nav to="/landing-page" tag={Link}>
                    <i className="ni ni-ui-04 d-lg-none mr-1" />
                    <span
                      className="nav-link-inner--text"
                      style={{ color: "#ffff" }}
                    >
                      Home
                    </span>
                  </DropdownToggle>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav>
                  <DropdownToggle nav to="/Projects" tag={Link}>
                    <i className="ni ni-collection d-lg-none mr-1" />
                    <span
                      className="nav-link-inner--text"
                      style={{ color: "#ffff" }}
                    >
                      Projects
                    </span>
                  </DropdownToggle>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav>
                  <DropdownToggle nav to="/LandingPage" tag={Link}>
                    <i className="ni ni-collection d-lg-none mr-1" />
                    <span
                      className="nav-link-inner--text"
                      style={{ color: "#ffff" }}
                    >
                      Jobs
                    </span>
                  </DropdownToggle>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav>
                  <DropdownToggle nav to="/Invest" tag={Link}>
                    <i className="ni ni-collection d-lg-none mr-1" />
                    <span
                      className="nav-link-inner--text"
                      style={{ color: "#ffff" }}
                    >
                      Invest
                    </span>
                  </DropdownToggle>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav>
                  <DropdownToggle nav to="/eventsFablab" tag={Link}>
                    <i className="ni ni-collection d-lg-none mr-1" />
                    <span
                      className="nav-link-inner--text"
                      style={{ color: "#ffff" }}
                    >
                      Events
                    </span>
                  </DropdownToggle>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav>
                  <DropdownToggle nav to="/fablabs" tag={Link}>
                    <i className="ni ni-collection d-lg-none mr-1" />
                    <span
                      className="nav-link-inner--text"
                      style={{ color: "#ffff" }}
                    >
                      Fablabs
                    </span>
                  </DropdownToggle>
                </UncontrolledDropdown>
                
              </Nav>
              <Nav className="align-items-lg-center ml-lg-auto " navbar>
                <Nav className="align-items-center d-none d-md-flex" navbar>
                  <UncontrolledDropdown nav>
                    <DropdownToggle className="pr-0" nav>
                      <Media className="align-items-center ">
                        <span className="avatar avatar-sm rounded-circle">
                          <img
                            alt="..."
                            src={`http://localhost:5000/images/${user.image_user}`}
                          />
                        </span>
                        <Media className="ml-3 d-none d-lg-block">
                          <span className="text-sm font-weight-bold text-white ml-2">
                            {user.username}
                          </span>
                        </Media>
                      </Media>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" left>
                      <DropdownItem className="noti-title" header tag="div">
                        <h6 className="text-overflow m-0">Welcome!</h6>
                      </DropdownItem>
                      {/* <DropdownItem to="/profile-page/:iduser" tag={Link}> */}
                      <DropdownItem to="/profile-page" tag={Link}>
                        <i className="ni ni-single-02" />
                        <span>My profile</span>
                      </DropdownItem>
                      {/* <DropdownItem to="/ProjectsUser/:iduser" tag={Link}> */}
                      <DropdownItem to="/ProjectsUser" tag={Link}>
                        <i className="ni ni-settings-gear-65" />
                        <span>Manage you Project</span>
                      </DropdownItem>
                      {user.userType === "fablab" && (
                        <DropdownItem
                          to={`/eventsFablab/${user._id}`}
                          tag={Link}
                        >
                          <i className="ni ni-settings-gear-65" />
                          <span>Manage your Event</span>
                        </DropdownItem>
                      )}

                      <DropdownItem onClick={(e) => navigate(`/InvestUser`)}>
                        <i className="ni ni-calendar-grid-58" />
                        <span>Activity Invest</span>
                      </DropdownItem>
                      <DropdownItem to="/OffersCreated" tag={Link}>
                        <i className="ni ni-briefcase-24" />
                        <span>Created Jobs</span>
                      </DropdownItem>
                      <DropdownItem to="/admin/user-profile" tag={Link}>
                        <i className="ni ni-support-16" />
                        <span>Support</span>
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem
                        onClick={(e) => {
                          navigate(`/login-page`);
                          Cookies.remove("user");
                        }}
                      >
                        <i className="ni ni-user-run" />
                        <span>Logout</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </Nav>
            </UncontrolledCollapse>
            <UncontrolledDropdown onClick={() => handleUpdateBadge()}>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center ">
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faBell} />
                    <span className="badge badge-pill badge-danger ml-1">
                      {nb}
                    </span>
                  </div>
                </Media>
              </DropdownToggle>
              <DropdownMenu>
  <DropdownItem className="noti-title" header tag="div">
    <h6 className="text-overflow m-0">Notifications !</h6>
  </DropdownItem>
  <div style={{ maxHeight: "200px", overflowY: "scroll" }}>
    {badge.length > 0 &&
      badge.map((item, index) => (
        <DropdownItem key={index} to="/profile-page" tag={Link}>
          <i className="ni ni-bell-55" />
          <span>{item.badgeName} 🎁</span>
          <h6>Badge : {item.date.split("T")[0]}</h6>

          <DropdownItem divider />
        </DropdownItem>
      ))}
  </div>
</DropdownMenu>

            </UncontrolledDropdown>
          </Container>
        </Navbar>
      </header>
    </>
  );
}
