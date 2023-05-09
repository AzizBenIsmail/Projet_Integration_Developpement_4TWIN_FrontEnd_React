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
  const [hoveredProject, setHoveredProject] = useState(null);
  const myLocation = useSelector((state) => state.map.myLocation);
  const [infos, setInfos] = useState([]);
  const [jobOffers, setJobOffers] = useState([]);
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
        console.log(data);
        const projects = data.projects.map((project) => ({
          id: project._id,
          title: project.title,
          creator: project.creator,
          image_project: project.image_project,
          description: project.description,
          montant_Final: project.montant_Final,
          montant_actuel: project.montant_actuel,
        }));
        setInfos(projects);
        const jobOffers = data.jobOffers.map((jobOffer) => ({
          id: jobOffer._id,
          title: jobOffer.title,
          businessOwner: jobOffer.businessOwner,
        }));
        setJobOffers(jobOffers);
      } catch (error) {
        console.error(error);
      }
    }

    setInfos([]);
    setJobOffers([]);
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
    setCurrentPage(currentPage + 1);
  };
  const back = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <>
      {hoveredProject && (
        <div className="black-box">
          <img
            src={`http://localhost:5000/images/${
              infos.find((info) => info.id === hoveredProject)?.image_project
            }`}
            style={{
              width: "200px",
              height: "200px",
              display: "block",
              margin: "10 auto",
            }}
            alt="image_"
          />
          <h2>
            Title : {infos.find((info) => info.id === hoveredProject)?.title}
          </h2>
          <p>
            By :{" "}
            {infos.find((info) => info.id === hoveredProject)?.creator.username}
          </p>
          <p>
            {" "}
            Progress:{" "}
            {infos.find((info) => info.id === hoveredProject)?.montant_actuel}/
            {infos.find((info) => info.id === hoveredProject)?.montant_Final} DT
          </p>
          <h3> Description: </h3>
          <p>
            {infos
              .find((info) => info.id === hoveredProject)
              ?.description.slice(0, 100)}
            {infos.find((info) => info.id === hoveredProject)?.description
              .length > 100
              ? "..."
              : ""}
          </p>
          {/* Add more project information here */}
        </div>
      )}


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
              <div
                className="project-item"
                key={index}
                onMouseOver={() => setHoveredProject(id)}
                onMouseOut={() => setHoveredProject(null)}
              >
                <span className="project-title">{title}</span>
                <a class="invest-button" href={`/Projects_details/${id}/${creator._id}`} target="_blank" rel="noreferrer">Invest</a>
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
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <li
                    key={page}
                    className={page === currentPage ? "active" : ""}
                    onClick={() => handlePageChange(page)}
                  >
                    <Pagination>
                      <PaginationItem
                        className={page == currentPage ? "active" : ""}
                      >
                        <PaginationLink onClick={(e) => handlePageChange(page)}>
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>{" "}
                  </li>
                )
              )}
              <PaginationItem>
                <PaginationLink onClick={(e) => next()}>
                  <i className="fa fa-angle-right" />
                </PaginationLink>
              </PaginationItem>
            </ul>
          )}
        </div>

        <h3>Job Offers</h3>

        {jobOffers.length > 0 ? (
          jobOffers.map(({ title, id, businessOwner }, index) => (
            <div className="project-item" key={index}>
              <span className="project-title">{title}</span>
              <a
                class="invest-button"
                key={index}
                href={`/ListOfJobs`}
              >
                Consult
              </a>
            </div>
          ))
        ) : (
          <Label text="No job offers found for this user" />
        )}

        <ActionButtons socketId={socketId} username={username} />
      </div>
    </>
  );
};

export default UserInfoCard;
