
import React from "react";
import ReactDOM from "react-dom/client";
import App from './App';
import { BrowserRouter } from 'react-router-dom';
// import reportWebVitals from './reportWebVitals';

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </React.StrictMode>
);
// reportWebVitals();