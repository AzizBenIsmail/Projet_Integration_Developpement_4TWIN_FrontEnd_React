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
  UncontrolledTooltip
} from "reactstrap";

export default function NavbarF () {
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
          className="navbar-main navbar-transparent navbar-light headroom"
          expand="lg"
          id="navbar-main"
        >
          <Container>
              <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
                <img style={{width: '210px',height:'70px'}}
                  alt="..."
                  src={require("assets/img/brand/logo.png")}
                />
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar_global">
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
                      <span className="nav-link-inner--text" style={{color:"#ffff"}}>Home</span>
                    </DropdownToggle>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav to="/landing-page" tag={Link}>
                      <i className="ni ni-collection d-lg-none mr-1" />
                      <span className="nav-link-inner--text" style={{color:"#ffff"}}>Projects</span>
                    </DropdownToggle>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown nav >
                    <DropdownToggle nav to="/landing-page" tag={Link}>
                      <i className="ni ni-collection d-lg-none mr-1" />
                      <span className="nav-link-inner--text" style={{color:"#ffff"}}>Events</span>
                    </DropdownToggle>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="ni ni-collection d-lg-none mr-1" />
                      <span className="nav-link-inner--text" style={{color:"#ffff"}}>Examples</span>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem to="/landing-page" tag={Link}>
                        Landing
                      </DropdownItem>
                      <DropdownItem to="/profile-page" tag={Link}>
                        Profile
                      </DropdownItem>
                      <DropdownItem to="/login-page" tag={Link}>
                        Login
                      </DropdownItem>
                      <DropdownItem to="/register-page" tag={Link}>
                        Register
                      </DropdownItem><DropdownItem to="/Tables" tag={Link}>
                        Tables
                      </DropdownItem><DropdownItem to="/Index" tag={Link}>
                      Index
                      </DropdownItem><DropdownItem to="/Profile" tag={Link}>
                      Profile
                      </DropdownItem>
                      <DropdownItem to="/Userlist" tag={Link}>
                      Userlist
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
                <Nav className="align-items-lg-center ml-lg-auto" navbar>
                  <NavItem className="d-none d-lg-block ml-lg-4">
                  
                    <Button
                      className="btn-neutral btn-icon"
                      color="default"
                      //href="https://www.creative-tim.com/product/argon-design-system-react?ref=adsr-navbar"
                      target="_blank"
                    > <Link to="/login-page">
                      <span className="btn-inner--icon">
                        <i className="fa fa-sign-in mr-2" />
                      </span>
                      <span className="nav-link-inner--text ml-1">
                        Login
                      </span>
                      </Link>
                    </Button>
                   
                   
                    <Button
                      className="btn-neutral btn-icon"
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

