
import React from "react";
import ReactDOM from "react-dom/client";
import App from './App';
import { BrowserRouter } from 'react-router-dom';

//FrontOffice
import "assetsFrontOffice/vendor/nucleo/css/nucleo.css";
import "assetsFrontOffice/vendor/font-awesome/css/font-awesome.min.css";
import "assetsFrontOffice/scss/argon-design-system-react.scss?v1.1.0";

//BackOffice
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import './fontawesome';


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </React.StrictMode>
);
// reportWebVitals();