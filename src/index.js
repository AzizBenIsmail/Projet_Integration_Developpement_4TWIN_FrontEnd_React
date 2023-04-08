
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {Provider}from 'react-redux';
import store from './store/store'
//FrontOffice
import "assetsFrontOffice/vendor/nucleo/css/nucleo.css";
import "assetsFrontOffice/vendor/font-awesome/css/font-awesome.min.css";
import "assetsFrontOffice/scss/argon-design-system-react.scss?v1.1.0";

//BackOffice
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import './fontawesome';




ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
  <Provider store={store}>
    <App />
    </Provider>
  </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
//code for login page react


