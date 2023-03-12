import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

// const Landing = lazy(()=>import('./views/examples/Landing'));
// const Login = lazy(()=>import('./views/Login'));

// const Profile = lazy(()=>import('./views/Profile'));
// const Index = lazy(()=>import('./views/Index'));

// const Register = lazy(()=>import('./views/Register'));
// const NotFound = lazy(()=>import('./views/NotFound'));

import Indexs from "views/Index.js";
import Landing from "views/Landing.js";

import Login from "views/Login.js";
import ProfileFront from "views/Profile.js";
import Reset from "views/Reset.js";

import Register from "views/Register.js";
import DemoNavbar from "components/Navbars/DemoNavbar";
import SimpleFooter from "components/Footers/SimpleFooter";

import Index from "views/Backend/Index.js";
import Profile from "views/Backend/Profile.js";
import Tables from "views/Backend/Tables.js";
import UserList from "views/Backend/UsersList";


function App() {
  return (
    <>
      <DemoNavbar />
      <Routes >
        { /* <Route path="*" element={<NotFound/>}/> */}
        <Route path="/landing-page" element={< Landing />} />
        <Route path="/login-page" element={< Login />} />
        <Route path="/profile-page" element={< ProfileFront />} />
        <Route path="/Composant" element={< Indexs />} />
        <Route path="/Register-page" element={< Register />} />
        <Route path="/Profile" element={< Profile />} />
        <Route path="/Tables" element={< Tables />} />
        <Route path="/Index" element={< Index />} />
        <Route path="/Userlist" element={< UserList />} />
        <Route path="/reset" element={< Reset />} />
      </Routes>
      < SimpleFooter />
    </>
  );
}

export default App;