import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Headroom from "headroom.js";
import Cookies from "js-cookie";
import {
  getUserAuth,
} from "../../services/apiUser";

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
} from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";

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
              <Nav className="navbar-nav-hover align-items-lg-center  bg-gradient-default" navbar>
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
                  <DropdownToggle nav to="/landing-page" tag={Link}>
                    <i className="ni ni-collection d-lg-none mr-1" />
                    <span
                      className="nav-link-inner--text"
                      style={{ color: "#ffff" }}
                    >
                      Fablab
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
                
              </Nav>
              <Nav className="align-items-lg-center ml-lg-auto " navbar>
                <NavItem className="d-none d-lg-block ml-lg-4 ">
                  <Button
                    color="default"
                    //href="https://www.creative-tim.com/product/argon-design-system-react?ref=adsr-navbar"
                    target="_blank"
                  >
                    <Link to="/FablabJoin">
                      <span className="btn-inner--icon">
                        <i className="fa fa-user-plus mr-2" />
                      </span>
                      <span className="nav-link-inner--text ml-1">
                        Join Us as Fablab
                      </span>
                    </Link>
                  </Button>
                </NavItem>
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
                      <DropdownItem to="/eventsFablab/643216cd888293912452e8eb" tag={Link}>
                        <i className="ni ni-settings-gear-65" />
                        <span>Manage your Event</span>
                      </DropdownItem>
                      <DropdownItem onClick={(e) => navigate(`/InvestUser`)}>
                        <i className="ni ni-calendar-grid-58" />
                        <span>Activity Invest</span>
                      </DropdownItem>
                      <DropdownItem to="/admin/user-profile" tag={Link}>
                        <i className="ni ni-support-16" />
                        <span>Support</span>
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem onClick={(e) => {navigate(`/login-page`)
                      Cookies.remove('user')
                      }}>
                        <i className="ni ni-user-run" />
                        <span>Logout</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
}
