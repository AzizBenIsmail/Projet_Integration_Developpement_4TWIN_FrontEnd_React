import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { calculateDistanceBetweenCoords } from "resources/utils/location";
import ActionButtons from "./ActionButtons";
import axios from "axios";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const Label = ({ fontSize, text }) => {
  return (
    <p className="map_page_card_label" style={{ fontSize }}>
      {text}
    </p>
  );
};

const UserInfoCard = ({ username, userLocaion, socketId }) => {
  const myLocation = useSelector((state) => state.map.myLocation);
  const [infos, setInfos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3;

  useEffect(() => {
    async function getInfo(username) {
      try {
        const response = await axios.post(
          "http://localhost:5000/chat/PInfo",
          { username },
          { headers: { "Content-Type": "application/json" } }
        );
        const data = response.data;
        const projects = data.projects.map((project) => ({
          id: project._id,
          title: project.title,
          creator: project.creator,
        }));
        setInfos(projects);
      } catch (error) {
        console.error(error);
      }
    }

    setInfos([]);
    getInfo(username);
  }, [username]);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = infos.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(infos.length / projectsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const next = () => {
    setCurrentPage(currentPage+1);
  };
  const back = () => {
    setCurrentPage(currentPage-1);
  };
  
  return (
    <div className="map_page_card_container">
      <Label text={username} fontSize="16px"></Label>
      <Label
        fontSize="14px"
        text={` IS ${calculateDistanceBetweenCoords(
          myLocation,
          userLocaion
        )} Km AWAY FROM YOU`}
      ></Label>

      <div className="project-section">
        <h3>Projects</h3>

        {infos.length > 0 ? (
          currentProjects.map(({ title, id, creator }, index) => (
            <div className="project-item" key={index}>
              <span className="project-title">{title}</span>
              <a
                className="project-link"
                key={index}
                href={`/Projects_details/${id}/${creator._id}`}
              >
                <i className="material-icons">account_circle</i>
              </a>
            </div>
          ))
        ) : (
          <Label text="No projects found for this user" />
        )}

        {totalPages > 1 && (
          <ul className="pagination">
            <PaginationItem>
              <PaginationLink onClick={(e) => back()}>
                <i className="fa fa-angle-left" />
              </PaginationLink>
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <li
                key={page}
                className={page === currentPage ? "active" : ""}
                onClick={() => handlePageChange(page)}
              >
<Pagination>
                              <PaginationItem
                              className={page == currentPage ? "active" : ""}
                              >
                                <PaginationLink
                                  href="#pablo"
                                  onClick={(e) => handlePageChange(page)}
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            </Pagination>              </li>
            ))}
             <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => next()}
                        >
                          <i className="fa fa-angle-right" />
                        </PaginationLink>
                      </PaginationItem>
          </ul>
        )}
      </div>
      <ActionButtons socketId={socketId} username={username} />
    </div>
  );
};

export default UserInfoCard;
