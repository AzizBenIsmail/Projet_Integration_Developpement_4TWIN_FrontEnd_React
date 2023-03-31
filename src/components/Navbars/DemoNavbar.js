import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Headroom from "headroom.js";
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
  const navigate = useNavigate();
  const [collapseClasses, setCollapseClasses] = useState("");
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [user, setuser] = useState("641cdeee29a97f7a08bd9a42");

  const onExiting = () => {
    setCollapseClasses("collapsing-out");
  };

  const onExited = () => {
    setCollapseClasses("");
  };

  useEffect(() => {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    headroom.init();
  }, []);
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
              <div className="navbar-collapse-header">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link to="/">
                      <img
                        alt="..."
                        src={require("assets/img/brand/argon-react.png")}
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
              <Nav className="navbar-nav-hover align-items-lg-center" navbar>
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
                  <DropdownToggle nav to="/Info" tag={Link}>
                    <i className="ni ni-collection d-lg-none mr-1" />
                    <span
                      className="nav-link-inner--text"
                      style={{ color: "#ffff" }}
                    >
                      Info
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
                  <DropdownToggle nav>
                    <i className="ni ni-collection d-lg-none mr-1" />
                    <span
                      className="nav-link-inner--text"
                      style={{ color: "#ffff" }}
                    >
                      Example
                    </span>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      to="/landing-page"
                      tag={Link}
                      style={{ color: "#172b4d" }}
                    >
                      Landing
                    </DropdownItem>
                    <DropdownItem
                      to="/profile-page/641cdeee29a97f7a08bd9a42"
                      tag={Link}
                      style={{ color: "#172b4d" }}
                    >
                      Profile
                    </DropdownItem>
                    <DropdownItem
                      to="/login-page"
                      tag={Link}
                      style={{ color: "#172b4d" }}
                    >
                      Login
                    </DropdownItem>
                    <DropdownItem
                      to="/register-page"
                      tag={Link}
                      style={{ color: "#172b4d" }}
                    >
                      Register
                    </DropdownItem>
                    <DropdownItem
                      to="/Backend_Users"
                      tag={Link}
                      style={{ color: "#172b4d" }}
                    >
                      Backend Users
                    </DropdownItem>
                    <DropdownItem
                      to="/Index"
                      tag={Link}
                      style={{ color: "#172b4d" }}
                    >
                      Backend
                    </DropdownItem>
                    <DropdownItem
                      to="/Profile/641cdeee29a97f7a08bd9a42"
                      tag={Link}
                      style={{ color: "#172b4d" }}
                    >
                      Profile
                    </DropdownItem>
                    <DropdownItem
                      to="/IndexDefault"
                      tag={Link}
                      style={{ color: "#172b4d" }}
                    >
                      IndexDefault
                    </DropdownItem>
                  </DropdownMenu>
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
                            src={require("../../assets/img/theme/User.png")}
                          />
                        </span>
                        <Media className="ml-2 d-none d-lg-block">
                          <span className="mb-0 text-sm font-weight-bold text-white">
                            User
                          </span>
                        </Media>
                      </Media>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" left>
                      <DropdownItem className="noti-title" header tag="div">
                        <h6 className="text-overflow m-0">Welcome!</h6>
                      </DropdownItem>
                      {/* <DropdownItem to="/profile-page/:iduser" tag={Link}> */}
                      <DropdownItem
                        to="/profile-page/641cdeee29a97f7a08bd9a42"
                        tag={Link}
                      >
                        <i className="ni ni-single-02" />
                        <span>My profile</span>
                      </DropdownItem>
                      {/* <DropdownItem to="/ProjectsUser/:iduser" tag={Link}> */}
                      <DropdownItem
                        to="/ProjectsUser/641cdeee29a97f7a08bd9a42"
                        tag={Link}
                      >
                        <i className="ni ni-settings-gear-65" />
                        <span>Manage you Project</span>
                      </DropdownItem>
                      <DropdownItem
                        onClick={(e) =>
                          navigate(`/InvestUser/641cdeee29a97f7a08bd9a42`)
                        }
                      >
                        <i className="ni ni-calendar-grid-58" />
                        <span>Activity Invest</span>
                      </DropdownItem>
                      <DropdownItem to="/admin/user-profile" tag={Link}>
                        <i className="ni ni-support-16" />
                        <span>Support</span>
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem onClick={(e) => navigate(`/login-page`)}>
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
