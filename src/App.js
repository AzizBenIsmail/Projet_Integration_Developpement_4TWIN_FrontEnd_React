import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import "./style.css";

// const Landing = lazy(()=>import('./views/examples/Landing'));
// const Login = lazy(()=>import('./views/Login'));

// const Profile = lazy(()=>import('./views/Profile'));
// const Index = lazy(()=>import('./views/Index'));

// const Register = lazy(()=>import('./views/Register'));
// const NotFound = lazy(()=>import('./views/NotFound'));

//Template
import Info from "views/Frontend/Template/Info";
import Indexs from "views/Frontend/Template/Index.js";
import NotFound from "views/Frontend/Template/NotFound.js";
import IndexDefault from "views/Frontend/Template/Index.js";
import Landing from "views/Frontend/Template/Landing.js";

//user
import Reset from "views/Frontend/User/Reset.js";
import Login from "views/Frontend/User/Login.js";
import ResetPwd from "views/Frontend/User/ResetPwd";
import Register from "views/Frontend/User/Register.js";
import ProfileFront from "views/Frontend/User/Profile.js";

//Project
import Projects from "views/Frontend/Project/Projects.js";
import ProjectsUser from "views/Frontend/Project/ProjectsUser";
import Projects_details from "views/Frontend/Project/Projects_details";
import ProfileUserProject from "views/Frontend/Project/ProfileUserProject.js";
import AddProjects from "views/Frontend/Project/AddProjects";
import UpdateProject from "views/Frontend/Project/UpdateProject";
import Backend_Projects from "views/Backend/Project/Backend_Projects";

//Invest
import Invest from "views/Frontend/Invest/Invest.js";
import AddInvest from "views/Frontend/Invest/AddInvest";
import InvestUser from "views/Frontend/Invest/InvestUser";

//Fablab
import FablabJoin from "./views/Frontend/Fablab/FablabJoin";
import AdminFablabJoin from "./views/Backend/Fablab/AdminFablabJoin";
import FablabRequestDetails from "./views/Backend/Fablab/FablabRequestDetails";

//Backend
import Index from "views/Backend/Template/Index.js";
import Profile from "views/Backend/User/Profile.js";
import Backend_Users from "views/Backend/User/Backend_Users.js";
import ProfileAdd from "views/Backend/User/Profile-Add";

//Footer Spinner
import SimpleFooter from "components/Footers/SimpleFooter";
import SpinnerExample from "components/spinner/Spinner";
import MapPage from "MapPage/MapPage";

function App() {
  return (
    <>
      <Suspense fallback={<SpinnerExample />}>
        {/* <DemoNavbar /> */}
        <Routes>
          <Route path="*" element={<NotFound />} />

          {/* Template */}

          <Route path="/landing-page" element={<Landing />} />
          <Route path="/Index" element={<Index />} />
          <Route path="/IndexDefault" element={<IndexDefault />} />
          <Route path="/Info" element={<Info />} />
          <Route path="/Composant" element={<Indexs />} />

          {/* User */}

          <Route path="/login-page" element={<Login />} />
          <Route path="/profile-page" element={<ProfileFront />} />
          <Route path="/Register-page" element={<Register />} />
          <Route path="/Profile/:id" element={<Profile />} />
          <Route path="/Backend_Users" element={<Backend_Users />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/resetpwd" element={<ResetPwd />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/Profile-Add" element={<ProfileAdd />} />

          {/* Projects */}

          <Route path="/Projects" element={<Projects />} />
          <Route path="/ProjectsUser" element={<ProjectsUser />} />
          <Route
            path="/Projects_details/:id/:iduser"
            element={<Projects_details />}
          />
          <Route
            path="/ProfileUserProject/:id"
            element={<ProfileUserProject />}
          />
          <Route path="/AddProjects" element={<AddProjects />} />
          <Route path="/UpdateProject/:id" element={<UpdateProject />} />
          <Route path="/Backend_Projects" element={<Backend_Projects />} />

          {/* Invest */}
          <Route path="/Invest" element={<Invest />} />
          <Route path="/AddInvest/:idProject" element={<AddInvest />} />
          <Route path="/InvestUser/" element={<InvestUser />} />

          {/* FablabJoin */}

          <Route path="/FablabJoin" element={<FablabJoin />} />
          <Route path="/AdminFablabJoin" element={<AdminFablabJoin />} />
          <Route
            path="/FablabRequestDetails/:id"
            element={<FablabRequestDetails />}
          />

          {/* chat and map*/}
          <Route path="/map" element={<MapPage />} />
        </Routes>
      </Suspense>
      <SimpleFooter />
    </>
  );
}

export default App;
