import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import "./style.css";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Footer Spinner
import SpinnerExample from "components/spinner/Spinner";
import MapPage from "MapPage/MapPage";
import SimpleFooter from "components/Footers/SimpleFooter";
import Event from "views/Frontend/Event/event";

//Recruit
import AddJobOffer from "views/Frontend/Recruit/ApplicationEmployer";
import ListOfJobs from "views/Frontend/Recruit/ListOfJobs";
import JobOfferCard from "views/Frontend/Recruit/JobOfferCard";
import OffersCreated from "views/Frontend/Recruit/OffersCreated";
import CandidateList from "views/Frontend/Recruit/CandidateList";
import Candi from "views/Frontend/Recruit/Candi";
import DisplayedJobs from "views/Frontend/Recruit/DisplayedJobs";
import FillApplication from "views/Frontend/Recruit/FillApplication";
import LandingPage from "views/Frontend/Recruit/LandingPage";
import VoiceSearch from "views/Frontend/Recruit/VoiceSearch";
import ChatBackOffice from "./views/Backend/Chat/Chat";

//Template Lazy Loading
const Info = lazy(() => import("./views/Frontend/Template/Info"));
const Indexs = lazy(() => import("./views/Frontend/Template/Index.js"));
const NotFound = lazy(() => import("./views/Frontend/Template/NotFound.js"));
const IndexDefault = lazy(() => import("./views/Frontend/Template/Index.js"));
const Landing = lazy(() => import("./views/Frontend/Template/Landing.js"));

//user Lazy Loading
const Reset = lazy(() => import("./views/Frontend/User/Reset.js"));
const Login = lazy(() => import("./views/Frontend/User/Login.js"));
const ResetPwd = lazy(() => import("./views/Frontend/User/ResetPwd"));
const Register = lazy(() => import("./views/Frontend/User/Register.js"));
const ProfileFront = lazy(() => import("./views/Frontend/User/Profile.js"));

//Project Lazy Loading
const Projects = lazy(() => import("./views/Frontend/Project/Projects.js"));
const ProjectsUser = lazy(() =>
  import("./views/Frontend/Project/ProjectsUser")
);
const Projects_details = lazy(() =>
  import("./views/Frontend/Project/Projects_details")
);
const ProfileUserProject = lazy(() =>
  import("./views/Frontend/Project/ProfileUserProject.js")
);
const AddProjects = lazy(() => import("./views/Frontend/Project/AddProjects"));
const UpdateProject = lazy(() =>
  import("./views/Frontend/Project/UpdateProject")
);
const Backend_Projects = lazy(() =>
  import("./views/Backend/Project/Backend_Projects")
);



//Invest Lazy Loading
const ChatBack = lazy(() => import("./views/Backend/Chat/Chat"));
const Invest = lazy(() => import("./views/Frontend/Invest/Invest.js"));
const AddInvest = lazy(() => import("./views/Frontend/Invest/AddInvest"));
const InvestUser = lazy(() => import("./views/Frontend/Invest/InvestUser"));
const Backend_invests = lazy(() =>
  import("./views/Backend/Invest/Backend_invests")
);
const AdminEvaluation = lazy(() =>
  import("./views/Backend/Evaluation/AdminEvaluation")
);
const AdminEvaluationDetails = lazy(() =>
  import("./views/Backend/Evaluation/AdminEvaluationDetails")
);

//Fablab Lazy Loading
const FablabJoin = lazy(() => import("./views/Frontend/Fablab/FablabJoin"));
const AdminFablabJoin = lazy(() =>
  import("./views/Backend/Fablab/AdminFablabJoin")
);
const FablabRequestDetails = lazy(() =>
  import("./views/Backend/Fablab/FablabRequestDetails")
);

const FablabList = lazy(() =>
  import("views/Frontend/Fablab/FablabList")
);



//event Lazy Loading
const EventsFablab = lazy(() => import("./views/Frontend/Event/eventsFablab"));
const AddEvent = lazy(() => import("./views/Frontend/Event/addEvent"));
const EventDetails = lazy(() => import("./views/Frontend/Event/eventDetails"));
//const AddImage = lazy(() => import("./views/Frontend/Event/addImage"));
const AdminEvent = lazy(() => import("views/Backend/Fablab/AdminEvent"));

//Backend Lazy Loading
const Index = lazy(() => import("./views/Backend/Template/Index.js"));
const Profile = lazy(() => import("./views/Backend/User/Profile.js"));
const Backend_Users = lazy(() =>
  import("./views/Backend/User/Backend_Users.js")
);
const ProfileAdd = lazy(() => import("./views/Backend/User/Profile-Add"));

function App() {
  return (
    <>
    <div>
      <ToastContainer />
      {/* ... */}
    </div>

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

          {/* Recruit */}

          <Route path="/AddJobOffer" element={<AddJobOffer />} />
          <Route path="/ListOfJobs" element={<ListOfJobs />} />
          <Route path="/JobOfferCard" element={<JobOfferCard />} />
          <Route path="/OffersCreated/" element={<OffersCreated />} />
          <Route path="/CandidateList/:jobId" element={<CandidateList />} />
          <Route path="/Candi/" element={<Candi />} />
          <Route path="/DisplayedJobs/" element={<DisplayedJobs />} />
          <Route path="/FillApplication/" element={<FillApplication />} />
          <Route path="/LandingPage" element={<LandingPage />} />
          <Route path="/VoiceSearch" element={<VoiceSearch />} />

          {/* Invest */}
          <Route path="/Invest" element={<Invest />} />
          <Route path="/AddInvest/:idProject" element={<AddInvest />} />
          <Route path="/InvestUser/" element={<InvestUser />} />
          <Route path="/Backend_invests/" element={<Backend_invests />} />
          <Route path="/AdminEvaluation/" element={<AdminEvaluation />} />
          <Route path="/evaluation/:id" element={<AdminEvaluationDetails/>} />

          {/* FablabJoin */}

          <Route path="/FablabJoin" element={<FablabJoin />} />
          <Route path="/AdminFablabJoin" element={<AdminFablabJoin />} />
          <Route path="/fablabs" element={<FablabList />} />

          <Route
            path="/FablabRequestDetails/:id"
            element={<FablabRequestDetails />}
          />

          {/* ChatBackoffice */}
<Route path="/Chat/" element={<ChatBackOffice />} />
          {/* Events */}
          <Route path="/eventsFablab/" element={<EventsFablab />} />
          <Route
            path="/eventsFablab/:id"
            element={<EventsFablab fablabEvent={true} />}
          />
          <Route
            path="/event/"
            element={
              <Event
                fablabEvent={true}
                creatorId={"643216cd888293912452e8eb"}
              />
            }
          />

          <Route path="/eventDetails/:id" element={<EventDetails />}></Route>
          <Route path="/addEvent" element={<AddEvent />} />
          <Route
            path="/AdminEvent"
            element={
              <AdminEvent url="http://localhost:5000/events" fablab={false} />
            }
          />

          {/*<Route path="/addImage" element={<AddImage />} />*/}

          {/* chat and map*/}
          <Route path="/map" element={<MapPage />} />
        </Routes>
      </Suspense>
      <SimpleFooter />
    </>
  );
}

export default App;
