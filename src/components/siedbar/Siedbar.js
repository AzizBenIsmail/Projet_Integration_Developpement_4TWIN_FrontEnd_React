import React, { useState } from "react";
import "../../assets/styles.css"; // Assurez-vous d'importer votre feuille de style CSS
// node.js library that concatenates classes (strings)
import classnames from "classnames";
import { useNavigate } from "react-router-dom";

function Siedbar() {
  const [sideNavWidth, setSideNavWidth] = useState(0);
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState(1);

  function openNav() {
    setSideNavWidth(250);
  }

  function closeNav() {
    setSideNavWidth(0);
  }

  return (
    <div>
      <span style={{ fontSize: "30px", cursor: "pointer" }} onClick={openNav}>
        &#9776; open
      </span>
      <div>
        <div id="mySidenav" className="sidenav" style={{ width: sideNavWidth }}>
          <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>
            &times;
          </a>
          <a
            className={classnames("py-2 px-3", {
              active: activeNav === 1,
            })}
            onClick={(e) => navigate(`/Backend_Users`)}
          >
            Users
          </a>
          <a
            className={classnames("py-2 px-3", {
              active: activeNav === 1,
            })}
            onClick={(e) => navigate(`/Backend_Projects`)}
          >
            Project
          </a>{" "}
          <a
            className={classnames("py-2 px-3", {
              active: activeNav === 1,
            })}
            onClick={(e) => navigate(`/Backend_invests`)}
          >
            Invest
          </a>
          <a
            className={classnames("py-2 px-3", {
              active: activeNav === 1,
            })}
            onClick={(e) => navigate(`/AdminFablabJoin`)}
          >
            Fablabs
          </a>
          <a
            className={classnames("py-2 px-3", {
              active: activeNav === 1,
            })}
            onClick={(e) => navigate(`/Index`)}
          >
            All
          </a>
          <a
            className={classnames("py-2 px-3", {
              active: activeNav === 1,
            })}
            onClick={(e) => navigate(`/AdminEvaluation`)}
          >
            Evaluation
          </a>
        </div>
      </div>
    </div>
  );
}

export default Siedbar;
