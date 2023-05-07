// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import { getUsers, deleteUser } from "../../services/apiUser.js";
import { getProjects } from "../../services/apiProject.js";
import { getInvests } from "../../services/apiInvest.js";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const Header = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [invests, setInvests] = useState([]);

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
  useEffect(() => {
    getAllUser(config);
    getAllProject(config);
    getAllInvest()
    const interval = setInterval(() => {
      getAllUser(); // appel répété toutes les 10 secondes
      getAllProject(config);
      getAllInvest(config);
    }, 50000);
    return () => clearInterval(interval); // nettoyage à la fin du cycle de vie du composant
  
  }, []);

  const getAllUser=async()=>{
    const res = await getUsers()
      .then(res => {
        console.log(res.data);
        setUsers(res.data.users);
      })
      .catch(err => {
        console.log(err);
      });
  }
  const countUsers = (users) => {
    return users.length;
  };
  const getAllProject = async (config) => {
    const res = await getProjects(config)
      .then((res) => {
        setProjects(res.data.projects);
        console.log(res.data.projects);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const countProject = (projects) => {
    return projects.length;
  };
  const getAllInvest = async (config) => {
    const res = await getInvests(config)
      .then((res) => {
        setInvests(res.data.invests);
        console.log(res.data.invests);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const countInvest = (invests) => {
    return invests.length;
  };
  return (
    <>
      <div className="header bg-gradient-info pb-2 pt-5 pt-md-2">
        <Container fluid>
        <AdminNavbar/>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Projects
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                        {countProject(projects)}                          
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Invest
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{countInvest(invests)}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                        <i className="fas fa-arrow-down" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last week</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Users
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{countUsers(users)}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-warning mr-2">
                        <i className="fas fa-arrow-down" /> 1.10%
                      </span>{" "}
                      <span className="text-nowrap">Since yesterday</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Performance
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">49,65%</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 12%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
