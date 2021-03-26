import React from 'react';
import {ReactDOM, useHistory } from 'react-dom';
import './index.css';

import {
    Route
} from 'react-router';

import 'bootstrap/dist/css/bootstrap.min.css';

import LoginScreen from "./loginPackage/LoginScreen";
import HomePage from "./homePackage/HomePage"

ReactDOM.render(
  <React.StrictMode>
      <Route path="/" component={LoginScreen}>
             <Route path="/homepage" component={HomePage}/>
      </Route>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorkerRegistration.unregister();
