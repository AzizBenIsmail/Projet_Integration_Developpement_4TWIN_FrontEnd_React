
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

import Index from "views/Index.js";
import Landing from "views/examples/Landing.js";
import Login from "views/Login.js";
import Profile from "views/Profile.js";
import Register from "views/Register.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Switch>
      <Route path="/Composant" exact render={(props) => <Index {...props} />} />

      {/* <Route path="/" exact component={Register} /> */}
      <Route path="/landing-page" exact component={Landing} />
      <Route path="/login-page" exact component={Login} />
      <Route path="/profile-page" exact component={Profile} />
      <Route path="/" exact component={Register} />

      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
);
