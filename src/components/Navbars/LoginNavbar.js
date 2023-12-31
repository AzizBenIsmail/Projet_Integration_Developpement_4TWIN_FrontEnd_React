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

export default function LoginNavbar() {
  const navigate = useNavigate();
  const [collapseClasses, setCollapseClasses] = useState("");
  const [collapseOpen, setCollapseOpen] = useState(false);

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
                  <DropdownToggle nav to="/Info" tag={Link}>
                    <i className="ni ni-collection d-lg-none mr-1" />
                    <span
                      className="nav-link-inner--text"
                      style={{ color: "#ffff" }}
                    >
                      <i className="fa fa-info mr-2" />
                      Info
                    </span>
                  </DropdownToggle>
                </UncontrolledDropdown>
              </Nav>
              <Nav className="align-items-lg-center ml-lg-auto" navbar>
                <NavItem className="d-none d-lg-block ml-lg-4">
                  <Button
                    color="default"
                    //href="https://www.creative-tim.com/product/argon-design-system-react?ref=adsr-navbar"
                    onClick={(e) => navigate(`/login-page`)}
                    target="_blank"
                  >
                    {" "}
                    <Link to="/login-page">
                      <span className="btn-inner--icon">
                        <i class="ni ni-single-02" />
                      </span>
                      <span className="nav-link-inner--text ml-1">Login</span>
                    </Link>
                  </Button>

                  <Button
                    color="default"
                    //href="https://www.creative-tim.com/product/argon-design-system-react?ref=adsr-navbar"
                    target="_blank"
                  >
                    <Link to="/Register-page">
                      <span className="btn-inner--icon">
                        <i className="fa fa-user-plus mr-2" />
                      </span>
                      <span className="nav-link-inner--text ml-1">
                        Create new account
                      </span>
                    </Link>
                  </Button>
                </NavItem>
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
              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
}
